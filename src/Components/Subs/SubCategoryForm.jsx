import { Button, Modal, Select as AntSelect } from 'antd'
import React, { useEffect } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Label } from '../Commons/commons'
import * as yup from 'yup'
import { useFormik } from 'formik';
import { createSubCategoryAction, getCategorysAction } from '../../Redux/actions/categorys';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';

const { Option } = AntSelect;
const validSchema = yup.object({
    name: yup.string().required('Le nom est obligatoire'),
    categId: yup.number().required('Veuillez choisir une catégorie parent'),
})

export default function SubCategoryForm({visible, setVisible}) {
    const formik = useFormik({
        initialValues: { name: '', categId: '' },
        validationSchema: validSchema,
        onSubmit: values => createSubCategoryAction(values)(dispatch, cb =>{
            if(cb){ setVisible(false) }
        })
    })
    const { data: categs, loading: loadCategs } = useSelector(({categorys:{categorys}}) =>categorys);
    const { loading, error } = useSelector(({categorys:{createSub}}) =>createSub);
    const dispatch = useDispatch();

  useEffect(() =>{
    getCategorysAction(dispatch)
  }, [dispatch])

  return (
    <Modal closable 
        visible={visible} 
        onCancel={() =>setVisible(false)}
        centered
        footer={
            <Button className='btn btn-submit' type='primary' loading={loading} onClick={formik.handleSubmit}>Enregistrer</Button>
        }
    >
        <FormContainer className='type-form'>
            <div className="title">Ajouter une sous-catégorie</div>
            {
                error ?
                <Alert severity='error' className='alert' > {error} </Alert>:null
            }
            <FieldContainer>
                <Label>Nom</Label>
                <Input placeholder='Nom'
                    className={formik.touched.name && formik.errors.name ? 'error': ''}
                    onChange={formik.handleChange('name')}
                />
                {
                    formik.touched.name && formik.errors.name && <FieldError>{formik.errors.name}</FieldError>
                }
            </FieldContainer>
            <FieldContainer>
                <Label>Catégorie parent</Label>
                <AntSelect
                    size='middle'
                    placeholder="Choisir une catégorie parent"
                    className={`select ${formik.touched.categId && formik.errors.categId ? 'error': ''}`}
                    onChange={(value) => formik.setFieldValue('categId', value)}
                    loading={loadCategs}
                >
                    {
                        categs.map(categ =>(
                            <Option value={categ.id} key={categ.id}>{categ.name}</Option>
                        ))
                    }
                </AntSelect>
                {
                    formik.touched.categId && formik.errors.categId && <FieldError>{formik.errors.categId}</FieldError>
                }
            </FieldContainer>
        </FormContainer>
    </Modal>
  )
}
