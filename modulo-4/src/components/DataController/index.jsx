import './styles.css';
import { useState } from 'react';
import blueArrow from '../../assets/blue-arrow.svg';

export default function DataController({transact, setTransact}) {

    const arrTransact = [...transact]
    const [sort, setSort] = useState(false);

    const sortDate = () => {
        if(sort) {
            arrTransact.sort((a, b) => {
                const ASort = Date.parse(a.data);
                const BSort = Date.parse(b.data)
                    return ASort - BSort;
            })
            setTransact(arrTransact);
            setSort(false);
            return
        }

        arrTransact.sort((a, b) => {
            const ASort = Date.parse(a.data);
            const BSort = Date.parse(b.data)
                return BSort - ASort;
        })
        setTransact(arrTransact);
        setSort(true);
    }

    return (
        <div> 
           <div className='sort-date-container table-ml text-align-center table-date'>Data<img className={!sort ? "sort-date-arrow-down pointer" : "sort-date-arrow-up pointer" } src={blueArrow} alt="seta para ordenar o registro por data" onClick={() => sortDate()} /></div>
        </div>
    )

}