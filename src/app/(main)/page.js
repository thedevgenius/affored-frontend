import Image from "next/image";
import CategoryCard from "@/components/ui/CategoryCard";


export default async function Home() {
    const res = await fetch('http://127.0.0.1:8000/categories/', {
        next: { revalidate: 3600 }, // ISR: Revalidate every 1 hour
    });

    const data = await res.json();
    return (
        <>
            <div className="px-3">
                <h1>This is Home</h1>
                {data.map(item => (
                    <CategoryCard key={item.id} id={item.id} name={item.name} />
                ))}
            </div>
        </>
    );
}
