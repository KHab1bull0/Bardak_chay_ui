import { useContext, useEffect, useState } from "react"
import { Context } from "../components/Context"
import { Button } from "antd"
import axios from "axios"
import { BlurredImage } from "../components/Custom/BluredImage"




export const Mahsulot = () => {
      const { theme } = useContext(Context)
      const [data, setData] = useState([])
      const [reload, setReload] = useState(false)
      const [selected, setSelected] = useState(null)
      console.log(data);


      useEffect(() => {
            axios.get("https://dummyjson.com/recipes?limit=15&skip=10&select=name,image")
                  .then((res) => {
                        setData(res.data.recipes)
                  })
                  .catch((err) => {
                        console.log(err)
                  })
      }, [reload])

      const deleteFn = () => {
            if ((selected)) {
                  axios.delete(`https://dummyjson.com/recipes/${selected}`)
                        .then((res) => {
                              setData(res.data.recipes)
                        })
                        .catch((err) => {
                              console.log(err)
                        })
            }
      }

      return (
            <div className={`${theme ? "bg-gray-800 text-white" : "bg-white text-black"} h-[89vh] overflow-y-scroll scrollbar-hide p-4 rounded-xl`}>
                  <div className="flex justify-start items-center gap-4 mt-[10px]">
                        <h1 className="text-2xl font-bold">Mahsulot</h1>
                  </div>
                  <div className="flex justify-end items-center gap-4 mt-[10px]">

                        <Button>Mahsulot qo'shish</Button>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                        {data && data.map((item) => {
                              return (
                                    <div key={item.id} className="w-[200px] min-h-[200px] p-4 main-bg-color rounded-lg shadow-md flex flex-col justify-between items-center gap-1">
                                          <div className="flex flex-col gap-1">
                                                <BlurredImage src={item.image} alt={item.name} className="w-full h-auto" />
                                                <h2>{item.name}</h2>
                                          </div>
                                          <div className="flex justify-between items-center gap-1">
                                                <Button className="" onClick={() => {
                                                      setSelected(item.id)
                                                      deleteFn()
                                                      setReload(!reload)
                                                }}>O'chirish</Button>
                                                <Button>Yangilash</Button>
                                          </div>
                                    </div>
                              )
                        })}
                  </div>
            </div>
      )
}