"use client"
import AppLayout from "@/components/appLayout";
import { Button, Col, Row, Segmented } from "antd";
import { usePathname } from "next/navigation";
import { Space, Table } from 'antd';
import { useEffect, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import PieChart from "@/components/charts/pie";
import jsonexport from 'jsonexport'
export default function   Home() {
  const pathName = usePathname()
  interface DataType {
    key: string;
    firstName: string;
    lastName: number;
    phone: string;
    
  }
  const handleDownloadCSV = (list:any) =>{
    jsonexport(list, function(err:any, csv:any){
        if (err) return console.error(err);
        console.log('csv here')
        console.log(csv);
        downloadBlob(csv, 'export.csv', 'text/csv;charset=utf-8;')
    }
    )
}
function downloadBlob(content:any, filename:any, contentType:any) {
  // Create a blob
  var blob = new Blob([content], { type: contentType });
  var url = URL.createObjectURL(blob);

  // Create a link to download it
  var pom = document.createElement('a');
  pom.href = url;
  pom.setAttribute('download', filename);
  pom.click();
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
      console
    },[])
  

  return (

    <AppLayout>
        <h1>{pathName.split('/').toString().toUpperCase().split(',')}</h1>
        <br/>
        <Row gutter={12}>
      <Col span={12}> <PieChart title={'User types distribution'} data={[{type:'Customers',value:customerData?.length??0},{type:'Businesses',value:businessData?.length??0}]}/></Col>
      <Col span={12}> <PieChart title={'Business types distribution'} data={[
        {type:'Technician',value:businessData?.filter((data)=>data.type=='Technician').length??0},
        {type:'Water Refilling Station',value:businessData?.filter((data)=>data.type=='Water Refilling Station').length??0},
        {type:'Plumber',value:businessData?.filter((data)=>data.type=='Plumber').length??0},
    ]}/></Col>
      
    </Row>
       
    <br/>
    <Row>
      <Col span={12}>
      <Segmented options={['Customer', 'Businesses',]} onChange={(value)=>{
          setTableSegmenter(value.toString())
          }} />
      </Col>
      <Col span={12} style={{padding:'0 1rem'}} >
      <Button type="primary" style={{marginRight:'1rem'}}
      onClick={()=>handleDownloadCSV(customerData)}
      >Download customer account data</Button>
        <Button type="primary"  onClick={()=>handleDownloadCSV(businessData)}>Download business account data</Button>
      </Col>
    </Row>  
       
       <br/> 
       {tableSegmenter=="Customer"?
       <Table columns={customerColumns} dataSource={ customerData} pagination={false} style={{overflowX:'scroll'}} />: 
       <Table columns={businessColumns} dataSource={ businessData} pagination={false} style={{overflowX:'scroll'}}  /> 
      }


    </AppLayout>
  )
}
