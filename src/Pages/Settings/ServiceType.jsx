import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { setServiceData, addServiceData, updateServiceData, deleteServiceData } from '../../redux/reducers/serviceReducer';

const Service = () => {
    const dispatch = useDispatch();
    const serviceData = useSelector(state => state.serviceReducer.serviceData.SERVICE_DATA);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentServiceId, setCurrentServiceId] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        axios.get('http://localhost:3000/carTracking/serviceType/api')
            .then(res => {
                dispatch(setServiceData(res.data.SERVICE_DATA));
            })
            .catch(err => {
                console.error("Error fetching service data:", err);
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
            title: 'Service Type',
            dataIndex: 'SERVICE_TYPE',
            key: 'SERVICE_TYPE',
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
                        onClick={() => handleDelete(record.SERVICE_ID)}
                    />
                </span>
            ),
        },
    ];

    const handleEdit = (record) => {
        setIsEditMode(true);
        setCurrentServiceId(record.SERVICE_ID);
        form.setFieldsValue({
            SERVICE_TYPE: record.SERVICE_TYPE,
        });
        setIsModalVisible(true);
    };

    const handleDelete = (serviceId) => {
        axios.delete(`http://localhost:3000/carTracking/serviceType/api/${serviceId}`)
            .then(response => {
                if (response.status === 200) {
                    message.success('Service data deleted successfully!');
                    dispatch(deleteServiceData(serviceId));
                }
            })
            .catch(error => {
                console.error("Error deleting data:", error);
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
                    ? axios.patch(`http://localhost:3000/carTracking/serviceType/api/${currentServiceId}`, values)
                    : axios.post('http://localhost:3000/carTracking/serviceType/api', values);

                apiCall.then(response => {
                    if (response.status === 200) {
                        message.success(`Service data ${isEditMode ? 'updated' : 'added'} successfully!`);
                        if (isEditMode) {
                            dispatch(updateServiceData(response.data.SERVICE_DATA));
                        } else {
                            dispatch(addServiceData(response.data.SERVICE_DATA));
                        }
                    }
                })
                    .catch(error => {
                        console.error(`Error ${isEditMode ? 'updating' : 'posting'} data:`, error);
                    });

                setIsModalVisible(false);
                form.resetFields();
                setCurrentServiceId(null);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentServiceId(null);
    };

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h1>Service</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    Add New
                </Button>
            </header>
            <Table
                columns={columns}
                dataSource={serviceData}
                rowKey="SERVICE_ID"
                pagination={false}
            />

            <Modal
                title={isEditMode ? "Edit Service" : "Add New Service"}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="SERVICE_TYPE"
                        label="Service Type"
                        rules={[{ required: true, message: 'Please input the service type!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
};

export default Service;
