import { Button, Modal, Select as AntSelect } from 'antd'
import React from 'react'
import { FieldContainer, FormContainer, Input, Label } from '../Commons/commons'

export default function SubCategoryForm({visible, setVisible}) {
  return (
    <Modal closable 
        visible={visible} 
        onCancel={() =>setVisible(false)}
        centered
        footer={
            <Button className='btn btn-submit' type='primary' onClick={() =>setVisible(false)}>Enregistrer</Button>
        }
    >
        <FormContainer className='type-form'>
            <div className="title">Ajouter une sous-catégorie</div>
            <FieldContainer>
                <Label>Nom</Label>
                <Input placeholder='Nom'/>
            </FieldContainer>
            <FieldContainer>
                <Label>Type</Label>
                <AntSelect
                    size='middle'
                    placeholder="Choisir une catégorie parent"
                    // onChange={handleChange}
                    className='select'
                >
                    {/* {children} */}
                </AntSelect>
            </FieldContainer>
        </FormContainer>
    </Modal>
  )
}
