'use client';

import { useEffect, useState } from 'react';

export default function DetectLocation() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const getAddress = localStorage.getItem('address');
        if (!getAddress) {
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
                            setAddress(data.name + ', ' + data.address.city + ', ' + data.address.state);
                            localStorage.setItem('location', JSON.stringify(data));
                            localStorage.setItem('latitude', position.coords.latitude);
                            localStorage.setItem('longitude', position.coords.longitude);
                            localStorage.setItem('address', data.name + ', ' + data.address.city + ', ' + data.address.state);
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
        } else {
            setAddress(getAddress);
        }
        
    }, []);

    return (
        <div className='flex gap-1 items-center'>
            <img src="/icons/map.svg" width={16} />
            {address ? (
                <p className='text-sm font-light cursor-pointer'>{address}</p>
            ) : (
                <p className='text-sm font-light cursor-pointer'>{error || 'Getting location...'}</p>
            )}
        </div>
    );
}
