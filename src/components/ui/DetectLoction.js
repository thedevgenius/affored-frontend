'use client'; // if using Next.js App Router

import { useEffect, useState } from 'react';

export default function DetectLocation() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
                    )
                    .then((response) => response.json())
                    .then((data) => {
                        setAddress(data.name+', '+data.address.city+', '+data.address.state	);
                    })
                    .catch((err) => {
                        setError(err.message);
                    });

                },
                (err) => {
                    setError(err.message);
                }
            );
        } else {
            setError('Geolocation is not supported');
        }
    }, []);

    return (
        <div>
            {address ? (
                <p>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                    <br />
                    Address: {address}
                </p>
            ) : (
                <p>{error || 'Getting location...'}</p>
            )}
        </div>
    );
}
