import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../components/Context"
import { Button, Form } from "antd"
import axios from "../api/index"
import { BlurredImage } from "../components/Custom/BluredImage"
import { Add } from "../components/Mahsulot/Add"
import { Edit } from "../components/Mahsulot/Edit"
import { formatCurrency } from "../utils"
import { API_URI } from "../../env"




export const Mahsulot = () => {
      const { theme } = useContext(Context)
      const [form] = Form.useForm()
      const [categories, setCategories] = useState([])
      const [products, setProducts] = useState([])
      const [refresh, setRefresh] = useState(false)

      // Selected Element
      const [selected, setSelected] = useState(null)
      // Modal states
      const [addModal, setAddModal] = useState(false)
      const [editModal, setEditModal] = useState(false)

      const sectionRefs = useRef({});
      // Bosilganda kerakli joyga scroll
      const handleScroll = (catId) => {
            sectionRefs.current[catId]?.scrollIntoView({ behavior: "smooth" });
      };

      useEffect(() => {
            axios.get(`category/all`)
                  .then((res) => {
                        setCategories(res.data.data);
                  })
                  .catch((err) => {
                        console.log(err)
                  })

            axios.get(`product/all`)
                  .then((res) => {
                        setProducts(res.data.data);
                  })
                  .catch((err) => {
                        console.log(err)
                  })
      }, [refresh])


      const deleteFn = () => {
            if ((selected)) {
                  axios.delete(`product/delete/${selected}`)
                        .then((res) => {
                              setRefresh(!refresh)
                        })
                        .catch((err) => {
                              console.log(err)
                        })
            }
      }


      return (
            <div className={`${theme ? "bg-dark text-black" : "bg-white text-black"} h-[89vh] overflow-y-scroll scrollbar-hide px-4 rounded-xl`}>
                  <div className="flex justify-start items-center gap-4 mt-[10px]">
                        <h1 className="text-2xl font-bold">Mahsulot</h1>
                  </div>
                  <div className={`${theme ? "bg-dark" : "bg-white"} sticky top-0 z-[1000] w-full h-20 flex justify-center items-center`}>
                        <div className={`flex justify-between items-center w-full gap-4 bg-beji p-2 rounded-xl `}>
                              <div className="flex gap-3">
                                    {categories?.length > 0 && categories.map((cat) => {
                                          return (
                                                <button
                                                      key={cat.id}
                                                      onClick={() => handleScroll(cat.id)}
                                                      className="px-4 py-2 font-semibold bg-white rounded-xl"
                                                >
                                                      {cat?.name}
                                                </button>
                                          )
                                    })}
                              </div>
                              <button onClick={() => setAddModal(true)} className={`${theme ? "bg-brown text-white" : "bg-lightgreen"} font-semibold p-2 rounded-xl`} >Qo'shish</button>
                        </div>
                  </div>
                  <div className="flex flex-col gap-4 px-1 pb-20">
                        {categories?.length > 0 && categories.map((cat) => {
                              return (
                                    <div
                                          key={cat.id}
                                          ref={(el) => (sectionRefs.current[cat.id] = el)}
                                    >
                                          {cat?.products?.length > 0 &&
                                                <p className="text-2xl font-semibold p-1 pb-2">{cat.name}</p>
                                          }
                                          <div className="flex flex-wrap gap-4">
                                                {products.length > 0 && products.filter((p) => p?.category?.id === cat?.id).map((p) => {
                                                      const image_url = `${API_URI}${p.image}`

                                                      return (
                                                            <div
                                                                  className={`${theme ? "bg-beji" : "bg-beji"} w-[300px] min-h-[200px] max-h-[500px] p-4 rounded-xl shadow-md flex flex-col justify-between items-start gap-1`}
                                                                  onClick={() => {
                                                                        setSelected(p.id);
                                                                        form.setFieldsValue({
                                                                              name: p.name,
                                                                              description: p.description,
                                                                              price: p.price,
                                                                              type: p.type,
                                                                              weight: p.weight,
                                                                              size: p.size,
                                                                              category_id: p?.category?.id
                                                                        });
                                                                        setEditModal(true);
                                                                  }}
                                                            >
                                                                  <div className="flex justify-center items-center w-full">
                                                                        <BlurredImage src={image_url} alt={p.name} className="w-[250px] h-[250px] object-cover rounded-lg" />
                                                                  </div>
                                                                  <div className={`${theme ? "text-black" : "text-black"} w-full`}>
                                                                        <h2 className="text-lg font-semibold text-center">{p.name}</h2>
                                                                        <div className="flex flex-col gap-2">
                                                                              <div className="flex gap-1 justify-between items-center">
                                                                                    <p className={`${theme ? "bg-brown text-white" : "bg-lightgreen"}  text-end font-semibold p-1 px-3 rounded-xl`} >{p.size}</p>
                                                                                    <p className="text-end font-semibold" >{formatCurrency(Number(p?.price)?.toFixed(0))}<span className="px-1">UZS</span></p>
                                                                              </div>
                                                                              <p className="h-[100px] overflow-auto custom-scrollbar" >{p.description}</p>
                                                                              <p className={`${theme ? "bg-brown text-white" : "bg-lightgreen"} font-semibold p-1 rounded-xl`}>Hajmi: <span className={`${theme ? "text-white" : "text-black"}`}>{p.weight}</span></p>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      )
                                                })}
                                          </div>
                                    </div>
                              )
                        })}
                  </div>


                  <Add
                        addModal={addModal}
                        setAddModal={setAddModal}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        categories={categories}
                  />

                  <Edit
                        form={form}
                        selected={selected}
                        setSelected={setSelected}
                        editModal={editModal}
                        setEditModal={setEditModal}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        categories={categories}
                  />



            </div>
      )
}