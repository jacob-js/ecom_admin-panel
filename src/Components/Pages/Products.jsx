import { PlusOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React from 'react'
import { productsColumns } from '../../Utils/tablesColumns'
import { Input, Select } from '../Commons/commons';

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
                    <Button type='primary' className='btn add-product' icon={<PlusOutlined />} block>Ajouter un produit</Button>
                </div>
            </div>
        </div>

        <div className="content">
            <Table dataSource={data} columns={productsColumns} className='table' />
        </div>
    </div>
  )
}

export default Products