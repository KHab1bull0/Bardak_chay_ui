import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../components/Context";
import axios from "../../api/index";
import { BlurredImage } from "../../components/Custom/BluredImage";
import { InstagramFilled, InstagramOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { Instagram, Phone, PhoneAndroid, PhoneIphone, Telegram, TuneRounded } from "@mui/icons-material";
import { formatCurrency, formatPhoneNumber } from "../../utils";
import { OrderModal } from "../../components/Custom/OrderModal";
import TextArea from "antd/es/input/TextArea";
import { Form, Input, Select } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { API_URI } from "../../../env";
import { UserOrderModal } from "../../components/Custom/UserOrderModal";
import { TextToggle } from "../../components/Custom/TextToggle";


export const MainPage = () => {
    const { theme, orders, setOrders, isFirst, setIsFirst, setChatId, chatIdState } = useContext(Context);
    const [form] = Form.useForm();
    const [branches, setBranches] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { chatId } = useParams();

    const [sum, setSum] = useState(0)
    const [orderTag, setOrderTag] = useState(false);
    const [makeOrder, setMakeOrder] = useState(false);

    const [selected, setSelected] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [moreText, setMoreText] = useState(false)


    const sectionRefs = useRef({});
    const handleScroll = (catId) => {
        sectionRefs.current[catId]?.scrollIntoView({ behavior: "smooth" });
    };

    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);

    
    const getLocation = () => {
        // Brauzer Geolocation’ni qo‘llab-quvvatlashini tekshirish
        if (!navigator.geolocation) {
            console.log(("Geolocation brauzeringizda qo‘llab-quvvatlanmaydi"));
            return;
        }

        // Joylashuvni olish
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.log(error)
            },
            {
                enableHighAccuracy: true, // Yuqori aniqlikdagi joylashuv
                timeout: 10000, // 10 soniya kutish
                maximumAge: 0, // Keshdan foydalanmaslik
            }
        );
    };

    useEffect(() => {
        if (isFirst) {
            localStorage.setItem('chatId', chatId)
            setChatId(chatId)
            setIsFirst(false)
        }

        axios.get(`category/all`)
            .then((res) => {
                setCategories(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
        axios.get(`product/all`)
            .then((res) => {
                setProducts(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
        axios.get(`branch/all`)
            .then(res => {
                setBranches(res.data.data);
                localStorage.setItem('branch_id', res.data.data?.[0]?.id)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        let total = 0
        for (let order of orders) {
            console.log(order)
            total += Number(order?.product?.price) * order.count
        }
        if (total > 0 && !makeOrder) {
            setOrderTag(true)
        } else {
            setOrderTag(false)
        }
        setSum(total)

    }, [orders, makeOrder])

    // Komponent yuklanganda joylashuvni olish
    useEffect(() => {
        getLocation();
    }, []);

    const sendOrderFn = (values) => {

        const body = {
            branch: localStorage.getItem('branch_id'),
            user: localStorage.getItem('chatId'),
            chair: Number(values.chair),
            comment: values.comment,
            products: orders,
            location: location
        }
        axios.post(`order/create`, body)
            .then(res => {
                form.resetFields()
                setMakeOrder(false)
                setOrders([])
                toast.success("Buyurtma qabul qilindi!")
            })
            .catch(err => {
                console.log(err)
                if (err?.response?.data?.message.includes('location.latitude should not be empty')) {
                    toast.error(`Manzilni olib bo'lmadi`)
                    getLocation();
                } else {
                    console.log(err?.response?.data?.message);
                    toast.error(`Buyurtma qabul qilishda xatolik bo'ldi`);
                }
            })
    }


    return (
        <div className="pt-1">
            <Toaster />

            <div className="p-2 bg-white  shadow-md">
                <div className="flex gap-4 p-2 whitespace-nowrap overflow-x-scroll scrollbar-hide">
                    {branches?.length > 0 && branches.map((branch, index) => {
                        const url = `${API_URI}${branch.cover}`
                        return (
                            <div key={index} className="w-[100%] flex justify-between gap-2">
                                <div className="w-[55%] flex gap-2 flex-col">
                                    <h2 className="text-xl py-3 font-poppins font-medium whitespace-break-spaces">{branch.name}</h2>
                                    <div className="w-full flex gap-1">
                                        <div className="fji rounded-full bg-blue-400 p-1">

                                            <a href={`https://t.me/${branch.telegram}`}>
                                                <Telegram className="text-white" />
                                            </a>
                                        </div>
                                        <div className="fji rounded-full p-1 bg-gradient-to-bl from-indigo-500 to-pink-500">
                                            <a href={`https://www.instagram.com/${branch.instagram}`}>
                                                <Instagram className="text-white" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex justify-start gap-3">
                                        <PhoneIphone />
                                        <span>{formatPhoneNumber(branch.phone_number)}</span>
                                    </div>
                                </div>

                                <div className="w-[45%] p-1 flex justify-center items-center">
                                    <BlurredImage src={url} alt={'Cover Image'} className="w-[8rem] h-[6rem] object-cover rounded-lg" />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>


            <div className={`sticky top-0 mt-2 mx-1 shadow-md px-2 z-[1000] bg-white rounded-2xl transition-colors duration-300`}>
                <div className="flex flex-nowrap gap-5 w-full px-2  overflow-auto scrollbar-hide py-2">
                    {/* <div className="flex flex-col gap-2 justify-center items-center flex-shrink-0">
                        <div className="w-14 h-14 rounded-full flex justify-center items-center bg-light-gray">
                            <TuneRounded className="text-3xl" />
                        </div>
                        <span className="text-xs">Filter</span>
                    </div> */}
                    {categories.map((item, index) => {
                        const src = `${API_URI}${item.image}`
                        return (
                            <div
                                onClick={() => handleScroll(item.id)}
                                key={index}
                                className="flex flex-col gap-2 justify-center items-center flex-shrink-0 w-[60px]"
                            >
                                <BlurredImage
                                    src={src}
                                    alt={item.name}
                                    className="w-[100px] h-14 object-cover rounded-full"
                                />
                                <span className="text-xs truncate">{item.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="px-2 pb-20 mt-2 mx-2 bg-white rounded-xl">
                {categories?.length > 0 && categories?.map((cat) => {
                    return (
                        <div
                            key={cat.id}
                            ref={(el) => (sectionRefs.current[cat.id] = el)}
                            className="mb-2"
                        >
                            {cat?.products?.length > 0 && (
                                <p className="text-2xl font-semibold p-1 pb-2">{cat.name}</p>
                            )}
                            <div className="grid grid-cols-2 gap-2">
                                {products.length > 0 &&
                                    products
                                        .filter((p) => p?.category?.id === cat?.id)
                                        .map((p, index) => {
                                            // const baseUrl = 'http://localhost:8080/';
                                            const baseUrl = `${API_URI}`;

                                            const orderCount = orders.find(order => order.id === p.id)?.count
                                            return (
                                                <div
                                                    key={index}
                                                    className={`${theme ? 'bg-white' : 'bg-light-gray'} w-[46vw] min-h-[250px] p-2 shadow-md rounded-3xl flex flex-col gap-1`}

                                                >
                                                    <div className="flex justify-center items-center w-full mb-1">
                                                        <BlurredImage
                                                            src={baseUrl + p.image}
                                                            alt={p.name}
                                                            className="w-[150px] h-[150px] object-cover rounded-xl"
                                                            onClick={() => {
                                                                setShowMore(true)
                                                                setSelected(p)
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        className={`${theme ? 'text-black' : 'text-black'} w-full`}
                                                    >
                                                        <p className="text-base font-medium ">
                                                            {formatCurrency(Number(p?.price)?.toFixed(0))}
                                                            <span className="px-1">UZS</span>
                                                        </p>
                                                        <h2 className="text-base font-medium">{p.name}</h2>
                                                        <p className="pb-1 text-xs text-gray-400 font-bold">{p.weight}</p>
                                                    </div>

                                                    <div
                                                        className={`flex ${orderCount ? "justify-between  py-1 px-2" : 'justify-center  py-2 px-3'} items-center bg-white mt-2 rounded-3xl`}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                        }}
                                                    >
                                                        {orderCount > 0 &&
                                                            <>
                                                                <button
                                                                    className={`${orderCount ? 'px-2 p-1 rounded-full bg-lightgreen' : 'w-full'} `}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        setOrders((prev) => {
                                                                            const item = orders.find(product => product.id === p.id);
                                                                            if (item) {
                                                                                const updatedOrder = orders.map(product =>
                                                                                    product.id === p.id
                                                                                        ? { ...product, count: product.count - 1 }
                                                                                        : product
                                                                                )

                                                                                if (item.count <= 0) {
                                                                                    return prev.filter((product) => product.id !== p.id);
                                                                                } else {
                                                                                    return updatedOrder;
                                                                                }
                                                                            }
                                                                            return [...prev, { product: { ...p }, count: 1, id: p.id }]
                                                                        })
                                                                    }}
                                                                >
                                                                    <MinusOutlined />
                                                                </button>
                                                                <div>
                                                                    {orderCount}
                                                                </div>
                                                            </>
                                                        }
                                                        <button
                                                            className={`${orderCount ? 'px-2 p-1 rounded-full bg-lightgreen' : 'w-full'} `}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setOrders((prev) => {
                                                                    const item = orders.find(product => product.id === p.id);
                                                                    if (item) {
                                                                        const updatedOrder = orders.map(product =>
                                                                            product.id === p.id
                                                                                ? { ...product, count: product.count + 1 }
                                                                                : product
                                                                        )

                                                                        if (item.count <= 0) {
                                                                            return prev.filter((product) => product.id !== p.id);
                                                                        } else {
                                                                            return updatedOrder;
                                                                        }
                                                                    }
                                                                    return [...prev, { product: { ...p }, count: 1, id: p.id }]
                                                                })
                                                            }}
                                                        >
                                                            <PlusOutlined />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                            </div>


                        </div>
                    );
                })}
            </div>

            {
                orderTag &&
                <div
                    className={`fixed bottom-0 flex justify-between shadow-md h-[10vh] w-full bg-white rounded-xl p-2 animate-slide-up
                              ${orderTag ? 'visible' : ''}`}
                    style={{ zIndex: 10000 }}
                >
                    <div className=" w-[50%] h-full flex justify-start items-center pl-2">
                        <div className="text-lg text-gray-500 font-semibold">{formatCurrency(sum)}{" UZS"}</div>
                    </div>
                    <button
                        className="bg-lightgreen text-base font-semibold rounded-xl w-[50%] h-full"
                        onClick={() => {
                            setMakeOrder(true)
                            setOrderTag(false)
                        }}
                    >
                        Buyurtma berish
                    </button>
                </div>
            }


            <OrderModal
                title="Savat"
                open={makeOrder}
                onCancel={() => {
                    setMakeOrder(false)
                }}
                form={form}
                rootClassname={`flex justify-center items-end`}
                className={`${theme ? "bg-gray-500" : "bg-beji"} w-[98%] h-[95vh] pt-3 py-2 px-4 rounded-lg shadow-lg flex flex-col gap-2`}
                headerClassName={`flex justify-between items-center h-[5%]`}
                footer={
                    <div className="w-[100%] h-[8vh]">
                        <div className="flex justify-center items-center h-full">
                            <button
                                className={`${theme ? "bg-gray-700 text-white" : "bg-lightgreen text-black font-semibold"}
                                                w-[90%] p-2 text-lg rounded-xl hover:scale-105 transition-transform`}
                                onClick={() => form.submit()}
                            >
                                Buyurtma berish
                            </button>
                        </div>
                    </div>
                }
            >
                <div className="w-full h-[77vh] pt-5 pb-10 overflow-y-scroll scrollbar-hide">
                    {
                        orders?.length > 0 ?
                            <>
                                {orders?.length > 0 && orders.map((order, index) => {
                                    // const url = `http://localhost:8080/${order?.product?.image}`
                                    const url = `${API_URI}${order?.product?.image}`

                                    return (
                                        <div key={index} className="flex items-center gap-2 h-24">
                                            <div className="w-[25%]">
                                                <img className="w-[70px] h-[70px] object-cover rounded-xl" src={url} alt="Product image" />
                                            </div>
                                            <div className=" w-[45%]">
                                                <h2 className="font-medium">{order.product.name}</h2>
                                                <p
                                                    className="text-sm font-medium"
                                                >
                                                    {formatCurrency(order.product.price * order.count)}{" UZS -"}
                                                    <span className="pl-1 text-gray-400">{order?.product?.weight}</span>
                                                </p>
                                            </div>
                                            <div className="w-[30%] flex justify-center items-center">
                                                <div className={`flex justify-between items-center py-1 w-full bg-white mt-2 rounded-xl`}>
                                                    <button
                                                        className={`w-full flex justify-center items-center`}
                                                        onClick={() => {
                                                            console.log("Minus")
                                                            setOrders((prev) => {
                                                                const item = orders.find(product => product.id === order?.product?.id);
                                                                if (item) {
                                                                    const updatedOrder = orders.map(product =>
                                                                        product.id === order?.product?.id
                                                                            ? { ...product, count: product.count - 1 }
                                                                            : product
                                                                    )
                                                                    const item = updatedOrder.find(product => product.id === order?.product?.id);
                                                                    if (item.count <= 0) {
                                                                        return prev.filter((product) => product.id !== order?.product?.id);
                                                                    } else {
                                                                        return updatedOrder;
                                                                    }
                                                                }
                                                                return [...prev, { product: { ...p }, count: 1, id: order?.product?.id }]
                                                            })
                                                        }}
                                                    >
                                                        <MinusOutlined style={{ fontSize: '20px' }} />
                                                    </button>
                                                    <div className="font-bold">
                                                        {order.count}
                                                    </div>
                                                    <button
                                                        className={`w-full flex justify-center items-center`}
                                                        onClick={() => {
                                                            console.log('Plus')
                                                            setOrders((prev) => {
                                                                const item = orders.find(product => product.id === order?.product?.id);
                                                                if (item) {
                                                                    const updatedOrder = orders.map(product =>
                                                                        product.id === order?.product?.id
                                                                            ? { ...product, count: product.count + 1 }
                                                                            : product
                                                                    )
                                                                    const item = updatedOrder.find(product => product.id === order?.product?.id);
                                                                    if (item.count <= 0) {
                                                                        return prev.filter((product) => product.id !== order?.product?.id);
                                                                    } else {
                                                                        return updatedOrder;
                                                                    }
                                                                }
                                                                return [...prev, { product: { ...p }, count: 1, id: order?.product?.id }]
                                                            })
                                                        }}
                                                    >
                                                        <PlusOutlined style={{ fontSize: '20px' }} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="p-2 mt-5">
                                    <p className="text-xl text-gray-400 border-t-2 border-gray-400 pt-5 pb-2 flex justify-between" ><span>Jami: </span><span className="text-2xl text-black">{formatCurrency(sum)}{" UZS"}</span></p>
                                </div>
                                <Form layout="vertical" form={form} onFinish={sendOrderFn}>
                                    <Form.Item
                                        name="comment"
                                    >
                                        <TextArea className="text-lg" placeholder="Qo'shimcha izoh qoldirish..." />
                                    </Form.Item>
                                    <Form.Item
                                        name='chair'
                                        rules={[{ required: true, message: 'Stol raqami yozilmagan!' }]}
                                    >
                                        <div className="flex gap-2 justify-between items-center">
                                            <div className="px-2 text-xl text-gray-400">Stol raqami: </div>
                                            <Input type="number" className="w-[40%] text-lg text-center mr-5" placeholder="Stol" />
                                        </div>
                                        {/* <Select>
                                                                  <Select.Option></Select.Option>
                                                            </Select> */}
                                    </Form.Item>
                                </Form>
                            </>
                            :
                            <div className="text-center">Buyurtmalar mavjud emas</div>
                    }
                </div>
            </OrderModal>


            <UserOrderModal
                // title="Savat"
                open={showMore}
                onCancel={() => {
                    setShowMore(false);
                }}
                // form={form}
                rootClassname={`flex items-end`}
                className={`${theme ? "bg-gray-500" : "bg-beji"} w-[100%] h-[95vh] overflow-hidden rounded-tl-3xl rounded-tr-3xl shadow-lg flex flex-col gap-2`}
                // headerClassName={`flex justify-between items-center h-[5%]`}
                footer={
                    <div className="fixed w-full bottom-1 h-[15vh] bg-white px-3 py-2">
                        <div className="py-2 px-3 bg-beji flex justify-between items-center">
                            <div className="text-lg">
                                {selected?.name}
                                <span className="ml-2 text-gray-400">{selected?.weight}</span>
                            </div>
                            <div className="text-lg font-poppins">
                                {selected?.price}{" sum"}
                            </div>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <button
                                className={`${theme ? "bg-gray-700 text-white" : "bg-beji text-black font-semibold"}
                                                w-[20%] p-2 text-lg rounded-xl hover:scale-105 transition-transform`}
                                onClick={() => form.submit()}
                            >
                                +
                            </button>
                            <button
                                className={`${theme ? "bg-gray-700 text-white" : "bg-lightgreen text-black font-semibold"}
                                                w-[70%] p-2 text-lg rounded-2xl hover:scale-105 transition-transform`}
                                onClick={() => form.submit()}
                            >
                                Buyurtma berish
                            </button>
                        </div>
                    </div>
                }
            >
                <div>
                    <div className="pt-10 pb-4 px-4 rounded-3xl bg-white">
                        <div className="flex flex-col justify-center items-center min-h-[40%] ">
                            <img
                                src={`${API_URI}${selected?.image}`}
                                alt={selected?.name}
                                className="w-[20rem] h-[15rem] object-cover rounded-3xl m-1 p-0"
                            />
                            <div className="mt-4">
                                <TextToggle text={selected?.description} maxLength={70} />
                            </div>
                        </div>
                    </div>
                </div>
            </UserOrderModal>
        </div >
    )
}