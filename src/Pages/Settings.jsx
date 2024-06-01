import { Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;
const menuItems = [
    {
        label: <NavLink to='account'>My Account</NavLink>,
        key: '1',
        title: 'Menu Item 1',
        icon: <i className="fa-solid fa-user"></i>,
    },

    {
        label: <NavLink to='fuel'>Fuel</NavLink>,
        key: 'New Reminder',
        title: 'Menu Item 1',
        icon: <i className="fa-solid fa-gas-pump"></i>,
    },
    {
        label: <NavLink to='service'>Service Type</NavLink>,
        key: 'New Service',
        title: 'Menu Item 1',

        icon: <i className='fa-solid fa-wrench'></i>,
    },
    {
        label: <NavLink to='place'>Place</NavLink>,
        key: 'New Refueling',
        title: 'Menu Item 1',
        icon: <i className="fa-solid fa-location-dot"></i>,
    },
    {
        label: <NavLink to='appointments'>Appointments</NavLink>,
        key: 'Appointments',
        title: 'Menu Item 1',
        icon: <i className="fa-solid fa-calendar-check"></i>,
    },

];
const Settings = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200}>
                <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }} items={menuItems}>

                </Menu>
            </Sider>
            <Layout>
                <div style={{
                    padding: '20px',
                    color: '#000000'
                }}>
                    <Outlet />
                </div>
            </Layout>
        </Layout>
    );
};

export default Settings;