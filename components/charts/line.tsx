"use client"
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
import { Card } from "antd";
const Line = dynamic(
  () => import('@ant-design/plots/es/components/line'),
  { ssr: false }
)
interface chartProps{
    data:Array<{type:String, value: number,date:string}>,
    title:String
}
const LineChart:React.FC<chartProps> = ({data,title}) => {

 
    const config = {
     
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
        
      
    };
    return <Card title={title}>
   
    <Line data={data} legend={{position:'left'}} {...config} /></Card>
}

export default LineChart