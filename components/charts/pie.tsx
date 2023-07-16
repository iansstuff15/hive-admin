'use client'

import { Pie } from "@ant-design/charts";
import { Card } from "antd";

interface chartProps{
    data?:Array<{type:String, value: number}>,
    title:String
}

const PieChart:React.FC<chartProps> = ({data,title}) =>{
   
      const config = {
        appendPadding: 10,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
       
      };
    return(<Card title={title} style={{height:300,  }} >
   
    <Pie data={data??[{type:'',value:0}]} style={{width:300,height:200}} {...config} />
    </Card>)
}

export default PieChart