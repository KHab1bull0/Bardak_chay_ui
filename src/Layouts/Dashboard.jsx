import { Outlet, useLocation, useNavigate } from "react-router"
import Layout, { Content, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { Menu } from "antd"
import logo from "../assets/logo.svg"
import { useContext, useEffect, useState } from "react"
import { Context } from "../components/Context"
import { BarChartOutlined, BellFilled, MenuOutlined, MoonFilled, OrderedListOutlined, PieChartOutlined, ProductOutlined, SunFilled } from "@ant-design/icons"


export const Dashboard = () => {
      const navigate = useNavigate();
      const [selectedKeys, setSelectedKeys] = useState(['1']);
      const location = useLocation();
      const { theme, setTheme } = useContext(Context);
      const [collapsed, setCollapsed] = useState(false);

      useEffect(() => {
            const path = location.pathname;
            let selectedKey = '1'; // Asosiy qiymat

            if (path === '/buyurtma') {
                  selectedKey = '2';
            } else if (path === '/kategoriya') {
                  selectedKey = '3';
            } else if (path === '/mahsulot') {
                  selectedKey = '4';
            }

            setSelectedKeys([selectedKey]);
      }, [location.pathname]);



      const items = [
            {
                  key: '1',
                  title: false,
                  label: (
                        <div className=" flex items-center gap-4">
                              <BarChartOutlined style={{ fontSize: '20px', color: 'black' }} />
                              {collapsed ? '' :
                                    <p>
                                          Statistika
                                    </p>
                              }
                        </div>
                  ),
                  onClick: () => {
                        navigate('/')
                  },
                  className: `${theme ? "main-bg-color-dark" : "main-bg-color"} custom-menu-item`
            },
            {
                  key: '2',
                  title: false,
                  label: (
                        <div className=" flex items-center gap-4">
                              <OrderedListOutlined style={{ fontSize: '20px', color: 'black' }} />
                              {collapsed ? '' :
                                    <p>
                                          Buyurtma
                                    </p>
                              }
                        </div>
                  ),
                  onClick: () => {
                        navigate('/buyurtma')
                  },
                  className: `${theme ? "main-bg-color-dark" : "main-bg-color"} custom-menu-item`
            },
            {
                  key: '3',
                  title: false,
                  label: (
                        <div className=" flex items-center gap-4">
                              <PieChartOutlined style={{ fontSize: '20px', color: 'black' }} />
                              {collapsed ? '' :
                                    <p>
                                          Kategoriya
                                    </p>
                              }
                        </div>
                  ),
                  onClick: () => {
                        navigate('/kategoriya')
                  },
                  className: `${theme ? "main-bg-color-dark" : "main-bg-color"} custom-menu-item`
            },
            {
                  key: '4',
                  title: false,
                  label: (
                        <div className=" flex items-center gap-4">
                              <ProductOutlined style={{ fontSize: '20px', color: 'black' }} />
                              {collapsed ? '' :
                                    <p>
                                          Mahsulot
                                    </p>
                              }
                        </div>
                  ),
                  onClick: () => {
                        navigate('/mahsulot')
                  },
                  className: `${theme ? "main-bg-color-dark" : "main-bg-color"} custom-menu-item`
            }
      ]


      return (
            <Layout className={`${theme ? "main-bg-color-dark" : "main-bg-color"} p-2 pr-0 h-full`}>
                  <Sider
                        collapsed={collapsed}
                        width={160}
                        style={{
                              position: 'relative',
                              height: '98vh',
                              zIndex: 1000,
                              transition: 'all 0.3s ease-in-out',
                        }}
                        className="bg-white rounded-xl p-1"
                  >
                        <div className="flex justify-center items-center mb-10">
                              <img src={logo} alt="" className="w-[100px] h-[100px] rounded-full object-cover " />
                        </div>
                        <Menu
                              selectedKeys={selectedKeys}
                              className={`custom-menu ${theme ? "dark-theme" : "dark-theme"}`}
                              mode="inline"
                              items={items}
                        />

                  </Sider>
                  <Layout className={`${theme ? "main-bg-color-dark" : "main-bg-color"} px-3`}>
                        <Header className="bg-white rounded-xl">
                              <div className="flex items-center justify-between h-full">
                                    <div
                                          className={`${theme ? "main-bg-color-dark" : "main-bg-color"} w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-colors ${theme ? "bg-gray-700" : "bg-white"}`}
                                          onClick={() => setCollapsed(!collapsed)}
                                    >
                                          <MenuOutlined className={`${theme ? 'text-white' : 'text-black'} text-xl font-bold cursor-pointer`} />
                                    </div>
                                    <div className='flex justify-between items-center gap-3 mr-2'>
                                          <div
                                                className={`${theme ? "main-bg-color-dark" : "main-bg-color"} w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-colors ${theme ? "bg-gray-700" : "bg-white"}`}
                                                onClick={() => {
                                                      setTheme(!theme)
                                                }}
                                          >
                                                {
                                                      theme ? <MoonFilled className='text-2xl text-white translate-x-0' /> : <SunFilled className='text-2xl text-black translate-x-0' />
                                                }
                                          </div>
                                    </div>
                              </div>
                        </Header>
                        <Content className="mt-2">
                              <Outlet />
                        </Content>
                  </Layout>
            </Layout >
      )
}