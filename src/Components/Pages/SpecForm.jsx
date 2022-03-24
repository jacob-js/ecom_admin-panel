import { Modal } from 'antd'
import React from 'react';
import { FieldContainer, FieldError, FormContainer, Input, Label, Title } from '../Commons/commons';
import * as yup from 'yup';
import { useFormik } from 'formik';

const fields = [
    {
        name: 'key',
        label: 'Nom de la caractéristique',
    },
    {
        name: 'value',
        label: 'Valeur de la caractéristique',
    }
];
const schema = yup.object({
    key: yup.string().required('Le nom de la caractéristique est obligatoire'),
    value: yup.string().required('La valeur de la caractéristique est obligatoire')
})

export default function SpecForm({ visible, onClose, onSubmit }) {
    const formik = useFormik({
        initialValues: { key: '', value: '' },
        validationSchema: schema,
        onSubmit: (values) => {
            onSubmit(values)
            formik.resetForm();
        }
    })
  return (
    <Modal visible={visible}
        onCancel={onClose}
        onOk={formik.handleSubmit}
        cancelText="Annuler"
        okText="Ajouter"
    >
        <Title style={{
            fontSize: '20px',
            marginLeft: '5%',
            marginBottom: 20
        }}>Ajouter une caractéristique</Title>
        <FormContainer>
            {
                fields.map(field => (
                    <FieldContainer key={field.name}>
                        <Label>{field.label}</Label>
                        <Input name={field.name} 
                            className={ formik.touched[field.name] && formik.errors[field.name] ? 'error': ''}
                            onChange={formik.handleChange(field.name)}
                            value={formik.values[field.name]}
                        />
                        <FieldError>{formik.touched[field.name] && formik.errors[field.name]}</FieldError>
                    </FieldContainer>
                ))
            }
        </FormContainer>
    </Modal>
  )
}
