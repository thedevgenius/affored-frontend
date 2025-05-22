'use client';

import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const mediaURL = 'http://localhost:8000';
    const [cat, setCat] = useState();

    const categoryList = () => {
        axios.get(baseUrl + 'caterories/')
            .then((response) => {
                if (response.status === 200) {
                    setCat(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        categoryList();
    }, [])

    return (
        <>
            <section className="px-4 py-5">
                <div className="grid grid-cols-3 gap-5">
                    {Array.isArray(cat) && cat.length > 0 ? (
                        cat.map((item) => (
                            <div key={item.id}>
                                <Link href={item.slug} passHref>
                                    <img
                                        src={`${mediaURL}${item.image}`}
                                        alt={item.name}
                                        width={50}
                                        className="mx-auto mb-1.5"
                                    />
                                    <h6 className="text-sm text-center">{item.name}</h6>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </section>

            <section>
                
            </section>
        </>
    );
}

