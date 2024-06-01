import { useState } from 'react';
import { Modal, Input, Select, Button, message } from 'antd';
import FloatLabel from '../Components/FloatLabel';
import cars from '../assets/cars.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAddNewVehicle } from '../redux/reducers/serviceReducer';
const { Option } = Select;
const carOptions = cars.map(car => ({
    value: car.slug,
    label: (
        <div>
            <img src={`../../carlogo/${car.image}`} alt={car.name} style={{ width: '30px', marginRight: '10px' }} />
            {car.name}
        </div>
    ),
}));

const carTypes = ['Bus', 'Car', 'Motocycle', 'Truck']



const FirstVehicleModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = localStorage.getItem('id');
    console.log(userId);
    const [manufacturer, setManufacturer] = useState([]);
    const [model, setModel] = useState('');
    const [name, setName] = useState('');
    const [carType, setCarType] = useState('truck');
    const vehicles = useSelector(state => state.serviceReducer.vehiclesData);
    const handleRegister = () => {
        const data = {
            userId: userId,
            manufacturer: manufacturer,
            model: model,
            name: name,
            carType: carType
        };

        axios.post(`http://localhost:3000/carTracking/vehicle/modal/api/${userId}`, data)
            .then(response => {
                if (response.status === 200) {
                    const key = 'registrationMessage';
                    message.success({
                        content: 'Vehicle registered successfully!',
                        key,
                        duration: 2,
                    });

                    dispatch(setAddNewVehicle(false)); // Corrected dispatch call

                    navigate(`/user/${userId}`);


                }
            })
            .catch(error => {
                // Handle error
                console.error('Error registering vehicle:', error);
                message.error('Failed to register vehicle. Please try again.');
            });
    };

    if (vehicles.length > 0) { navigate(`/user/${userId}`) }
    return (
        <div>
            <Modal title="Add your new vehicle"
                visible={true}
                footer={[

                    <Button key="submit" type="primary" onClick={handleRegister}>Register</Button>,
                ]}
            >
                <div className='form-group'>
                    <div className='form-icon'>
                        <i className='fa-solid fa-shield'></i>
                    </div>
                    <FloatLabel label='Manufacturer' name='manufacturer' value={manufacturer}>
                        <Select
                            showSearch
                            onChange={value => setManufacturer(value)}
                            value={manufacturer}
                            options={carOptions}></Select>
                    </FloatLabel>
                </div>

                <div className='form-group'>
                    <div className='form-icon'></div>
                    <FloatLabel label='Model' name='model' value={model}>
                        <Input value={model} onChange={e => setModel(e.target.value)} />
                    </FloatLabel>
                </div>

                <div className='form-group'>
                    <div className='form-icon'></div>
                    <FloatLabel label='Vehicle Type' name='carType' value={carType}>
                        <Select
                            onChange={value => setCarType(value)}
                            value={carType}
                            options={carTypes.map((type) => ({
                                value: type,
                                label: (
                                    <div>{type}</div>
                                )
                            }))
                            }
                        >
                        </Select>
                    </FloatLabel>
                </div>

                <div className='form-group'>
                    <div className='form-icon'></div>
                    <FloatLabel label='Name' name='name' value={name}>
                        <Input value={name} onChange={e => setName(e.target.value)} />
                    </FloatLabel>
                </div>
            </Modal >
        </div >
    );
}
export default FirstVehicleModal;
