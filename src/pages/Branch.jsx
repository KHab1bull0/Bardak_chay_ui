import { useContext, useEffect, useState } from "react"
import { Context } from "../components/Context"
import axios from "../api/index";
import { DeleteOutlined, EditOutlined, OutletOutlined } from "@mui/icons-material";
import { DashOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { Add } from "../components/Branch/Add";
import { Edit } from "../components/Branch/Edit";
import { formatPhoneNumber } from "../utils";


export const Branch = () => {
      const { theme } = useContext(Context);
      const [form] = Form.useForm();
      const [branches, setBranches] = useState([]);
      const [refresh, setRefresh] = useState(false);
      const [addModal, setAddModal] = useState(false);
      const [editModal, setEditModal] = useState(false);
      const [deleteModal, setDeleteModal] = useState(false);
      const [selected, setSelected] = useState(null);



      useEffect(() => {
            axios.get(`branch/all`)
                  .then(res => {
                        setBranches(res.data.data);
                  })
                  .catch(err => {
                        console.log(err)
                  })
      }, [refresh])



      return (
            <div className={`${theme ? "bg-transparent text-white" : "bg-white text-black"} h-[89vh] overflow-y-scroll scrollbar-hide px-4 rounded-xl`}>
                  <div className="flex justify-start items-center gap-4 pt-[10px]">
                        <h1 className="text-2xl font-bold">Branch</h1>
                  </div>
                  <div className="sticky top-0 z-[1000] w-full bg-white h-20 flex justify-center items-center">
                        <div className={`flex justify-end items-center w-full gap-4 bg-beji p-2 rounded-xl `}>
                              <button className="font-semibold bg-lightgreen p-2 bg-white rounded-xl" onClick={() => setAddModal(true)} >Qo'shish</button>
                        </div>
                  </div>
                  <div className="h-[80%]">
                        <div className="flex gap-1 justify-start items-center border-b-2 border-gray-400 pt-3 pb-1 w-[100%]">
                              <div
                                    className={`p-1 text-base h-full flex justify-center items-center  font-medium border-r-2 text-center border-gray-400 w-[3%]`}
                              >
                                    No
                              </div>
                              <div
                                    className={`py-1 px-3  text-lg font-medium border-r-2  border-gray-400 w-[25%]`}
                              >
                                    Nomi
                              </div>
                              <div
                                    className={`py-1 px-3  text-lg font-medium border-r-2  border-gray-400 w-[20%]`}
                              >
                                    Telefon raqam
                              </div>
                              <div
                                    className={`py-1 px-3  text-lg font-medium border-r-2  border-gray-400 w-[20%]`}
                              >
                                    Lokatsiya
                              </div>
                              <div
                                    className={`py-1 px-3  text-lg font-medium border-r-2  border-gray-400 w-[20%]`}
                              >
                                    Telegram
                              </div>
                              <div
                                    className={`py-1 px-3  text-lg font-medium border-r-2  border-gray-400 w-[20%]`}
                              >
                                    Cover Image
                              </div>
                              <div
                                    className={`py-1 px-3  text-lg font-medium border-r-2  border-gray-400 w-[20%]`}
                              >
                                    Logo
                              </div>
                              <div
                                    className={`p-1 text-lg font-medium text-center w-[10%]`}
                              >
                                    <DashOutlined
                                          style={{
                                                color: theme ? "white" : "black",
                                                fontSize: "30px",
                                                cursor: "pointer",
                                          }}
                                    />
                              </div>
                        </div>
                        {branches?.length > 0 && branches.map((branch, index) => {
                              const cover = `https://bardak.mohirsoft.uz/${branch.cover}`
                              const logo = `https://bardak.mohirsoft.uz/${branch.logo}`
                              // const cover = `http://localhost:8080/${branch.cover}`
                              // const logo = `http://localhost:8080/${branch.logo}`

                              return (
                                    <div key={index} className="flex gap-1 justify-start items-center border-b-2 border-gray-400 pt-3 pb-1 w-[100%] h-24">
                                          <div
                                                className={`p-1 text-base h-full flex justify-center items-center font-medium border-r-2 text-center border-gray-400 w-[3%]`}
                                          >
                                                {index + 1}
                                          </div>
                                          <div
                                                className={`px-3 py-1 text-base h-full flex items-center font-medium border-r-2  border-gray-400 w-[25%]`}
                                          >
                                                {branch.name}
                                          </div>
                                          <div
                                                className={`px-3 py-1 text-base h-full flex items-center  font-medium border-r-2  border-gray-400 w-[20%]`}
                                          >
                                                {formatPhoneNumber(branch.phone_number)}
                                          </div>
                                          <div
                                                className={`px-3 py-1 text-base h-full flex items-center  font-medium border-r-2  border-gray-400 w-[20%]`}
                                          >
                                                {branch.location}
                                          </div>
                                          <div
                                                className={`px-3 py-1 text-base h-full flex items-center  font-medium border-r-2  border-gray-400 w-[20%]`}
                                          >
                                                {branch.telegram}
                                          </div>
                                          <div
                                                className={`py-1 px-3  text-lg  h-full flex justify-center items-center font-medium border-r-2  border-gray-400 w-[20%]`}
                                          >
                                                <div >
                                                      <img className="w-28 h-20 rounded-lg bg-red-300 object-cover" src={cover} alt="Cover image" />
                                                </div>
                                          </div>
                                          <div
                                                className={`py-1 px-3 text-lg h-full flex justify-center items-center font-medium border-r-2  border-gray-400 w-[20%]`}
                                          >
                                                <div >
                                                      <img className="w-20 h-20 rounded-lg bg-red-300 object-cover" src={logo} alt="Logo" />
                                                </div>
                                          </div>
                                          <div
                                                className={`p-1 text-base font-medium text-center w-[10%] h-fulll`}
                                          >
                                                <div className="flex justify-center gap-2 items-center px-2">
                                                      <div
                                                            className="opacity-60 rounded p-1 hover:opacity-100 hover:scale-110 transition-opacity duration-300"
                                                            onClick={() => {
                                                                  setSelected(branch.id);
                                                                  setEditModal(true);
                                                                  form.setFieldsValue({
                                                                        name: branch.name,
                                                                        phone_number: branch.phone_number,
                                                                        location: branch.location,
                                                                        telegram: branch.telegram
                                                                  })
                                                            }}
                                                      >
                                                            <EditOutlined style={{ color: theme ? "white" : "black" }} />
                                                      </div >

                                                </div>
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