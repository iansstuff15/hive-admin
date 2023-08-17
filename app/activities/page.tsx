"use client"
import AppLayout from "@/components/appLayout";
import { Button, Col, Descriptions, Drawer, Row, Segmented, Timeline } from "antd";
import { usePathname } from "next/navigation";
import { Space, Table } from 'antd';
import { useEffect, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import PieChart from "@/components/charts/pie";
import jsonexport from 'jsonexport'
import LineChart from "@/components/charts/line";
import UserDrawer from "@/components/userDrawer";
export default function   Home() {
  const [data, setData] = useState<Array<any>>()
  const [isOpenUserDrawer, setIsUpenUserDrawer] = useState(false)
  const [userUID, setUserUID] = useState('1234')
  const [userRole, setUserRole] = useState('1234')

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
async function findUserTypeByUid(uid:string) {
  try {
  
    const businessCollectionRef = doc(collection(db, "business"), uid);

    

    
    const businessSnapshot = await getDoc(businessCollectionRef);

    if (businessSnapshot.data()) {
     
      return "business";
    }
    

    return'customer'
  } catch (error) {
    console.error("Error searching Firestore:", error);
    // You can handle the error as per your requirement
    throw error;  
  }
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


  const columns: ColumnsType<DataType> = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      
      filters: data?.map((data)=>{
        return({
          text:data.action,
          value:data.action
        })
      }).reduce((acc:any, obj:any) => {
        if (!acc.some((item:any) => item.value === obj.value)) {
          acc.push(obj);
        }
        return acc;
      }, [])??[],
      onFilter: (value: any, record:any) => record.action.indexOf(value) === 0,
    },{
      title: 'Date Performed',
      dataIndex: 'datePerformed',
      key: 'datePerformed',
      // filters: data?.map((data)=>{
      //   return({
      //     text:`${data.datePerformed.toDate().getMonth()  + 1}/${data.datePerformed.toDate().getDate()}/${data.datePerformed.toDate().getFullYear()}`,
      //     value:`${data.datePerformed.toDate().getMonth()  + 1}/${data.datePerformed.toDate().getDate()}/${data.datePerformed.toDate().getFullYear()}`,
      //   })
      // }).reduce((acc:any, obj:any) => {
      //   if (!acc.some((item:any) => item.value === obj.value)) {
      //     acc.push(obj);
      //   }
      //   return acc;
      // }, [])??[],
      render:(value)=><strong>{value.toDate().toString()}</strong>,
      onFilter: (value: any, record:any) => `${record.datePerformed.toDate().getMonth()  + 1}/${record.datePerformed.toDate().getDate()}/${record.datePerformed.toDate().getFullYear()}`.indexOf(value) === 0,
      
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      filters: data?.map((data)=>{
        return({
          text:data.user,
          value:data.user
        })
      }).reduce((acc:any, obj:any) => {
        if (!acc.some((item:any) => item.value === obj.value)) {
          acc.push(obj);
        }
        return acc;
      }, [])??[],
      render:(value)=><Button onClick={async()=>{
        setUserRole(await findUserTypeByUid(value))
        setUserUID(value)
        setIsUpenUserDrawer(true)}} type="link">{value}</Button>,
      onFilter: (value: any, record:any) => record.user.indexOf(value) === 0,
    },
   

  ];
  
 
  const collectionRef = collection(db,'logs')
  const q = query(collectionRef,orderBy("datePerformed","asc"))

    useEffect(()=>{
      onSnapshot(q,(snapshot)=>{
        let temptArray:Array<any> = []
        snapshot.forEach((doc)=>{
          temptArray.push(doc.data())
          console.log(doc.data())
        })
        setData(temptArray)
      })

     
   
    },[])
  

  return (

    <AppLayout>
        <h1>{pathName.split('/').toString().toUpperCase().split(',')}</h1>
        <br/>
 
    <UserDrawer userRole={userRole} userUID={userUID} isOpen={isOpenUserDrawer} setState={setIsUpenUserDrawer}/>
    <br/>
    <LineChart title={'Log records over time'} data={data?.map((item:any)=>{
       
      
       return({
        type:`${item.action.toString()}`, value: data.filter((value) =>{
          return (value.action == item.action ) && (`${value.datePerformed.toDate().getMonth()  + 1}/${value.datePerformed.toDate().getDate()}/${value.datePerformed.toDate().getFullYear()}` == `${item.datePerformed.toDate().getMonth()  + 1}/${item.datePerformed.toDate().getDate()}/${item.datePerformed.toDate().getFullYear()}`)
        }).length,date:`${item.datePerformed.toDate().getMonth()  + 1}/${item.datePerformed.toDate().getDate()}/${item.datePerformed.toDate().getFullYear()}`
      })
    })??[]}/> <br/><br/>
    <Row>
      <Col span={20}>
   
      </Col>
      <Col span={4} style={{padding:'0 1rem'}} >
      <Button type="primary" style={{marginRight:'1rem'}}
      onClick={()=>handleDownloadCSV(data)}
      >Download logs data</Button>
      
      </Col>
    </Row>  
       
       <br/> 
       <Table columns={columns} dataSource={ data} pagination={{pageSize:20}}  scroll={{ y: '60vh' }}  />
  
    </AppLayout>
  )
}
