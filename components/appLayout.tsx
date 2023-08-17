"use client"
import { auth } from '@/firebase/firebase';
import { BarChartOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Layout, Menu, MenuProps } from 'antd';
import { signOut } from 'firebase/auth';
import { usePathname, useRouter} from 'next/navigation'
import { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

interface layoutProps {
    children: React.ReactNode
}
const AppLayout: React.FC<layoutProps> = ({children}) => {

  const router = useRouter()
  const pathname = usePathname()
  const [loading,setLoading] = useState(false)
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
      label: 'Activities',
      key: '/activities',
      icon: <BarChartOutlined />,
      onClick: () => router.push('/activities'),
  },
]
  return (
    <Layout style={{ height: '100vh' }}>
    <Sider style={{background:'white',padding:'1rem'}} >
      <h1>Hive</h1>
      <h1>IT Admin</h1>
      <br/> 
      <Menu theme="light" defaultSelectedKeys={[pathname]} mode="inline" items={navigationItems} />
      <Button block loading={loading} onClick={async()=>{
        setLoading(true)
        await signOut(auth)
        setLoading(false)
        }} >Logout</Button>
    </Sider>
    <Layout>
      
      <Content style={{ margin: '0 16px' ,height:"100vh",overflowY:'scroll'}}>
        <br/>
        <Card>{children}</Card>
      </Content>
    </Layout>
  </Layout>
   

  );
};

export default AppLayout;