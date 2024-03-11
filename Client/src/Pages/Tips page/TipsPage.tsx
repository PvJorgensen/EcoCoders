
import React from 'react';
import { Card, Space } from 'antd';

export const TipsPage = () => {
    return (

        <>
         <h3>Welcome to you eco encyclopedia!</h3>
        
         <Space direction="vertical" size={16}>
     <Card title="DAILY TIPS"  style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    
  </Space>
        </>
    )
  
}