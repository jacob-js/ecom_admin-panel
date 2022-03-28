import React, { useState } from 'react'
import { VscGroupByRefType } from 'react-icons/vsc'
import { MdOutlineCategory, MdSubject } from 'react-icons/md'
import ProductsTypes from '../Subs/ProductsTypes';
import CategorysContent from '../Subs/CategorysContent';
import SubCategorys from '../Subs/SubCategorys';

const sorts = [
    {
        name: 'Types de produits',
        icon: <VscGroupByRefType />,
        key: 1
    },
    {
        name: 'Catégories',
        icon: <MdOutlineCategory />,
        key: 2
    },
    {
        name: 'Sous-catégories',
        icon: <MdSubject />,
        key: 3
    }
]

export default function Categorys() {
    const [ key, setKey ] = useState(1);
  return (
    <div className='categorys'>
        <div className="header">
            <div className="title">Catégories</div>
            <div className="bar">
                {
                    sorts.map((sort, index) => (
                        <div key={index} className={`field ${sort.key === key ? 'active': ''}`} onClick={() =>setKey(sort.key)}>
                            <div className="icon">{sort.icon}</div>
                            <div className="name">{sort.name}</div>
                        </div>
                    ))
                }
            </div>
        </div>

        <div className="content">
            {
                key === 1 ? <ProductsTypes /> :
                key === 2 ? <CategorysContent /> :
                <SubCategorys />
            }
        </div>
    </div>
  )
}
