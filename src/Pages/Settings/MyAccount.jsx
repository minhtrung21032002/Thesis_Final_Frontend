import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Popover, Modal, Form, Input, Button, message } from 'antd';
import { setProfile } from '../../redux/reducers/serviceReducer';

const MyAccount = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.serviceReducer.userId);
    const profile = useSelector(state => state.serviceReducer.profile);
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [detailsForm] = Form.useForm();


    useEffect(() => {
        const url = `http://localhost:3000/user/profile/${userId}`;
        axios.get(url)
            .then(response => {
                dispatch(setProfile(response.data));
            })
            .catch(error => {
                console.error('Error fetching the profile:', error);
            });
    }, [userId, dispatch]);

    const showPasswordModal = () => {
        if (profile.user?.signIn_method === 'google') {
            message.warning("Can't change password for Google sign-in");
        } else {
            setIsPasswordModalVisible(true);
        }
    };

    const handlePasswordOk = () => {
        form.validateFields()
            .then(values => {
                axios.patch(`http://localhost:3000/admin/users/${userId}`, {
                    newPassword: values.newPassword,
                })
                    .then(response => {
                        if (response.status === 200) {
                            message.success('Password changed successfully!');
                        }
                    })
                    .catch(error => {
                        console.error('Error changing password:', error);
                        message.error('Failed to change password.');
                    });
                setIsPasswordModalVisible(false);
                form.resetFields();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handlePasswordCancel = () => {
        setIsPasswordModalVisible(false);
        form.resetFields();
    };

    const showDetailsModal = () => {
        setIsDetailsModalVisible(true);
        detailsForm.setFieldsValue({
            userName: profile.user?.user_name,
            userEmail: profile.user?.user_email,
            userPhone: profile.user?.user_phone,
        });
    };

    const handleDetailsOk = () => {
        detailsForm.validateFields()
            .then(values => {
                console.log('sent request')
                axios.patch(`http://localhost:3000/admin/users/profile/${userId}`, {
                    user_name: values.userName,
                    user_email: values.userEmail,
                    user_phone: values.userPhone,
                })
                    .then(response => {
                        console.log(response.status)
                        if (response.status === 200) {
                            message.success('Details updated successfully!');
                            dispatch(setProfile({
                                ...profile,
                                user: {
                                    ...profile.user,
                                    user_name: values.userName,
                                    user_email: values.userEmail,
                                    user_phone: values.userPhone,
                                }
                            }));
                        }
                    })
                    .catch(error => {
                        console.error('Error updating details:', error);
                        message.error('Failed to update details.');
                    });
                setIsDetailsModalVisible(false);
                detailsForm.resetFields();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleDetailsCancel = () => {
        setIsDetailsModalVisible(false);
        detailsForm.resetFields();
    };

    return (
        <div style={{ display: 'flex' }}>
            <div className="my-account-section">
                <header>
                    <h1>My Account</h1>
                </header>
                <div className="has-borderbottom info">
                    <div className="title">Plan</div>
                    <div className="content">Global loading indicators</div>
                </div>
                <div className="has-borderbottom info">
                    <div className="title">My Details</div>
                    <div className="sub-title">Name</div>
                    <div className="content">{profile.user?.user_name}</div>
                    <div className="sub-title">Email</div>
                    <div className="content">{profile.user?.user_email}</div>
                    <div className="sub-title">Phone</div>
                    <div className="content">{profile.user?.user_phone}</div>
                    <div className="sub-title">Sign In</div>
                    <div className="content">{profile.user?.signIn_method}</div>
                    <div>
                        <button
                            style={{
                                cursor: 'pointer',
                                color: '#22a6f2',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                fontSize: '15px',
                                marginTop: '10px',
                            }}
                            onClick={showDetailsModal}
                        >
                            Edit Details
                        </button>
                    </div>
                </div>
                <div className="has-borderbottom" style={{ paddingBlock: '15px' }}>
                    <div className="title">
                        Password
                        <div>
                            <button
                                style={{
                                    cursor: 'pointer',
                                    color: '#22a6f2',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    fontSize: '15px',
                                }}
                                onClick={showPasswordModal}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="avatar-badges">
                <div className="avatar">
                    <img src={profile?.user?.user_img} alt="" />
                    <div className="content">
                        <p>Guides {profile?.user?.total_guides}</p>
                        <p>Points 0</p>
                        <p style={{ fontStyle: 'italic', color: '#222222' }}>{profile?.user?.member_since}</p>
                    </div>
                </div>

                {profile.list_badges?.length >= 0 && <h6 style={{ marginTop: '15px' }}>Total badges: {profile.list_badges.length}</h6>}
                <div className="badges" style={{ marginTop: '15px' }}>
                    {profile?.list_badges?.map((badge, index) => (
                        <div key={index}>
                            <img src={badge?.badge_icon} alt="" />
                            <Popover content={`${badge?.badge_description}`}>
                                <span className="badge">
                                    {badge.badge_name}
                                </span>
                            </Popover>
                        </div>
                    ))}
                </div>

                {/* Total guides */}
                <div className="guides">
                    <h6>Total guides: {profile?.list_guides?.length}</h6>
                    <div className="guide-list">
                        {profile?.list_guides?.map((guide, index) => (
                            <div className="guide-item" key={index}>
                                <img src={guide.img_url} alt={guide.guide_title} />
                                <span>{guide.guide_title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                title="Change Password"
                visible={isPasswordModalVisible}
                onOk={handlePasswordOk}
                onCancel={handlePasswordCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your new password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Edit Details"
                visible={isDetailsModalVisible}
                onOk={handleDetailsOk}
                onCancel={handleDetailsCancel}
            >
                <Form form={detailsForm} layout="vertical">
                    <Form.Item
                        name="userName"
                        label="Name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item

                        name="userEmail"
                        label={`Email (This Is Login User Name)`}
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="userPhone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default MyAccount;
