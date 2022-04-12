import { AiOutlinePicture } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Button, Modal } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Label } from '../Commons/commons'
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup'
import { useFormik } from 'formik';

export default function PersonnelForm({visible, setVisible}) {
    const formik = useFormik({
        initialValues: { username: '', role: '' }
    })
  return (
    <Modal closable 
        visible={visible} 
        onCancel={() =>setVisible(false)}
        centered
        footer={
            <Button loading={false} className='btn btn-submit' type='primary' onClick={formik.handleSubmit}>Ajouter</Button>
        }
    >
        <FormContainer className='type-form'>
            <div className="title">Ajouter un personnel</div>
            <FieldContainer>
                <Label>Nom d'utilisateur</Label>
                <Input placeholder='Email ou numéro de téléphone'
                    className={formik.touched.name && formik.errors.name ? 'error': ''}
                    onChange={formik.handleChange('name')}
                    value={formik.values.name}
                />
                {
                    formik.touched.name && formik.errors.name && <FieldError>{formik.errors.name}</FieldError>
                }
            </FieldContainer>

            <FieldContainer>
                <Label>Rôle</Label>
                <Input placeholder='Rôle du personnel'
                    className={formik.touched.name && formik.errors.name ? 'error': ''}
                    onChange={formik.handleChange('role')}
                    value={formik.values.name}
                />
                {
                    formik.touched.name && formik.errors.name && <FieldError>{formik.errors.name}</FieldError>
                }
            </FieldContainer>
        </FormContainer>
    </Modal>
  )
}
