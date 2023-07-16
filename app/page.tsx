'use client'
import AppLayout from "@/components/appLayout";
import Dashboard from "@/components/dashboard";
import Login from "@/components/login";
import { state } from "@/state/state";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import { useSnapshot } from "valtio";

export default function Home() {
  const snapshot = useSnapshot(state)
  return (
    <main>
      {
        snapshot.uid !=""?
        <Dashboard/>
        :
        <Login/>
      }
     
      
    </main> 
    
  )
}
