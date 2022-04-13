import { AiOutlinePicture } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Button, Modal } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Label } from '../Commons/commons'
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { createAdminAction } from '../../Redux/actions/users';
import { Alert } from '@mui/material';

const validSchema = yup.object({
    username: yup.string().required("Ce champs est obligatoire"),
    role: yup.string().required("Ce champs est obligatoire")
});

export default function PersonnelForm({visible, setVisible}) {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(({ users: { createAdmin } }) => createAdmin);
    const formik = useFormik({
        initialValues: { username: '', role: '' },
        validationSchema: validSchema,
        onSubmit: values =>{
            createAdminAction(values)(dispatch, cb =>{
                if(cb) {setVisible(false); formik.resetForm()}
            })
        }
    })
  return (
    <Modal closable 
        visible={visible} 
        onCancel={() =>setVisible(false)}
        centered
        footer={
            <Button loading={loading} className='btn btn-submit' type='primary' onClick={formik.handleSubmit}>Ajouter</Button>
        }
    >
        <FormContainer className='type-form'>
            <div className="title">Ajouter un personnel</div>
            {
                error && typeof error === 'string' ?
                <Alert severity='error' className='alert' > {error} </Alert>:null
            }
            <FieldContainer>
                <Label>Nom d'utilisateur</Label>
                <Input placeholder='Email ou numéro de téléphone'
                    className={formik.touched.username && formik.errors.username ? 'error': ''}
                    onChange={formik.handleChange('username')}
                    value={formik.values.username}
                />
                {
                    formik.touched.username && formik.errors.username && <FieldError>{formik.errors.username}</FieldError>
                }
            </FieldContainer>

            <FieldContainer>
                <Label>Rôle</Label>
                <Input placeholder='Rôle du personnel'
                    className={formik.touched.role && formik.errors.role ? 'error': ''}
                    onChange={formik.handleChange('role')}
                    value={formik.values.role}
                />
                {
                    formik.touched.role && formik.errors.role && <FieldError>{formik.errors.role}</FieldError>
                }
            </FieldContainer>
        </FormContainer>
    </Modal>
  )
}
