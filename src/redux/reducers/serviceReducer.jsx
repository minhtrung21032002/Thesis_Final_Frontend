// src/redux/slices/serviceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appointments: [],
    stores: [],
    profile: {},
    selectedDate: new Date().toISOString(),
    selectedTime: '10:00',
    selectedStore: null,
    serviceData: {},
    selectedRowKeys: [],
    selectedRows: null,
    userId: localStorage.getItem('id'),
    addNewVehicle: false,
    editingObj: null,
    vehiclesData: [],
    make: '',
    year: '',
    model: '',
    comment: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
};

const serviceSlice = createSlice({
    name: 'serviceData',
    initialState,
    reducers: {
        setVehicles(state, action) {
            state.vehiclesData = action.payload;
        },
        setEditing(state, action) {
            state.editingObj = action.payload;
        },
        setCarServiceData(state, action) {
            state.serviceData = action.payload;
        },
        setSelectedRows(state, action) {
            state.selectedRows = action.payload;
        },
        setSelectedRowKeys(state, action) {
            state.selectedRowKeys = action.payload;
        },
        setUserId(state, action) {
            state.userId = action.payload;
        },
        setAddNewVehicle(state, action) {
            state.addNewVehicle = action.payload;
        },
        setStores(state, action) {
            state.stores = action.payload;
        },
        setCurrentStore(state, action) {
            if (state.stores.length > 0) {
                state.selectedStore = state.stores.find(store => store._id === action.payload);
            }
        },
        setSelectedDate(state, action) {
            state.selectedDate = action.payload;
        },
        setSelectedTime(state, action) {
            state.selectedTime = action.payload;
        },
        setMake(state, action) {
            state.make = action.payload;
        },
        setYear(state, action) {
            state.year = action.payload;
        },
        setModel(state, action) {
            state.model = action.payload;
        },
        setComment(state, action) {
            state.comment = action.payload;
        },
        setFirstName(state, action) {
            state.firstName = action.payload;
        },
        setLastName(state, action) {
            state.lastName = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
        setPhone(state, action) {
            state.phone = action.payload;
        },
        setProfile(state, action) {
            state.profile = action.payload;
        },
        setFuelData(state, action) {
            state.serviceData.FUEL_DATA = action.payload;
        },
        addFuelData(state, action) {
            state.serviceData.FUEL_DATA.push(action.payload);
        },
        updateFuelData(state, action) {
            const index = state.serviceData.FUEL_DATA.findIndex(fuel => fuel.FUEL_ID === action.payload.FUEL_ID);
            if (index !== -1) {
                state.serviceData.FUEL_DATA[index] = action.payload;
            }
        },
        deleteFuelData(state, action) {
            state.serviceData.FUEL_DATA = state.serviceData.FUEL_DATA.filter(fuel => fuel.FUEL_ID !== action.payload);
        },
        setServiceData(state, action) {
            state.serviceData.SERVICE_DATA = action.payload;
        },
        addServiceData(state, action) {
            state.serviceData.SERVICE_DATA.push(action.payload);
        },
        updateServiceData(state, action) {
            const index = state.serviceData.SERVICE_DATA.findIndex(service => service.SERVICE_ID === action.payload.SERVICE_ID);
            if (index !== -1) {
                state.serviceData.SERVICE_DATA[index] = action.payload;
            }
        },
        deleteServiceData(state, action) {
            state.serviceData.SERVICE_DATA = state.serviceData.SERVICE_DATA.filter(service => service.SERVICE_ID !== action.payload);
        },
        setPlaceData(state, action) {
            state.serviceData.PLACE_DATA = action.payload;
        },
        addPlaceData(state, action) {
            state.serviceData.PLACE_DATA.push(action.payload);
        },
        updatePlaceData(state, action) {
            const index = state.serviceData.PLACE_DATA.findIndex(place => place.PLACE_ID === action.payload.PLACE_ID);
            if (index !== -1) {
                state.serviceData.PLACE_DATA[index] = action.payload;
            }
        },
        deletePlaceData(state, action) {
            state.serviceData.PLACE_DATA = state.serviceData.PLACE_DATA.filter(place => place.PLACE_ID !== action.payload);
        },
        setAppointments(state, action) {
            state.appointments = action.payload;
        },
    },
});

export const {
    setCarServiceData,
    setSelectedRows,
    setUserId,
    setAddNewVehicle,
    setEditing,
    setVehicles,
    setSelectedRowKeys,
    setStores,
    setCurrentStore,
    setSelectedDate,
    setSelectedTime,
    setMake,
    setYear,
    setModel,
    setComment,
    setFirstName,
    setLastName,
    setEmail,
    setPhone,
    setProfile,
    setFuelData,
    addFuelData,
    updateFuelData,
    deleteFuelData,
    setServiceData,
    addServiceData,
    updateServiceData,
    deleteServiceData,
    setPlaceData,
    addPlaceData,
    updatePlaceData,
    deletePlaceData,
    setAppointments,
} = serviceSlice.actions;

export default serviceSlice.reducer;
