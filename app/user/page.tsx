"use client"
import AppLayout from "@/components/appLayout";
import { Button, Segmented } from "antd";
import { usePathname } from "next/navigation";
import { Space, Table } from 'antd';
import { useEffect, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function Home() {
  const pathName = usePathname()
  interface DataType {
    key: string;
    firstName: string;
    lastName: number;
    phone: string;
    
  }
  
  const customerColumns: ColumnsType<DataType> = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text">Send Password Reset</Button>
          <Button type="text">Delete </Button>
        </Space>
      ),
    },
  ];
  

  const businessColumns: ColumnsType<DataType> = [
    {
      title: 'Business Name',
      dataIndex: 'businessName',
      key: 'businessName',
    
    },{
      title: 'Business Email',
      dataIndex: 'businessEmail',
      key: 'businessEmail',
    
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },{
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text">Send Password Reset</Button>
          <Button type="text">Approve Application</Button>
          <Button type="text">Delete </Button>
        </Space>
      ),
    },
  ];
  
  const [customerData, setCustomerData] = useState<Array<any>>()
  const [businessData, setBusinessData] = useState<Array<any>>()
  const [tableSegmenter,setTableSegmenter] = useState('Customer')

  const customerCollection = collection(db,'customer')
  const businessCollection = collection(db,'business')
    useEffect(()=>{
      onSnapshot(customerCollection,(snapshot)=>{
        let temptArray:Array<any> = []
        snapshot.forEach((doc)=>{
          temptArray.push(doc.data())
          console.log(doc.data())
        })
        setCustomerData(temptArray)
      })
      onSnapshot(businessCollection,(snapshot)=>{
        let temptArray:Array<any> = []
        snapshot.forEach((doc)=>{
          temptArray.push(doc.data())
          console.log(doc.data())
        
        })

        setBusinessData(temptArray)
      })
    },[])
  

  return (

    <AppLayout>
        <h1>{pathName.split('/').toString().toUpperCase().split(',')}</h1>
        <br/>
        <Segmented options={['Customer', 'Businesses',]} onChange={(value)=>{
          setTableSegmenter(value.toString())
          }} />
        <br/>
        <br/> 
       {tableSegmenter=="Customer"?
       <Table columns={customerColumns} dataSource={ customerData} pagination={false} style={{overflowX:'scroll'}} />: 
       <Table columns={businessColumns} dataSource={ businessData} pagination={false} style={{overflowX:'scroll'}}  /> 
      }


    </AppLayout>
  )
}
