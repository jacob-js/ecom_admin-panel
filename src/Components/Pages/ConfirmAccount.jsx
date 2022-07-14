import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Link, Title } from '../Commons/commons'
import { ArrowRightOutlined } from '@ant-design/icons/lib/icons';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { verifyAccountApi } from '../../Redux/actions/users';
import { sendNotif, getFieldError } from '../../Utils/helpers';
import Aos from 'aos';

const schema = yup.object({
    code: yup.string().required('Ce champ est obligatoire')
})

function ConfirmAccount() {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const history = useHistory();
    const token = history.location.state?.token

    useEffect(() =>{
        Aos.init({ duration: 500 });
    })

    const mutation = useMutation(verifyAccountApi, {
        onSuccess: (res) =>{
            setloading(false);
            sendNotif("Votre inscription a réussi, vous pouvez maintenant vous connecter si vous faites partie du personnel de BWETETA", 'success');
            history.push('/login');
        },
        onError: (error) =>{
            const res = error.response;
            if(res){
                seterror(res.data?.message || error.message);
            }
            setloading(false);
        },
        onMutate: (values) =>{
            setloading(true);
            seterror();
        }
    })

    const form = useFormik({
        initialValues: { code: '' },
        onSubmit: values =>  mutation.mutate({...values, token: token}),
        validationSchema: schema
    });

    return (
        <div className='auth'>
            <div data-aos='fade-right' className="card confirm-account">
                <FormContainer onSubmit={form.handleSubmit}>
                    <Title className='title'>Vérification du compte</Title>
                    <p className='descript'>Votre code de vérification vous été envoyé par mail, veuillez le confirmer pour continuer</p>
                    <div className="fields">
                        {
                            error && typeof(error) === 'string' ?
                            <Alert severity='error' className='alert' > {error} </Alert>:null
                        }
                        <FieldContainer>
                            <Input type="text" placeholder="Entrer le code de confirmation" className={
                                (form.errors.code && form.touched.code) || getFieldError(error, 'code') ? 'error' : ''
                            } onChange={form.handleChange('code')} />
                            {form.errors.code && form.touched.code ? <FieldError>{form.errors.code}</FieldError> : 
                            getFieldError(error, 'username') ? <FieldError>{getFieldError(error, 'username')}</FieldError> : null}
                        </FieldContainer>
                        <Button loading={loading} className='btn login' htmlType='submit' icon={ <ArrowRightOutlined /> } block>
                            Vérifier
                        </Button>
                        <div className="resend-link">{ false ? 'Chargement ...': <Link>Renvoyer le code</Link> }</div>
                    </div>
                </FormContainer>
            </div>
        </div>
    )
}

export default ConfirmAccount
