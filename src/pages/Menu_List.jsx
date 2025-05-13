import { useContext, useEffect, useState } from "react";
import { Context } from "../components/Context";
import burger from "../assets/images/burger.png";
import pizza from "../assets/images/pizza.png";
import fish from "../assets/images/fish.png";
import sushi from "../assets/images/sushi.png";
import axios from "axios";
import { BlurredImage } from "../components/Custom/BluredImage";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export const Menu_List = ({ }) => {
      const { theme } = useContext(Context);
      const [data, setData] = useState([])
      console.log(data);

      useEffect(() => {
            axios.get("https://dummyjson.com/recipes?limit=15&skip=10&select=name,image")
                  .then((res) => {
                        setData(res.data.recipes)
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

                  {/* Categories */}
                  <div className="flex justify-start items-end text-lg overflow-y-scroll scrollbar-hide gap-5">
                        {items.map((item, index) => {

                              return (
                                    <div key={index} className="flex flex-col items-center">
                                          <img className="text-lg" src={burger} />
                                          <span className="">{item.name}</span>
                                    </div>
                              )
                        })}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {data && data.map((item) => {
                              return (
                                    <div key={item.id} className=" min-h-[200px] p-2 bg-white rounded-lg shadow-md flex flex-col justify-between items-center gap-1">
                                          <div className="flex flex-col gap-1">
                                                <BlurredImage src={item.image} alt={item.name} className="w-full rounded-lg h-auto" />
                                                <h2>{item.name}</h2>
                                          </div>
                                          <div className="w-full">
                                                <div className="flex justify-center items-center gap-1 main-bg-color w-[100%] border border-gray-200 rounded-lg p-2" onClick={() => {
                                                      setSelected(item.id)
                                                      deleteFn()
                                                      setReload(!reload)
                                                }}>
                                                      <PlusOutlined />
                                                </div>
                                          </div>
                                    </div>
                              )
                        })}
                  </div>
            </div>
      )
}