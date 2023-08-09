import logout from '../../assets/logout.svg';
import { useNavigate } from 'react-router-dom';

export default function Logout () {
    
    const navigate = useNavigate();

    const handleExit = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    }   

    return (
        <div className='logout-container'>
             <img className='logout-btn pointer' src={logout} onClick={handleExit} alt="Deslogar do site" />
        </div>   
    )

}
