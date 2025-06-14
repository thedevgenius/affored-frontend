'use client';

import axios from "axios";
import { useEffect, useState } from "react";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const SelectLocation = () => {
    const [coords, setCoords] = useState({ lat: null, lng: null });
    const [error, setError] = useState(null);
    const [address, setAddress] = useState('');


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newCoords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCoords(newCoords);
                    localStorage.setItem('newcoords', JSON.stringify(newCoords));
                },
                (err) => {
                    setError(err.message || "Permission denied");
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        const parsedOldCoords = JSON.parse(localStorage.getItem('coords'));
        const addressText = localStorage.getItem('addressText');
        if (addressText) {
            setAddress(addressText);
        }
        if (coords.lat && coords.lng) {
            if (
                parsedOldCoords &&
                parsedOldCoords.lat &&
                parsedOldCoords.lng &&
                parsedOldCoords.lat.toFixed(5) === coords.lat.toFixed(5) &&
                parsedOldCoords.lng.toFixed(5) === coords.lng.toFixed(5)
            ) {
                setAddress(addressText);
            } else {
                console.log("API Called");
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`)
                    .then((response) => {
                        const comps = response.data.results?.[0]?.address_components || [];
                        const desiredTypes = {
                            sublocality_level_2: "",
                            sublocality_level_1: "",
                            locality: "",
                            administrative_area_level_3: "",
                            administrative_area_level_1: "",
                            postal_code: ""
                        };

                        comps.forEach(({ types, long_name }) => {
                            for (const type of types) {
                                if (type in desiredTypes && !desiredTypes[type]) {
                                    desiredTypes[type] = long_name;
                                }
                            }
                        });

                        const {
                            sublocality_level_2,
                            sublocality_level_1,
                            locality,
                            administrative_area_level_3: adminLabel3,
                            administrative_area_level_1: adminLabel1,
                            postal_code: postalCode
                        } = desiredTypes;

                        const parts = [
                            sublocality_level_2,
                            sublocality_level_1,
                            locality,
                            adminLabel3,
                            adminLabel1,
                            postalCode
                        ].filter(Boolean);

                        setAddress(parts.length ? parts.join(", ") : "Address not found");
                        localStorage.setItem('coords', JSON.stringify(coords));
                        localStorage.setItem('addressText', parts.length ? parts.join(", ") : '')

                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
        }

    }, [coords]);

    return (
        <>
            <p className="text-base text-white">{address ? (
                <>{address}</>
                ) : error ? (
                    <>Select location</>
                ) : (
                    <>Getting Location</>
                )}
            </p>
        </>
    )
}

export default SelectLocation;