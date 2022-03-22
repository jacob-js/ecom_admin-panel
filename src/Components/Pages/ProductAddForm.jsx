import { AiOutlinePicture } from 'react-icons/ai';
import { Drawer } from 'antd'
import React from 'react'
import { FieldContainer, FormContainer, Input, Label, Select, TextArea, Title } from '../Commons/commons';

const fields = [
  {
    name: 'name',
    label: 'Nom du produit',
  },
  {
    name: 'description',
    label: 'Description du produit',
    type: 'text'
  },
  {
    name: 'category',
    label: 'Catégorie du produit',
    type: 'select'
  },
  {
    name: 'price',
    label: 'Prix du produit',
    inputType: 'number'
  },
  {
    name: 'currency',
    label: 'Devise',
    type: 'select',
  },
  {
    name: 'quantityMetric',
    label: 'Unité de mesure (ex: kg, m, pcs, etc.)',
  },
  {
    name: 'quantity',
    label: 'Quantité',
    inputType: 'number'
  }
]

function ProductAddForm({onClose, visible}) {

  return (
    <Drawer width={850}
        placement='right' visible={visible} onClose={onClose}
        title={
            <div className="drawer-title">
                <Title className='title'>Ajouter un produit</Title>
                <div>Ajouter votre produit et ses informations nécessaires ici</div>
            </div>
        }
        headerStyle={{background: 'rgb(246, 249, 252)'}}
    >
      <FormContainer className='product-form'>
        <FieldContainer className='field'>
          <Label>Image du produit</Label>
          <input type="file" name="image" id="image" style={{ display: 'none' }} />
          <div className="image-container">
            <AiOutlinePicture className='icon' />
            <div className="descript">Cliquer pour télécharger une image</div>
          </div>
        </FieldContainer>
        {
          fields.map((field, index) => (
            <FieldContainer key={index} className='field'>
              <Label>{field.label}</Label>
              {
                field.type === 'text' ?
                <TextArea name={field.name} />:
                field.type === 'select' ?
                <Select name={field.name} defaultValue="">
                  {
                    field.name === 'category' ?
                    <>
                      <option value="">Choisir une catégorie</option>
                    </>:
                    field.name === 'currency' &&
                    <>
                      <option value="">Choisir une devise</option>
                    </>
                  }
                </Select>:
                <Input name={field.name} type={field.inputType} />
              }
            </FieldContainer>
          ))
        }
      </FormContainer>
    </Drawer>
  )
}

export default ProductAddForm