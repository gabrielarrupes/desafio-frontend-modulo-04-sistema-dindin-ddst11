import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoutes ({redirect}) {
    const token = localStorage.getItem('token')
    return token ? <Outlet /> : <Navigate to={redirect} />

}

