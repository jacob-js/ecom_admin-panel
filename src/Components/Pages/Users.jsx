import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAction } from '../../Redux/actions/users';
import { usersColumns } from '../../Utils/tablesColumns';
import { Input } from '../Commons/commons'

export default function Users() {
    const limit = 10;
    const [offset, setOffset] = useState(0);
    const dispatch = useDispatch();
    const { loading, rows, count } = useSelector(({ users: { users } }) => users);

    useEffect(() =>{
        getUsersAction(limit, offset)(dispatch)
    }, [limit, offset, dispatch]);

  return (
    <div className="users">
        <div className="header">
            <div className="title">Clients</div>
            <div className="bar">
                <div className="field">
                    <Input placeholder="Rechercher par le nom/email/phone" />
                </div>
            </div>
        </div>

        <div className="content">
            <Table dataSource={rows} loading={loading} columns={usersColumns()} 
                className='table'
                pagination={{
                    total: count,
                    pageSize: limit,
                    onChange: (page) => setOffset((page - 1)*limit)
                }} 
            />
        </div>
    </div>
  )
}
