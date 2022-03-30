import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductTypesAction } from '../../Redux/actions/categorys'
import { productTypesColumns } from '../../Utils/tablesColumns'
import ProductTypeForm from './ProductTypeForm'

export default function ProductsTypes() {
  const [visible, setVisible] = useState();
  const dispatch = useDispatch();
  const { data, loading } = useSelector(({ categorys: { productTypes } }) =>productTypes);

  useEffect(() =>{
    getProductTypesAction(dispatch)
  }, [dispatch]);
  
  return (
    <div className="">
        <Button className='btn add' type='primary' icon={<PlusCircleOutlined />} onClick={setVisible}>Ajouter</Button>
        <Table dataSource={data} loading={loading} columns={productTypesColumns} className='table' pagination={false} />
        <ProductTypeForm visible={visible} setVisible={setVisible} />
    </div>
  )
}
