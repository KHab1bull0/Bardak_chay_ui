import { useEffect, useState } from 'react';
import { Table, Typography, Tag, message, Card } from 'antd';
import api from '../api';                          // ← instansiya

const { Title } = Typography;
export const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Maʼlumotlarni olish
  const fetchUsers = async () => {
    try {
      setLoading(true);

      // Faqat nisbiy endpoint
      const res = await api.get('http://159.223.83.203:8080/api/v1/users/getAll');

      // Backend turiga moslashuvchan parsing
      const data = Array.isArray(res.data) ? res.data : res.data?.users || [];
      setUsers(data);
    } catch (err) {
      console.error(err);
      message.error('Foydalanuvchilarni yuklashda xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const columns = [
    { title: 'Ism', dataIndex: 'f_name', key: 'f_name' },
    {
      title: 'Telegram',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (u) => u || '-',
    },
    { title: 'Telefon raqam', dataIndex: 'phone_number', key: 'phone_number' },
    { title: 'Chat ID', dataIndex: 'chat_id', key: 'chat_id' },
    {
      title: 'Status',
      dataIndex: 'last_state',
      key: 'last_state',
      render: (s) => (
        <Tag color={s === 'active' ? 'green' : 'volcano'}>{s}</Tag>
      ),
    },
    {
      title: 'Oxirgi aktivlik',
      dataIndex: 'last_active',
      key: 'last_active',
      render: (d) => (d ? new Date(d).toLocaleString() : '-'),
    },
  ];

  return (
    <Card
      className="max-w-6xl mx-auto rounded-2xl shadow-lg"
      bodyStyle={{ padding: '2rem' }}
    >
      <Title level={2} className="!mb-6 text-center">
        Foydalanuvchilar ro‘yxati
      </Title>

      <Table
        rowKey="id"
        dataSource={users}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};


