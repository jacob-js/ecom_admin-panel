import { AiOutlinePicture } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Button, Modal, Select as AntSelect } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Label } from '../Commons/commons'
import { Checkbox, Label as AtomLabel } from "atomize";
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, getProductTypesAction } from '../../Redux/actions/categorys';
import * as yup from 'yup'
import { useFormik } from 'formik';
import Compressor from 'compressorjs';

const { Option } = AntSelect;
const validSchema = yup.object({
    name: yup.string().required('Le nom est obligatoire'),
    productType: yup.string().required('Le type est obligatoire'),
    isTop: yup.boolean(),
    image: yup.string().when('isTop', {
        is: true,
        then: yup.string().required('L\'image est obligatoire')
    })
})

export default function CategoryForm({visible, setVisible}) {
    const dispatch = useDispatch();
    const [ pic, setPic ] = useState();
    const [ file, setFile ] = useState();
    const inputFileRef = useRef();
    const { data, loading } = useSelector(({categorys:{createCategory}}) =>createCategory);
    const { data: parentCategs, loading: loadingParents } = useSelector(({ categorys: { productTypes } }) =>productTypes);
    const formik = useFormik({
        initialValues: { name: '', productType: '', isTop: false, image: '' },
        validationSchema: validSchema,
        onSubmit: values => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('typeId', values.productType);
            formData.append('isTop', values.isTop);
            formData.append('cover', file);
            createCategoryAction(formData)(dispatch, cb =>{
                if(cb){ setVisible(false) }
            })
        }
    })

    useEffect(() =>{
        getProductTypesAction(dispatch)
    }, [dispatch]);

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
    <Modal closable 
        visible={visible} 
        onCancel={() =>setVisible(false)}
        centered
        footer={
            <Button loading={loading} className='btn btn-submit' type='primary' onClick={formik.handleSubmit}>Enregistrer</Button>
        }
    >
        <FormContainer className='type-form'>
            <div className="title">Ajouter une catégorie</div>
            <FieldContainer className='field'>
            <Label>Image</Label>
            <input type="file" name="image" id="image" style={{ display: 'none' }} ref={inputFileRef} onChange={onImgChange} />
            <div className={`image-container ${formik.touched.file && formik.errors.file ? 'error': ''}`}>
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
            </FieldContainer>
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
                <Label>Type</Label>
                <AntSelect
                    size='middle'
                    placeholder="Choisir un type"
                    className={`select ${formik.touched.productType && formik.errors.productType ? 'error': ''}`}
                    onChange={(value) => formik.setFieldValue('productType', value)}
                    loading={loadingParents}
                >
                    {
                        parentCategs.map(type =>(
                            <Option key={type.id} value={type.id}>{type.name}</Option>
                        ))
                    }
                </AntSelect>
                {
                    formik.touched.productType && formik.errors.productType && <FieldError>{formik.errors.productType}</FieldError>
                }
            </FieldContainer>
            <FieldContainer>
                <AtomLabel align="center" textWeight="normal" m={{ b: "0.5rem" }}>
                    <Checkbox 
                        checked={formik.values.isTop}
                        inactiveColor="danger400"
                        activeColor="danger700"
                        onChange={() => formik.setFieldValue('isTop', !formik.values.isTop)}
                    /> Catégorie top
                </AtomLabel>
            </FieldContainer>
        </FormContainer>
    </Modal>
  )
}
