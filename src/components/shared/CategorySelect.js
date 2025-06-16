'use client';

import { useEffect, useState } from "react";
import Select from 'react-select';

// Custom Option with Image
const CustomOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
        <div
            ref={innerRef}
            {...innerProps}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                cursor: 'pointer',
            }}
        >
            <img
                src={`http://localhost:8000/${data.icon}`}
                alt={data.label}
                style={{ width: 24, height: 24, marginRight: 10, borderRadius: 4 }}
            />
            {data.label}
        </div>
    );
};

// Custom Selected Value with Image
const CustomSingleValue = ({ data }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
            src={`http://localhost:8000/${data.icon}`} // Ensure this is the correct path to your image
            alt={data.label}
            style={{ width: 24, height: 24, marginRight: 10, borderRadius: 4 }}
        />
        {data.label}
    </div>
);

const CategorySelect = ({ field, error }) => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch(baseURL + "caterories/?step=1"); // Replace with your actual API
                const data = await res.json();
                const formatted = data.map(cat => ({
                    value: cat.id,
                    label: cat.name,
                    icon: cat.image, // Ensure this is a full URL or path to image
                }));
                setOptions(formatted);
                const selected = formatted.find(opt => opt.value === field.value?.value || field.value);
                if (selected) {
                    field.onChange(selected);
                }
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
                isClearable
                placeholder="Select a category"
                value={field.value}
                onChange={val => field.onChange(val)}
                components={{
                    Option: CustomOption,
                    SingleValue: CustomSingleValue,
                }}
                styles={{
                    control: (base) => ({
                        ...base,
                        minHeight: 50,
                        padding: 0,
                        borderRadius: 10,
                        borderColor: '#193d8b',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        ":hover": {
                            borderColor: '#193d8b',
                        },
                    }),
                    valueContainer: (base) => ({
                        ...base,
                        padding: '0 8px',
                        display: 'flex',
                        alignItems: 'center',
                    }),
                    singleValue: (base) => ({
                        ...base,
                        display: 'flex',
                        alignItems: 'center',
                    }),
                    input: (base) => ({
                        ...base,
                        margin: 0,
                        padding: 0,
                    }),
                    placeholder: (base) => ({
                        ...base,
                        marginLeft: 0,
                        fontSize: 14,
                    }),
                }}
            />
            {error && <p className="ErrorMessage">{error.message}</p>}
        </>
    );
};

export default CategorySelect;
