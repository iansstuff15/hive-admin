"use client"
import { BarChartOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Layout, Menu, MenuProps } from 'antd';
import { usePathname, useRouter} from 'next/navigation'

const { Header, Content, Footer, Sider } = Layout;

interface layoutProps {
    children: React.ReactNode
}
const AppLayout: React.FC<layoutProps> = ({children}) => {
  const router = useRouter()
  const pathname = usePathname()
  const navigationItems: MenuProps['items'] = [
    {
        label: 'Home',
        key: '/dashboard',
        icon: <HomeOutlined />,
        onClick: () => router.push('/dashboard'),
    },
    {
        label: 'Users',
        key: '/user',
        icon: <UserOutlined />,
        onClick: () => router.push('/user'),
    },
    {
      label: 'Analytics',
      key: '/analytics',
      icon: <BarChartOutlined />,
      onClick: () => router.push('/analytics'),
  },
]
  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider style={{background:'white',padding:'1rem'}} >
      <h1>Hive</h1>
      <h1>IT Admin</h1>
      <br/> 
      <Menu theme="light" defaultSelectedKeys={[pathname]} mode="inline" items={navigationItems} />
    </Sider>
    <Layout>
      
      <Content style={{ margin: '0 16px' }}>
        <br/>
        <Card>{children}</Card>
      </Content>
    </Layout>
  </Layout>
   

  );
};

export default AppLayout;