import { useState } from 'react';
import { Form, Layout, Button, Divider } from 'antd';
import { Radio } from 'antd';
import { Input, Select } from 'antd';
import FloatLabel from '../Components/FloatLabel';
import cars from '../assets/cars.json';
import { message } from 'antd';
import { useEffect } from 'react';
import axios from 'axios'
const { TextArea } = Input;
const { Option } = Select;
const { Header, Content, Footer } = Layout;
const carOptions = cars.map(car => ({
    value: car.slug,
    label: (
        <div>
            <img src={`../../carlogo/${car.image}`} alt={car.name} style={{ width: '30px', marginRight: '10px' }} />
            {car.name}
        </div>
    ),
}));
const VehicleEdit = () => {
    const [id, setId] = useState(null);


    const onChange = e => {
        console.log('radio checked', e.target.value);
        setActive(e.target.value);
    }; const [fuelData, setFuelData] = useState([]);
    const [active, setActive] = useState('active');
    const [comments, setComments] = useState('');
    const [manufacturer, setManufacturer] = useState([]);
    const [model, setModel] = useState('');
    const [year, setYear] = useState('2021');
    const [license, setLicense] = useState('');
    const [chassis, setChassis] = useState('');
    const [identification, setIdentification] = useState('');
    const [name, setName] = useState('');
    const [fuelCapacity, setFuelCapacity] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [odometer, setOdemeter] = useState('');

    // gửi dữ liệu lên server
    const onFinish = values => {
        console.log('Received values of form:', values);


        message.success('Changes saved successfully!');

        const data = {
            id,
            active,
            manufacturer: manufacturer,
            model: model,
            year: year,
            license: license,
            chassis: chassis,
            identification: identification,
            name: name,
            fuelCapacity: fuelCapacity,
            fuelType: fuelType,
            odometer: odometer,
            notes: comments,
        };

        fetch(`http://localhost:3000/carTracking/vehicle/api/${id}`, {
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
        axios.get('http://localhost:3000/carTracking/fuelType/api')
            .then(response => {
                // Work with the fetched data here
                console.log(response.data);
                setFuelData(response.data.FUEL_DATA);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        const storedId = localStorage.getItem('id');
        setId(storedId);
    }, []);
    return (
        <Layout style={{ backgroundColor: '#fff' }}>
            <Header>Header</Header>
            <Content>
                <Form className='example' onFinish={onFinish}>
                    <h3>Example</h3>

                    <div className='form-group'>
                        <div className='form-icon'>
                            <div className='circle'>
                                <i className='fa-solid fa-check'></i>
                            </div>
                        </div>

                        <Radio.Group onChange={onChange} value={active} className='radio-custom' name='status'>
                            <Radio value={'active'}>Active</Radio>
                            <Radio value={'inActive'}>Inactive</Radio>
                        </Radio.Group>
                    </div>
                    <Divider />

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
                        <FloatLabel label='Year (Optional)' name='year' value={year}>
                            <Input value={year} onChange={e => setYear(e.target.value)} />
                        </FloatLabel>
                    </div>

                    <div className='form-group'>
                        <div className='form-icon'></div>
                        <FloatLabel label='Name' name='name' value={name}>
                            <Input value={name} onChange={e => setName(e.target.value)} />
                        </FloatLabel>
                    </div>

                    <Divider />

                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className='fa-solid fa-gas-pump'></i>
                        </div>
                        <FloatLabel label='Fuel type' name='fuelType' value={fuelType}>
                            <Select showSearch onChange={value => setFuelType(value)} value={fuelType}>
                                {fuelData.map(fuel => (
                                    <Option key={fuel.FUEL_ID} value={fuel.FUEL_NAME}>{fuel.FUEL_NAME}</Option>
                                ))}
                            </Select>
                        </FloatLabel>
                    </div>

                    <div className='form-group'>
                        <div className='form-icon'></div>
                        <FloatLabel
                            label='Fuel capacity(L)'
                            name='fuelCapacity'
                            value={fuelCapacity}
                        >
                            <Input value={fuelCapacity} onChange={e => setFuelCapacity(e.target.value)} />
                        </FloatLabel>
                    </div>

                    <Divider />

                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className='fa-solid fa-gauge'></i>
                        </div>
                        <FloatLabel label='Odometer' name='odometer' value={odometer}>
                            <Input value={odometer} onChange={e => setOdemeter(e.target.value)} />
                        </FloatLabel>
                    </div>

                    <Divider />

                    <div className='form-group'>
                        <div className='form-icon'>
                            <i className='fa-solid fa-circle-info'></i>
                        </div>
                        <FloatLabel label='License plate (Optional)' name='license' value={license}>
                            <Input value={license} onChange={e => setLicense(e.target.value)} />
                        </FloatLabel>
                    </div>

                    <div className='form-group'>
                        <div className='form-icon'></div>
                        <FloatLabel label='Chassis number (Optional)' name='chassis' value={chassis}>
                            <Input value={chassis} onChange={e => setChassis(e.target.value)} />
                        </FloatLabel>
                    </div>

                    <div className='form-group'>
                        <div className='form-icon'></div>
                        <FloatLabel
                            label='Identification (VIN) (Optional)'
                            name='identification'
                            value={identification}>
                            <Input value={identification} onChange={e => setIdentification(e.target.value)} />
                        </FloatLabel>
                    </div>

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
            <Footer>Footer</Footer>
        </Layout>
    );
};
export default VehicleEdit;
