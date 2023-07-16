'use client'
import { auth } from "@/firebase/firebase";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons"
import { Card, Form, Input, Checkbox, Button, Col, Row, message } from "antd"
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Login = () =>{
  const [messageApi, contextHolder] = message.useMessage();
  const [loading,setLoading] = useState(false)
    const onFinish = async(values: any) => {
        setLoading(true)
        console.log('Received values of form: ', values);
        if(values.email != 'admin@admin.com'){
          messageApi.open({
            type: 'error',
            content: 'Incorrect admin email',
          });
          setLoading(false)
        }
        else{
         await signInWithEmailAndPassword(auth, values.email ,values.password ).then((value)=>{
            messageApi.open({
              type: 'success',
              content: 'Login successful',
            });
            setLoading(false)
          }).catch((error:FirebaseError)=>{
            messageApi.open({
              type: 'error',
              content: error.code,
            });
            setLoading(false)
          })
        }
      };
    return(    <main>
      {contextHolder}
        <Row>
      <Col span={12} style={{margin:'25vh 2rem ', height:'100vh'}}>
        <Card style={{width:'35vw',}}>
        <h1>Login</h1>
        <br/>
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
       
  
        <Form.Item>
          <Button type="primary" loading={loading} htmlType="submit" className="login-form-button">
            Log in
          </Button>
         
        </Form.Item>
      </Form>
        </Card></Col>
      <Col span={12}></Col>
    </Row>
        
      </main> )
}

export default Login