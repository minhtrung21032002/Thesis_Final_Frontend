import { useState, useEffect } from 'react';
import { Form, Layout, Button, Divider } from 'antd';
import { DatePicker } from 'antd';
import { TimePicker } from 'antd';
import { Input, Select } from 'antd';
import FloatLabel from '../../Components/FloatLabel';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setEditing } from '../../redux/reducers/serviceReducer';
import { message } from 'antd';
import moment from 'moment';
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const Service = () => {
    const dispatch = useDispatch();

    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null);
    const [place, setPlace] = useState('1234');
    const [serviceType, setServiceType] = useState('1234');
    const [money, setMoney] = useState('1234');
    const [fuelType, setFuelType] = useState('1234');
    const [odometer, setOdometer] = useState('1234');
    const [comments, setComments] = useState('1234');

    const fuelData = useSelector((state) => state.serviceReducer.serviceData.FUEL_DATA);
    const serviceData = useSelector((state) => state.serviceReducer.serviceData.SERVICE_DATA);
    const placeData = useSelector((state) => state.serviceReducer.serviceData.PLACE_DATA);
    const vehicleId = useSelector(state => state.serviceReducer.selectedRows[0].vehicle_id);
    const editingObj = useSelector(state => state.serviceReducer.editingObj);
    console.log('editing object', editingObj);






    // gửi dữ liệu lên server
    const onFinish = values => {
        console.log('Received values of form:', values);

        const data = {
            fuelType: fuelType,
            odometer: odometer,
            time: time,
            date: date,
            place: place,
            serviceType: serviceType,
            cost: money,
            comments: comments
        };
        if (editingObj) {
            fetch(`http://localhost:3000/carTracking/service/api/${vehicleId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    if (response.status === 200) {
                        message.success('Item updated successfully');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        fetch(`http://localhost:3000/carTracking/service/api/${vehicleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    useEffect(() => {
        if (editingObj) {

            setFuelType(editingObj.FUEL_TYPE)
            setServiceType(editingObj.SERVICE_TYPE)
            setDate(moment(editingObj.DATE, 'M/D/YYYY'))
            setPlace(editingObj.PLACE)
            setMoney(parseInt(editingObj.COST))
            setOdometer(parseInt(editingObj.ODOMETER))
            setTime(
                moment(editingObj.TIME, 'hh:mm:ss A')
            )
            setComments(editingObj.COMMENTS)

        }

        if (location.pathname === '/reminder/create') {

            setFuelType('')
            setServiceType('')
            setDate(null)
            setPlace('')
            setMoney('')
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

                    {/* time */}
                    <div className='form-group'>
                        <div className='form-icon'></div>

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
                            <i className='fa-solid fa-tachometer'></i>
                        </div>
                        <FloatLabel label='Odometer' name='odometer' value={odometer}>
                            <Input type='number' onChange={e => setOdometer(e.target.value)} value={odometer} />
                        </FloatLabel>
                    </div>

                    <Divider />

                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className='fa-solid fa-map-marker-alt'></i>
                        </div>
                        <FloatLabel label='Place' name='place' value={place}>
                            <Select showSearch onChange={value => setPlace(value)} value={place}>
                                {placeData.map(place => (
                                    <Option key={place.PLACE_ID} value={place.PLACE_NAME}>{place.PLACE_NAME}</Option>
                                ))}
                            </Select>
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
                            <i className='fa-solid fa-gas-pump'></i>
                        </div>
                        <FloatLabel label='Fuel type' name='fuelType' value={fuelType}>
                            <Select showSearch onChange={value => setFuelType(value)} value={fuelType}>
                                {fuelData.map(place => (
                                    <Option key={place.FUEL_ID} value={place.FUEL_NAME}>{place.FUEL_NAME}</Option>
                                ))}
                            </Select>
                        </FloatLabel>
                    </div>

                    <Divider />
                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className='fa-solid fa-dollar-sign'></i> {/* Replace with the icon you want to use */}
                        </div>
                        <FloatLabel label='Money' name='money' value={money}>
                            <Input type='number' onChange={e => setMoney(e.target.value)} value={money} />
                        </FloatLabel>
                    </div>

                    <Divider />

                    <div className='form-group'>
                        <div className='form-icon'></div>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>
                                Submit
                            </Button>
                        </Form.Item>
                    </div>

                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className='fa-solid fa-comment'></i> {/* Replace with the icon you want to use */}
                        </div>
                        <FloatLabel label='Comments' name='comments' value={comments}>
                            <TextArea rows={4} onChange={e => setComments(e.target.value)} value={comments} />
                        </FloatLabel>
                    </div>
                </Form>
            </Content>

        </Layout>
    );
};
export default Service;
