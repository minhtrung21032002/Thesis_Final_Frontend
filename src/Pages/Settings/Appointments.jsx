// src/components/Appointment.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Avatar, Typography, Rate } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { setAppointments } from '../../redux/reducers/serviceReducer';

const { Title, Text } = Typography;

const Appointment = () => {
    const dispatch = useDispatch();
    const appointments = useSelector((state) => state.serviceReducer.appointments);
    console.log(appointments);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/serviceCenter/appointments');
                dispatch(setAppointments(response.data));
            } catch (error) {
                console.error('Error fetching appointments data:', error);
            }
        };

        fetchAppointments();
    }, [dispatch]);

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Appointments</Title>
            <List
                itemLayout="horizontal"
                dataSource={appointments}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.shopId.shop_images[0]} size={64} />}
                            title={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Text strong style={{ marginRight: 8 }}>{item.shopId.shop_name}</Text>
                                    <Rate disabled defaultValue={item.shopId.shop_reputation_star} style={{ fontSize: 14, marginRight: 8 }} />
                                    <Text style={{ fontSize: 14 }}>
                                        {item.shopId.shop_reputation_star} ({item.shopId.shop_reviewers.length} reviews)
                                    </Text>
                                </div>
                            }
                            description={
                                <div>
                                    <Text>Shop Description: {item.shopId.shop_short_description}</Text>
                                    <div style={{ marginTop: 8 }}>
                                        <CalendarOutlined style={{ marginRight: 8 }} />
                                        <Text style={{ marginRight: 16 }}>
                                            Booking Date: {new Date(item.selectedDate).toLocaleDateString()}

                                        </Text>
                                        <ClockCircleOutlined style={{ marginRight: 8 }} />
                                        <Text>
                                            Booking Time: {(item.selectedTime)}
                                        </Text>

                                    </div>
                                    <div><Text>Booking User Name: {item.lastName}</Text></div>

                                    <Text>Booking User Comment: {item.comment}</Text>


                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Appointment;
