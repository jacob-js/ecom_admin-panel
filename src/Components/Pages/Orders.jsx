import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersAction, updateOrdersAction } from '../../Redux/actions/orders';
import { ordersColumns } from '../../Utils/tablesColumns'
import { Input, Select } from '../Commons/commons';
import { Dropdown, Anchor, Icon, Div } from "atomize";
import { sendNotif } from '../../Utils/helpers';

export default function Orders() {
    const { loading, rows, count } = useSelector(({ orders: { orders } }) =>orders);
    const dispatch = useDispatch();
    const limit = 10;
    const [offset, setOffset] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedItems, setItems] = useState([]);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    useEffect(() =>{
        getOrdersAction(offset, limit)(dispatch)
    }, [dispatch, offset, limit]);

    const rowSelection = {
        onChange: (selectedRowKeys) => {
          setItems(selectedRowKeys);
        },
        getCheckboxProps: (record) => ({
            disabled: record.status === 'delivered' || record.status === 'cancelled',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const changeOrdersStatus = async(status) =>{
        setLoadingUpdate(true);
        try {
            const res = await updateOrdersAction([...selectedItems], {status});
            if(res.status === 200){
                setLoadingUpdate(false);
                setItems([]);
                getOrdersAction(offset, limit)(dispatch);
                sendNotif(res.data.message, 'success');
            }
        } catch (error) {
            const res = error.response;
            if(res){
                sendNotif(res.data.message, 'error');
            }else{
                sendNotif('Echec, veuillez réessayer plutard', 'error');
            }
        }
        setLoadingUpdate(false);
    }

    const menuList = (
        <Div p={{ x: "1rem", y: "0.5rem" }}>
            <Anchor d="flex" p={{ y: "0.25rem" }} 
                onClick={() =>{setShowDropdown(false); changeOrdersStatus('delivered')}} textColor="success700" align="center">
                <Icon name="Checked" size="16px" color="success700" m={{ r: '10px' }} /> Livrée
            </Anchor>
            <Anchor d="flex" p={{ y: "0.25rem" }} 
                onClick={() =>{setShowDropdown(false); changeOrdersStatus('cancelled')}} textColor="danger700" align="center">
                <Icon name="Cross" size="16px" color="danger700" m={{ r: '10px' }} /> Annulée
            </Anchor>
            <Anchor d="flex" p={{ y: "0.25rem" }} 
                onClick={() =>{setShowDropdown(false); changeOrdersStatus('inProcess')}} textColor="gray700" align="center">
                <Icon name="Options" size="16px" color="gray700" m={{ r: '10px' }} /> En cours de traitement
            </Anchor>
        </Div>
      );

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
                <div className="field">
                <Dropdown
                    isOpen={showDropdown}
                    onClick={() =>{selectedItems.length > 0 && setShowDropdown(!showDropdown)}}
                    menu={menuList}
                    bg="info100"
                    focusBg="info200"
                    borderColor="info600"
                    focusBorderColor="info800"
                    textColor="info800"
                    textWeight="500"
                    openSuffix={<Icon name="Up" color="info700" size="16px" />}
                    closeSuffix={<Icon name="Down" color="info700" size="16px" />}
                >
                    Marquer comme
                </Dropdown>
                </div>
            </div>
        </div>

        <div className="content">
            <Table dataSource={rows} loading={loading || loadingUpdate} columns={ordersColumns} className='table'
                pagination={{
                    total: count,
                    pageSize: limit,
                    onChange: (page) => setOffset((page - 1)*limit)
                }}
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: selectedItems,
                    ...rowSelection
                }}
                rowKey='id'
            />
        </div>
    </div>
  )
}
