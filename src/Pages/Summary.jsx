import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { message } from 'antd';

const Summary = () => {
    const selectedTime = useSelector(state => state.serviceReducer.selectedTime);
    const selectedDateStr = useSelector(state => state.serviceReducer.selectedDate);
    console.log(selectedDateStr)
    const store = useSelector(state => state.serviceReducer.selectedStore);
    const make = useSelector(state => state.serviceReducer.make);
    const year = useSelector(state => state.serviceReducer.year);
    const model = useSelector(state => state.serviceReducer.model);
    const comment = useSelector(state => state.serviceReducer.comment);
    const firstName = useSelector(state => state.serviceReducer.firstName);
    const lastName = useSelector(state => state.serviceReducer.lastName);
    const email = useSelector(state => state.serviceReducer.email);
    const phone = useSelector(state => state.serviceReducer.phone);
    const userId = useSelector(state => state.serviceReducer.userId);

    const selectedDate = new Date(selectedDateStr);

    const handleSubmit = async () => {
        const data = {
            shopId: store._id,
            userId,
            selectedTime,
            selectedDate,
            make,
            year,
            model,
            comment,
            firstName,
            lastName,
            email,
            phone
        };

        try {
            const response = await axios.post('http://localhost:3000/serviceCenter/shop/appointments/api', data);
            if (response.status === 200) {
                message.success('Appointment successfully created!');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            message.error('Failed to create appointment. Please try again.');
        }
    };

    return (
        <div style={{ margin: '0 auto', width: 400 }}>
            <div
                style={{
                    backgroundColor: '#f0f0f0',
                    padding: '20px',
                    borderRadius: '5px',
                }}>
                <h5 style={{ margin: '0px', color: '#606fa6', display: 'flex', justifyContent: 'space-between' }}>
                    DROP OFF AT <NavLink to={`/date/${store._id}`} className='edit-button'>Edit</NavLink>
                </h5>
                <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                    <div>
                        <img
                            src={store?.shop_images[0] || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}
                            style={{ width: '120px', height: '150px', borderRadius: '5px' }}
                            alt='shop'
                        />
                    </div>
                    <div style={{ color: '#000000' }}>
                        <p>
                            <b>{store?.shop_name}</b>
                            <span style={{ marginLeft: '10px' }}>
                                {store?.shop_reputation_star}⭐ ({store?.shop_reviewers.length} reviews)
                            </span>
                        </p>
                        <p>{store?.shop_address}</p>
                        <p>{store?.shop_phone}</p>
                        <p>Opens {store?.open_time && new Date(store?.open_time).toDateString()}</p>
                    </div>
                </div>
                <div style={{ color: '#000001' }}>
                    <h5 style={{ marginTop: '10px' }}>Drop off time</h5>
                    <p>
                        <i className='fa-regular fa-clock'></i> {selectedDate.toLocaleString('en-US', { month: 'long' })} {selectedDate.getDate()}, {selectedDate.getFullYear()} at {selectedTime}
                    </p>
                </div>
            </div>

            <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '20px', color: '#000001', borderRadius: '5px' }}>
                <h5 style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Repair Summary <NavLink to='/booking' className='edit-button'>Edit</NavLink>
                </h5>
                <p>
                    <i className='fa-solid fa-car'></i> {year} {make} {model}
                </p>
                <div>
                    <i className='fa-solid fa-comment'></i> Let the shop know what's wrong
                    <p>
                        <span style={{ marginRight: '5px', marginLeft: '15px' }}>•</span>
                        <span style={{ color: '#85949e' }}>
                            {comment}
                        </span>
                    </p>
                </div>
            </div>

            <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '20px', color: '#000001', borderRadius: '5px' }}>
                <h5 style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Contact Information
                    <NavLink to='/contact' className='edit-button'>Edit</NavLink>
                </h5>
                <p>{firstName} {lastName}</p>
                <p>{phone}</p>
                <p>{email}</p>
            </div>

            <button
                style={{
                    display: 'block',
                    width: '100%',
                    cursor: 'pointer',
                    marginTop: '20px',
                    backgroundColor: '#0289d1',
                    padding: '20px',
                    color: '#fff',
                    borderRadius: '5px',
                    textAlign: 'center',
                    fontWeight: 500,
                }}
                onClick={handleSubmit}
            >
                Request Appointment <i className="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    );
};

export default Summary;
