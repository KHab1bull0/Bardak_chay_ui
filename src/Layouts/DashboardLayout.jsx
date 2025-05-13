import { Outlet } from "react-router"
import Layout, { Header } from "antd/es/layout/layout"

export const DashboardLayout = () => {

      return (
            <Layout className="">
                  <Layout>
                        <Header className="">
                        </Header>
                  </Layout>
                  <Outlet />
            </Layout>
      )
}