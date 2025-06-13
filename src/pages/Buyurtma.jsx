import { useContext, useEffect, useState } from "react"
import { Context } from "../components/Context"
import axios from "../api/index"
import { API_URI } from "../../env"
import { DashOutlined } from "@ant-design/icons"
import { EditOutlined } from "@mui/icons-material"
import { formatCurrency } from "../utils"
import CustomModal from "../components/Custom/Modal"
import { toPng } from "html-to-image";


export const Buyurtma = () => {
    const { theme } = useContext(Context)
    const [orders, setOrders] = useState([])
    const [more, setMore] = useState(false);
    const [statusModal, setStatusModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderId, setselectedOrderId] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [refresh, setRefresh] = useState(false);


    const StatusColor = {
        pending: `bg-[#EDF5FB] text-[#015993]`,
        process: `bg-[#F9F3AA] text-[#ED9C07]`,
        ready: `bg-lightgreen text-[#004B24]`,
        rejected: `bg-[#FCF3F2] text-[#AA4647]`,
    }

    const StatusConvert = {
        pending: 'Kutmoqda',
        process: "Jarayonda",
        ready: "Tayyor",
        rejected: "Bekor qilingan"
    }


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("order/all");
                setOrders(res.data.data);
            } catch (error) {
                console.error("Buyurtmalarni olishda xatolik:", error);
            }
        };

        fetchOrders();

        const interval = setInterval(() => {
            fetchOrders();
        }, 5000); // Har 10 soniyada so'rov yuborish

        return () => clearInterval(interval); // Intervalni tozalash
    }, [refresh]);

    const updatedStatusFn = (status) => {
        if (selectedOrder) {
            axios.patch(`order/update-status/${selectedOrder}`, {
                status: status
            }).then(res => {
                setRefresh((prev) => !prev)
                setSelectedOrder(null)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const acceptOrderFn = () => {
        if (selectedOrder) {
            axios.patch(`order/update-status/${selectedOrder?.id}`, {
                status: 'process'
            }).then(res => {
                setRefresh((prev) => !prev)
                setMore(false)
                setSelectedOrder(null)
            }).catch(err => {
                console.log(err)
            })
        }
    }


    const downloadDesign = async () => {
        const node = document.getElementById("qr-design"); // Dizayn IDsi
        try {
            const dataUrl = await toPng(node); // Elementni PNG formatiga aylantirish
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "qr-code-design.png"; // Yuklab olinadigan fayl nomi
            link.click();
        } catch (error) {
            console.error("Yuklab olishda xatolik yuz berdi:", error);
        }
    };

    return (
        <div className={`${theme ? "bg-dark text-black" : "bg-white text-black"} h-[89vh] overflow-y-scroll scrollbar-hide p-4 rounded-xl`}>
            <div className="flex justify-start items-center gap-4 mt-[10px]">
                <h1 className="text-2xl font-bold">Buyurtma</h1>
                {/* <button
               onClick={downloadDesign}
               className="px-4 py-2 bg-blue-500 text-white rounded"
            >
               Download Image
            </button> */}
            </div>
            <div className={`flex justify-end items-center gap-4 w-full mt-4 bg-beji p-2 rounded-xl `}>
                <button
                    className={`${theme ? "bg-brown text-white" : "bg-lightgreen"} font-semibold p-2 rounded-xl`}
                >
                    Qo'shish
                </button>
            </div>

            <div id='qr-design' className={`${theme ? "border-black" : "border-gray-200"} mt-4 h-[82%] border-2 rounded-xl overflow-hidden `}>
                <div className="flex gap-1 justify-start items-center bg-beji  pt-3 pb-1 w-[100%]">
                    <div
                        className={`px-1 text-base h-full flex justify-center items-center  font-medium  text-center w-[15%]`}
                    >
                        Nomer
                    </div>
                    <div
                        className={`px-3 text-lg font-medium  w-[25%]`}
                    >
                        Mijoz
                    </div>
                    <div
                        className={`px-3 text-lg font-medium  w-[25%]`}
                    >
                        Telefon raqam
                    </div>
                    <div
                        className={`px-3 text-lg font-medium  w-[10%]`}
                    >
                        Stol
                    </div>
                    <div
                        className={`px-3 text-lg font-medium  w-[25%]`}
                    >
                        Holat
                    </div>
                    <div
                        className={`px-3 text-lg font-medium  w-[20%]`}
                    >
                        {"Narx (UZS)"}
                    </div>
                    <div
                        className={`px-3 text-lg font-medium  w-[20%]`}
                    >
                        Izoh
                    </div>
                    <div
                        className={`px-3 text-lg font-medium  w-[20%]`}
                    >
                        Vaqt
                    </div>

                    <div
                        className={`p-1 text-lg font-medium text-center w-[10%]`}
                    >
                        <DashOutlined
                            style={{
                                color: theme ? "black" : "black",
                                fontSize: "30px",
                                cursor: "pointer",
                            }}
                        />
                    </div>
                </div>
                <div className="h-[90%] overflow-auto custom-scrollbar">
                    {orders?.length > 0 && orders?.map(order => {
                        return (
                            <div
                                onClick={() => {
                                    setMore(true)
                                    setStatusModal(null)
                                    setSelectedOrder(order)
                                }}
                                className={`${theme ? "border-black bg-white" : "border-gray-200 "} 
                                                flex gap-1 justify-start items-center border-b-2 w-[100%]`}
                            >
                                <div
                                    className={`py-3 px-1 text-base h-full flex justify-center items-center  font-medium  text-center w-[15%]`}
                                >
                                    <div className={`${theme ? "bg-brown text-white" : "bg-lightgreen text-black"} p-1 px-3 rounded-xl font-bold tracking-wide`}>
                                        {order.code}
                                    </div>
                                </div>
                                <div
                                    className={`py-3 px-2 text-lg font-medium   w-[25%] truncate`}
                                >
                                    {order?.user?.f_name || '-'}
                                </div>
                                <div
                                    className={`py-3 px-2 text-lg font-medium   w-[25%] truncate`}
                                >
                                    {order?.user?.phone_number || '-'}
                                </div>
                                <div
                                    className={`py-3 px-2 text-lg font-medium   w-[10%]`}
                                >
                                    {order?.chair || '-'}
                                </div>
                                <div

                                    className={`py-3 px-2 text-base font-medium  w-[25%]`}
                                >
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            const rect = e.target.getBoundingClientRect();
                                            setStatusModal({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
                                            setSelectedOrder(order.id)
                                        }}
                                        className={`${StatusColor[order.status]} 
                                                            p-1 px-3 rounded-xl font-semibold tracking-wide`}
                                    >
                                        {StatusConvert[order.status]}
                                    </span>
                                </div>
                                <div
                                    className={`py-3 px-2 text-lg font-medium   w-[20%]`}
                                >
                                    {formatCurrency(order?.total_price)}
                                </div>
                                <div
                                    className={`py-3 px-2  text-lg font-medium   w-[20%] truncate`}
                                >
                                    {order?.comment || '-'}
                                </div>
                                <div
                                    className={`py-3 px-2 text-lg font-medium   w-[20%]`}
                                >
                                    {new Date(order?.createdAt).toLocaleString('uz-UZ', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>

                                <div
                                    className={`py-3 px-1 text-lg font-medium text-center w-[10%]`}
                                >
                                    <div
                                        className="opacity-60 rounded hover:opacity-100 hover:scale-110 transition-opacity duration-300"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setselectedOrderId(order.id);
                                            setEditModal(true);
                                        }}
                                    >
                                        <EditOutlined style={{ color: theme ? "black" : "black" }} />
                                    </div >
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>


            <CustomModal
                // title="Filial"
                open={more}
                onCancel={() => {
                    setMore(false)
                }}
                className={`${theme ? "bg-dark" : "bg-beji"} relative rounded-lg shadow-lg w-[80%] h-[95vh] py-6 px-4`}
                // footerPosition={`absolute bottom-10 right-10`}
                footer={
                    <div className="h-[10vh]">
                        <div className={`flex ${selectedOrder?.status == '' ? " justify-between" : " justify-end pr-5"} mt-8 items-center pl-5 shadow-[0_0px_10px_rgba(0,0,0,0.45)] rounded-2xl p-1 `}>
                            <div className={`text-5xl font-bold h-full font-poppins`}>
                                {formatCurrency(selectedOrder?.total_price)}{" UZS"}
                            </div>
                            <button
                                className={`
                                          ${theme ? "bg-brown text-white" : "bg-white text-black font-semibold"}
                                          ${selectedOrder?.status == 'pending' ? "" : "hidden"}
                                          tracking-wide p-2 w-[20vw] h-[8vh] text-3xl font-medium rounded-xl hover:scale-105 transition-transform
                                          `}
                                onClick={() => acceptOrderFn()}
                            >
                                Qabul qilish
                            </button>
                        </div>
                    </div>
                }
            >
                <div className="mt-10 pb-20 h-[70vh] overflow-y-scroll scrollbar-hide">
                    {selectedOrder?.order_items?.map(item => {
                        const image_url = `${API_URI}${item.product.image}`

                        return (
                            <div className={`flex h-[15vh] gap-2 mt-3`}>
                                <div className="w-[15%] flex justify-center items-center">
                                    <img
                                        src={image_url}
                                        alt={item.name}
                                        className="w-[15vh] h-[15vh] object-cover rounded-xl"
                                    />
                                </div>
                                <div className="w-[85%] h-full flex items-center text-3xl border-b-2 border-black">
                                    <div className={`w-[30%]`}>{item?.product?.name}</div>
                                    <div className={`w-[15%] text-3xl`}>x{item.quantity}</div>
                                    <div className={`w-[10%]`}>{item?.product?.size}</div>
                                    <div className={`w-[20%] truncate`}>{selectedOrder?.comment}</div>
                                    <div className={`w-[25%] font-medium text-4xl text-end px-3`}>{formatCurrency(item.product.price * item.quantity)}{"  UZS"}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CustomModal>

            {statusModal && (
                <div
                    style={{
                        width: '200px',
                        whiteSpace: 'wrap',
                        position: "absolute",
                        top: statusModal.top - 100, // Modalni katakdan biroz pastroq joylashtirish
                        left: statusModal.left - 210,
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "20px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                    }}
                    className="transition duration-300 ease-in-out flex flex-col gap-2"
                >
                    {Object.entries(StatusConvert).map((status) => {
                        console.log(status)
                        return (
                            <div
                                onClick={() => {
                                    setStatusModal(null)
                                    updatedStatusFn(status[0])
                                }}
                                className={`${StatusColor[status[0]]} hover:scale-105 transition-transform
                                                p-1 px-3 rounded-xl font-semibold tracking-wide`}
                            >
                                {status[1]}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}