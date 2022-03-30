import { AiOutlinePicture } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Button, Modal } from 'antd'
import React, { useRef, useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Label } from '../Commons/commons'
import Compressor from 'compressorjs';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createProductTypeAction } from '../../Redux/actions/categorys';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';

const validSchema = yup.object({
    name: yup.string().required("Le nom est obligatoire"),
    file: yup.number().required("L'icon est obligatoire")
})

export default function ProductTypeForm({visible, setVisible}) {
    const inputFileRef = useRef();
    const dispatch = useDispatch();
    const [ pic, setPic ] = useState();
    const [ file, setFile ] = useState();
    const { loading, error } = useSelector(({ categorys: { createProductType } }) =>createProductType);
    const formik = useFormik({
        initialValues: { name: '', file: '' },
        validationSchema: validSchema,
        onSubmit: values => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('icon', file)
            createProductTypeAction(formData)(dispatch, cb =>{
                if(cb){ setVisible(false) }
            })
        }
    })

    const onImgChange = e =>{
        const file = e.target.files[0];
        if(file){
            new Compressor(file, {
                quality: 0.5,
                success(result) {
                    setFile(result);
                }
            });
            formik.setFieldValue('file', 1)
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
        centered
        onCancel={() =>setVisible(false)}
        footer={
            <Button className='btn btn-submit' loading={loading} type='primary' onClick={formik.handleSubmit}>Enregistrer</Button>
        }
    >
        <FormContainer className='type-form'>
            <div className="title">Ajouter un type de produit</div>
            {
                error ?
                <Alert severity='error' className='alert' > {error} </Alert>:null
            }
            <FieldContainer className='field'>
                <Label>Icon</Label>
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
                    formik.touched.file && formik.errors.file && <FieldError>{formik.errors.file}</FieldError>
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
        </FormContainer>
    </Modal>
  )
}
