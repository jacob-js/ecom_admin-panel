import { FiUsers, FiCompass } from 'react-icons/fi'
import { ImUserTie } from 'react-icons/im';
import { SettingOutlined } from '@ant-design/icons'
import React from 'react'
import { RiShoppingBag3Line, RiDashboardLine, RiGiftLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import logo from '../../Assets/images/min_logo.png'

const items = [
  {
      name: 'Dashboard',
      icon: <RiDashboardLine />,
      path: '/'
  },
  {
      name: 'Produits',
      icon: <RiShoppingBag3Line />,
      path: '/products'
  },
  {
      name: 'Utilisateurs',
      icon: <FiUsers />,
      path: '/users'
  },
  {
      name: 'Commandes',
      icon: <FiCompass />,
      path: '/orders'
  },
  {
      name: 'Coupons',
      icon: <RiGiftLine />,
      path: '/transactions'
  },
  {
      name: 'Notre équipe',
      icon: <ImUserTie />,
      path: '/bonus',
  },
  {
      name: 'Parametres',
      icon: <SettingOutlined />,
      path: '/settings'
  }
]

function Sidebar() {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className={`sidebar`}>
        <div className="top">
            <div className="logo">
                <img src={logo} alt="" srcset="" className='logo-img' />
            </div>
        </div>
        <div className="menus-section">
            {
                items.map((item, index) =>(
                    <div key={index} className={`menu-item ${location.pathname === item.path ? 'active': ''}`} onClick={() =>history.push(item.path)}>
                        <div className="menu-icon"> {item.icon} </div>
                        <div className="menu-name"> {item.name} </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Sidebar