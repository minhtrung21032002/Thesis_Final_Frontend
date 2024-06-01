import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Input, Checkbox } from 'antd';
import { setEmail, setLastName, setFirstName, setPhone } from '../redux/reducers/serviceReducer';

const ContactInfo = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.serviceReducer.selectedDate);
    const selectedTime = useSelector(state => state.serviceReducer.selectedTime);
    const make = useSelector(state => state.serviceReducer.make);
    const year = useSelector(state => state.serviceReducer.year);
    const model = useSelector(state => state.serviceReducer.model);
    const comment = useSelector(state => state.serviceReducer.comment);
    const firstName = useSelector(state => state.serviceReducer.firstName);
    const lastName = useSelector(state => state.serviceReducer.lastName);
    const email = useSelector(state => state.serviceReducer.email);
    const phone = useSelector(state => state.serviceReducer.phone);

    const store = useSelector(state => state.serviceReducer.selectedStore);
    return (
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <div style={{ padding: '20px', width: 500 }}>
                <h2>Contact Information</h2>
                <p>
                    We'll use this information to keep you updated on the appointment or if the repair shop has
                    additional questions about your vehicle.
                </p>
                {/* Form Field */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* First name */}
                        <div style={{ width: 'calc(50% - 10px)' }}>
                            <h5>First Name</h5>
                            <Input
                                placeholder='First name'
                                style={{ width: '100%' }}
                                value={firstName || ''}
                                onChange={e => {
                                    dispatch(setFirstName(e.target.value));
                                }}
                            />
                        </div>

                        <div style={{ width: 'calc(50% - 10px)' }}>
                            <h5>Last Name</h5>
                            <Input
                                placeholder='Last name'
                                style={{ width: '100%' }}
                                onChange={e => {
                                    dispatch(setLastName(e.target.value));
                                }}
                            />
                        </div>
                    </div>
                    <h5 style={{ marginTop: 10 }}>Email</h5>
                    <Input
                        placeholder='Email address'
                        style={{ width: '100%' }}
                        value={email || ''}
                        onChange={e => {
                            dispatch(setEmail(e.target.value));
                        }}
                    />
                    <h5 style={{ marginTop: 10 }}>Phone</h5>
                    <Input
                        placeholder='Phone number'
                        style={{ width: '100%' }}
                        value={phone || ''}
                        onChange={e => {
                            dispatch(setPhone(e.target.value));
                        }}
                    />
                </div>
                {/* Accept License*/}

                {/* Checkbox */}
                <p style={{ marginTop: 10 }}>
                    <Checkbox style={{ color: '#ffffff' }}>
                        I want to receive text message updates about my appointment
                    </Checkbox>
                </p>
                <p>
                    {' '}
                    *By providing my phone/mobile number, I agree to be contacted by RepairPal and any of their
                    participating dealers, shops, and/or 3rd parties. These dealers, shops and 3rd parties may contact
                    me using an automatic telephone dialing system, e-mails, and/or text messages for marketing
                    purposes. In the case of text messages, standard message and data rates may apply. I understand that
                    I am not required to give consent as a condition of purchasing any goods or services. To opt out,
                    send STOP at any time.
                </p>
            </div>{' '}
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
                {/* Drop of time */}

                <div style={{ color: '#000001', marginTop: 10 }}>
                    <h4>Drop off time</h4>
                    <p>
                        <i className='fa-regular fa-clock'></i>{' '}
                        {new Date(selectedDate).toLocaleString('en-US', { month: 'long' })}{' '}
                        {new Date(selectedDate).getDate()}, {new Date(selectedDate).getFullYear()} at {selectedTime}
                    </p>
                </div>

                <div style={{ color: '#000001' }}>
                    <h4>Repair Summary</h4>
                    <p>
                        <i className='fa-solid fa-car'></i> {year} {make} {model}
                    </p>
                    <p>
                        <i className='fa-solid fa-comment'></i> Let the shop know what's wrong
                        <p>
                            <span style={{ marginRight: '5px', marginLeft: '15px' }}>•</span>
                            <span
                                style={{
                                    color: '#85949e',
                                }}>
                                {' '}
                                {comment}
                            </span>
                        </p>
                    </p>
                </div>

                <hr />
                <div>
                    <NavLink
                        to={`/summary`}
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
                        Continue to Summary <i className='fa-solid fa-arrow-right ms-2'></i>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
export default ContactInfo;
