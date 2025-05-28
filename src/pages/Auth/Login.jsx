import { Context } from "../../components/Context";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import axios from "../../api";


import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import toast, { Toaster } from "react-hot-toast";


export const Login = () => {
      const { theme } = useContext(Context);
      const navigate = useNavigate();
      const [loading, setLoading] = useState(false)
      const [clicked, setClicked] = useState(false);


      const loginFn = async (values) => {
            setLoading(true);
            axios.post("/auth/signin", {
                  login: values.username,
                  password: values.password,
            })
                  .then(response => {
                        localStorage.setItem("token", response.data.access_token);
                        navigate("/");
                  })
                  .catch(err => {
                        toast.error(err.response.data.message, {icon: '❗️'})
                        console.log(err.response.data.message)
                  })
            setLoading(false);
      };


      return (
            <div className={`bg-white w-full h-[100vh] flex flex-col justify-center items-center `}>
                  <Toaster />
                  <Form
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={loginFn}
                        className="w-[90%] md:w-[400px] flex flex-col gap-4"
                  >
                        <Form.Item
                              name="username"
                              rules={[{ required: true, message: "Username kiriting!" }]}
                        >
                              <Input
                                    prefix={<UserOutlined className="text-gray-400" />}
                                    placeholder="Username"
                                    className="h-10 text-xl"
                              />
                        </Form.Item>
                        <Form.Item
                              name="password"
                              rules={[{ required: true, message: "Parolni kiriting!" }]}
                        >
                              <Input.Password
                                    prefix={<LockOutlined className="text-gray-400" />}
                                    placeholder="Parol"
                                    className="h-10 text-xl"
                              />
                        </Form.Item>
                        <div className="w-full flex justify-center">
                              <button
                                    className={`w-[90%] h-12 text-2xl text-gray-200 bg-gray-200 rounded-lg shadow-md ${clicked ? "hover:bg-gray-300 hover:scale-105 transition-transform " : ""}`}
                                    onClick={() => {
                                          setClicked(true); // Bosilganda tugma holatini o'zgartir
                                          setTimeout(() => setClicked(false), 150);
                                    }}
                              >
                                    {loading ? (
                                          <div className="flex justify-center items-center">
                                                <LoadingOutlined style={{ fontSize: 24, color: "white" }} /> {/* Loading spinner */}
                                          </div>
                                    ) : (
                                          <span className={`${theme ? "text-gray-900" : "text-gray-500"}`}>{"Kirish"}</span>
                                    )}
                              </button>
                        </div>
                  </Form>
            </div>
      );
};

