import { AiOutlinePicture } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Modal } from 'antd'
import React, { useRef, useState } from 'react';
import { FieldContainer, FieldError, FormContainer, Input, Label, Title } from '../Commons/commons';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { handleImageUpload } from '../../Utils/helpers';
import { addProductColorAction } from '../../Redux/actions/products';
import { Alert } from '@mui/material';

const fields = [
    {
        name: 'name',
        label: 'Nom de la couleur ex: (Rouge, Bleu, Vert...)',
    }
];
const schema = yup.object({
    name: yup.string().required('Le nom de la couleur est obligatoire'),
    image: yup.mixed().required('L\'image du produit est obligatoire')
})

export default function ColorForm({ visible, onClose, onSubmit, product }) {
    const [ pic, setPic ] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const inputFileRef = useRef();
    const formik = useFormik({
        initialValues: { name: '', image: '' },
        validationSchema: schema,
        onSubmit: async(values) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('image', values.image);
            formData.append('productId', product.id);
            setLoading(true);
            try {
                const res = await addProductColorAction(formData);
                if(res.status === 201) {
                    onSubmit(res.data.data);
                    formik.resetForm();
                    onClose();
                    setPic(null);
                }
            } catch (error) {
                const res = error.response;
                setError(res?.data?.message || "Une erreur est survenue lors de l'ajout de la couleur");
            }
            setLoading(false);
        }
    });

    const onImgChange = async e =>{
        const { file, preview } = await handleImageUpload(e);
        if(file){
            setPic(preview);
            formik.setFieldValue('image', file);
        }
    };

  return (
    <Modal visible={visible}
        onCancel={onClose}
        onOk={formik.handleSubmit}
        cancelText="Annuler"
        okText="Ajouter"
        okButtonProps={{ loading: loading, className: 'btn' }}
    >
        <Title style={{
            fontSize: '20px',
            marginLeft: '5%',
            marginBottom: 20
        }}>Ajouter une couleure du produit</Title>
        <FormContainer>
            {
                typeof(error) === 'string' ?
                <Alert severity='error' className='alert' > {error} </Alert>:
                typeof(error) === 'object' ?
                error.map(err => <Alert severity='error' className='alert' > {err?.message} </Alert>) :null
            }
            <FieldContainer className='field'>
                <Label>Image du produit pour la couleur: {formik.values.name}</Label>
                <input type="file" name="image" id="image" style={{ display: 'none' }} ref={inputFileRef} onChange={onImgChange} />
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
            </FieldContainer>
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