import { useContext, useState } from "react";
import { Context } from "../Context";
import CustomModal from "../Custom/Modal";
import { Button, Form, Input, Upload } from "antd";
import axios from '../../api/index'
import { UploadOutlined } from "@ant-design/icons";
import { PatternFormat } from "react-number-format";


export const Edit = ({ form, selected, setSelected, editModal, setEditModal, refresh, setRefresh }) => {
      const { theme } = useContext(Context);
      const [logo, setLogo] = useState(null)
      const [image, setImage] = useState(null)
      const [phoneNumber, setPhoneNumber] = useState(null);

      const editBranchFn = (values) => {
            console.log(values);
            console.log(phoneNumber);

            const formData = new FormData()
            formData.append("name", values?.name);
            formData.append("phone_number", phoneNumber);
            formData.append("location", values?.location);
            formData.append("telegram", values?.telegram);
            formData.append("open_time", values?.open_time);
            formData.append("close_time", values?.close_time);
            formData.append("logo", logo);
            formData.append("cover", image);

            axios.patch(`branch/update/${selected}`, formData)
                  .then(res => {
                        setRefresh(!refresh)
                        form.resetFields()
                        setLogo(null);
                        setImage(null);
                        setEditModal(false)
                  })
                  .catch(err => {
                        console.log(err)
                  })
      }

      const validateCoordinates = (_, value) => {
            const regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?((1[0-7]\d)|([1-9]?\d))(\.\d+)?|180(\.0+)?$/;
            if (regex.test(value)) {
                  return Promise.resolve();
            }
            return Promise.reject(new Error('Koordinatalarni quyidagi formatda kiriting: 41.31124, 69.12412414'));
      };

      const deleteBranchFn = () => {
            if (selected) {
                  axios.delete(`branch/delete/${selected}`)
                        .then(res => {
                              setRefresh(!refresh)
                              form.resetFields()
                              setLogo(null);
                              setImage(null);
                              setEditModal(false)
                        })
                        .catch(err => {
                              console.log(err)
                        })
            }
      }

      return (
            <div>
                  <CustomModal
                        title="Filial"
                        open={editModal}
                        onCancel={() => {
                              setEditModal(false)
                        }}
                        className={`${theme ? "bg-gray-500" : "bg-beji"} rounded-lg shadow-lg w-[30%] py-6 px-4`}
                        footer={
                              <div className="flex justify-between">
                                    <button
                                          className={`${theme ? "bg-gray-700 text-white" : "bg-orange text-white font-semibold"} p-2 rounded-xl hover:scale-105 transition-transform`}
                                          onClick={deleteBranchFn}
                                    >
                                          O'chirish
                                    </button>
                                    <button
                                          className={`${theme ? "bg-gray-700 text-white" : "bg-white text-black font-semibold"} p-2 rounded-xl hover:scale-105 transition-transform`}
                                          onClick={() => form.submit()}
                                    >
                                          Saqlash
                                    </button>
                              </div>
                        }
                  >
                        <Form layout="vertical" form={form} onFinish={editBranchFn}>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-black"}`}>Filial nomi</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="name"
                              >
                                    <Input placeholder="Filial nomini kiriting" />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-black"}`}>Filial telefon raqam</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="phone_number"
                              >
                                    <PatternFormat
                                          placeholder="+998 (__) ___-__-__"
                                          format="+998 (##) ###-##-##"
                                          mask="_"
                                          onValueChange={(values) => {
                                                setPhoneNumber(values.value)
                                          }}
                                          className="w-full px-2 py-1 border rounded bg-white focus-visible:outline-none "
                                    />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-black"}`}>Filial kordinatasi</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="location"
                              >
                                    <Input
                                          placeholder="Filial kordinatalari (41.336409, 69.2099291)"
                                    />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-black"}`}>Telegram username</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="telegram"
                              >
                                    <Input placeholder="Filial telegram username" />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-black"}`}>Filial ochilish vaqti</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="open_time"
                              >
                                    <Input placeholder="Filial ochilish vaqti" />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-black"}`}>Filial yopilish vaqti</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="close_time"
                              >
                                    <Input placeholder="Filial yoplishi vaqti" />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-black"}`}>Filial logo</p>}
                                    name="logo"
                                    style={{ marginBottom: '10px' }}
                                    className="mb-2"
                              >
                                    <Upload
                                          accept=".png,.jpg,.jpeg"
                                          maxCount={1}
                                          onChange={(info) => {
                                                setLogo(info.fileList[0]?.originFileObj);
                                          }}
                                          className={`w-full rounded-md ${theme ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                                    >
                                          <Button icon={<UploadOutlined />}>Logo tanlash</Button>
                                    </Upload>
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-black"}`}>Filial cover uchun rasm</p>}
                                    style={{ marginBottom: '20px' }}
                                    name="cover"
                                    className="mb-2"
                              >
                                    <Upload
                                          accept=".png,.jpg,.jpeg"
                                          maxCount={1}
                                          onChange={(info) => {
                                                setImage(info.fileList[0]?.originFileObj);
                                          }}
                                          className={`w-full rounded-md ${theme ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                                    >
                                          <Button icon={<UploadOutlined />}>Image tanlash</Button>
                                    </Upload>
                              </Form.Item>
                        </Form>
                  </CustomModal>
            </div>
      )
}