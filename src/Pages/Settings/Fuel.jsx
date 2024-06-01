import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { setFuelData, addFuelData, updateFuelData, deleteFuelData } from '../../redux/reducers/serviceReducer';

const Fuel = () => {
    const dispatch = useDispatch();
    const fuelData = useSelector(state => state.serviceReducer.serviceData.FUEL_DATA);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentFuelId, setCurrentFuelId] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        axios.get('http://localhost:3000/carTracking/fuelType/api')
            .then(res => {
                dispatch(setFuelData(res.data.FUEL_DATA));
            })
            .catch(err => {
                console.error('Error fetching fuel data:', err);
            });
    }, [dispatch]);

    const columns = [
        {
            title: '#',
            dataIndex: 'ordinalNumber',
            key: 'ordinalNumber',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Fuel Name',
            dataIndex: 'FUEL_NAME',
            key: 'FUEL_NAME',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button
                        type="primary"
                        icon={<EditOutlined style={{ fontSize: '16px' }} />}
                        style={{ marginRight: 8 }}
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        type="primary"
                        icon={<DeleteOutlined style={{ fontSize: '16px' }} />}
                        onClick={() => handleDelete(record.FUEL_ID)}
                    />
                </span>
            ),
        },
    ];

    const handleEdit = (record) => {
        setIsEditMode(true);
        setCurrentFuelId(record.FUEL_ID);
        form.setFieldsValue({
            FUEL_NAME: record.FUEL_NAME,
        });
        setIsModalVisible(true);
    };

    const handleDelete = (fuelId) => {
        axios.delete(`http://localhost:3000/carTracking/fuelType/api/${fuelId}`)
            .then(response => {
                if (response.status === 200) {
                    message.success('Fuel data deleted successfully!');
                    dispatch(deleteFuelData(fuelId));
                }
            })
            .catch(error => {
                console.error('Error deleting data:', error);
            });
    };

    const showModal = () => {
        form.resetFields();
        setIsEditMode(false);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                const apiCall = isEditMode
                    ? axios.patch(`http://localhost:3000/carTracking/fuelType/api/${currentFuelId}`, values)
                    : axios.post('http://localhost:3000/carTracking/fuelType/api', values);

                apiCall.then(response => {
                    if (response.status === 200) {
                        message.success(`Fuel data ${isEditMode ? 'updated' : 'added'} successfully!`);
                        if (isEditMode) {
                            dispatch(updateFuelData(response.data.FUEL_DATA));
                        } else {
                            dispatch(addFuelData(response.data.FUEL_DATA));
                        }
                    }
                })
                    .catch(error => {
                        console.error(`Error ${isEditMode ? 'updating' : 'posting'} data:`, error);
                    });

                setIsModalVisible(false);
                form.resetFields();
                setCurrentFuelId(null);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentFuelId(null);
    };

    return (
        <div style={{ position: 'relative' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h1>Fuel</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    Add New
                </Button>
            </header>
            <Table
                columns={columns}
                dataSource={fuelData}
                rowKey="FUEL_ID"
                pagination={false}
            />
            <Modal
                title={isEditMode ? "Edit Fuel" : "Add New Fuel"}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="FUEL_NAME"
                        label="Fuel Name"
                        rules={[{ required: true, message: 'Please input the fuel name!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Fuel;
