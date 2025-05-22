import { useContext, useEffect, useState } from "react"
import { Context } from "../components/Context"
import { Button, Form } from "antd"
import { BlurredImage } from "../components/Custom/BluredImage"
import { Add } from "../components/Category/Add"
import axios from '../api/index'
import { Edit } from "../components/Category/Edit"


export const Kategoriya = () => {
      const { theme } = useContext(Context);
      const [form] = Form.useForm();
      const [refresh, setRefresh] = useState(false);

      const [data, setData] = useState([]);

      const [addModal, setAddModal] = useState(false);
      const [editModal, setEditModal] = useState(false);
      const [selected, setSelected] = useState(null);


      useEffect(() => {
            axios.get(`category/all`)
                  .then((res) => {
                        setAddModal(false);
                        setData(res.data.data);
                  })
                  .catch((err) => {
                        console.log(err)
                  })
      }, [refresh])


      return (
            <div className={`${theme ? "bg-transparent text-white" : "bg-white text-black"} h-[89vh] overflow-y-scroll scrollbar-hide p-4 rounded-xl`}>
                  <div>
                        <div className="flex justify-start items-center gap-4 pt-[10px]">
                              <h1 className="text-2xl font-bold">Kategoriya</h1>
                        </div>
                        <div className="flex justify-end items-center gap-4 mt-10 bg-beji p-2 rounded-xl">
                              <button className="font-semibold bg-lightgreen p-2 bg-white rounded-xl" onClick={() => setAddModal(true)} >Qo'shish</button>
                        </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4 h-[85%] overflow-auto custom-scrollbar">
                        {data?.length > 0 && data.map((item) => {
                              // const baseUrl = 'http://localhost:8080/'
                              const baseUrl = 'https://b7a1-89-236-218-41.ngrok-free.app'
                              https://b7a1-89-236-218-41.ngrok-free.app
                              return (
                                    <div
                                          className={`${theme ? "bg-white" : "bg-beji"} w-[300px] min-h-[200px] max-h-[400px] p-4 rounded-xl flex flex-col justify-between items-start gap-1`}
                                          onClick={() => {
                                                setSelected(item.id);
                                                form.setFieldsValue({
                                                      name: item.name,
                                                      description: item.description,
                                                });
                                                setEditModal(true);
                                          }}
                                    >
                                          <div className="flex justify-center items-center w-full">
                                                <BlurredImage src={baseUrl + item.image} alt={item.name} className="w-full h-[220px] rounded-lg" />
                                          </div>
                                          <div className={`${theme ? "text-black" : "text-black"}`}>
                                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                                <p className="h-[100px] overflow-auto custom-scrollbar" >{item.description}</p>
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
                  />

                  <Edit
                        form={form}
                        selected={selected}
                        setSelected={setSelected}
                        editModal={editModal}
                        setEditModal={setEditModal}
                        refresh={refresh}
                        setRefresh={setRefresh}
                  />
            </div>
      )
}