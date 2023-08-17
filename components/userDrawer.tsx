"use client"

import { db } from "@/firebase/firebase"
import { Avatar, Descriptions, Drawer, Image, List, Timeline } from "antd"
import { collection, doc, documentId, onSnapshot, query, where } from "firebase/firestore"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
interface drawerProps{
    isOpen:boolean,
    setState: Dispatch<SetStateAction<boolean>>,
    userUID:string,
    userRole:string,

}
const UserDrawer:React.FC<drawerProps> = ({isOpen,setState,userRole,userUID})=>{
    const [userData,setUserData] = useState<any>()
    const [userLogs,setUserLogs] = useState<Array<any>>()
    const [userTransactions,setUserTransactions] = useState<Array<any>>()
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
    useEffect(()=>{
        const docRef = doc(db, userRole, userUID);
        const logsRef = collection(db, 'logs');
        const ordersRef = collection(db, 'orders');
        const logsQuery = query(logsRef,where("user","==",userUID))
        const ordersQuery = query(ordersRef,where(userRole == 'business'?'businessID':'customerID','==',userUID))
        setUserData(null)
       onSnapshot(docRef, (docSnapshot) => {
        console.log(docSnapshot.exists())
            if (docSnapshot.exists()) {
               
              setUserData(docSnapshot.data());
              console.log(userData)
            } else {
     
              setUserData(null);
            }
          });
          onSnapshot(logsQuery,(snapshot)=>{
            let temptArray:Array<any> = []
            snapshot.forEach((doc)=>{
              temptArray.push(doc.data())
              console.log(doc.data())
            })
            setUserLogs(temptArray)
          })
          onSnapshot(ordersQuery,(snapshot)=>{
            let temptArray:Array<any> = []
            snapshot.forEach((doc)=>{
              temptArray.push(doc.data())
              console.log(doc.data())
            })
            setUserTransactions(temptArray)
          })
          
    },[userUID])  
    return(
            
      <Drawer open={isOpen} destroyOnClose closable={false} onClose={()=>setState(false)} title={'User Info'}>
       
    {userRole=='business'?  
    <>
    <Descriptions title="Business Info" layout="vertical"  >
        <Descriptions.Item  span={3 } ><Avatar src={`${userData?.profilePicture?? 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftheperfectroundgolf.com%2Fplaceholder-png%2F&psig=AOvVaw0YdwxPqVHiVGu5UaqB4p9w&ust=1690910751079000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOir4si7uYADFQAAAAAdAAAAABAD'}`}  size={'large'}></Avatar></Descriptions.Item>
        <Descriptions.Item label="Business Name" span={3} >{userData?.businessName??'user data not available anymore'}</Descriptions.Item>
        <Descriptions.Item label="Business Email" span={2}>{userData?.businessEmail??'user data not available anymore'}</Descriptions.Item>
        <Descriptions.Item label="Phone" span={1}>{userData?.phone??'user data not available anymore'}</Descriptions.Item>
        <Descriptions.Item label="Description" span={3}>{userData?.description??'user data not available anymore'}</Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
        {userData?.address??'user data not available anymore'}
        </Descriptions.Item>
        <Descriptions.Item label="Latitude" span={1}>
        {userData?.lat??'user data not available anymore'}
        </Descriptions.Item>
        <Descriptions.Item label="Longitude" span={2}>
        {userData?.lng??'user data not available anymore'}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Type">{userData?.type??'user data not available anymore'}</Descriptions.Item>
        <Descriptions.Item label="UID" span={3} >{userUID??'user data not available anymore'}</Descriptions.Item>
      </Descriptions>
    {
        userData?
        <Descriptions title="Schedule Info" layout="vertical"  >
       
       <Descriptions.Item label="Monday" span={3} >{`${userData.mondayStart!='Start'?userData.mondayStart:'Start time not set'}:${userData.mondayEnd!='End'?userData?.mondayEnd: 'End time not set'}`}</Descriptions.Item>
       <Descriptions.Item label="Tuesday" span={3} >{`${userData.tuesdayStart!='Start'? userData.tuesdayStart:'Start time not set'}:${userData.tuesdayEnd!='End'?userData.tuesdayEnd : 'End time not set'}`??'schedule not set'}</Descriptions.Item>
       <Descriptions.Item label="Wednesday" span={3} >{`${userData.wednesdayStart!='Start'?userData.wednesdayStart:'Start time not set'}:${userData.wednesdayEnd!='End'?userData.wednesdayEnd  : 'End time not set'}`??'schedule not set'}</Descriptions.Item>
       <Descriptions.Item label="Thursday" span={3} >{`${userData.thursdayStart!='Start'?userData.thursdayStart:'Start time not set'}:${userData.thursdayEnd !='End'?userData.thursdayEnd : 'End time not set'}`??'schedule not set'}</Descriptions.Item>
       <Descriptions.Item label="Friday" span={3} >{`${userData.fridayStart!='Start'?userData.fridayStart:'Start time not set'}:${userData.fridayEnd!='End'?userData.fridayEnd : 'End time not set'}`??'schedule not set'}</Descriptions.Item>
       <Descriptions.Item label="Saturday" span={3} >{`${userData.saturdayStart !='Start'?userData.saturdayStart:'Start time not set'}:${userData.saturdayEnd!='End' ?userData.saturdayEnd: 'End time not set'}`??'schedule not set'}</Descriptions.Item>
       <Descriptions.Item label="Sunday" span={3} >{`${userData.sundayStart !='Start'?userData.sundayStart:'Start time not set'}:${userData.sundayEnd!='End'?userData.sundayEnd : 'End time not set'}`??'schedule not set'}</Descriptions.Item>
            </Descriptions>
        :
        <></>
    }
   
    </>:
      <>
       <Descriptions title="Customer Info" layout="vertical"  >
        <Descriptions.Item  span={3 } ><Avatar src={`${userData?.image?? 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftheperfectroundgolf.com%2Fplaceholder-png%2F&psig=AOvVaw0YdwxPqVHiVGu5UaqB4p9w&ust=1690910751079000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOir4si7uYADFQAAAAAdAAAAABAD'}`}  size={'large'}></Avatar></Descriptions.Item>
        <Descriptions.Item label="First Name" span={2}>{userData?.firstName??'user data not available anymore'}</Descriptions.Item>
        <Descriptions.Item label="Last Name" span={1}>{userData?.lastName??'user data not available anymore'}</Descriptions.Item>
        <Descriptions.Item label="Phone" span={2}>{userData?.email??'user data not available anymore'}</Descriptions.Item>
        <Descriptions.Item label="Email" span={1}>{userData?.phone??'user data not available anymore'}</Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
        {userData?.address??'user data not available anymore'}
        </Descriptions.Item>
        <Descriptions.Item label="UID" span={3} >{userUID??'user data not available anymore'}</Descriptions.Item>
      </Descriptions>
      </>
    
    }
     
     <h3>Activity Timeline</h3>
      <br/>
      <Timeline
        mode="left"
        
        items={userLogs?.map((data)=>{
            return{children:data.action,label:`${data.datePerformed.toDate().toLocaleString('en-US', options)}`}
        })??[]}
      />
      <h3>Transactions Participated</h3>
      <List
    itemLayout="horizontal"
    dataSource={userTransactions}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          title={<h5>{item.uid}</h5>}
          description={<>
          <h4>Business ID</h4>
          <p>{item.businessID}</p>
          <h4>Customer ID</h4>
          <p>{item.customerID}</p>
          <h4>Status</h4>
          <p>{item.status}</p>
          <h4>Date Booked</h4>
          <p>{item.dateBooked}</p>
          <h4>Time Booked</h4>
          <p>{item.timeBooked}</p>
          <h4>Total Price</h4>
          <p>₱ {item.totalPrice?? 'not available'}</p>
          <h4>Orders</h4>
          {item.order?.map((data:any,index:number)=>{return(
            <p key={index}>{data.name}</p>)}
          )?? <p>not available</p>}
          </>}
        />
      </List.Item>)}
  />
      </Drawer>
    )
}

export default UserDrawer