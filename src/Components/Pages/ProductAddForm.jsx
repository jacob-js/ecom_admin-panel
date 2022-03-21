import { Drawer } from 'antd'
import React from 'react'
import { Title } from '../Commons/commons'

function ProductAddForm({onClose, visible}) {
  return (
    <Drawer width={720}
        placement='right' visible={visible} onClose={onClose}
        title={
            <div className="drawer-title">
                <Title className='title'>Ajouter un produit</Title>
                <div>Ajouter votre produit et ses informations nécessaires ici</div>
            </div>
        }
        headerStyle={{background: 'rgb(246, 249, 252)'}}
    >

    </Drawer>
  )
}

export default ProductAddForm