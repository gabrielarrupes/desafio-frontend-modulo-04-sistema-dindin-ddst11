import { Outlet, Navigate } from 'react-router-dom';

export default function AuthenticatedRoutes({redirect}) {
    const token = localStorage.getItem('token')
    return token ? <Navigate to={redirect} /> : <Outlet /> 
}
