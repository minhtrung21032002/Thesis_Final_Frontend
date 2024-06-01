import { useState } from 'react';
import { Form, Layout, Button, Divider } from 'antd';
import { DatePicker } from 'antd';
import { Input, Select } from 'antd';
import { TimePicker } from 'antd';
import FloatLabel from '../../Components/FloatLabel';
import moment from 'moment';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditing } from '../../redux/reducers/serviceReducer';
import { useLocation } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;

const Refueling = () => {
    const location = useLocation();

    const dispatch = useDispatch()
    const [time, setTime] = useState(moment('12:00', 'HH:mm'));
    const [fields, setFields] = useState([{ fuelCapacity: '', fuelType: '', fuelPrice: '' }]);
    const [date, setDate] = useState(null);
    const [odometer, setOdometer] = useState('');
    const [comments, setComments] = useState('');
    const [gasStation, setGasStation] = useState('')
    const vehicleId = useSelector(state => state.serviceReducer.selectedRows[0].vehicle_id);
    const fuelData = useSelector((state) => state.serviceReducer.serviceData.FUEL_DATA);
    const gasStationData = useSelector((state) => state.serviceReducer.serviceData.GAS_STATION_DATA);
    const editingObj = useSelector(state => state.serviceReducer.editingObj);
    console.log('editing object', editingObj);

    // gửi dữ liệu lên server
    const onFinish = values => {
        console.log('Received values of form:', values);

        const data = {
            fields: fields,
            gasStation: gasStation,
            date: date,
            time: time,
            comments: comments,
            odometer: odometer,
        };
        console.log(data);

        if (editingObj) {
            fetch(`http://localhost:3000/carTracking/refuelling/api/${vehicleId}`, {
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
            return;
        }
        fetch(`http://localhost:3000/carTracking/refuelling/api/${vehicleId}`, {
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
    const handleInputChange = (event, index, field) => {
        const newFields = [...fields];
        newFields[index][field] = event.target.value;
        setFields(newFields);
    };

    const handleRemoveField = () => {
        const newFields = [...fields];
        newFields.pop();
        setFields(newFields);
    };

    useEffect(() => {
        if (editingObj) {
            setGasStation(editingObj.GAS_STATION
            );
            setDate(moment(editingObj.DATE, 'M/D/YYYY'))

            setOdometer(parseInt(editingObj.ODOMETER))
            setTime(
                moment(editingObj.TIME, 'hh:mm:ss A')
            )
            setComments(editingObj.COMMENTS)
            setFields(editingObj.FUEL_OBJECT.map(item => ({
                fuelCapacity: item.fuel_capacity || '',
                fuelType: item.fuel_type || '',
                fuelPrice: item.fuel_price || ''
            })));
        }

        if (location.pathname === '/refueling/create') {
            setGasStation('');
            setDate(null)
            setOdometer('')
            setTime(
                moment('12:00', 'HH:mm')
            )
            setComments('')
            setFields([{ fuelCapacity: '', fuelType: '', fuelPrice: '' }]);
            dispatch(setEditing(null));

        } else if (location.pathname === '/refueling/editing') {

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
                            <i className='fa-solid fa-tachometer'></i> {/* Replace with the icon you want to use */}
                        </div>
                        <FloatLabel label='Odometer' name='odometer' value={odometer}>
                            <Input type='number' onChange={e => setOdometer(e.target.value)} value={odometer} />
                        </FloatLabel>
                    </div>

                    <Divider />
                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className="fa-solid fa-gas-pump"></i>
                        </div>
                        <FloatLabel label='Gas Station' name='gasStation' value={gasStation}>
                            <Select showSearch onChange={value => setGasStation(value)} value={gasStation}>
                                {gasStationData.map(gasStation => (
                                    <Option key={gasStation.GAS_STATION_ID} value={gasStation.GAS_STATION_NAME}>{gasStation.GAS_STATION_NAME}</Option>
                                ))}
                            </Select>
                        </FloatLabel>
                    </div>
                    <Divider />

                    {fields.map((field, index) => {
                        return (
                            <div key={index}>
                                <div className='form-group'>
                                    <div className='form-icon'>
                                        <i className='fa-solid fa-gas-pump'></i>
                                    </div>
                                    <FloatLabel label='Fuel type' name='fuelType' value={field.fuelType}>
                                        <Select
                                            showSearch
                                            onChange={value =>
                                                handleInputChange({ target: { value } }, index, 'fuelType')
                                            }
                                            value={field.fuelType}>
                                            {fuelData?.map(place => (
                                                <Option key={place.FUEL_ID} value={place.FUEL_NAME}>{place.FUEL_NAME}</Option>
                                            ))}
                                        </Select>
                                    </FloatLabel>
                                </div>

                                <div className='form-group'>
                                    <div className='form-icon'>
                                        <i className='fa-solid fa-dollar-sign'></i>{' '}
                                        {/* Replace with the icon you want to use */}
                                    </div>
                                    <FloatLabel label='Fuel Price' name='fuelPrice' value={field.fuelPrice}>
                                        <Input
                                            type='number'
                                            onChange={e => handleInputChange(e, index, 'fuelPrice')}
                                            value={field.fuelPrice}
                                        />
                                    </FloatLabel>
                                </div>

                                <div className='form-group'>
                                    <div className='form-icon'></div>
                                    <FloatLabel label='Fuel Capacity' name='fuelCapacity' value={field.fuelCapacity}>
                                        <Input
                                            type='number'
                                            onChange={e => handleInputChange(e, index, 'fuelCapacity')}
                                            value={field.fuelCapacity}
                                        />
                                    </FloatLabel>
                                </div>
                            </div>
                        );
                    })}

                    <div className='form-group'>
                        <div className='form-icon'></div>
                        <div>
                            <Button
                                type='primary'
                                onClick={() => {
                                    if (fields.length < 3) {
                                        setFields([...fields, { fuelCapacity: '', fuelType: '', fuelPrice: '' }]);
                                    } else {
                                        message.warning('You can only add up to 3 fuel details.');
                                    }
                                }}
                                style={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <i className='fa-solid fa-plus'></i>
                                <span
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        marginLeft: '5px',
                                    }}>
                                    Fuel
                                </span>
                                {/* Replace with the icon you want to use */}
                            </Button>

                            {fields.length > 1 && (
                                <Button
                                    type='primary'
                                    danger
                                    onClick={() => handleRemoveField()}
                                    style={{
                                        marginLeft: '10px',
                                        display: 'inline-flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                    }}>
                                    <i className='fa-solid fa-minus'></i>
                                </Button>
                            )}
                        </div>
                    </div>

                    <Divider />

                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className='fa-solid fa-comment'></i> {/* Replace with the icon you want to use */}
                        </div>
                        <FloatLabel label='Comments' name='comments' value={comments}>
                            <TextArea rows={4} onChange={e => setComments(e.target.value)} value={comments} />
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
export default Refueling;
