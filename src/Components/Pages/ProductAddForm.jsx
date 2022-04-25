import { AiOutlinePicture } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Drawer } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Label, Select, TextArea, Title } from '../Commons/commons';
import { Select as AntSelect, Divider, Button } from 'antd';
import SpecForm from '../Subs/SpecForm';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { CloseOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import Compressor from 'compressorjs';
import { getCategorysAction } from '../../Redux/actions/categorys';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../Redux/actions/products';
import { Alert } from '@mui/material';

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
    name: 'categoryId',
    label: 'Catégorie du produit',
    type: 'select',
    placeholder: "Choisir une catégorie"
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
    placeholder: "Choisir une dévise"
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
    type: 'array',
    value: []
  }
];

export const productSchema = yup.object({
  name: yup.string().required('Le nom du produit est réquis'),
  description: yup.string().required('La description est réquise'),
  categoryId: yup.string().uuid().required('La categorie est réquise'),
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
  sizes: yup.array(yup.string()),
  image: yup.number().required("Veuillez télécharger une image")
})

function ProductAddForm({onClose, visible}) {
  const [visibleSpecForm, setVisibleSpecForm] = useState(false);
  const [ pic, setPic ] = useState();
  const [ file, setFile ] = useState();
  const inputFileRef = useRef();
  const { data: categs } = useSelector(({categorys:{categorys}}) =>categorys);
  const { loading, error } = useSelector(({ products: { createProduct } }) =>createProduct)
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: fields.reduce((acc, field) => {
      acc[field.name] = field.value
      return acc
    }, { specifications: [], image: '' }),
    validationSchema: productSchema,
    onSubmit: values =>{
      const formData = new FormData();
      fields.forEach(field =>{
        if(field.type === 'array'){
          formData.append(field.name, JSON.stringify(values[field.name]) || null);
        }else{
          formData.append(field.name, values[field.name]);
        }
      })
      formData.append('specifications', JSON.stringify(values.specifications));
      formData.append('cover', file);
      createProduct(formData)(dispatch, cb =>{ if(cb){ formik.resetForm(); onClose() } })
    }
  });

  useEffect(() =>{
    getCategorysAction(dispatch)
  }, [dispatch]);

  const onSpecSubmit = (values) => {
    formik.setFieldValue('specifications', [...formik.values.specifications, values])
    setVisibleSpecForm(false)
  };

  const onImgChange = e =>{
    const file = e.target.files[0];
    if(file){
        new Compressor(file, {
            quality: 0.5,
            success(result) {
                setFile(result);
            }
        });
        formik.setFieldValue('image', 1)
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setPic(fileReader.result);
        };
    }
  };

  return (
    <Drawer width={950}
        placement='right' visible={visible} onClose={onClose}
        title={
            <div className="drawer-title">
                <Title className='title'>Ajouter un produit</Title>
                <div>Ajouter votre produit et ses informations nécessaires ici</div>
            </div>
        }
        headerStyle={{background: 'rgb(246, 249, 252)'}}
    >
      <FormContainer className='product-form' onSubmit={formik.handleSubmit}>
        {
            typeof(error) === 'string' ?
            <Alert severity='error' className='alert' > {error} </Alert>:null
        }
        <FieldContainer className='field'>
          <Label>Image du produit</Label>
          <input type="file" name="image" id="image" style={{ display: 'none' }} ref={inputFileRef} onChange={onImgChange} />
          <div className="right">
            <div className={`image-container ${formik.touched.image && formik.errors.image ? 'error': ''}`}>
                  {
                      pic ?
                      <div className="reader">
                          <img src={pic} alt="" />
                          <div className="edit" onClick={() =>inputFileRef.current.click()}>
                              <BiEdit />
                          </div>
                      </div>:
                          <div className="add" onClick={() =>inputFileRef.current.click()}>
                          <AiOutlinePicture className='icon' />
                          <div className="descript">Cliquer pour télécharger une image</div>
                      </div>
                  }
              </div>
              {
                  formik.touched.image && formik.errors.image && <FieldError>{formik.errors.image}</FieldError>
              }
          </div>
        </FieldContainer>
        {
          fields.map((field, index) => (
            <FieldContainer key={index} className='field'>
              <Label>{field.label}</Label>
              <div className="right">
                {
                  field.type === 'text' ?
                  <TextArea name={field.name} 
                    className={formik.touched[field.name] && formik.errors[field.name] ? 'error': ''}
                    onChange={formik.handleChange(field.name)}
                  />:
                  field.type === 'select' ?
                  <AntSelect name={field.name}
                    className={`select ${formik.errors[field.name] ? 'error': ''}`}
                    placeholder={field.placeholder}
                    onChange={value => formik.setFieldValue(field.name, value)}
                  >
                    {
                      field.name === 'categoryId' ?
                      <>
                        {
                          categs.map(categ =>(
                            <>
                              <Option value={categ.pk} style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{categ.name}</Option>
                              {
                                categ.SubCategorys?.map(sub =>(
                                  <Option value={sub.pk} key={sub.pk}
                                    style={{ marginLeft: 20, fontSize: 13 }}
                                  ><RightOutlined /> {sub.name}</Option>
                                ))
                              }
                            </>
                          ))
                        }
                      </>:
                      field.name === 'currency' &&
                      <>
                        <Option value='USD'>$</Option>
                        <Option value='CDF'>FC</Option>
                      </>
                    }
                  </AntSelect>:
                  field.type === 'array' ?
                  <AntSelect
                    mode="tags"
                    size='middle'
                    placeholder="Please select"
                    onChange={value => formik.setFieldValue(field.name, value)}
                    className={`select ${formik.errors[field.name] ? 'error': ''}`}
                  >
                  </AntSelect>
                  :
                  <Input name={field.name}
                    type={field.inputType}
                    className={formik.touched[field.name] && formik.errors[field.name] ? 'error': ''}
                    onChange={formik.handleChange(field.name)}
                  />
                }
                {
                  formik.errors[field.name] &&
                  <FieldError>{formik.errors[field.name]}</FieldError>
                }
              </div>
            </FieldContainer>
          ))
        }
        <Divider orientation='left' className='divider'>
          <Title style={{ fontSize: 16, color: 'gray', textTransform: 'uppercase' }}>Caractéristiques</Title>
          <Button size='small' className='btn add-spec' type='default' onClick={setVisibleSpecForm} icon={<PlusOutlined />}></Button>
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
                  className='btn del-spec'
                  />
                </div>
              </div>
            ))
          }
        </div>
        <SpecForm visible={visibleSpecForm} onClose={() => setVisibleSpecForm(false)} onSubmit={onSpecSubmit} />

        <Button type='primary' className='btn submit-prod' htmlType='submit' loading={loading}>Sauvegarder</Button>
      </FormContainer>
    </Drawer>
  )
}

export default ProductAddForm