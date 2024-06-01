// import './MainTemplate.css';

import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Sider } = Layout;
// const { Header, Content, Footer, Sider } = Layout;

const MainTemplate = () => {
    const userId = useSelector(state => state.serviceReducer.userId);
    const menuItems = [
        {
            label: (
                <>
                    <NavLink to='/'>Home</NavLink>
                </>
            ),
            key: '0',
            title: 'Menu Item 1',
            icon: <i className='fa fa-home'></i>,
            size: 'large',
        },

        {
            label: <NavLink to='/history'>History</NavLink>,
            key: '1',
            title: 'Menu Item 1',
            icon: <i className='fa fa-history'></i>,
        },


        {
            label: <NavLink to='/reminder/create'>New Reminder</NavLink>,
            key: 'New Reminder',
            title: 'Menu Item 1',
            icon: <i className='fa fa-plus'></i>,
        },
        {
            label: <NavLink to='/service/create'>New Service</NavLink>,
            key: 'New Service',
            title: 'Menu Item 1',

            icon: <i className='fa-solid fa-wrench'></i>,
        },
        {
            label: <NavLink to='/refueling/create'>New Refueling</NavLink>,
            key: 'New Refueling',
            title: 'Menu Item 1',
            icon: <i className='fa-solid fa-gas-pump'></i>,
        },




        {
            label: <NavLink to='/reports'>Reports</NavLink>,
            key: '6',
            title: 'Menu Item 1',
            icon: <i className='fa fa-chart-bar'></i>,
        },
        {
            label: <NavLink to={`/user/${userId}`}>Vehicles</NavLink>,
            key: '7',
            title: 'Menu Item 2',
            icon: <i className='fa fa-car'></i>,
        },
        {
            label: <NavLink to='/users'>Users</NavLink>,
            key: '8',
            title: 'Menu Item 3',
            icon: <i className='fa fa-user'></i>,
        },
        {
            label: <NavLink to='/map'>Map</NavLink>,
            key: '9',
            title: 'Menu Item 3',
            icon: <i className="fa-solid fa-map"></i>,
        },
        {
            label: <NavLink to='/settings'>Settings</NavLink>,
            key: '10',
            title: 'Menu Item 1',
            icon: <i className='fa-solid fa-gear'></i>,
        },
    ];

    return (
        <Layout className='main-template'>
            <Sider
                width={200}
                className='main-template__sider'
                style={{ backgroundColor: 'rgb(0,21,41)', minHeight: '100vh' }}>
                <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={menuItems}></Menu>
            </Sider>
            <Layout>
                <div
                    style={{
                        padding: '24px 24px 0 24px',
                        backgroundColor: 'rgb(26, 46, 54)',
                        color: 'white',
                        minHeight: '100vh',
                    }}>
                    <Outlet />
                </div>
            </Layout>
        </Layout>
    );
};

export default MainTemplate;
