import React from 'react'

const OrderDetails = async({ params }) => {
  const { orderid } = await params
  
  return (
    <div>OrderDetails</div>
  )
}

export default OrderDetails