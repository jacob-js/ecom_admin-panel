import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { useState } from 'react'
import { productTypesColumns } from '../../Utils/tablesColumns'
import ProductTypeForm from './ProductTypeForm'

const data = [
    {
        name: 'Vêtements',
        icon: 'https://media.leroymerlin.fr/Capture/04/26/f323d7d8451a9e75cab0c26cf7a7/Lot%20de%20v%C3%AAtements%20de%20protection.jpg'
    }
]

export default function ProductsTypes() {
  const [visible, setVisible] = useState();
  return (
    <div className="">
        <Button className='btn add' type='primary' icon={<PlusCircleOutlined />} onClick={setVisible}>Ajouter</Button>
        <Table dataSource={data} columns={productTypesColumns} className='table' pagination={false} />
        <ProductTypeForm visible={visible} setVisible={setVisible} />
    </div>
  )
}
