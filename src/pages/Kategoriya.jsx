import { useContext, useEffect, useState } from "react"
import { Context } from "../components/Context"
import axios from "axios"
import { Button } from "antd"
import { BlurredImage } from "../components/Custom/BluredImage"

export const Kategoriya = () => {
      const { theme } = useContext(Context)
      const [data, setData] = useState([])


      useEffect(() => {
            axios.get("https://dummyjson.com/recipes?limit=20&skip=10&select=name,image")
                  .then((res) => {
                        setData(res.data.recipes)
                  })
                  .catch((err) => {
                        console.log(err)
                  })
      }, [])


      return (
            <div className={`${theme ? "bg-gray-800 text-white" : "bg-white text-black"} h-[89vh] overflow-y-scroll scrollbar-hide p-4  rounded-xl`}>
                  <div className="flex justify-start items-center gap-4 mt-[10px]">
                        <h1 className="text-2xl font-bold">Kategoriya</h1>
                  </div>
                  <div className="flex justify-end items-center gap-4 mt-[10px]">

                        <Button>Kategoriya qo'shish</Button>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                        {data.length > 0 && data.map((item) => {
                              return (
                                    <div className="w-[200px] min-h-[200px] p-4 main-bg-color rounded-lg shadow-md flex flex-col justify-start items-start gap-1">
                                          <BlurredImage src={item.image} alt={item.name} className="w-full h-auto" />
                                          <h2>{item.name}</h2>
                                    </div>
                              )
                        })}
                  </div>
            </div>
      )
}