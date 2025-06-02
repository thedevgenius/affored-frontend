'use client';

import { useEffect, useState } from "react";
import Select from 'react-select';

const CategorySelect = ({ field, error }) => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch(baseURL + "caterories/"); // Replace with your actual API
                const data = await res.json();
                const formatted = data.map(cat => ({
                    value: cat.id,
                    label: cat.name,
                }));
                setOptions(formatted);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    return (
        <>
            <Select
                {...field}
                options={options}
                isLoading={loading}
                isSearchable
                placeholder="Select a category"
                value={field.value}
                onChange={val => field.onChange(val)}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
        </>
    );
};

export default CategorySelect;
