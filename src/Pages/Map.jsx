import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import L from 'leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setStores } from '../redux/reducers/serviceReducer';
const Map = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const stores = useSelector(state => state.serviceReducer.stores);
    console.log(stores);
    const handleStoreClick = store => {
        const latitude = parseFloat(store.shop_coordinate[0]);
        const longitude = parseFloat(store.shop_coordinate[1]);
        if (mapRef.current && latitude && longitude) {
            const map = mapRef.current;

            map.flyTo([latitude, longitude], 19);
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        } else {
            console.error('Invalid store object:', store);
        }
    };

    useEffect(() => {

        if (stores.length === 0) {
            axios
                .get('http://localhost:3000/serviceCenter/shop/api')
                .then(response => {
                    console.log('Data:', response.data);
                    dispatch(setStores(response.data));
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            return;
        }
        if (!mapRef.current && stores.length > 0) {
            mapRef.current = L.map('map').setView([10.771663, 106.669631], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(mapRef.current);

            const markers = stores.map(item => {
                const latitude = parseFloat(item.shop_coordinate[0]);
                const longitude = parseFloat(item.shop_coordinate[1]);

                const icon = L.divIcon({
                    className: 'custom-icon',
                    html: `<div>${item.shop_reputation_star} ⭐</div>`,
                    iconSize: [70, 36],
                    popupAnchor: [1, -34],
                });

                const popupContent = `
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            height: '300px',
                            alignItems: 'center',
                            padding: '10px',
                            border: '1px solid #ccc',
                            marginBottom: '10px',
                        }}
                    >
                        <div
                            style="
                            background-color:'red';
                                width: 300px;
                                overflow: 'hidden';
                                border-radius: 5px;
                          ">
                            <img
                                src=${item.shop_images[0]}
                                alt=${item.shop_name}
                                style="
                                    width: 100%;
                                    objectFit: 'cover';
                                "
                            />
                        </div>
                        <div style={{
                            height: '100%',
                            alignItems: 'flex-start', }}>
                            <div style="display: flex; justify-content: space-between; align-items: center">
                                <h2 style="margin-top: 0">${item.shop_name}</h2>
                                <p style="margin-top: 0">${item.shop_reputation_star} ⭐(${item.shop_reviewers.length})</p>
                            </div>
            
                            <p style="
                                margin:0;
                                margin-top: 5px;">${item.shop_description}
                            </p>
                            <p style="
                            margin:0;
                            margin-top: 5px;">${item.shop_address}
                            </p>
                            <p><i class="fa-regular fa-clock"></i> Opens: ${new Date(item.open_time).toLocaleTimeString(
                    'en-US',
                    {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                        weekday: 'short',
                    }
                )}</p>
                            <p style="margin-top: 5px"><i class="fa-solid fa-phone"></i> ${item.shop_phone}</p>
                            <p style="margin-top: 5px"><i class="fa-solid fa-bolt-lightning"></i> Soonest availability ${new Date(
                    item.soonest_booking_date
                ).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                    weekday: 'short',
                })}</p>
                            
                    <a id="check-availability-${item._id}" style="
                                display: block;
                                margin-top: 5px;
                                color: #ffffff;
                                padding: 12px 20px;
                                background-color: rgb(0, 150, 209);
                                text-align: center;
                                border-radius: 4px;
                            ">Check Availability</a>
                        </div>
                    </div>
                `;

                const marker = L.marker([latitude, longitude], { icon })
                    .addTo(mapRef.current)
                    .bindPopup(popupContent);

                marker.on('popupopen', () => {
                    const checkAvailabilityButton = document.getElementById(`check-availability-${item._id}`);
                    checkAvailabilityButton.onclick = () => {
                        navigate(`/date/${item._id}`);
                    };
                });

                return marker;
            });



            const group = new L.featureGroup(markers);
            mapRef.current.fitBounds(group.getBounds());
        }
        mapRef.current.on('moveend', function handleMoveEnd() {
            let count = 0;

            // Temporarily remove the event handler
            mapRef.current.off('moveend', handleMoveEnd);

            // Close all popups first
            markers.forEach(marker => marker.closePopup());

            markers.forEach(marker => {
                // Stop if we've already opened two popups
                if (count >= 2) {
                    return;
                }

                // Get the current map view
                const bounds = mapRef.current.getBounds();

                // Check if the marker is within the map view
                if (bounds.contains(marker.getLatLng())) {
                    // Open the marker's popup
                    marker.openPopup();

                    // Increment the counter
                    count++;
                }
            });

            // Add the event handler back
            mapRef.current.on('moveend', handleMoveEnd);
        });
    }, [mapRef, markers, stores]);
    // http://localhost:3000/serviceCenter/shop/api
    return (
        <div style={{ display: 'flex', height: '680px', margin: 'auto', width: '1400px' }}>
            <div id='map' style={{ flex: '1', minWidth: '880px' }}></div>
            <div style={{ flex: '1', overflowY: 'auto' }}>
                <div
                    style={{
                        paddingLeft: '7px',
                        fontSize: '28px',
                    }}>
                    {(stores.length === 0 && <p>No stores found</p>) || <p>Found {stores.length} stores nearby</p>}
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}>
                    {stores.map(store => (
                        <div
                            key={store._id}
                            style={{
                                display: 'flex',
                                gap: '10px',
                                height: '300px',
                                alignItems: 'center',
                                padding: '10px',
                                border: '1px solid #ccc',
                                marginBottom: '10px',
                            }}
                            onClick={() => handleStoreClick(store)}>
                            <div
                                style={{
                                    width: '360px',
                                    height: '100%',
                                    overflow: 'hidden',
                                    borderRadius: '5px',
                                }}>
                                <NavLink to={`/detail/${store._id}`}>
                                    <img
                                        src={store.shop_images[0]}
                                        alt={store.shop_name}
                                        style={{
                                            width: '360px',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    /></NavLink>
                            </div>
                            <div
                                style={{
                                    height: '100%',
                                    alignItems: 'flex-start', // Add this line
                                }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h2 style={{ marginTop: 0 }}>{store.shop_name}</h2>
                                    <p style={{ marginTop: 0 }}>
                                        {store.shop_reputation_star} ⭐({store.shop_reviewers.length})
                                    </p>
                                </div>

                                <p
                                    style={{
                                        margin: 0,
                                    }}>
                                    {store.shop_description}
                                </p>
                                <p>{store.shop_address}</p>
                                <p>
                                    <i className='fa-regular fa-clock'></i> Opens:{' '}
                                    {new Date(store.open_time).toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                        weekday: 'short',
                                    })}
                                </p>
                                <p>
                                    <i className='fa-solid fa-phone'></i> {store.shop_phone}
                                </p>
                                <p>
                                    <i className='fa-solid fa-bolt-lightning'></i> Soonest availability{' '}
                                    {new Date(store.soonest_booking_date).toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                        weekday: 'short',
                                    })}
                                </p>
                                <NavLink
                                    to={`/date/${store._id}`}
                                    style={{
                                        color: '#ffffff',
                                        padding: '12px 20px',
                                        backgroundColor: 'rgb(0, 150, 209)',
                                        textAlign: 'center',
                                        borderRadius: '4px',
                                    }}>
                                    Check Availability
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Map;
