import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubCategorysAction } from '../../Redux/actions/categorys'
import { subCategorysColumns } from '../../Utils/tablesColumns'
import SubCategoryForm from './SubCategoryForm'

export default function SubCategorys() {
    const [visible, setVisible] = useState();
    const { data, loading } = useSelector(({ categorys: {subs} }) =>subs);
    const dispatch = useDispatch();

    useEffect(() =>{
        getSubCategorysAction(dispatch)
    }, [dispatch])

  return (
    <div className="">
        <Button className='btn add' type='primary' icon={<PlusCircleOutlined />} onClick={setVisible}>Ajouter</Button>
        <Table dataSource={data} columns={subCategorysColumns} className='table' loading={loading} />
        <SubCategoryForm visible={visible} setVisible={setVisible} />
    </div>
  )
}
