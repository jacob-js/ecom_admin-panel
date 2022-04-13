import { Avatar, Badge, Popover } from 'antd'
import { FaBell} from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import React from 'react'
import { RiDashboardLine } from 'react-icons/ri'
import { SettingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { ImUser } from 'react-icons/im'
import { logoutAction } from '../../Redux/actions/users'
import { useHistory } from 'react-router-dom'

function Header() {
  const { data } = useSelector(({ users: { currentUser } }) => currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const popoverUserContent = (
    <div className="user-popover">
      <div className="item">
        <RiDashboardLine className='icon' /> Dashboard
      </div>
      <div className="item">
        <SettingOutlined className='icon' /> Profile
      </div>
      <div className="item" onClick={() =>logoutAction(dispatch, history)}>
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
              <Avatar className='u-avatar' size={40}
                src={data.cover ? data.cover: null} 
                icon={<ImUser />}
              />
          </Popover>
      </div>
    </div>
  )
}

export default Header