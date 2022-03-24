import { AiOutlinePicture } from 'react-icons/ai';
import { Drawer } from 'antd'
import React, { useState } from 'react'
import { FieldContainer, FormContainer, Input, Label, Select, TextArea, Title } from '../Commons/commons';
import { Select as AntSelect, Divider, Button } from 'antd';
import SpecForm from './SpecForm';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { CloseOutlined } from '@ant-design/icons';

const { Option } = AntSelect;

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
  },
  {
    name: 'sizes',
    label: 'Tailles disponibles',
    type: 'array'
  }
];

export const productSchema = yup.object({
  name: yup.string().required('Le nom du produit est réquis'),
  description: yup.string().required('La description est réquise'),
  categoryId: yup.string().required('La categorie est réquise'),
  price: yup.number().required('Le prix est réquis'),
  currency: yup.string().required('La dévise est réquise'),
  quantity: yup.number().required('La quantité est réquise'),
  quantityMetric: yup.string().required('L\'unité de mesure de la quantité est réquise'),
  specifications: yup.array(yup.object({
      key: yup.string().required("La clé est requise"),
      value: yup.string().required("La valeur est requise")
  })),
  discount: yup.number().min(0.0001, "Entre une valeur supérieure à zèro"),
  isNew: yup.boolean(),
  sizes: yup.array(yup.string())
})

function ProductAddForm({onClose, visible}) {
  const [visibleSpecForm, setVisibleSpecForm] = useState(false);
  const formik = useFormik({
    initialValues: fields.reduce((acc, field) => {
      acc[field.name] = ''
      return acc
    }, { specifications: [] }),
    validationSchema: productSchema,
  });

  const onSpecSubmit = (values) => {
    formik.setFieldValue('specifications', [...formik.values.specifications, values])
    setVisibleSpecForm(false)
  };

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
                field.type === 'array' ?
                <AntSelect
                  mode="tags"
                  size='middle'
                  placeholder="Please select"
                  // onChange={handleChange}
                  style={{ width: '70%' }}
                  className='select'
                >
                  {/* {children} */}
                </AntSelect>
                :
                <Input name={field.name} type={field.inputType} />
              }
            </FieldContainer>
          ))
        }
        <Divider orientation='left'>
          <Title style={{ fontSize: 20, color: 'gray', textTransform: 'uppercase' }}>Caractéristiques</Title>
        </Divider>
        <div className="specs">
          {
            formik.values.specifications.map((spec, index) => (
              <div className="spec" key={index}>
                <div className="key">{spec.key} :</div>
                <div className="value">{spec.value}</div>
                <div className="del">
                  <Button type="danger" shape="circle" icon={
                    <CloseOutlined />
                  } 
                  onClick={() => formik.setFieldValue('specifications', formik.values.specifications.filter((s, i) => i !== index))}
                  size='small'
                  />
                </div>
              </div>
            ))
          }
        </div>
        <Button className='btn add-spec' type='default' onClick={setVisibleSpecForm}>Ajouter</Button>
        <SpecForm visible={visibleSpecForm} onClose={() => setVisibleSpecForm(false)} onSubmit={onSpecSubmit} />
      </FormContainer>
    </Drawer>
  )
}

export default ProductAddForm