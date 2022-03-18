import { useState } from "react";
import styled from "styled-components";
import { getFieldError } from "../../Utils/helpers";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
`;

export const Input = styled.input`
    outline: none;
    width: 100%;
    height: 42px;
    border: 1px solid rgb(218, 225, 231);
    padding: 0 10px;
    border-radius: 10px;
    display: block !important;
    transition: .2s ease-in-out;

    &::placeholder {
        color: rgba(200, 200, 200, 1);
    }
    
    &:focus {
        outline: none;
        border-color: #dd4900;
    }
    &.error{
        border: 1px solid red;
    }
`;

export const TextArea = styled.textarea`
    outline: none;
    width: 100%;
    border: 1px solid rgb(218, 225, 231);
    padding: 10px;
    border-radius: 10px;
    display: block !important;
    transition: .2s ease-in-out;

    &::placeholder {
        color: rgba(200, 200, 200, 1);
    }
    &:focus {
        outline: none;
        border-color: #dd4900;
    }
    &.error{
        border: 1px solid red;
    }
`;

export const Select = styled.select`
    outline: none;
    width: 100%;
    height: 42px;
    border: 1px solid rgb(218, 225, 231);
    padding: 0 10px;
    border-radius: 10px;
    display: block !important;
    transition: .5s ease-in-out;

    &::placeholder {
        color: rgba(200, 200, 200, 1);
    }

    &:focus {
        outline: none;
        border-color: #F27405;
    }
    &.error{
        border: 1px solid red;
    }
`;

export const Title = styled.h1`
    font-weight: bold;
    margin: 0;
    line-height: 1.24;
    font-size: 24px;
`;

export const Link = styled.a`
    color: #F27405;
    text-decoration: none;

    &:hover {
        color: #F27405;
        text-decoration: none;
    }
`

export const FieldContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`

export const FieldError = styled.span`
    color: rgb(216, 0, 0);
    font-size: 14px;
    max-height: 18px,
    margin: 0 10px;
`

export const Label = styled.label`
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-right: 6px;
    color: rgb(75, 86, 107);
`

export const PasswordInput = ({form}) =>{
    const [visible, setVisible] = useState()

    return(
        <div className="input-pass">
            <Input type={visible ? 'text': 'password'} placeholder="Mot de passe" className={
                form.errors.password && form.touched.password || getFieldError([], 'password') ? 'error' : ''
            } onChange={form.handleChange('password')} />
            { visible ? <EyeOutlined className='eye' onClick={() => setVisible(false)} /> :
                <EyeInvisibleOutlined className='eye' onClick={() => setVisible(true)} />
            }
        </div>
    )
}