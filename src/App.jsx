import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import VehicleEdit from './Pages/VehicleEdit.jsx';
import History from './Pages/History.jsx';
import Map from './Pages/Map.jsx';

import './styles.css';

import MainTemplate from './Templates/MainTemplate.jsx';
import Refueling from './Pages/Refueling.jsx';
import NewRefueling from './Pages/AddNew/Refueling.jsx';
import Service from './Pages/AddNew/Service.jsx';
import Reminders from './Pages/Reminders.jsx';
import Reports from './Pages/Reports.jsx';
import Users from './Pages/Users.jsx';
import Settings from './Pages/Settings.jsx';
import Reminder from './Pages/AddNew/Reminder.jsx';
import Vehicles from './Pages/Vehicles.jsx';
import FirstVehicleModal from './Pages/FirstVehicleModal.jsx';
import PickDate from './Pages/PickDate.jsx';
import Booking from './Pages/Booking.jsx';
import ContactInfo from './Pages/ContactInfo.jsx';
import Summary from './Pages/Summary.jsx';
import Detail from './Pages/Detail.jsx';

import Fuel from './Pages/Settings/Fuel.jsx';
import ServiceType from './Pages/Settings/ServiceType.jsx';
import MyAccount from './Pages/Settings/MyAccount.jsx';
import Place from  './Pages/Settings/Place.jsx';
import Appointments from  './Pages/Settings/Appointments.jsx'
const App = () => {
    return (

        <Routes path='' element={<MainTemplate />}>
            <Route path='/' element={<MainTemplate />}>
                <Route path='/user/:id' element={<Vehicles />} />
                <Route path='/history' element={<History />} />
                <Route path='/vehicles' element={<Vehicles />} />
                <Route path='/map' element={<Map />} />
                <Route path='/date' element={<PickDate />} />
                <Route path='/date/:id' element={<PickDate />} />

                <Route path='/booking' element={<Booking />}>
                    <Route path=':id' element={<Booking />} />
                </Route>
                <Route path='/contact' element={<ContactInfo />} />
                <Route path='/summary' element={<Summary />} />
                <Route path='/detail' element={<Detail />}>
                    <Route path=':id' element={<Detail />} />
                </Route>

                <Route path='/vehicle/edit/:id' element={<VehicleEdit />} />
                <Route path='/vehicle/new' element={<VehicleEdit />} />

                <Route path='/reminders' element={<Reminders />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/users' element={<Users />} />
                <Route path='/settings' element={<Settings />}>
                    <Route path="service" element={<ServiceType />} />
                    <Route path="fuel" element={<Fuel />} />
                    <Route path="account" element={<MyAccount />} />
                    <Route path="place" element={<Place />} />
                    <Route path="appointments" element={<Appointments />} />
                </Route>
                <Route path='/refueling' element={<Refueling />} />
                <Route path='/refueling/create' element={<NewRefueling />} />
                <Route path='/service/create' element={<Service />} />
                <Route path='/reminder/create' element={<Reminder />} />

                <Route path='/refueling/editing' element={<NewRefueling />} />
                <Route path='/service/editing' element={<Service />} />
                <Route path='/reminder/editing' element={<Reminder />} />
            </Route>

            <Route path='/first-vehicle' element={<FirstVehicleModal />} />
            <Route path='*' element={<Navigate to="/" />}></Route>
        </Routes>

    );
};

export default App;
