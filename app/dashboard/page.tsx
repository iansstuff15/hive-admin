"use client"
import AppLayout from "@/components/appLayout";
import { Button, Card, Col, Row, Segmented, Statistic } from "antd";
import { usePathname } from "next/navigation";
import { Space, Table } from 'antd';
import { useEffect, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import PieChart from "@/components/charts/pie";
import LineChart from "@/components/charts/line";

export default function Home() {
  const pathName = usePathname()
  interface DataType {
    key: string;
    firstName: string;
    lastName: number;
    phone: string;
    
  }
  

  
  const [customerData, setCustomerData] = useState<Array<any>>()
  const [businessData, setBusinessData] = useState<Array<any>>()
  const [logsData, setLogsData] = useState<Array<any>>()
  const [transactionsData, setTransactionsData] = useState<Array<any>>()
  const now = new Date()
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

      const collectionRef = collection(db,'logs')
      const q = query(collectionRef,orderBy("datePerformed","asc"))
      onSnapshot(q,(snapshot)=>{
        let temptArray:Array<any> = []
        snapshot.forEach((doc)=>{
          temptArray.push(doc.data())
          console.log(doc.data())
        })
        setLogsData(temptArray)
      })

      const transactionCollectionRef = collection(db,'transactions')
      onSnapshot(transactionCollectionRef,(snapshot)=>{
        let temptArray:Array<any> = []
        snapshot.forEach((doc)=>{
          temptArray.push(doc.data())
          console.log(doc.data())
        })
        setTransactionsData(temptArray)
      })
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
    <Card>
      
      <Statistic title="Active Users" value={logsData?.filter((data)=>(data.datePerformed.toDate().getMonth())==(now.getMonth() )).reduce((acc:any, obj:any) => {
        if (!acc.some((item:any) => item.user === obj.user)) {
          acc.push(obj);
        }
        return acc;
      }, [])


.length??0} />  
      </Card>
   
    <br/>
    <LineChart title={'Log records over time'} data={logsData?.map((item:any)=>{
       
      
       return({
        type:`${item.action.toString()}`, value: logsData.filter((value) =>{
          return (value.action == item.action ) && (`${value.datePerformed.toDate().getMonth()  + 1}/${value.datePerformed.toDate().getDate()}/${value.datePerformed.toDate().getFullYear()}` == `${item.datePerformed.toDate().getMonth()  + 1}/${item.datePerformed.toDate().getDate()}/${item.datePerformed.toDate().getFullYear()}`)
        }).length,date:`${item.datePerformed.toDate().getMonth()  + 1}/${item.datePerformed.toDate().getDate()}/${item.datePerformed.toDate().getFullYear()}`
      })
    })??[]}/>
        <br/> 
      


    </AppLayout>
  )
}
