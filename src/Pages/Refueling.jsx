// import React from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const buttonStyle = {
    color: 'white',
    backgroundColor: 'red',
    borderRadius: '50%',
    height: '40px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    marginLeft: '10px',
};
const Refueling = () => {
    const navigate = useNavigate();
    const columns = [
        { width: 120, title: 'Số thứ tự', dataIndex: 'index', key: 'index', sorter: (a, b) => a.index - b.index },
        {
            title: 'Nickname',
            dataIndex: 'nickname',
            key: 'nickname',
            sorter: (a, b) => a.nickname.localeCompare(b.nickname),
        },
        {
            title: 'Nhà sản xuất',
            dataIndex: 'manufacturer',
            key: 'manufacturer',
            sorter: (a, b) => a.manufacturer.localeCompare(b.manufacturer),
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
            sorter: (a, b) => a.model.localeCompare(b.model),
        },
        {
            title: 'Last Update',
            dataIndex: 'lastUpdate',
            key: 'lastUpdate',
            sorter: (a, b) => new Date(a.lastUpdate) - new Date(b.lastUpdate),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        {
            width: 150,
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span style={{ display: 'flex' }}>
                    <button
                        style={buttonStyle}
                        onClick={() => {
                            handleEdit(record);
                            navigate('/vehicle/edit');
                        }}>
                        <EditOutlined />
                    </button>
                    <button style={buttonStyle} onClick={() => handleDelete(record)}>
                        <DeleteOutlined />
                    </button>
                </span>
            ),
        },
    ];

    const data = [

        {
            key: '1',
            index: 1,
            nickname: 'Vehicle 1',
            manufacturer: 'Manufacturer 1',
            model: 'Model 1',
            lastUpdate: '2022-01-01',
            status: 'Active',
        },

        {
            key: '2',
            index: 2,
            nickname: 'Vehicle 2',
            manufacturer: 'Manufacturer 2',
            model: 'Model 2',
            lastUpdate: '2022-01-02',
            status: 'Inactive',
        },

        {
            key: '3',
            index: 3,
            nickname: 'Vehicle 3',
            manufacturer: 'Manufacturer 3',
            model: 'Model 3',
            lastUpdate: '2022-01-03',
            status: 'Active',
        },

        {
            key: '4',
            index: 4,
            nickname: 'Vehicle 4',
            manufacturer: 'Manufacturer 4',
            model: 'Model 4',
            lastUpdate: '2022-01-04',
            status: 'Inactive',
        },

        {
            key: '5',
            index: 5,
            nickname: 'Vehicle 5',
            manufacturer: 'Manufacturer 5',
            model: 'Model 5',
            lastUpdate: '2022-01-05',
            status: 'Active',
        },
    ];

    const handleEdit = record => {
        console.log('Edit', record);
        // Add your edit logic here
    };

    const handleDelete = record => {
        console.log('Delete', record);
        // Add your delete logic here
    };
    return (
        <Table
            columns={columns}
            dataSource={data}
            style={{
                minHeight: '100vh',
                width: '100%',
            }}
        />
    );
};

export default Refueling;
