import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import CustomModal from "../Custom/Modal";
import { Button, Form, Input, Select, Upload } from "antd";
import axios from '../../api/index'
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";


export const Edit = ({ form, selected, setSelected, editModal, setEditModal, refresh, setRefresh }) => {
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

      const editCategoryFn = (values) => {
            console.log(values);
            const formData = new FormData()
            formData.append("branch_id", values?.branch_id);
            formData.append("name", values?.name);
            formData.append("description", values?.description);
            formData.append("logo", logo);
            formData.append("image", image);

            if (selected) {
                  axios.patch(`branch/update/${selected}`, formData)
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

      const deleteCategoryFn = () => {
            if (selected) {
                  axios.delete(`category/delete/${selected}`)
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
                        // title={<p className="text-black font-semibold">Kategoriya</p>}
                        open={editModal}
                        onCancel={() => {
                              setEditModal(false)
                        }}
                        className={`${theme ? "bg-dark" : "bg-beji"} rounded-lg shadow-lg w-[30%] py-6 px-4`}
                        footer={
                              <div className="flex justify-between">
                                    <button
                                          className={`${theme ? "bg-brown text-white" : "bg-orange2 text-white"} p-2 rounded-xl font-semibold hover:scale-105 transition-transform`}
                                          onClick={deleteCategoryFn}
                                    >
                                          O'chirish
                                    </button>
                                    <button
                                          className={`${theme ? "bg-brown text-white" : "bg-white text-black"} p-2 rounded-xl font-semibold hover:scale-105 transition-transform`}
                                          onClick={() => form.submit()}
                                    >
                                          Saqlash
                                    </button>
                              </div>
                        }
                  >
                        <Form layout="vertical" form={form} onFinish={editCategoryFn}>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-black"} font-medium text-xl mt-3`}>Kategoriya nomi</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="name"
                              >
                                    <Input className="text-xl" />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-black"} font-medium text-xl`}>Kategoriya uchun izoh</p>}
                                    style={{ marginBottom: '10px' }}
                                    name="description"
                              >
                                    <TextArea className="text-xl" autoSize={{ minRows: 2 }} />
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-black"} font-medium text-xl`}>Kategoriya uchun logo</p>}
                                    name="logo"
                                    style={{ marginBottom: '10px' }}
                                    className="mb-2"
                              >
                                    <Upload
                                          beforeUpload={() => false} // Faylni avtomatik yuklamaslik uchun
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
                                    label={<p className={`${theme ? "text-black" : "text-black"} font-medium text-xl`}>Kategoriya uchun image</p>}
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
                                          className={`w-full rounded-md ${theme ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                                    >
                                          <Button icon={<UploadOutlined />}>Image tanlash</Button>
                                    </Upload>
                              </Form.Item>
                              <Form.Item
                                    label={<p className={`${theme ? "text-black" : "text-gray-700"} font-medium text-xl`}>{"Filial"}</p>}
                                    style={{ marginBottom: '20px' }}
                                    name="branch_id"
                              >
                                    <Select
                                          placeholder='Kategoryani belgilang'
                                    >
                                          {branches.length > 0 && branches.map(branch => (
                                                <Select.Option label={<span className="text-3xl">{branch.name}</span>} key={branch.id} value={branch.id}>{branch.name}</Select.Option>
                                          ))}
                                    </Select>
                              </Form.Item>
                        </Form>
                  </CustomModal>
            </div>
      )
}