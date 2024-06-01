import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NavLink, useParams } from 'react-router-dom';
import { setCurrentStore, setSelectedDate, setSelectedTime } from '../redux/reducers/serviceReducer';

const Example = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.serviceReducer.selectedDate);
    const selectedTime = useSelector(state => state.serviceReducer.selectedTime);

    const store = useSelector(state => state.serviceReducer.selectedStore);
    console.log('store', store);

    const id = useParams().id;
    console.log('id', id);
    // Define an array of dates to be disabled
    const disabledDates = [
        new Date('2024-04-28'), // Example date to disable
        new Date('2024-05-01'), // Another example date to disable
        // Add more dates here as needed
    ];

    const times = ['8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am'];

    useEffect(() => {
        dispatch(setCurrentStore(id));
    }, [id]);

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ border: '1px solid', padding: '25px 15px 20px', borderRadius: 5 }}>
                <h2>When can you drop off your car</h2>
                <DatePicker
                    open={true}
                    selected={selectedDate}
                    onChange={date => {
                        dispatch(setSelectedDate(date.toISOString()));
                    }}
                    excludeDates={disabledDates} // Pass the array of disabled dates
                    showTimeInput={false}
                />
                <div
                    style={{
                        marginTop: '30px',
                    }}>
                    <h3>
                        Times for {new Date(selectedDate).toLocaleString('en-US', { month: 'long' })}{' '}
                        {new Date(selectedDate).getDate()}, {new Date(selectedDate).getFullYear()}
                    </h3>

                    <div style={{ display: 'flex', gap: '5px', paddingTop: '15px' }}>
                        {times.map(time => (
                            <div
                                key={time}
                                className={selectedTime === time ? 'selected-time' : 'time-slot'} // Apply CSS class based on selection
                                onClick={() => dispatch(setSelectedTime(time))}>
                                <span>{time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: '#f0f0f0', padding: '20px', alignSelf: 'self-start', borderRadius: '5px' }}>
                <h5 style={{ margin: '0px', color: '#606fa6' }}>DROP OFF ATT</h5>
                <div
                    style={{
                        marginTop: '10px',
                        display: 'flex',
                        gap: '10px',
                    }}>
                    <div>
                        <img
                            src={
                                store?.shop_images[0] ||
                                'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
                            }
                            style={{
                                width: '120px',
                                height: '150px',
                                borderRadius: '5px',
                            }}
                            alt='avatar'
                        />
                    </div>
                    <div style={{ color: '#000000' }}>
                        <p>
                            <b>{store?.shop_name}</b>
                            <span
                                style={{
                                    marginLeft: '10px',
                                }}>
                                {store?.shop_reputation_star}⭐({store?.shop_reviewers.length} reviews)
                            </span>
                        </p>
                        <p>{store?.shop_address}</p>
                        <p>{store?.shop_phone}</p>
                        <p>Opens {store?.open_time && new Date(store?.open_time).toDateString()}</p>
                    </div>
                </div>
                <hr />
                <div>
                    <NavLink
                        to={`/booking`}
                        style={{
                            display: 'block',
                            textAlign: 'center',
                            backgroundColor: '#0098d4',
                            color: '#ffffff',
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 500,
                        }}>
                        {new Date(selectedDate).toLocaleString('en-US', { month: 'long' })}{' '}
                        {new Date(selectedDate).getDate()} at <span>{selectedTime}</span>{' '}
                        <i className='fa-solid fa-arrow-right ms-2'></i>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Example;
