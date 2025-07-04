// src/pages/Users.jsx  (yoki sizdagi joylashuv)
import { useEffect, useState } from 'react';
import { Table, Typography, Tag, message, Card } from 'antd';
import api from '../api';            // <- axios instansiya

const { Title } = Typography;

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  /** Foydalanuvchilarni olish */
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // ✅ 1) Endpoint – Swagger’da ko‘rsatilganidek
      const res = await api.get('/users');

      /* 
        ✅ 2) Backend:
            - Agar massiv:  res.data         => [...]
            - Agar objekt:  res.data.users    => [...]
      */
      const data = Array.isArray(res.data) ? res.data : res.data?.users ?? [];
      setUsers(data);
    } catch (err) {
      console.error(err);
      message.error('Foydalanuvchilarni yuklashda xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  /** Jadval ustunlari */
  const columns = [
    { title: 'Ism', dataIndex: 'f_name', key: 'f_name' },
    {
      title: 'Telegram',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (u) => u || '-',
    },
    { title: 'Telefon', dataIndex: 'phone_number', key: 'phone_number' },
    { title: 'Chat ID', dataIndex: 'chat_id', key: 'chat_id' },
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
      bodyStyle={{ padding: 32 }}
    >
      <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
        Foydalanuvchilar ro‘yxati
      </Title>

      <Table
        /* ✅ 3) Agar `id` yo‘q bo‘lsa, chat_id bilan unikallikni ta’minlaymiz */
        rowKey={(record) => record.id ?? record.chat_id}
        dataSource={users}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default UsersList;
