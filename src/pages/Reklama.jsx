import { useState } from "react";
import { Form, Input, Upload, Button, message, Card, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "../api";

const { Title } = Typography;

export const Reklama = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFinish = async ({ text }) => {
    if (!file) {
      return message.error("Iltimos, fayl yuklang.");
    }

    const formData = new FormData();
    formData.append("text", text);
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.post("/Admin/send-ads", formData);
      message.success("Reklama yuborildi!");
      form.resetFields();
      setFile(null);
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Xatolik yuz berdi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="max-w-2xl mx-auto rounded-2xl shadow-lg"
      bodyStyle={{ padding: "3rem" }}
    >
      <Title level={2} className="!mb-8 text-center">
        Reklama yuborish
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="space-y-6"
      >
        <Form.Item
          label="Reklama matni"
          name="text"
          rules={[{ required: true, message: "Matnni kiriting" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Reklama matni..."
            showCount
            maxLength={500}
          />
        </Form.Item>

        <Form.Item label="Rasm yoki video">
          <Upload
            beforeUpload={(f) => {
              setFile(f);
              return false;
            }}
            accept="image/*,video/*"
            maxCount={1}
            fileList={file ? [file] : []}
            onRemove={() => setFile(null)}
          >
            <Button icon={<UploadOutlined />}>Fayl tanlash</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            className="bg-green-600"
          >
            Yuborish
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
