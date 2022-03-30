import React, { useEffect } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Link, PasswordInput, Title } from '../Commons/commons';
import { useFormik } from 'formik';
import { getFieldError } from '../../Utils/helpers';
import { Button } from 'antd';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import Aos from 'aos';
import { loginAction } from '../../Redux/actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';

const schema = yup.object({
    username: yup.string().required('Ce champ est obligatoire'),
    password: yup.string().required('Ce champ est obligatoire')
})

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { error, loading } = useSelector(({ users: { login } }) =>login);
    const form = useFormik({
        initialValues: { username: '', password: '' },
        onSubmit: values => loginAction(values)(dispatch, history),
        validationSchema: schema,
        validateOnBlur: true
    });

    useEffect(() =>{
        Aos.init({ duration: 500 });
    })

  return (
    <div className="auth">
        <div className="card" data-aos='fade-down'>
            <div className="left"></div>
            <div className="right">
                <Title className='title'>Connexion</Title>
                <FormContainer onSubmit={form.handleSubmit}>
                    {
                        error ?
                        <Alert severity='error' className='alert' > {error} </Alert>:null
                    }
                    <FieldContainer>
                        <Input type="text" placeholder="Email ou numéro de téléphone" className={
                            form.errors.username || getFieldError([], 'username') ? 'error' : ''
                        } onChange={form.handleChange('username')} autoComplete='off' />
                        {form.errors.username && form.touched.username ? <FieldError>{form.errors.username}</FieldError> : 
                        getFieldError([], 'username') ? <FieldError>{getFieldError([], 'username')}</FieldError> : null}
                    </FieldContainer>
                    <FieldContainer>
                        <PasswordInput form={form} field='password' />
                        {form.errors.password && form.touched.password ? <FieldError>{form.errors.password}</FieldError> : 
                        getFieldError([], 'password') ? <FieldError>{getFieldError([], 'password')}</FieldError> : null}
                    </FieldContainer>
                    <Button loading={loading} type='primary' htmlType='submit' className='btn login'>Connexion</Button>
                </FormContainer>
                <div className="extra-links">
                    <Link>Mot de passe oublié ?</Link>
                    <Link onClick={() =>history.push('/signup')}>Créer un compte</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;