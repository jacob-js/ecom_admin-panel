import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { useState } from 'react'
import { subCategorysColumns } from '../../Utils/tablesColumns'
import SubCategoryForm from './SubCategoryForm'

const data = [
    {
        name: 'Homme',
        Category: {
            name: 'Cagoule'
        }
    }
]

export default function SubCategorys() {
    const [visible, setVisible] = useState();
  return (
    <div className="">
        <Button className='btn add' type='primary' icon={<PlusCircleOutlined />} onClick={setVisible}>Ajouter</Button>
        <Table dataSource={data} columns={subCategorysColumns} className='table' />
        <SubCategoryForm visible={visible} setVisible={setVisible} />
    </div>
  )
}
