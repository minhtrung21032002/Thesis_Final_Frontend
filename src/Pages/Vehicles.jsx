import React, { useEffect } from 'react';
import { Table, Spin, Button, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    setCarServiceData,
    setSelectedRows,
    setSelectedRowKeys,
    setUserId,
    setVehicles,
    setAddNewVehicle
} from '../redux/reducers/serviceReducer';

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

const Vehicles = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const vehicles = useSelector(state => state.serviceReducer.vehiclesData);
    const selectedRowKeys = useSelector(state => state.serviceReducer.selectedRowKeys);
    const selectedRows = useSelector(state => state.serviceReducer.selectedRows);

    useEffect(() => {
        if (id) {
            localStorage.setItem('id', id);
            dispatch(setUserId(id));
        }

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/carTracking/service/api/');
                const data = await response.json();
                dispatch(setCarServiceData(data));
            } catch (error) {
                console.error('Error fetching service data:', error);
            }
        };

        fetchData();
        fetchDataVehicles();
    }, [dispatch, id]);

    const fetchDataVehicles = async () => {
        try {
            const response = await fetch(`http://localhost:3000/carTracking/vehicle/api/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            const dataWithKey = jsonData.VEHICLE_DATA.map(item => ({ key: item.vehicle_id, ...item }));
            dispatch(setVehicles(dataWithKey));

            const activeVehicles = dataWithKey.filter(vehicle => vehicle.status === 'Active');
            if (!selectedRowKeys.length && activeVehicles.length > 0) {
                dispatch(setSelectedRowKeys([activeVehicles[0].key]));
                dispatch(setSelectedRows([activeVehicles[0]]));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            dispatch(setSelectedRowKeys(selectedRowKeys));
            dispatch(setSelectedRows(selectedRows));
        },
        getCheckboxProps: (record) => ({
            disabled: record.status !== 'Active', // Disable checkbox if status is not Active
        }),
    };

    const showDeleteConfirm = (record) => {
        Modal.confirm({
            title: 'Are you sure delete this task?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete(record);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleDelete = async (record) => {
        const apiUrl = `http://localhost:3000/carTracking/vehicle/api/${record.vehicle_id}`;
        try {
            const response = await axios.delete(apiUrl);
            if (response.status === 200) {
                fetchDataVehicles();
                message.success('Vehicle deleted successfully');
            } else {
                message.error('Failed to delete vehicle');
            }
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            message.error('Failed to delete vehicle');
        }
    };

    const handleEdit = (record) => {
        navigate(`/vehicle/edit/${record.vehicle_id}`);
    };

    if (!vehicles) {
        return <Spin />;
    }

    if (vehicles.length === 0) {
        dispatch(setAddNewVehicle(true));
        navigate('/first-vehicle');
    }

    const columns = [
        {
            width: 120,
            title: 'Số thứ tự',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.index - b.index,
            render: (text, record, index) => index + 1
        },
        {
            title: 'Nickname',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
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
            dataIndex: 'last_updated',
            key: 'last_updated',
            sorter: (a, b) => new Date(a.last_updated) - new Date(b.last_updated),
            render: (dateString) => {
                const date = new Date(dateString);
                return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            }
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
                        onClick={() => handleEdit(record)}
                    >
                        <EditOutlined />
                    </button>
                    <button
                        style={buttonStyle}
                        onClick={() => showDeleteConfirm(record)}
                    >
                        <DeleteOutlined />
                    </button>
                </span>
            ),
        },
    ];

    return (
        <>
            <Button
                type='primary'
                onClick={() => navigate('/vehicle/new')}
                style={{ marginBottom: 10 }}
            >
                Add New
            </Button>
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={vehicles}
                style={{ minHeight: '100vh', width: '100%' }}
            />
        </>
    );
};

export default Vehicles;
