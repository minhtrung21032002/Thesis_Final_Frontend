import { useState } from 'react';
import { Form, Layout, Button, Divider } from 'antd';
import { DatePicker } from 'antd';
const { Content } = Layout;
import { Input, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { Radio } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import FloatLabel from '../../Components/FloatLabel';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { message } from 'antd'; import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setEditing } from '../../redux/reducers/serviceReducer';
const Reminder = () => {
    const vehicleId = useSelector(state => state.serviceReducer.selectedRows[0].vehicle_id);
    const userId = useSelector(state => state.serviceReducer.userId)
    console.log('userId', userId)
    const editingObj = useSelector(state => state.serviceReducer.editingObj);
    const dispatch = useDispatch();

    const onFinish = async (values) => {

        const data = {
            comments, serviceType, odometer, time, contactMethod, date
            , userId
        }


        if (editingObj) {
            try {
                const response = await axios.patch(`http://localhost:3000/carTracking/reminder/api/${vehicleId}`, data);
                if (response.status === 200) {
                    message.success('Data updated successfully');
                } else {
                    message.error('Failed to submit data');
                }
            } catch (error) {
                console.error('Error submitting data:', error);
                message.error('Failed to submit data');
            }
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3000/carTracking/reminder/api/${vehicleId}`, data);
            if (response.status === 200) {
                message.success('Data submitted successfully');
            } else {
                message.error('Failed to submit data');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            message.error('Failed to submit data');
        }
    };
    const serviceData = useSelector((state) => state.serviceReducer.serviceData.SERVICE_DATA);
    const [comments, setComments] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [odometer, setOdometer] = useState('');
    const [time, setTime] = useState(moment('12:00', 'HH:mm'));
    const [contactMethod, setContactMethod] = useState('');
    const [date, setDate] = useState(null);


    useEffect(() => {
        if (editingObj) {
            setServiceType(editingObj.SERVICE_TYPE)
            setDate(moment(editingObj.DATE, 'M/D/YYYY'))

            setOdometer(parseInt(editingObj.ODOMETER))
            setTime(
                moment(editingObj.TIME, 'hh:mm:ss A')
            )
            setComments(editingObj.COMMENTS)
            setContactMethod(editingObj.REMINDER_TYPE)
        }

        if (location.pathname === '/reminder/create') {
            setContactMethod('')
            setServiceType('')
            setDate(null)
            setOdometer('')
            setTime(
                moment('12:00', 'HH:mm')
            )
            setComments('')

            dispatch(setEditing(null));

        }
        return () => {

            dispatch(setEditing(null));
        };

    }, [editingObj, location.pathname]);
    return (
        <Layout style={{ backgroundColor: '#fff' }}>

            <Content>
                <Form className='example' onFinish={onFinish}>
                    <h3>Example</h3>

                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className='fa-solid fa-phone'></i> {/* Replace with the icon you want to use */}
                        </div>
                        <FloatLabel
                            label='Reminding'
                            name='Reminding'
                            value={contactMethod}
                            className='label-float'>
                            <Radio.Group onChange={e => setContactMethod(e.target.value)} value={contactMethod}>
                                <Radio value='Yes'>Yes</Radio>
                                <Radio value='No'>No</Radio>

                            </Radio.Group>
                        </FloatLabel>
                    </div>

                    <Divider />
                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className='fa-solid fa-wrench'></i> {/* Replace with the icon you want to use */}
                        </div>
                        <FloatLabel label='Type of Service' name='serviceType' value={serviceType}>
                            <Select showSearch onChange={value => setServiceType(value)} value={serviceType}>
                                {serviceData.map(service => (
                                    <Option key={service.SERVICE_ID} value={service.SERVICE_TYPE}>{service.SERVICE_TYPE}</Option>
                                ))}
                            </Select>
                        </FloatLabel>
                    </div>
                    <Divider />
                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className='fa-solid fa-tachometer'></i> {/* Replace with the icon you want to use */}
                        </div>
                        <FloatLabel label='Odometer' name='odometer' value={odometer}>
                            <Input type='number' onChange={e => setOdometer(e.target.value)} value={odometer} />
                        </FloatLabel>
                    </div>

                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className='fa-solid fa-clock'></i> {/* Replace with the icon you want to use */}
                        </div>
                        <FloatLabel label='Time' name='time' value={time} className='label-float'>
                            <TimePicker
                                onChange={value => setTime(value)}
                                value={time}
                                format='HH:mm'
                                style={{ width: '100%', padding: '12px 12px 8px 11px' }}
                            />
                        </FloatLabel>
                    </div>

                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className='fa-solid fa-calendar'></i>
                        </div>

                        <FloatLabel label='Date' name='date' value={date} className='label-float'>
                            <DatePicker
                                value={date}
                                onChange={date => setDate(date)}
                                style={{ width: '100%', padding: '12px 12px 8px 11px' }}
                            />
                        </FloatLabel>
                    </div>

                    <Divider />

                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className='fa-solid fa-comment'></i> {/* Replace with the icon you want to use */}
                        </div>
                        <FloatLabel label='Comments' name='comments' value={comments}>
                            <TextArea
                                rows={4}
                                onChange={e => setComments(e.target.value)}
                                maxLength={200}
                                value={comments}
                            />
                        </FloatLabel>
                    </div>
                    <div className='form-group'>
                        <div className='form-icon'></div>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Content>

        </Layout>
    );
};
export default Reminder;
