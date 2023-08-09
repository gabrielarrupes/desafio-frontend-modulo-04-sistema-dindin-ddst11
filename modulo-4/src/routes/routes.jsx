import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from '../components/ProtectedRoutes';
import AuthenticatedRoutes from '../components/AuthenticatedRoutes';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';

export default function MyRoutes() {

    return (

        <Routes>

            <Route path='/signup' element={<SignUp />} />

            <Route element={<ProtectedRoutes redirect={'/signin'}/>}>
                <Route path='/main' element={<Main />} />
            </Route>
            
            <Route element={<AuthenticatedRoutes redirect={'/main'}/>}>
                <Route path='/signin' element={<SignIn />} />
            </Route>
        
        </Routes>

    )

}

