import { useContext, useState } from "react";
import { Context } from "../Context";
import CustomModal from "../Custom/Modal";
import { Button, Form, Input, Upload } from "antd";
import axios from '../../api/index'
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";


export const Add = ({ addModal, setAddModal, refresh, setRefresh }) => {
      const [form] = Form.useForm();
      const { theme } = useContext(Context);
      const [logo, setLogo] = useState(null)
      const [image, setImage] = useState(null)


      const addCategoryFn = (values) => {

            const formData = new FormData()
            formData.append("branch_id", 1);
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
                        title="Kategoriya"
                        open={addModal}
                        onCancel={() => {
                              setAddModal(false)
                        }}
                        className={`${theme ? "bg-gray-500" : "bg-beji"} rounded-lg shadow-lg w-[30%] py-6 px-4`}
                        footer={
                              <div className="flex justify-end gap-2">
                                    <button
                                          className={`${theme ? "bg-gray-700 text-white" : "bg-white text-black font-semibold"} p-2 rounded-xl hover:scale-105`}
                                          onClick={() => form.submit()}
                                    >
                                          Saqlash
                                    </button>
                              </div>
                        }
                  >
                        <Form layout="vertical" form={form} onFinish={addCategoryFn}>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-black"}`}>Kategoriya nomi</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="name"
                                    rules={[{ required: true, message: "Nomi yozilmagan!" }]}
                              >
                                    <Input placeholder="Kategoriya nomini kiriting" />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-black"}`}>Kategoriya uchun izoh</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="description"
                                    rules={[{ required: true, message: "Izoh yozilmagan!" }]}
                              >
                                    <TextArea placeholder="Kategoriya uchun izoh kiriting" autoSize={{ minRows: 2 }} />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-black"}`}>Kategoriya uchun logo</p>}
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
                                          <Button icon={<UploadOutlined />}>Logo tanlash</Button>
                                    </Upload>
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-black"}`}>Kategoriya uchun image</p>}
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