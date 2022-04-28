import React, { useEffect } from 'react'
import { IoIosApps } from 'react-icons/io'
import { BsCart, BsCheck2 } from 'react-icons/bs'
import { MdOutlinePayment } from 'react-icons/md'
import { RiCaravanLine } from 'react-icons/ri'
import { AiOutlineSync } from 'react-icons/ai'
import moment from 'moment';
import { useAxios } from '../../hooks'
import useAxiosHook from 'axios-hooks'

function Dashboard() {
  const yesterday = moment().subtract(1, 'days').hour(23).minute(59).toDate().toISOString();
  const today = moment().toDate().toISOString();
  const startMonth = moment().startOf('month').add('24', 'hour').toDate().toISOString();
  const [{ data: todayOrers, loading: loadingTodayOrders }, getTodayOrders] = useAxios({
    url: `/api/v1/orders?startDate=${yesterday}&endDate=${today}`,
    method: 'GET'
  }, { manual: true });
  const [{ data: monthlyOrers, loading: loadingMonthly}, getMonthlyOrders] = useAxios({
    url: `/api/v1/orders?startDate=${startMonth}&endDate=${today}`,
    method: 'GET'
  }, { manual: true });
  const [{ data: sumOfOrders, loading: loadingSumOfOrders}, getSumOfOrders] = useAxios({
    url: `/api/v1/orders/sum/all`,
    method: 'GET'
  }, { manual: true });
  const [{ data: totalOrders, loading: loadingTotalOrders}, getTotalOrders] = useAxiosHook(
    `/api/v1/orders?limit=${2}&offset=${0}`,
    { manual: true }
  );
  const [{ data: pendingOrders, loading: loadingPending}, getPendingOrders] = useAxiosHook(
    `/api/v1/orders?status=pending&limit=${2}&offset=${0}`,
    { manual: true }
  );
  const [{ data: inProcessOrders, loading: loadingInProcess}, getInprocessOrders] = useAxiosHook(
    `/api/v1/orders?status=inProcess&limit=${2}&offset=${0}`,
    { manual: true }
  );
  const [{ data: deliveredOrders, loading: loadingDeliveredOrders}, getDeliveredOrers] = useAxiosHook(
    `/api/v1/orders?status=delivered&limit=${2}&offset=${0}`,
    { manual: true }
  );

  const getStats = async() => {
    getTodayOrders();
    getMonthlyOrders();
    getSumOfOrders();
    getTotalOrders();
    getPendingOrders();
    getInprocessOrders();
    getDeliveredOrers();
  }

  useEffect(() =>{
    getStats();
  }, []);

  return (
    <div className='dashboard'>
      <div className="header">
        <div className="title">Tableau de bord</div>
      </div>
      <div className="content">
        <section className="orders-stats">
          <div className="stat today">
            <IoIosApps className='icon' />
            <div className="title">Commandes d'ajourd'hui</div>
            { todayOrers.totalCdf ? <div className="value">{todayOrers.totalCdf}FC</div>: null}
            { todayOrers.totalUsd ? <div className="value">{todayOrers.totalUsd}$</div>: null}
          </div>
          <div className="stat monthly">
            <BsCart className='icon' />
            <div className="title">Commandes de ce mois</div>
            { monthlyOrers.totalCdf ? <div className="value">{monthlyOrers.totalCdf}FC</div>: null}
            { monthlyOrers.totalUsd ? <div className="value">{monthlyOrers.totalUsd}$</div>: null}
          </div>
          <div className="stat total">
            <MdOutlinePayment className='icon' />
            <div className="title">Total de commandes</div>
            { sumOfOrders.totalCdf ? <div className="value">{sumOfOrders.totalCdf}FC</div>: null}
            { sumOfOrders.totalUsd ? <div className="value">{sumOfOrders.totalUsd}$</div>: null}
          </div>
        </section>

        <section className="orders-count">
          <div className="count total">
            <div className="icon">
              <BsCart />
            </div>
            <div className="left">
              <div className="title">Toutes les Commandes</div>
              <div className="value">{totalOrders?.data.count}</div>
            </div>
          </div>
          <div className="count pending">
            <div className="icon">
              <AiOutlineSync />
            </div>
            <div className="left">
              <div className="title">Commandes en attente</div>
              <div className="value">{pendingOrders?.data.count}</div>
            </div>
          </div>
          <div className="count processing">
            <div className="icon">
              <RiCaravanLine />
            </div>
            <div className="left">
              <div className="title">Commandes en traitement</div>
              <div className="value">{inProcessOrders?.data.count}</div>
            </div>
          </div>
          <div className="count delivered">
            <div className="icon">
              <BsCheck2 />
            </div>
            <div className="left">
              <div className="title">Commandes livrées</div>
              <div className="value">{deliveredOrders?.data.count}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard;