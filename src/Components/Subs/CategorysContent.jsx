import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { useState } from 'react'
import { categorysColumns } from '../../Utils/tablesColumns'
import CategoryForm from './CategoryForm'

const data = [
    {
        name: 'Cagoule',
        icon: 'https://www.harrolds.com.au/productimages/thumb/1/11495_47323_50380.jpg',
        ProductType: {
            name: 'Vêtements'
        }
    }
]

export default function CategorysContent() {
  const [visible, setVisible] = useState();
  return (
    <div className="">
        <Button className='btn add' type='primary' icon={<PlusCircleOutlined />} onClick={() =>setVisible(true)}>Ajouter</Button>
        <Table dataSource={data} columns={categorysColumns} className='table' />
        <CategoryForm visible={visible} setVisible={setVisible} />
    </div>
  )
}
