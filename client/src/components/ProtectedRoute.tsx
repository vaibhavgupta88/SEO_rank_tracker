import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

interface AppContextType {
    token: string | null;
    loading: boolean;
}

export default function ProtectedRoute() {
    const {token, loading} = useContext(AppContext) as AppContextType;

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-dark-900">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}
