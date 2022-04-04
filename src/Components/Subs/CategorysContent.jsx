import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategorysAction } from '../../Redux/actions/categorys'
import { categorysColumns } from '../../Utils/tablesColumns'
import CategoryForm from './CategoryForm'

export default function CategorysContent() {
  const [visible, setVisible] = useState();
  const { data, loading } = useSelector(({categorys:{categorys}}) =>categorys);
  const dispatch = useDispatch();

  useEffect(() =>{
    getCategorysAction(dispatch)
  }, [dispatch])
  
  return (
    <div className="">
        <Button className='btn add' type='primary' icon={<PlusCircleOutlined />} onClick={() =>setVisible(true)}>Ajouter</Button>
        <Table dataSource={data} loading={loading} columns={categorysColumns} className='table' />
        <CategoryForm visible={visible} setVisible={setVisible} />
    </div>
  )
}
