import { PlusOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProd, getProductsAction } from '../../Redux/actions/products';
import { productsColumns } from '../../Utils/tablesColumns'
import { Input, Select } from '../Commons/commons';
import EditProductForm from '../Subs/EditProduct';
import ProductAddForm from './ProductAddForm';

const data = [
    {
        name: 'Macbook Pro',
        category: 'Ordinateur',
        price: 1000,
        currency: 'usd',
        // cover: 'https://i.ibb.co/WpM5yZZ/9.png',
        cover: 'https://res.cloudinary.com/mulo/image/upload/v1625142522/qwyhdyesgqc4jqbk0iae.jpg',
        quantity: 10,
        quantityMetric: 'pièce',
        discount: 50
    }
]

function Products() {
    const [visibleAddForm, setVisibleAddForm] = useState();
    const [visibleEditForm, setVisibleEditForm] = useState();
    const [editable, setEditable] = useState({});
    const { loading, rows, count } = useSelector(({ products: { products } }) =>products);
    const { loading: loadingDelete, id } = useSelector(({ products: { deleteProd } }) =>deleteProd);
    const dispatch = useDispatch();
    const limit = 10;
    const [offset, setOffset] = useState(0);

    useEffect(() =>{
        getProductsAction(offset, limit)(dispatch)
    }, [offset, limit, dispatch]);

    const onDeleteItem = (itemId) =>{
        deleteProd(itemId)(dispatch)
    };

    const onViewEditForm = (product) =>{
        setVisibleEditForm(true);
        setEditable(product);
    }

  return (
    <div className='products'>
        <div className="header">
            <div className="title">Produits</div>
            <div className="bar">
                <div className="field">
                    <Input placeholder="Rechercher par le nom du produit" />
                </div>
                <div className="field">
                    <Select placeholder="Catégorie">
                        <option value="">Toutes les catégories</option>
                    </Select>
                </div>
                <div className="field">
                    <Select placeholder='Prix'>
                        <option value="">Tous les prix</option>
                    </Select>
                </div>
                <div className="field">
                    <Button type='primary' className='btn add-product' icon={<PlusOutlined />} block onClick={setVisibleAddForm}>
                        Ajouter un produit
                    </Button>
                </div>
            </div>
        </div>

        <div className="content">
            <Table dataSource={rows} loading={loading} columns={productsColumns(onDeleteItem, loadingDelete, id, onViewEditForm)} 
                className='table'
                pagination={{
                    total: count,
                    pageSize: limit,
                    onChange: (page) => setOffset((page - 1)*limit)
                }} 
            />
        </div>
        <ProductAddForm visible={visibleAddForm} onClose={() => setVisibleAddForm(false)} />
        <EditProductForm visible={visibleEditForm} onClose={() => setVisibleEditForm(false)} product={editable} />
    </div>
  )
}

export default Products