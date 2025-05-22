import { Outlet, useLocation, useNavigate } from "react-router"
import Layout, { Content, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { Menu } from "antd"
import logo from "../assets/logo.svg"
import { useContext, useEffect, useState } from "react"
import { Context } from "../components/Context"
import { BarChartOutlined, BellFilled, BranchesOutlined, MenuOutlined, MoonFilled, OrderedListOutlined, PieChartOutlined, ProductOutlined, SunFilled } from "@ant-design/icons"
import { Logout, TrendingUpOutlined } from "@mui/icons-material"


export const Dashboard = () => {
      const navigate = useNavigate();
      const [selectedKey, setSelectedKey] = useState(['1']);
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

            setSelectedKey(selectedKey);
      }, [location.pathname]);



      const items = [
            {
                  key: '1',
                  title: false,
                  label: (
                        <div className={`flex items-center p-2 pl-5 gap-4`}>
                              <TrendingUpOutlined style={{ fontSize: '25px', color: 'black' }} />
                              {collapsed ? '' :
                                    <p className="text-lg font-medium">
                                          Statistika
                                    </p>
                              }
                        </div>
                  ),
                  onClick: () => {
                        navigate('/')
                  },
                  className: `${theme ? "main-bg-color-dark" : "bg-beji"} custom-menu-item`
            },
            {
                  key: '2',
                  title: false,
                  label: (
                        <div className={`flex items-center p-2 pl-5 gap-4`}>
                              <OrderedListOutlined style={{ fontSize: '25px', color: 'black' }} />
                              {collapsed ? '' :
                                    <p className="text-lg font-medium">
                                          Buyurtma
                                    </p>
                              }
                        </div>
                  ),
                  onClick: () => {
                        navigate('/buyurtma')
                  },
                  className: `${theme ? "main-bg-color-dark" : "bg-beji"} custom-menu-item`
            },
            {
                  key: '3',
                  title: false,
                  label: (
                        <div className={`flex items-center p-2 pl-5 gap-4`}>
                              <PieChartOutlined style={{ fontSize: '25px', color: 'black' }} />
                              {collapsed ? '' :
                                    <p className="text-lg font-medium">
                                          Kategoriya
                                    </p>
                              }
                        </div>
                  ),
                  onClick: () => {
                        navigate('/kategoriya')
                  },
                  className: `${theme ? "main-bg-color-dark" : "bg-beji"} custom-menu-item`
            },
            {
                  key: '4',
                  title: false,
                  label: (
                        <div className={`flex items-center p-2 pl-5 gap-4 `}>
                              <ProductOutlined style={{ fontSize: '25px', color: 'black', padding: '0px', margin: '0px' }} />
                              {collapsed ? '' :
                                    <p className="text-lg font-medium ">
                                          Mahsulot
                                    </p>
                              }
                        </div>
                  ),
                  onClick: () => {
                        navigate('/mahsulot')
                  },
                  className: `${theme ? "main-bg-color-dark" : "bg-beji"} custom-menu-item`
            },
            {
                  key: '5',
                  title: false,
                  label: (
                        <div className={`flex items-center p-2 pl-5 gap-4 `}>
                              <BranchesOutlined style={{ fontSize: '25px', color: 'black', padding: '0px', margin: '0px' }} />
                              {collapsed ? '' :
                                    <p className="text-lg font-medium ">
                                          Filial
                                    </p>
                              }
                        </div>
                  ),
                  onClick: () => {
                        navigate('/mahsulot')
                  },
                  className: `${theme ? "main-bg-color-dark" : "bg-beji"} custom-menu-item`
            }
      ]


      return (
            <Layout className={`${theme ? "main-bg-color-dark" : "bg-beji"} h-full`}>
                  <Sider
                        collapsed={collapsed}
                        width={250}
                        style={{
                              position: 'relative',
                              height: '100vh',
                              // zIndex: 1000,
                              transition: 'all 0.3s ease-in-out',
                        }}
                        className="bg-white px-2"
                  >
                        <div className="h-full flex flex-col justify-between py-5">
                              <div>
                                    <div className="flex justify-center items-center mb-10">
                                          <img src={logo} alt="" className="w-[100px] h-[100px] rounded-full object-cover " />
                                    </div>
                                    {/* <Menu
                              selectedKeys={selectedKeys}
                              className={`custom-menu ${theme ? "dark-theme" : "dark-theme"} flex flex-col gap-3`}
                              items={items}
                        /> */}

                                    <div className="flex flex-col gap-3 item-center justify-center">
                                          {items.map(item => {
                                                return (
                                                      <div key={item.key} className={`${selectedKey === item.key ? "bg-[#C3E66E] " : "hover:bg-[#F9F4F1]"}  cursor-pointer rounded-lg transition-transform`} onClick={item.onClick}>
                                                            {item.label}
                                                      </div>
                                                )
                                          })}
                                    </div>
                              </div>
                              <div
                                    className="bg-beji p-2 px-4 rounded-xl flex gap-2 justify-start items-center hover:scale-105 transition-transform"
                                    onClick={() => {
                                          localStorage.removeItem('token')
                                          navigate('signin')
                                    }}
                              >
                                    <Logout />
                                    <p className="text-lg font-medium">Chiqish</p>
                              </div>
                        </div>
                  </Sider>
                  <Layout className={`${theme ? "main-bg-color-dark" : "bg-beji"} px-3`}>
                        <Header className="bg-white rounded-xl h-[8vh] my-2">
                              <div className="flex items-center justify-between h-full">
                                    <div
                                          className={`${theme ? "bg-white" : "bg-beji"} w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-colors`}
                                          onClick={() => setCollapsed(!collapsed)}
                                    >
                                          <MenuOutlined className={`${theme ? 'text-black' : 'text-black'} text-xl font-bold cursor-pointer`} />
                                    </div>
                                    <div className='flex justify-between items-center gap-3'>
                                          <div
                                                className={`${theme ? "bg-white" : "bg-beji"} w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-colors`}
                                                onClick={() => {
                                                      setTheme(!theme)
                                                }}
                                          >
                                                {
                                                      theme ? <MoonFilled className='text-2xl text-black translate-x-0' /> : <SunFilled className='text-2xl text-black translate-x-0' />
                                                }
                                          </div>
                                    </div>
                              </div>
                        </Header>
                        <Content>
                              <Outlet />
                        </Content>
                  </Layout>
            </Layout >
      )
}