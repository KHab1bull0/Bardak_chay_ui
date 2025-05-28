import { Layout } from "antd"
import { Content, } from "antd/es/layout/layout"
import { Outlet, } from "react-router"
import { Context } from "../components/Context";
import { useContext, useState } from "react";


export const Menu = () => {
      const { theme } = useContext(Context);
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
                  key: "order",
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
            <Layout className={`${theme ? "bg-white" : "bg-beji"}`}>
                  <Content className={`pb-20`}>
                        <Outlet />
                  </Content>

                  <div className="fixed bottom-0 flex justify-around items-center gap-2 w-full bg-white h-[10vh] rounded-tl-2xl rounded-tr-2xl">
                        {menu.map((item, index) => (
                              <div
                                    key={item.key}
                                    className={`${active === index ? "lightgreen2 scale-110 transition-transform" : "text-gray-400"}`}
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