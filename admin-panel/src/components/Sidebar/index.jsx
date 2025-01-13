import React, {act, useState} from 'react'
import { Link } from 'react-router-dom';
import LOGO2 from '../../assets/images/LOGO2.png'
import LOGO from '../../assets/images/LOGO.png'
import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { MdSunnySnowing } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";


const Sidebar = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

    const isOpenSubmenu = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
    }

  return (
    <>
      <div className='sidebar fixed top-0 left-0 z-[100] w-[15%]'>
        <Link to="/">
            <div className='logoWrapper py-3 px-4'>
                <img src={LOGO} className='w-100'></img>
            </div>
        </Link>

        <div className='sidebarTabs px-2 mt-4'>
            <ul className='flex gap-3 flex-col'>
                <li>
                    <Link to="/">
                        <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`} onClick={() => isOpenSubmenu(0)}>
                            <span className='icon mr-3 w-[30px] h-[30px] flex items-center justify-center'><MdDashboard /></span>Dashbord
                        </Button>
                    </Link>
                </li>
                <li className={`${activeTab === 1 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                    <Button className={`w-100 ${activeTab === 1 ? 'active' : ''}`} onClick={() => isOpenSubmenu(1)}>
                        <span className='icon mr-3 w-[30px] h-[30px] flex items-center justify-center'><MdSunnySnowing /></span>Destinos
                        <span className={`arrow ml-auto w-[25px] h-[25px] flex items-center justify-center ${activeTab === 1 && isToggleSubmenu === true ? 'rotate' : '' }`}><FaAngleRight /></span>
                    </Button>

                    <div className='submenu'>
                        <Link to="/destination/list">
                            <Button className='w-100'>Lista Destinos</Button>
                        </Link>
                        <Link to="/destination/create">
                            <Button className='w-100'>Crear Destino</Button>
                        </Link>
                    </div>
                </li>
                <li className={`${activeTab === 2 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                    <Button className={`w-100 ${activeTab === 2 ? 'active' : ''}`} onClick={() => isOpenSubmenu(2)}>
                        <span className='icon mr-3 w-[30px] h-[30px] flex items-center justify-center'><FiUsers /></span>Usuarios
                        <span className={`arrow ml-auto w-[25px] h-[25px] flex items-center justify-center ${activeTab === 2 && isToggleSubmenu === true ? 'rotate' : '' }`}><FaAngleRight /></span>
                    </Button>

                    <div className='submenu'>
                        <Link to="users/list">
                            <Button className='w-100'>Lista Usuarios</Button>
                        </Link>
                    </div>
                </li>
                <li className={`${activeTab === 3 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                    <Button className={`w-100 ${activeTab === 3 ? 'active' : ''}`} onClick={() => isOpenSubmenu(3)}>
                        <span className='icon mr-3 w-[30px] h-[30px] flex items-center justify-center'><IoTicket /></span>Reservas
                        <span className={`arrow ml-auto w-[25px] h-[25px] flex items-center justify-center ${activeTab === 3 && isToggleSubmenu === true ? 'rotate' : '' }`}><FaAngleRight /></span>
                    </Button>

                    <div className='submenu'>
                        <Link to="reservations/list">
                            <Button className='w-100'>Lista Reservas</Button>
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
