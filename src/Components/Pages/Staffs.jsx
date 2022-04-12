import { PlusOutlined } from '@ant-design/icons'
import { Button, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminsAction } from '../../Redux/actions/users'
import { staffColumns } from '../../Utils/tablesColumns'
import { Input } from '../Commons/commons'
import PersonnelForm from '../Subs/PersonnelForm'

function Staffs() {
    const [visibleAddForm, setVisibleAddForm] = useState();
    const { data, loading } = useSelector(({ users: {admins} }) =>admins);
    const dispatch = useDispatch();

    useEffect(() =>{
        getAdminsAction(dispatch)
    }, [dispatch]);

  return (
    <div className='staff'>
        <div className="header">
            <div className="title">Notre équipe</div>
            <div className="bar">
                <div className="field">
                    <Input placeholder="Rechercher par le nom/email/phone" />
                </div>
                <div className="field">
                    <Select className='select' placeholder="rôle du personnel" ></Select>
                </div>
                <div className="field">
                    <Button type='primary' className='btn add-staff' icon={<PlusOutlined />} block onClick={setVisibleAddForm}>
                        Ajouter un personnel
                    </Button>
                </div>
            </div>
        </div>

        <div className="content">
            <Table dataSource={data} loading={loading} columns={staffColumns()} 
                className='table'
                // pagination={{
                //     total: count,
                //     pageSize: limit,
                //     onChange: (page) => setOffset((page - 1)*limit)
                // }} 
            />
        </div>
        <PersonnelForm visible={visibleAddForm} setVisible={setVisibleAddForm} />
    </div>
  )
}

export default Staffs