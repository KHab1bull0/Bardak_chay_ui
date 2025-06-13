import { useContext, useState } from "react";
import { Context } from "../Context";
import CustomModal from "../Custom/Modal";
import { Button, Form, Input, Select, Upload } from "antd";
import axios from '../../api/index'
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";


export const Edit = ({ form, selected, setSelected, editModal, setEditModal, refresh, setRefresh, categories }) => {
      const { theme } = useContext(Context);
      const [logo, setLogo] = useState(null)
      const [image, setImage] = useState(null)


      const editCategoryFn = (values) => {
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
            console.log(formData)
            if (selected) {
                  axios.patch(`product/update/${selected}`, formData)
                        .then(res => {
                              setRefresh(!refresh);
                              form.resetFields();
                              setLogo(null);
                              setImage(null);
                              setEditModal(false)
                        })
                        .catch(err => {
                              console.log(err)
                        })
            }
      }

      const deleteProductFn = () => {
            if (selected) {
                  axios.delete(`product/delete/${selected}`)
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
                        // title="Mahsulot"
                        open={editModal}
                        onCancel={() => {
                              setEditModal(false)
                        }}
                        className={`${theme ? "bg-dark" : "bg-beji"} rounded-lg shadow-lg w-[30%] py-6 px-4`}
                        footer={
                              <div className="flex justify-between">
                                    <button
                                          className={`${theme ? "bg-brown text-white" : "bg-orange text-white "} p-2 rounded-xl font-semibold hover:scale-105 transition-transform`}
                                          onClick={deleteProductFn}
                                    >
                                          O'chirish
                                    </button>
                                    <button
                                          className={`${theme ? "bg-brown text-white" : "bg-white text-black "} p-2 rounded-xl font-semibold hover:scale-105 transition-transform`}
                                          onClick={() => form.submit()}
                                    >
                                          Saqlash
                                    </button>
                              </div>
                        }
                  >
                        <Form layout="vertical" form={form} onFinish={editCategoryFn}>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-gray-700"} font-medium text-xl`}>Mahsulot nomi</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="name"
                              >
                                    <Input className="text-lg" placeholder="Nomini kiriting" />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-gray-700"} font-medium text-xl`}>Mahsulot uchun izoh</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="description"
                              >
                                    <TextArea className="text-lg" placeholder="Izoh kiriting" autoSize={{ minRows: 2 }} />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-gray-700"} font-medium text-xl`}>{"Mahsulot narxi (UZS) da"}</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="price"
                              >
                                    <Input className="text-lg" type="number" placeholder="Narxini kiriting" />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-gray-700"} font-medium text-xl`}>{"Mahsulot vazni (gr, ml)"}</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="weight"
                              >
                                    <Input className="text-lg" placeholder="Vaznini kiriting" />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-gray-700"} font-medium text-xl`}>{"Mahsulot o'lchami (Kichik, o'rta, katta)"}</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="size"
                              >
                                    <Select
                                          className="text-lg"
                                          placeholder="O'lchamini belgilang"
                                    >
                                          <Select.Option key="big" value="Katta">Katta</Select.Option>
                                          <Select.Option key="middle" value="O'rta">O'rta</Select.Option>
                                          <Select.Option key="small" value="Kichik">Kichik</Select.Option>
                                    </Select>
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-gray-700"} font-medium text-xl`}>Mahsulotni rasmi</p>}
                                    style={{ marginBottom: '20px' }}
                                    name="image"
                                    className="mb-2"
                              >
                                    <Upload
                                          beforeUpload={() => false}
                                          accept=".png,.jpg,.jpeg"
                                          maxCount={1}
                                          onChange={(info) => {
                                                setImage(info.fileList[0]?.originFileObj);
                                          }}
                                          className={`w-full text-xl rounded-md ${theme ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                                    >
                                          <Button icon={<UploadOutlined />}>Image tanlash</Button>
                                    </Upload>
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-gray-700"} font-medium text-xl`}>{"Mahsulot kategoriyasi"}</p>}
                                    style={{ marginBottom: '20px' }}
                                    name="category_id"
                              >
                                    <Select
                                          className="text-lg"
                                          placeholder='Kategoryani belgilang'
                                    >
                                          {categories.length > 0 && categories.map(cat => (
                                                <Select.Option className="text-lg" key={cat.id} value={cat.id}>{cat.name}</Select.Option>
                                          ))}
                                    </Select>
                              </Form.Item>
                        </Form>
                  </CustomModal>
            </div>
      )
}