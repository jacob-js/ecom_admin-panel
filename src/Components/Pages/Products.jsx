import { PlusOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteProd, getProductsAction } from '../../Redux/actions/products';
import { productsColumns } from '../../Utils/tablesColumns'
import { Input, Select } from '../Commons/commons';
import EditProductForm from '../Subs/EditProduct';
import ProductAddForm from './ProductAddForm';

function Products() {
    const [visibleAddForm, setVisibleAddForm] = useState();
    const [visibleEditForm, setVisibleEditForm] = useState();
    const [editable, setEditable] = useState({});
    const [tableRows, setTableRows] = useState([]);
    const { loading, rows, count } = useSelector(({ products: { products } }) =>products);
    const { loading: loadingDelete, id } = useSelector(({ products: { deleteProd } }) =>deleteProd);
    const { data: categs } = useSelector(({categorys:{categorys}}) =>categorys);
    const dispatch = useDispatch();
    const history = useHistory();
    const limit = 10;
    const [offset, setOffset] = useState(0);

    useEffect(() =>{
        getProductsAction(offset, limit)(dispatch)
    }, [offset, limit, dispatch]);

    useEffect(() =>{
        (() =>{
            setTableRows(rows);
        })();
    }, [rows]);

    const onDeleteItem = (itemId) =>{
        deleteProd(itemId)(dispatch)
    };

    const onViewEditForm = (product) =>{
        setVisibleEditForm(true);
        setEditable(product);
    }

    const onDetailView = (product) =>{
        history.push(`/products/${product.id}`);
    };

    const handleSearch = (e) =>{
        const { value } = e.target;
        const newProds = rows.filter(prod => prod.name.toLowerCase().includes(value.toLowerCase()));
        setTableRows(newProds);
    };

  return (
    <div className='products'>
        <div className="header">
            <div className="title">Produits</div>
            <div className="bar">
                <div className="field search">
                    <Input placeholder="Rechercher par le nom du produit" onChange={handleSearch} />
                </div>
                <div className="field">
                    <Button type='primary' className='btn add-product' icon={<PlusOutlined />} block onClick={setVisibleAddForm}>
                        Ajouter un produit
                    </Button>
                </div>
            </div>
        </div>

        <div className="content">
            <Table dataSource={tableRows} loading={loading} columns={productsColumns(onDeleteItem, loadingDelete, id, onViewEditForm, onDetailView, categs)} 
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