import { Layout } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import { Outlet, useParams } from "react-router"
import { Context } from "../components/Context";
import { useContext, useState } from "react";
import { HomeOutlined, OrderedListOutlined, UserOutlined } from "@ant-design/icons";


// Icon komponentlari (Lucide-react o'rniga)
const HomeIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
);

const CartIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
      </svg>
);

const OrdersIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <path d="M14 2v6h6"></path>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <line x1="10" y1="9" x2="8" y2="9"></line>
      </svg>
);

const UserIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
      </svg>
);


export const Menu = () => {
      const { theme, setTheme } = useContext(Context);
      const chatId = useParams()
      console.log(chatId)
      const [cartCount, setCartCount] = useState(1);
      const [activeCategory, setActiveCategory] = useState(2);


      const menu = [
            {
                  name: "Menu",
                  key: "menu",
                  icon: <HomeOutlined />
            },
            {
                  name: "Buyurtma",
                  key: "profile",
                  icon: <OrderedListOutlined />
            },
            {
                  name: "Profil",
                  key: "profile",
                  icon: <UserOutlined />
            },
      ]



      return (
            <Layout className={`${theme ? "main-bg-color-dark" : "main-bg-color"}`}>
                  {/* <Header className={`bg-white fixed top-0 h-[9vh] z-1000 w-[100vw] m-0 p-0`}>
                        <div className="flex justify-between items-center">
                              Header
                        </div>
                  </Header> */}
                  <Content className={`min-h-[100vh] pb-20 overflow-y-scroll scrollbar-hide`}>
                        <Outlet chatId={chatId} />
                  </Content>
                  <div className="fixed bottom-0 w-full mt-auto bg-white border-t flex justify-between items-center p-2">
                        <div className="flex flex-col items-center text-gray-400">
                              <HomeIcon />
                              <span className="text-xs mt-1">Главная</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-400 relative">
                              <div className="relative">
                                    <CartIcon />
                                    {cartCount > 0 && (
                                          <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center text-xs text-black">
                                                {cartCount}
                                          </div>
                                    )}
                              </div>
                              <span className="text-xs mt-1">Корзина</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-400">
                              <OrdersIcon />
                              <span className="text-xs mt-1">Заказы</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-400">
                              <UserIcon />
                              <span className="text-xs mt-1">Профиль</span>
                        </div>
                  </div>
            </Layout>
      )
}