import { AiOutlinePicture } from 'react-icons/ai';
import { Button, Modal } from 'antd'
import React from 'react'
import { FieldContainer, FormContainer, Input, Label } from '../Commons/commons'

export default function ProductTypeForm({visible, setVisible}) {
  return (
    <Modal closable 
        visible={visible} 
        centered
        onCancel={() =>setVisible(false)}
        footer={
            <Button className='btn btn-submit' type='primary' onClick={() =>setVisible(false)}>Enregistrer</Button>
        }
    >
        <FormContainer className='type-form'>
            <div className="title">Ajouter un type de produit</div>
            <FieldContainer className='field'>
            <Label>Icon</Label>
            <input type="file" name="image" id="image" style={{ display: 'none' }} />
            <div className="image-container">
                <AiOutlinePicture className='icon' />
                <div className="descript">Cliquer pour télécharger une image</div>
            </div>
            </FieldContainer>
            <FieldContainer>
                <Label>Nom</Label>
                <Input placeholder='Nom'/>
            </FieldContainer>
        </FormContainer>
    </Modal>
  )
}
