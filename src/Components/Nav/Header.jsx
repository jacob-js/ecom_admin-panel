import { Avatar, Badge, Popover } from 'antd'
import { FaBell} from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import React from 'react'
import { RiDashboardLine } from 'react-icons/ri'
import { SettingOutlined } from '@ant-design/icons'

function Header() {
  const data = {};
  const popoverUserContent = (
    <div className="user-popover">
      <div className="item">
        <RiDashboardLine className='icon' /> Dashboard
      </div>
      <div className="item">
        <SettingOutlined className='icon' /> Profile
      </div>
      <div className="item">
        <FiLogOut className='icon' /> Deconnexion
      </div>
    </div>
  )
  return (
    <div className='nav-header'>
      <div className="notif">
          {/* <Popover content={notifContent} title="Notifications" trigger='click'> */}
              <Badge color='red' count={5}>
                  <FaBell className='icon-notif'  />
              </Badge>
          {/* </Popover> */}
      </div>
      <div className="user-avatar">
          <Popover content={popoverUserContent} trigger='click' placement='bottomRight'>
              <Avatar className='u-avatar' size={40} src={data.cover ? data.cover: "https://i.ibb.co/WpM5yZZ/9.png"} />
          </Popover>
      </div>
    </div>
  )
}

export default Header