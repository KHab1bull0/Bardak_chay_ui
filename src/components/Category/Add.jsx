import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import CustomModal from "../Custom/Modal";
import { Button, Form, Input, Select, Upload } from "antd";
import axios from '../../api/index'
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";


export const Add = ({ addModal, setAddModal, refresh, setRefresh }) => {
      const [form] = Form.useForm();
      const { theme } = useContext(Context);
      const [logo, setLogo] = useState(null)
      const [image, setImage] = useState(null)
      const [branches, setBranches] = useState([]);

      useEffect(() => {
            axios.get(`branch/all`)
                  .then(res => {
                        setBranches(res.data.data);
                  })
                  .catch(err => {
                        console.log(err);
                  })
      }, [])

      const addCategoryFn = (values) => {

            const formData = new FormData()
            formData.append("branch_id", values?.branch_id);
            formData.append("name", values?.name);
            formData.append("description", values?.description);
            formData.append("logo", logo);
            formData.append("image", image);

            axios.post(`category/create`, formData)
                  .then(res => {
                        setRefresh(!refresh)
                        form.resetFields()
                        setLogo(null);
                        setImage(null);
                        setAddModal(false)
                  })
                  .catch(err => {
                        console.log(err)
                  })
      }


      return (
            <div>
                  <CustomModal
                        // title={<p className="text-black font-semibold">Kategoriya</p>}
                        open={addModal}
                        onCancel={() => {
                              setAddModal(false)
                        }}
                        className={`${theme ? "bg-dark" : "bg-beji"} rounded-lg shadow-lg w-[30%] py-6 px-4`}
                        footer={
                              <div className="flex justify-end gap-2">
                                    <button
                                          className={`${theme ? "bg-brown text-white" : "bg-white text-black "} 
                                          p-2 rounded-xl font-semibold hover:scale-105 transition-transform`}
                                          onClick={() => form.submit()}
                                    >
                                          Saqlash
                                    </button>
                              </div>
                        }
                  >
                        <Form layout="vertical" form={form} onFinish={addCategoryFn}>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-black"} font-medium text-xl mt-3`}>Kategoriya nomi</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="name"
                                    rules={[{ required: true, message: "Nomi yozilmagan!" }]}
                              >
                                    <Input className="text-lg" placeholder="Kategoriya nomini kiriting" />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-black"} font-medium text-xl`}>Kategoriya uchun izoh</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="description"
                                    rules={[{ required: true, message: "Izoh yozilmagan!" }]}
                              >
                                    <TextArea className="text-lg" placeholder="Kategoriya uchun izoh kiriting" autoSize={{ minRows: 2 }} />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-black"} font-medium text-xl`}>Kategoriya uchun logo</p>}
                                    name="logo"
                                    style={{ marginBottom: '10px' }}
                                    className="mb-2"
                                    rules={[{ required: true, message: "Rasm joylanmagan!" }]}
                              >
                                    <Upload
                                          // beforeUpload={() => false} // Faylni avtomatik yuklamaslik uchun
                                          accept=".png,.jpg,.jpeg"
                                          maxCount={1}
                                          onChange={(info) => {
                                                setLogo(info.fileList[0]?.originFileObj);
                                          }}
                                          className={`w-full rounded-md ${theme ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                                    >
                                          <Button icon={<UploadOutlined />} className="font-semibold">Logo tanlash</Button>
                                    </Upload>
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-black"} font-medium text-xl`}>Kategoriya uchun image</p>}
                                    style={{ marginBottom: '20px' }}
                                    name="image"
                                    className="mb-2"
                                    rules={[{ required: true, message: "Rasm joylanmagan!" }]}
                              >
                                    <Upload
                                          beforeUpload={() => false}
                                          accept=".png,.jpg,.jpeg"
                                          maxCount={1}
                                          onChange={(info) => {
                                                setImage(info.fileList[0]?.originFileObj);
                                          }}
                                          className={`${theme ? "bg-gray-800 text-white" : "bg-white text-black"} w-full rounded-md `}
                                    >
                                          <Button icon={<UploadOutlined />} className="font-semibold">Rasm tanlash</Button>
                                    </Upload>
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-gray-700"} font-medium text-xl`}>Filial</p>}
                                    style={{ marginBottom: '20px' }}
                                    name="branch_id"
                                    rules={[{ required: true, message: "Filial tanlanmagan!" }]}

                              >
                                    <Select
                                          placeholder='Filialni tanlang!'
                                    >
                                          {branches.length > 0 && branches.map(branch => (
                                                <Select.Option key={branch.id} value={branch.id}>{branch.name}</Select.Option>
                                          ))}
                                    </Select>
                              </Form.Item>
                        </Form>
                  </CustomModal>
            </div>
      )
}