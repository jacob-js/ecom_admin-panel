import React from 'react'
import { FieldContainer, FormContainer, Input, PasswordInput } from '../Commons/commons';
import { useFormik } from 'formik';
import { getFieldError } from '../../Utils/helpers';

function Login() {
    const form = useFormik({
        initialValues: { username: '', password: '' }
    });

  return (
    <div className="auth">
        <div className="card">
            <div className="left"></div>
            <div className="right">
                <FormContainer>
                    <FieldContainer>
                        <Input type="text" placeholder="Email ou numéro de téléphone" />
                    </FieldContainer>
                    <FieldContainer>
                        <PasswordInput form={form} />
                        {/* {form.errors.password && form.touched.password ? <FieldError>{form.errors.password}</FieldError> : 
                        getFieldError(error, 'password') ? <FieldError>{getFieldError(error, 'password')}</FieldError> : null} */}
                    </FieldContainer>
                </FormContainer>
            </div>
        </div>
    </div>
  )
}

export default Login;