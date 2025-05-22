import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../components/Context";
import burger from "../assets/images/burger.png";
import pizza from "../assets/images/pizza.png";
import fish from "../assets/images/fish.png";
import sushi from "../assets/images/sushi.png";
import axios from "../api/index";
import { BlurredImage } from "../components/Custom/BluredImage";
import { Button } from "antd";
import { FilterTwoTone, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { Filter, FilterOutlined, TuneRounded } from "@mui/icons-material";
import { formatCurrency } from "../utils";
import { ToastContainer, toast } from 'react-toastify';
import { Toaster } from "react-hot-toast";


export const Menu_List = ({ }) => {
      const { theme } = useContext(Context);
      const [data, setData] = useState([])
      const [products, setProducts] = useState([])
      const [categories, setCategories] = useState([])
      const { chatId } = useParams();
      const click = () => toast('You clicked');
      const notify = () => toast('Here is your toast.');

      const sectionRefs = useRef({});
      // Bosilganda kerakli joyga scroll
      const handleScroll = (catId) => {
            console.log(catId)
            sectionRefs.current[catId]?.scrollIntoView({ behavior: "smooth" });
      };


      useEffect(() => {
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
      }, [])


      const items = [
            {
                  name: "Burger",
                  key: "burger",
                  image: "../assets/images/burger.png",
            },
            {
                  name: "Pizza",
                  key: "pizza",
                  image: "../assets/images/pizza.png",
            },
            {
                  name: "Sushi",
                  key: "sushi",
                  image: "../assets/images/sushi.png",
            },
            {
                  name: "Fish",
                  key: "fish",
                  image: "../assets/images/fish.png",
            },
            {
                  name: "Sushi",
                  key: "sushi",
                  image: "../assets/images/sushi.png",
            },
            {
                  name: "Fish",
                  key: "fish",
                  image: "../assets/images/fish.png",
            },
            {
                  name: "Sushi",
                  key: "sushi",
                  image: "../assets/images/sushi.png",
            },
            {
                  name: "Fish",
                  key: "fish",
                  image: "../assets/images/fish.png",
            },
      ]

      return (
            <div className='flex flex-col gap-4 px-3'>
                  <div>
                        Bizni ijtimoiy tarmoqlarda kuzatib boring
                  </div>

                  <div className="flex flex-col gap-5 sticky top-2" style={{ zIndex: 1000 }}>
                        <div>
                              <p className="text-xl font-semibold">Kategoriya</p>
                        </div>
                        <div className="flex flex-nowrap gap-5 w-[93vw] overflow-auto scrollbar-hide">
                              <div className="flex flex-col gap-2 justify-center items-center flex-shrink-0">
                                    <div className="w-14 h-14 rounded-full flex justify-center items-center bg-light-gray">
                                          <TuneRounded className="text-3xl" />
                                    </div>
                                    <span className="text-xs">Filter</span>
                              </div>

                              {categories.map((item, index) => {
                                    const src = `http://localhost:8080/${item.image}`
                                    return (
                                          <div onClick={() => handleScroll(item.id)} key={index} className="flex flex-col gap-2 justify-center items-center flex-shrink-0 w-[60px]">
                                                <BlurredImage src={src} alt={item.name} className="w-[100px] h-14 object-cover rounded-full" />
                                                <span className="text-xs">{item.name}</span>
                                          </div>
                                    )
                              })}
                        </div>
                  </div>

                  <div>

                        {categories?.length > 0 && categories.map((cat) => {
                              return (
                                    <div
                                          key={cat.id}
                                          ref={(el) => (sectionRefs.current[cat.id] = el)}
                                          className="mb-2"
                                    >
                                          {cat?.products?.length > 0 && <p className="text-2xl font-semibold p-1 pb-2">{cat.name}</p>}

                                          <div className="grid grid-cols-2 gap-2">
                                                {products.length > 0 && products.filter((p) => p?.category?.id === cat?.id).map((p, index) => {
                                                      // const baseUrl = 'http://localhost:8080/'
                                                      const baseUrl = 'https://b7a1-89-236-218-41.ngrok-free.app/'

                                                      return (
                                                            <div key={index} className={`${theme ? "bg-white" : "bg-light-gray"} w-[100%] min-h-[250px] p-2 rounded-xl flex flex-col gap-1`}>
                                                                  <div className="flex justify-center items-center w-full mb-1">
                                                                        <BlurredImage src={baseUrl + p.image} alt={p.name} className="w-[150px] h-[150px] object-cover rounded-lg" />
                                                                  </div>
                                                                  <div className={`${theme ? "text-black" : "text-black"} w-full`}>
                                                                        <p className="text-base font-medium text-yellow-400" >{formatCurrency(Number(p?.price)?.toFixed(0))}<span className="px-1">UZS</span></p>
                                                                        <h2 className="text-base font-medium">{p.name}</h2>
                                                                  </div>
                                                                  <div
                                                                        className="flex justify-center items-center bg-white p-1 rounded-lg"
                                                                        onClick={notify}
                                                                  >
                                                                        <button>
                                                                              <PlusOutlined />
                                                                              <Toaster />
                                                                        </button>
                                                                  </div>
                                                            </div>
                                                      )
                                                })}
                                          </div>
                                    </div>
                              )
                        })}
                  </div>
            </div>
      )
}