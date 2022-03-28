import { AiOutlinePicture } from 'react-icons/ai';
import { Button, Modal, Select as AntSelect } from 'antd'
import React from 'react'
import { FieldContainer, FormContainer, Input, Label } from '../Commons/commons'
import { Checkbox, Label as AtomLabel } from "atomize";

export default function CategoryForm({visible, setVisible}) {
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
            <div className="title">Ajouter une catégorie</div>
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
            <FieldContainer>
                <Label>Type</Label>
                <AntSelect
                    size='middle'
                    placeholder="Choisir un type"
                    // onChange={handleChange}
                    className='select'
                >
                    {/* {children} */}
                </AntSelect>
            </FieldContainer>
            <FieldContainer>
                <AtomLabel align="center" textWeight="normal" m={{ b: "0.5rem" }}>
                    <Checkbox 
                        checked={false}
                        inactiveColor="danger400"
                        activeColor="danger700"
                    /> Catégorie top
                </AtomLabel>
            </FieldContainer>
        </FormContainer>
    </Modal>
  )
}
