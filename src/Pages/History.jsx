import { Radio } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditing } from '../redux/reducers/serviceReducer';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { message } from 'antd'; import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import 'react-vertical-timeline-component/style.min.css';

const History = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const vehicleId = useSelector(state => state.serviceReducer.selectedRows[0].vehicle_id);
    const [data, setData] = useState([])
    const [reminderHistory, setReminderHistory] = useState([]);
    const fetchDataReminderHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/carTracking/reminder/api/${vehicleId}`);
            console.log(response);
            setReminderHistory(response.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/carTracking/history/api/${vehicleId}`);
            console.log(response);
            setData(response.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    const handleDelete = (index, type) => {
        let item = null;
        if (type === 'reminder') {
            item = reminderHistory[index];
        } else {
            item = data[index];
        }


        let apiUrl = '';
        let itemId = '';

        if (item.FUEL_OBJECT) {

            itemId = item.REFUELLING_ID;
            apiUrl = `http://localhost:3000/carTracking/refuelling/api/${itemId}`;
        } else if (item.SERVICE_ID) {

            itemId = item.SERVICE_ID;
            apiUrl = `http://localhost:3000/carTracking/service/api/${itemId}`;
        } else {
            itemId = item.REMINDER_ID;
            apiUrl = `http://localhost:3000/carTracking/reminder/api/${itemId}`;

        }



        axios.delete(apiUrl)
            .then(response => {
                if (response.status === 200) {
                    fetchDataReminderHistory();
                    fetchData(); console.log('Item deleted successfully');
                    message.success('Item deleted successfully');
                }


                else { console.log("Error") }
            })
            .catch(error => {
                console.error('Error deleting item:', error);
                // Handle error scenario
            });
    };

    const handleEdit = (index, type) => {
        console.log('Edit')
        let item = null;
        if (type === 'reminder') {
            item = reminderHistory[index];
            dispatch(setEditing(item));
            console.log('handle Editing item reminder', item)
            navigate('/reminder/editing');
        } else {
            item = data[index];
            dispatch(setEditing(item));
            if (item.FUEL_OBJECT) {
                console.log('handle Editing item fuel', item)
                navigate('/refueling/editing');
            } else {
                console.log('handle Editing item service', item)
                 navigate('/service/editing')
            }
        }


    };

    useEffect(() => {

        fetchDataReminderHistory()
        fetchData();
    }, []);

    return (

        <div style={{
            display: 'flex'
        }}>
            < div style={{
                color: '#000',
                width: 700
            }

            }>
                <VerticalTimeline layout={'1-column-left'}>
                    <VerticalTimelineElement
                        iconStyle={{
                            background: '#795548',
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        icon={<span style={{
                            fontWeight: 600,
                        }}>Oldest</span>}
                    />
                    {data.map((item, index) => (
                        <VerticalTimelineElement
                            key={index}
                            iconStyle={{
                                background: '#FF9800',
                                color: '#fff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            icon={item.FUEL_OBJECT ? <i className="fa-solid fa-gas-pump"></i> : <i className="fa-solid fa-oil-can"></i>}
                        >
                            <h3 className="vertical-timeline-element-title">{item.FUEL_OBJECT ? 'Refueling' : item.SERVICE_TYPE}</h3>
                            <br></br>
                            <h4 className="vertical-timeline-element-subtitle mt-2"> <i className="fa-solid fa-location-dot"></i>  {item.PLACE ? (<>  {`${item.PLACE}`}</>) : `${item.GAS_STATION}`}</h4>
                            <p style={{ marginBottom: '10px' }}>
                                <i className="fa-solid fa-calendar-days me-10"></i>
                                <span>{item.DATE}</span>
                            </p>
                        
                            <p> <i className="fa-solid fa-gauge me-2"></i>{item.ODOMETER}</p>

                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {item.FUEL_OBJECT && item.FUEL_OBJECT.map((fuel, fuelIndex) => (
                                    <div key={fuelIndex} style={{ width: '50%' }}>
                                        <p><i className="fa-solid fa-gas-pump me-2"></i>{fuel.fuel_type}</p>
                                        <p><i className="fa-solid fa-industry me-2"></i> {fuel.fuel_capacity}L</p>
                                        <p><i className="fa-solid fa-money-bill me-2"></i>{fuel.fuel_price}đ</p>
                                    </div>
                                ))}
                            </div>

                            {/* Total Price moved to bottom */}
                            <p>{item.TOTAL_PRICE}</p>

                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                            }}>
                                <button onClick={() => handleEdit(index)}><i className="fa-solid fa-pen"></i></button>
                                <button onClick={() => handleDelete(index)}><i className="fa-solid fa-trash"></i></button>
                            </div>

                        </VerticalTimelineElement>
                    ))}
                    <VerticalTimelineElement
                        iconStyle={{
                            background: '#795548',
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        icon={<span style={{
                            fontWeight: 600,
                        }}>Lastest</span>}
                    />
                </VerticalTimeline>

            </div >

            < div style={{
                width: 700,
                color: '#000',
            }
            }>
                <VerticalTimeline layout={'1-column-left'}>
                    <VerticalTimelineElement
                        iconStyle={{
                            background: '#795548',
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        icon={<span style={{
                            fontWeight: 600,
                        }}>Oldest</span>}
                    />
                    {reminderHistory?.map((item, index) => (
                        <VerticalTimelineElement

                            key={index}
                            date={
                                <>  <i className="fa-solid fa-calendar-days me-2"></i>
                                    <span>  {item.DATE}</span> </>

                            }
                            iconStyle={{
                                background: '#FF9800',
                                color: '#fff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            icon={item.FUEL_OBJECT ? <i className="fa-solid fa-gas-pump"></i> : <i className="fa-solid fa-bell"></i>}
                        >
                            <h3 className="vertical-timeline-element-title">    {item.FUEL_OBJECT ? 'Refueling' : item.SERVICE_TYPE}</h3>

                            <p> <i className="fa-solid fa-gauge me-2"></i> Odometer: {item.ODOMETER}</p>
                            <p>Service type: {item.SERVICE_TYPE}</p>
                            <p>Contact: {item.REMINDER_TYPE}</p>

                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                            }}>
                                <button style={{
                                    marginRight
                                        : '2px'
                                }} onClick={() => handleEdit(index, 'reminder')}><i className="fa-solid fa-pen"></i></button>
                                <button onClick={() => handleDelete(index, 'reminder')}><i className="fa-solid fa-trash"></i></button>
                            </div>

                        </VerticalTimelineElement>
                    ))}
                    <VerticalTimelineElement
                        iconStyle={{
                            background: '#795548',
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        icon={<span style={{
                            fontWeight: 600,
                        }}>Lastest</span>}
                    />
                </VerticalTimeline >
            </div >
        </div >

    );
};
export default History;



