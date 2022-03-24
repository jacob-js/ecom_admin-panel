import React from 'react'
import { IoIosApps } from 'react-icons/io'
import { BsCart, BsCheck2 } from 'react-icons/bs'
import { MdOutlinePayment } from 'react-icons/md'
import { RiCaravanLine } from 'react-icons/ri'
import { AiOutlineSync } from 'react-icons/ai'

function Dashboard() {
  return (
    <div className='dashboard'>
      <div className="header">
        <div className="title">Aperçu du tableau de bord</div>
      </div>
      <div className="content">
        <section className="orders-stats">
          <div className="stat today">
            <IoIosApps className='icon' />
            <div className="title">Commandes d'ajourd'hui</div>
            <div className="value">300$</div>
          </div>
          <div className="stat monthly">
            <BsCart className='icon' />
            <div className="title">Commandes de ce mois</div>
            <div className="value">5000$</div>
          </div>
          <div className="stat total">
            <MdOutlinePayment className='icon' />
            <div className="title">Total de commandes</div>
            <div className="value">95000$</div>
          </div>
        </section>

        <section className="orders-count">
          <div className="count total">
            <div className="icon">
              <BsCart />
            </div>
            <div className="left">
              <div className="title">Toutes les Commandes</div>
              <div className="value">169</div>
            </div>
          </div>
          <div className="count pending">
            <div className="icon">
              <AiOutlineSync />
            </div>
            <div className="left">
              <div className="title">Commandes en attente</div>
              <div className="value">34</div>
            </div>
          </div>
          <div className="count processing">
            <div className="icon">
              <RiCaravanLine />
            </div>
            <div className="left">
              <div className="title">Commandes en traitement</div>
              <div className="value">59</div>
            </div>
          </div>
          <div className="count delivered">
            <div className="icon">
              <BsCheck2 />
            </div>
            <div className="left">
              <div className="title">Commandes livrées</div>
              <div className="value">65</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard;