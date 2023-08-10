import './styles.css'
import { api } from '../../services/api';
import { useEffect, useState } from 'react'

export default function Resume ({transact}) {

    const [resumeValues, setResumeValues] = useState([])

    const getBalanceResume = async () => {

        try {
            const token = localStorage.getItem('token')
            const results = await api.get('transacao/extrato', { headers: { Authorization: `Bearer ${token}` } })
            setResumeValues({
                cashIn: results.data.entrada,
                cashOut: results.data.saida,
                balance:(results.data.entrada - results.data.saida)
            })
            
        } catch (error) {
            console.log(error)
        }
        
    }

   useEffect(() => {
        getBalanceResume()   
    },[transact])

    return (
        <div className='resume-container bg-colorFAFAFA'>
            <h2 className='resume-title color2F2F2F rubik700 fsize-28'>Resumo</h2>
            <div className="resume-box">
                <div className="resume-transactions">
                    <div className="resume-transaction-prop color2F2F2F rubik500 fsize-13">Entradas</div>
                    <div className="resume-transactions-money color645FFB rubik500 fsize-13">R${(resumeValues.cashIn/1000).toFixed(2).replace('.', ',')}</div>
                </div>
                <div className="resume-transactions">
                    <div className="resume-transaction-prop color2F2F2F rubik500 fsize-13">Saídas</div>
                    <div className="resume-transactions-money colorFA8C10 rubik500 fsize-13">R${(resumeValues.cashOut/1000).toFixed(2).replace('.', ',')}</div>
                </div>
          <hr className='resume-line bg-colorEAEAEA border-none'></hr>
          </div>
                <div className="resume-transactions">
                    <div className="resume-transactions-balance rubik700 fsize-14">Saldo</div>
                    <div className="resume-transactions-balance-value color3A9FF rubik500 fsize-14">R${(resumeValues.balance/1000).toFixed(2).replace('.', ',')}</div>
                </div> 
          </div>   
    )
}