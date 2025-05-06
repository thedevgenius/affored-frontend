export default function CategoryCard({ id, name }) {
    return (
        <div className="rounded-2xl shadow mb-3 p-3">
            <h2 className="font-medium">{ name }</h2>
        </div>
    )
}