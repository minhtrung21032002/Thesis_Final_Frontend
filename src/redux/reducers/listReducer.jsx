import { createSlice } from '@reduxjs/toolkit';

const initialState = {
{ }
};

const serviceSlice = createSlice({
    name: 'carData',
    initialState,
    reducers: {
        setCarServiceData(state, action) {
            state.serviceData = action.payload;
        },
    },
});

export const { setCarServiceData } = serviceSlice.actions;

export default serviceSlice.reducer;


http://localhost:3000/carTracking/service/api/
{
    "SERVICE_DATA": [
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef641",
            "SERVICE_TYPE": "Battery"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef642",
            "SERVICE_TYPE": "Tire pressure"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef643",
            "SERVICE_TYPE": "Oil filter"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef644",
            "SERVICE_TYPE": "Air filter"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef645",
            "SERVICE_TYPE": "Wheel alignment"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef646",
            "SERVICE_TYPE": "Labor cost"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef647",
            "SERVICE_TYPE": "Seatbelt"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef648",
            "SERVICE_TYPE": "Tire rotation"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef649",
            "SERVICE_TYPE": "Brake fluid"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef64a",
            "SERVICE_TYPE": "Lights"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef64b",
            "SERVICE_TYPE": "Air conditioning"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef64c",
            "SERVICE_TYPE": "Suspension system"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef64d",
            "SERVICE_TYPE": "Inspection"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef64e",
            "SERVICE_TYPE": "Fuel filter"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef64f",
            "SERVICE_TYPE": "New tire"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef650",
            "SERVICE_TYPE": "Brake pad"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef651",
            "SERVICE_TYPE": "Car wash"
        },
        {
            "SERVICE_ID": "65ec1cd5557c22fc441ef652",
            "SERVICE_TYPE": "Oil change"
        }
    ],
        "PLACE_DATA": [
            {
                "PLACE_ID": "65ec1dc81ba65d5594f0dc41",
                "PLACE_NAME": "123 Main Street"
            },
            {
                "PLACE_ID": "65ec1dc81ba65d5594f0dc42",
                "PLACE_NAME": "456 Elm Street"
            },
            {
                "PLACE_ID": "65ec1dc81ba65d5594f0dc43",
                "PLACE_NAME": "789 Oak Street"
            }
        ],
            "FUEL_DATA": [
                {
                    "FUEL_ID": "65efce2fd7ebf3cf75c335a4",
                    "FUEL_NAME": "CNG"
                },
                {
                    "FUEL_ID": "65efce2fd7ebf3cf75c335a5",
                    "FUEL_NAME": "Diesel"
                },
                {
                    "FUEL_ID": "65efce2fd7ebf3cf75c335a6",
                    "FUEL_NAME": "Electrical"
                },
                {
                    "FUEL_ID": "65efce2fd7ebf3cf75c335a7",
                    "FUEL_NAME": "Ethanol"
                },
                {
                    "FUEL_ID": "65efce2fd7ebf3cf75c335a8",
                    "FUEL_NAME": "Liquefied petroleum gas"
                },
                {
                    "FUEL_ID": "65efce2fd7ebf3cf75c335a9",
                    "FUEL_NAME": "Petrol"
                },
                {
                    "FUEL_ID": "65efce2fd7ebf3cf75c335aa",
                    "FUEL_NAME": "Premium Petrol"
                },
                {
                    "FUEL_ID": "65efce2fd7ebf3cf75c335ab",
                    "FUEL_NAME": "Mid-Grade Petrol"
                }
            ]
}




