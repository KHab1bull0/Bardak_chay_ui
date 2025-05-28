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
      const [branches, setBranches] = useState([]);
      const [addModal, setAddModal] = useState(false);
      const [editModal, setEditModal] = useState(false);
      const [selected, setSelected] = useState(null);
      const [selectedBranchId, setSelectedBranchId] = useState(null);


      useEffect(() => {
            axios.get(`category/all`)
                  .then((res) => {
                        setAddModal(false);
                        setData(res.data.data);
                  })
                  .catch((err) => {
                        console.log(err)
                  })
            axios.get(`branch/all`)
                  .then(res => {
                        setBranches(res.data.data);
                        localStorage.setItem('branch_id', res.data?.data?.[0]?.id)
                        setSelectedBranchId(res.data.data?.[0]?.id)
                  })
                  .catch(err => {
                        console.log(err)
                  })
      }, [refresh])




      return (
            <div className={`${theme ? "bg-transparent text-white" : "bg-white text-black"} h-[89vh] overflow-y-scroll scrollbar-hide px-4 rounded-xl`}>
                  <div className="flex justify-start items-center gap-4 pt-[10px]">
                        <h1 className="text-2xl font-bold">Kategoriya</h1>
                  </div>
                  <div className="sticky top-0 z-[1000] w-full bg-white h-20 flex justify-center items-center">
                        <div className={`flex justify-between items-center w-full gap-4 bg-beji p-2 rounded-xl `}>
                              <div className="flex gap-3">
                                    {branches?.length > 0 && branches.map((branch) => {
                                          return (
                                                <button
                                                      key={branch.id}
                                                      onClick={() => handleScroll(branch.id)}
                                                      className={`px-4 py-2 font-semibold bg-white rounded-xl ${selectedBranchId ? 'bg-orange' : ''}`}
                                                >
                                                      {branch?.name}
                                                </button>
                                          )
                                    })}
                              </div>
                              <button className="font-semibold bg-lightgreen p-2 bg-white rounded-xl" onClick={() => setAddModal(true)} >Qo'shish</button>
                        </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4 min-h-[85%] px-1 pb-20">
                        {data?.length > 0 && data.map((item) => {
                              // const baseUrl = 'http://localhost:8080/'
                              const baseUrl = `http://159.223.83.203:8080/`

                              const branch_id = localStorage.getItem('branch_id') || selectedBranchId;
                              if (item?.branch?.id === branch_id)
                                    return (
                                          <div
                                                className={`${theme ? "bg-white" : "bg-beji"} w-[300px] min-h-[200px] max-h-[400px] p-4 rounded-xl flex flex-col justify-between items-start shadow-md gap-1`}
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
            </div >
      )
}