import { AdminProvider } from "@/lib/AdminContext";

export default async function AdminLayout({ children }) {

    return (
        <>
            <AdminProvider>
                {children}
            </AdminProvider>
        </>
    );
}