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
      const [cartCount, setCartCount] = useState(1);
      const [activeCategory, setActiveCategory] = useState(2);
      const [active, setActive] = useState(0);

      const menu = [
            {
                  name: "Menu",
                  key: "menu",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
            },
            {
                  name: "Buyurtma",
                  key: "profile",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <path d="M14 2v6h6"></path>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <line x1="10" y1="9" x2="8" y2="9"></line>
                  </svg>
            },
            {
                  name: "Profil",
                  key: "profile",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                  </svg>
            },
      ]



      return (
            <Layout className={`${theme ? "bg-white" : "bg-gray-100"}`}>
                  {/* <Header className={`bg-white fixed top-0 h-[9vh] z-1000 w-[100vw] m-0 p-0`}>
                        <div className="flex justify-between items-center">
                              Header
                        </div>
                  </Header> */}
                  <Content className={`min-h-[100vh] pb-20 overflow-y-scroll scrollbar-hide`}>
                        <Outlet />
                  </Content>
                  
                  <div className="fixed bottom-0 flex justify-around items-center gap-2 w-full bg-white h-[9vh] rounded-tl-2xl rounded-tr-2xl">
                        {menu.map((item, index) => (
                              <div
                                    key={item.key}
                                    className={`${active === index ? "text-yellow-400 scale-110 transition-transform" : "text-gray-400"}`}
                                    onClick={() => setActive(index)}
                              >
                                    <div className={`flex flex-col justify-center items-center`}>
                                          <div>{item.icon}</div>
                                          <span>{item.name}</span>
                                    </div>
                              </div>
                        ))}
                  </div>
            </Layout >
      )
}