import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategAction, getCategorysAction } from '../../Redux/actions/categorys'
import { categorysColumns } from '../../Utils/tablesColumns'
import CategoryForm from './CategoryForm'

export default function CategorysContent() {
  const [visible, setVisible] = useState();
  const { data, loading } = useSelector(({categorys:{categorys}}) =>categorys);
  const { loading: loadingDelete, id } = useSelector(({ categorys: { deleteCateg } }) => deleteCateg);
  const dispatch = useDispatch();

  useEffect(() =>{
    getCategorysAction(dispatch)
  }, [dispatch]);

  const onDeleteItem = (itemId) =>{
    deleteCategAction(itemId, 'categ')(dispatch)
  }
  
  return (
    <div className="">
        <Button className='btn add' type='primary' icon={<PlusCircleOutlined />} onClick={() =>setVisible(true)}>Ajouter</Button>
        <Table dataSource={data} loading={loading} columns={categorysColumns(onDeleteItem, loadingDelete, id)} className='table' />
        <CategoryForm visible={visible} setVisible={setVisible} />
    </div>
  )
}
