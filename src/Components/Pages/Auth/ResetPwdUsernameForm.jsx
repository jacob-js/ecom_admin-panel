import { Button } from 'antd';
import React, { useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Title } from '../../Commons/commons';
import { ArrowRightOutlined } from '@ant-design/icons/lib/icons';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getFieldError } from '../../../Utils/helpers';

const schema = yup.object({
    email: yup.string().email("L'email n'est pas valide").required('Ce champ est obligatoire')
});
const sendResetPwdUsernameApi = async(username) =>{
    return (await axios.get(`/api/v1/users/reset-password?email=${username}`))?.data
}

export default function ResetPwdUsernameForm() {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState([]);
    const history = useHistory();

    const mutation = useMutation(sendResetPwdUsernameApi, {
        onSuccess: (res) =>{
            setloading(false);
            const data = res.data
            history.push({ pathname: '/enter-otp', state: data });
        },
        onError: (error) =>{
            const res = error.response;
            if(res){
                if(typeof(res.data.message) === 'string'){
                    seterror([res.data.message]);
                }else{
                    seterror(res.data.message);
                }
            }
            setloading(false);
        },
        onMutate: (values) =>{
            setloading(true);
            seterror([]);
        }
    })

    const form = useFormik({
        initialValues: { email: '' },
        onSubmit: values =>  { mutation.mutate(values.email)},
        validationSchema: schema
    });

    return (
        <div className='auth'>
            <div data-aos='fade-right' className="card confirm-account">
                <FormContainer onSubmit={form.handleSubmit}>
                    <Title>Vérifier mon identité</Title>
                    <p>
                        Entrez votre email pour obtenir un code de confirmation pour réinitialiser votre 
                        mot de passe.
                    </p>
                    <div className="fields">
                        {
                            typeof(error[0]) === 'string' ?
                            <Alert severity='error' className='alert' > {error[0]} </Alert>:null
                        }
                        <FieldContainer>
                            <Input type="email" placeholder="Email" className={
                                (form.errors.email && form.touched.email) || getFieldError(error, 'email') ? 'error' : ''
                            } onChange={form.handleChange('email')} />
                            {form.errors.email && form.touched.email ? <FieldError>{form.errors.email}</FieldError>: null}
                        </FieldContainer>
                        <Button loading={loading} className='btn login' htmlType='submit' icon={ <ArrowRightOutlined /> } block></Button>
                    </div>
                </FormContainer>
            </div>
        </div>
    )
}
