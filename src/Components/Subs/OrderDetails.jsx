import React, { useContext } from 'react'
import { AiOutlineArrowLeft, AiOutlineGift } from 'react-icons/ai'
import { BsFillHandbagFill } from 'react-icons/bs'
import { OrdersContext } from '../Pages/Orders';
import moment from 'moment';
import { Tag } from 'atomize';

function OrderDetails() {
    const { changeTab, currentOrder } = useContext(OrdersContext);
    const cdfItems = currentOrder?.Items?.filter(item => item.currency === "FC") || [];
    const usdItems = currentOrder?.Items?.filter(item => item.currency === "USD") || [];
  return (
    <div className='order-details'>
        <div className="header">
            <div className="title">
                <AiOutlineArrowLeft onClick={changeTab} className='icon' /> Detail de la commande
            </div>
        </div>

        <div className="card">
            <div className="header">
                <div className="order-ref"> Order ID: <span>{currentOrder.ref}</span> </div>
                <div className="order-date"> Commandé le: <span>{moment(currentOrder?.createdAt).format('DD-MM-YYYY  HH:mm')}</span> </div>
            </div>
            <div className="items">
                {
                    currentOrder?.Items.map((item, index) => (
                        <div className="item" key={index}>
                            <div className="prod">
                                <div className="pic">
                                    <img src={item?.Product.cover} alt={item.name} />
                                </div>
                                <div className="info">
                                    <div className="name">{item?.Product.name}</div>
                                    <div className="price"> {item.unitAmount}{ item.currency === 'USD' || item.currency === 'usd' ? '$': 'FC' }x{item.quantity} </div>
                                </div>
                            </div>
                            <div className="propertys">
                                {item?.specifications.map((prop, index) => (
                                    <Tag m={{ x: "10px" }} key={index}>{prop.key}: {prop.value}</Tag>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="extra">
            <div className="left">
                <div className="shipping-address">
                    <div className="title">Adresse de livraison</div>
                    {currentOrder.country}, {currentOrder.city}, {currentOrder.address}
                    <div className="phone">N° de téléphone : <span>{currentOrder.phone}</span></div>
                    <div className="user">Pour : <span>{currentOrder.User?.fullname}</span></div>
                </div>
                {
                    currentOrder.isGift && 
                    <div className="gift">
                        <div className="icon"><AiOutlineGift /></div>
                        <div className="details">
                            <div className="title">Cadeau à {currentOrder.receiverName}</div>
                            <div className="msg">{currentOrder.giftMention}</div>
                        </div>
                    </div>
                }
            </div>
            <div className="totals">
                <div className="title">Resumé du total</div>
                <div className="sub-total">
                    <div className="intro">Sous-total :</div>
                    <div className="price">${usdItems.reduce((acc, item) => acc + (item.unitAmount)*parseInt(item.quantity), 0)}, FC{cdfItems.reduce((acc, item) => acc + (item.unitAmount)*parseInt(item.quantity), 0)}</div>
                </div>
                <div className="shipping">
                    <div className="intro">Frais de livraison :</div>
                    <div className="price">-</div>
                </div>
                <div className="shipping">
                    <div className="intro">Tax :</div>
                    <div className="price">-</div>
                </div>
                <div className="total">
                    <div className="intro">Total :</div>
                    <div className="price">${usdItems?.reduce((acc, item) => acc + (item.unitAmount-(item.discount || 0))*parseInt(item.quantity), 0)}, FC{cdfItems?.reduce((acc, item) => acc + (item.unitAmount-(item.discount || 0))*parseInt(item.quantity), 0)}</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderDetails