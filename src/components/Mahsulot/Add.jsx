import { useContext, useState } from "react";
import { Context } from "../Context";
import CustomModal from "../Custom/Modal";
import { Button, Form, Input, Select, Upload } from "antd";
import axios from '../../api/index'
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";


export const Add = ({ addModal, setAddModal, refresh, setRefresh, categories }) => {
      const { theme } = useContext(Context);
      const [form] = Form.useForm();
      const [image, setImage] = useState(null)


      const addCategoryFn = (values) => {
            console.log(values)
            const formData = new FormData()
            formData.append("name", values?.name);
            formData.append("description", values?.description);
            formData.append("price", values?.price);
            formData.append("weight", values?.weight);
            formData.append("size", values?.size);
            formData.append("type", values?.type);
            formData.append("image", image);
            formData.append("category_id", values.category_id);

            console.log(formData);

            axios.post(`product/create`, formData)
                  .then(res => {
                        setRefresh(!refresh)
                        form.resetFields()
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
                        title="Mahsulot"
                        open={addModal}
                        onCancel={() => {
                              setAddModal(false)
                        }}
                        className={`${theme ? "main-bg-color-dark" : "bg-beji"} rounded-lg shadow-lg w-[30%] py-6 px-4`}
                        footer={
                              <div className="flex justify-end gap-2">
                                    <button
                                          className={`${theme ? "bg-gray-700 text-white" : "bg-white text-black font-semibold"} p-2 rounded-xl hover:scale-105 transition-transform`}
                                          onClick={() => form.submit()}
                                    >
                                          Saqlash
                                    </button>
                              </div>
                        }
                  >
                        <Form layout="vertical" form={form} onFinish={addCategoryFn}>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-gray-700"} font-medium text-base`}>Mahsulot nomi</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="name"
                                    rules={[{ required: true, message: "Nomi yozilmagan!" }]}
                              >
                                    <Input className="text-lg" placeholder="Nomini kiriting" />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-gray-700"} font-medium text-base`}>Mahsulot uchun izoh</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="description"
                                    rules={[{ required: true, message: "Izoh yozilmagan!" }]}
                              >
                                    <TextArea className="text-lg" placeholder="Izoh kiriting" autoSize={{ minRows: 2 }} />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-gray-700"} font-medium text-base`}>{"Mahsulot narxi (UZS) da"}</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="price"
                                    rules={[{ required: true, message: "Narxi belgilanmagan!" }]}
                              >
                                    <Input className="text-lg" type="number" placeholder="Narxini kiriting" />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-gray-700"} font-medium text-base`}>{"Mahsulot vazni (gr, ml)"}</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="weight"
                                    rules={[{ required: false, message: "Vazni belgilanmagan!" }]}
                              >
                                    <Input className="text-xl" placeholder="Vaznini kiriting" />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-gray-700"} font-medium text-base`}>{"Mahsulot o'lchami (Kichik, o'rta, katta)"}</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="size"
                                    rules={[{ required: false, message: "O'lchamini belgilanmagan!" }]}
                              >
                                    <Select
                                          className="text-lg"
                                          placeholder="O'lchamini belgilang"
                                    >
                                          <Select.Option className="text-xl" key="big" value="Katta">Katta</Select.Option>
                                          <Select.Option className="text-xl" key="middle" value="O'rta">O'rta</Select.Option>
                                          <Select.Option className="text-xl" key="small" value="Kichik">Kichik</Select.Option>
                                    </Select>
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-gray-700"} font-medium text-base`}>Mahsulotni rasmi</p>}
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
                              <Form.Item
                                    label={<p className={`${theme ? "text-gray-200" : "text-gray-700"} font-medium text-base`}>{"Mahsulot kategoriyasi"}</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="category_id"
                                    rules={[{ required: true, message: "Kategoriya belgilanmagan!" }]}
                              >
                                    <Select
                                          placeholder='Kategoryani belgilang'
                                    >
                                          {categories.length > 0 && categories.map(cat => (
                                                <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
                                          ))}
                                    </Select>
                              </Form.Item>
                        </Form>
                  </CustomModal>
            </div>
      )
}