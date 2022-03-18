import React, { useState } from 'react'
import { ArrowRightOutlined } from '@ant-design/icons/lib/icons';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getFieldError } from '../../Utils/helpers';
import { Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { provinces } from '../../Utils/data';
import { Button } from 'antd';
import { PasswordInput, FieldContainer, FieldError, FormContainer, Input, Link, Select, Title  } from '../Commons/commons';

const schema = yup.object({
  fullname: yup.string().required("Le nom complet est requis"),
  email: yup.string().email("L'email n'est pas valide").required("L'email est requis"),
  password: yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères")
              .required("Le mot de passe est requis").matches(/[a-zA-Z]/, "Le mot de passe doit contenir au moins une lettre")
              .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  state: yup.string().required("La province est requise"),
  phone: yup.string().required("Le numéro de téléphone est requis")
                      .matches(/^[+243]/, "Le numéro de téléphone doit commencer avec +243"),
  confirmPassword: yup.string().when('password', {
      is: (password) => password && password.length >= 6 && password.match(/[a-zA-Z]/) && password.match(/[0-9]/),
      then: yup.string().required('Veuillez confirmer le mot de passe').oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
  }),
  profession: yup.string().required('La profession est requise')
})

function Signup() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState([]);
  const history = useHistory();
  const form = useFormik({
    initialValues: { fullname: '', password: '', email: '', phone: '', state: '', confirmPassword: '', country: 'DRC', profession: '' },
    // onSubmit: values =>  mutation.mutate(values),
    validationSchema: schema
  });

  return (
    <div className="auth">
      <div className="card signup" data-aos='fade-up'>
        <div className="left"></div>
        <div className="right">
          <FormContainer onSubmit={form.handleSubmit}>
              <Title className='title'>Inscription</Title>
              <div className="fields">
                  {
                      typeof(error[0]) === 'string' ?
                      <Alert severity='error' className='alert' > {error[0]} </Alert>:null
                  }
                  <FieldContainer>
                      <Input type="text" placeholder="Nom complet" className={
                          form.errors.fullname && form.touched.fullname || getFieldError(error, 'fullname') ? 'error' : ''
                      } onChange={form.handleChange('fullname')} />
                      {form.errors.fullname && form.touched.fullname ? <FieldError>{form.errors.fullname}</FieldError> : 
                      getFieldError(error, 'fullname') ? <FieldError>{getFieldError(error, 'fullname')}</FieldError> : null}
                  </FieldContainer>
                  <FieldContainer>
                      <Input type="text" placeholder="N° de téléphone" className={
                          form.errors.phone && form.touched.phone || getFieldError(error, 'phone') ? 'error' : ''
                      } onChange={form.handleChange('phone')} />
                      {form.errors.phone && form.touched.phone ? <FieldError>{form.errors.phone}</FieldError> : 
                      getFieldError(error, 'phone') ? <FieldError>{getFieldError(error, 'phone')}</FieldError> : null}
                  </FieldContainer>
                  <FieldContainer>
                      <Input type="text" placeholder="Email" className={
                          form.errors.email && form.touched.email || getFieldError(error, 'email') ? 'error' : ''
                      } onChange={form.handleChange('email')} />
                      {form.errors.email && form.touched.email ? <FieldError>{form.errors.email}</FieldError> : 
                      getFieldError(error, 'email') ? <FieldError>{getFieldError(error, 'email')}</FieldError> : null}
                  </FieldContainer>
                  <FieldContainer>
                      <Select placeholder='Province' onChange={form.handleChange('state')} className={
                          form.errors.state && form.touched.state || getFieldError(error, 'state') ? 'error' : ''
                      } >
                          <option value="" selected disabled>Selectionner la province</option>
                          {
                              provinces.map((province, index) => {
                                  return <option key={index} value={province}>{province}</option>
                              })
                          }
                          {form.errors.state && form.touched.state ? <FieldError>{form.errors.state}</FieldError> : 
                          getFieldError(error, 'state') ? <FieldError>{getFieldError(error, 'state')}</FieldError> : null}
                      </Select>
                  </FieldContainer>
                  <FieldContainer>
                      <Input type="text" placeholder="Profession" className={
                          form.errors.profession && form.touched.profession || getFieldError(error, 'profession') ? 'error' : ''
                      } onChange={form.handleChange('profession')} />
                      {form.errors.profession && form.touched.profession ? <FieldError>{form.errors.profession}</FieldError> : 
                      getFieldError(error, 'profession') ? <FieldError>{getFieldError(error, 'profession')}</FieldError> : null}
                  </FieldContainer>
                  <FieldContainer>
                      <PasswordInput form={form} field='password' />
                      {form.errors.password && form.touched.password ? <FieldError>{form.errors.password}</FieldError> : 
                      getFieldError(error, 'password') ? <FieldError>{getFieldError(error, 'password')}</FieldError> : null}
                  </FieldContainer>
                  <FieldContainer>
                      <PasswordInput form={form} field='confirmPassword' placeholder='Confirmer le mot de passe' />
                      {form.errors.confirmPassword && form.touched.confirmPassword ? <FieldError>{form.errors.confirmPassword}</FieldError> : 
                      getFieldError(error, 'confirmPassword') ? <FieldError>{getFieldError(error, 'confirmPassword')}</FieldError> : null}
                  </FieldContainer>
                  <Button loading={loading} className='btn login' htmlType='submit' icon={ <ArrowRightOutlined /> } block>
                    Inscription
                  </Button>
              </div>
          </FormContainer>
          <div className="">Avez-vous déjà un compte ? <Link onClick={() =>history.push('/login')}>Connectez-vous</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Signup;