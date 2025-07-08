import { Context } from "../../components/Context";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import axios from "../../api";

import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";

export const Login = () => {
  const { theme } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginFn = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/auth/signin", {
        login: values.username,
        password: values.password,
      });
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Tizimda xatolik";
      toast.error(msg, { icon: "❗️" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full h-screen flex flex-col justify-center items-center 
      ${
        theme
          ? "bg-gradient-to-br from-blue-300 via-white to-purple-500"
          : "bg-gradient-to-br from-slate-700 via-gray-500 to-purple-400"
      }`}
    >
      <Toaster position="top-center" />

      <Form
        layout="vertical"
        onFinish={loginFn}
        className="w-[90%] md:w-[400px] flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg"
      >
        {/* Login */}
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

        {/* Parol */}
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

        {/* Kirish tugmasi */}
        <div className="w-full flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-[90%] h-12 text-2xl rounded-lg shadow-md transition-transform duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105"
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <LoadingOutlined style={{ fontSize: 24, color: "white" }} />
              </div>
            ) : (
              <span className="text-white font-semibold tracking-wide">Kirish</span>
            )}
          </button>
        </div>
      </Form>
    </div>
  );
};
