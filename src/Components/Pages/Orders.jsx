import { Table } from 'antd'
import React from 'react'
import { ordersColumns } from '../../Utils/tablesColumns'
import { Input, Select } from '../Commons/commons'

export default function Orders() {
  return (
    <div className='orders'>
        <div className="header">
            <div className="title">Commandes</div>
            <div className="bar">
                <div className="field">
                    <Input placeholder="Rechercher par le n° de tél" />
                </div>
                <div className="field">
                    <Select placeholder="Etat" defaultValue="all">
                        <option value="all">Etat</option>
                    </Select>
                </div>
                <div className="field">
                    <Select placeholder='Limites de commandes' defaultValue="all">
                        <option value="all">Limites de commandes</option>
                        <option value="">7 dérniers jours</option>
                    </Select>
                </div>
            </div>
        </div>

        <div className="content">
            <Table dataSource={[]} columns={ordersColumns} className='table' />
        </div>
    </div>
  )
}
