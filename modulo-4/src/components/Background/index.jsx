import './styles.css';
import logo from '../../assets/Logo.svg'
import background from '../../assets/background.svg'

export default function Background({children}) {

    return (
    <div className='background-container'
        style={{backgroundImage: `url(${background})`}}>
        <div> 
            <img className='background-logo' src={logo} alt="Logotipo do site"/>
        </div>
        <div>{children}</div>
    </div>
    )

}
