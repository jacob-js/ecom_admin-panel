import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategAction, getSubCategorysAction } from '../../Redux/actions/categorys'
import { subCategorysColumns } from '../../Utils/tablesColumns'
import SubCategoryForm from './SubCategoryForm'

export default function SubCategorys() {
    const [visible, setVisible] = useState();
    const { data, loading } = useSelector(({ categorys: {subs} }) =>subs);
    const { loading: loadingDelete, id } = useSelector(({ categorys: { deleteCateg } }) => deleteCateg);
    const dispatch = useDispatch();

    useEffect(() =>{
        getSubCategorysAction(dispatch)
    }, [dispatch])

    const onDeleteItem = (itemId) =>{
        deleteCategAction(itemId, 'categ')(dispatch)
    }

  return (
    <div className="">
        <Button className='btn add' type='primary' icon={<PlusCircleOutlined />} onClick={setVisible}>Ajouter</Button>
        <Table dataSource={data} columns={subCategorysColumns(onDeleteItem, loadingDelete, id)} className='table' loading={loading} />
        <SubCategoryForm visible={visible} setVisible={setVisible} />
    </div>
  )
}
