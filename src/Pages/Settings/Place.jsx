import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { setPlaceData, addPlaceData, updatePlaceData, deletePlaceData } from '../../redux/reducers/serviceReducer';

const Place = () => {
    const dispatch = useDispatch();
    const placeData = useSelector(state => state.serviceReducer.serviceData.PLACE_DATA);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        axios.get('http://localhost:3000/carTracking/place/api')
            .then(res => {
                dispatch(setPlaceData(res.data.PLACE_DATA));
            })
            .catch(err => {
                console.error("Error fetching place data:", err);
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
            title: 'Place Name',
            dataIndex: 'PLACE_NAME',
            key: 'PLACE_NAME',
        },
        {
            title: 'Place Address',
            dataIndex: 'PLACE_ADDRESS',
            key: 'PLACE_ADDRESS',
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
                        onClick={() => handleDelete(record.PLACE_ID)}
                    />
                </span>
            ),
        },
    ];

    const handleEdit = (record) => {
        setIsEditMode(true);
        setCurrentPlaceId(record.PLACE_ID);
        form.setFieldsValue({
            PLACE_NAME: record.PLACE_NAME,
            PLACE_ADDRESS: record.PLACE_ADDRESS
        });
        setIsModalVisible(true);
    };

    const handleDelete = (placeId) => {
        axios.delete(`http://localhost:3000/carTracking/place/api/${placeId}`)
            .then(response => {
                if (response.status === 200) {
                    message.success('Place data deleted successfully!');
                    dispatch(deletePlaceData(placeId));
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
                    ? axios.patch(`http://localhost:3000/carTracking/place/api/${currentPlaceId}`, values)
                    : axios.post('http://localhost:3000/carTracking/place/api', values);

                apiCall.then(response => {
                    if (response.status === 200) {
                        message.success(`Place data ${isEditMode ? 'updated' : 'added'} successfully!`);
                        if (isEditMode) {
                            dispatch(updatePlaceData(response.data.PLACE_DATA));
                        } else {
                            dispatch(addPlaceData(response.data.PLACE_DATA));
                        }
                    }
                })
                    .catch(error => {
                        console.error(`Error ${isEditMode ? 'updating' : 'posting'} data:`, error);
                    });

                setIsModalVisible(false);
                form.resetFields();
                setCurrentPlaceId(null);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentPlaceId(null);
    };

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h1>Place</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    Add New
                </Button>
            </header>
            <Table
                columns={columns}
                dataSource={placeData}
                rowKey="PLACE_ID"
                pagination={false}
            />
            <Modal
                title={isEditMode ? "Edit Place" : "Add New Place"}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="PLACE_NAME"
                        label="Place Name"
                        rules={[{ required: true, message: 'Please input the place name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="PLACE_ADDRESS"
                        label="Place Address"
                        rules={[{ required: true, message: 'Please input the place address!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Place;
