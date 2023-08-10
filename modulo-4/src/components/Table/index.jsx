import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useEffect, useState } from "react";
import blueArrow from '../../assets/blue-arrow.svg';
import pencil from "../../assets/pencil.svg";
import EditModal from "../../components/EditModal/EditModal";
import DeleteTransaction from "../DeleteTransaction";
import "./styles.css";


export default function Table({ transact, setTransact }) {
  const [registroId, setRegistroId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [sort, setSort] = useState(true);
  const [arrTransact, setArrTransact] = useState([...transact]);

  const getDayOfWeek = (date) => {
    const data = new Date(date);
    const formatado = format(data, "EE", { locale: ptBR });
    return `${formatado[0].toUpperCase()}${formatado.substring(1)}`;
  };

  const formatDate = (date) => {
    const data = new Date(date);
    return format(data, "dd/MM/yy", { locale: ptBR });
  };

  useEffect(() => {
    const orderedTransactions = [...transact]

    if(sort) {
      orderedTransactions.sort((a, b) => Date.parse(a.data) -  Date.parse(b.data));
      setArrTransact([...orderedTransactions])
      return
      }

      orderedTransactions.sort((a, b) => Date.parse(b.data) - Date.parse(a.data));
      setArrTransact([...orderedTransactions])

  }, [sort, transact]);

  return (
      <div className="table-container">
        <div className="table-header color000000 bg-colorFAFAFA text-align-center lato700 fsize-14">
        <div className='sort-date-container table-ml text-align-center table-date'>Data<img className={!sort ? "sort-date-arrow-down pointer" : "sort-date-arrow-up pointer" } src={blueArrow} alt="seta para ordenar o registro por data"  onClick={() => setSort(!sort)} /></div>
          <div className="table-day" >Dia da semana</div>
          <div className="table-description ">Descrição</div>
          <div className="table-category ">Categoria</div>
          <div className="table-money ">Valor</div>
          <div></div>
        </div>
        {arrTransact.map((transation) => (
          <div className="table-row" key={transation.id}>
            <div className="table-row-transactions text-align-center fsize-14">
              <div className="table-date table-ml lato700 ">{formatDate(transation.data)}</div>
              <div className="table-day lato400">{getDayOfWeek(transation.data)}</div>
              <div className="table-description lato400 ">{transation.descricao}</div>
              <div className="table-category lato400 ">{transation.categoria_nome}</div>
              <div
                className={
                  transation.tipo === "entrada" ? "table-money color7B61FF lato700 text-align-center" : "table-money colorFA8C10 lato700 text-align-center"
                }
              >
                R$ {(transation.valor / 1000).toFixed(2).replace(".", ",")}
              </div>
            </div>
            <div className="table-row-icons">
              <button
                id="table-edit-modal-button" className="border-none pointer"
                onClick={() => {
                  setEditModal(!editModal)
                  setRegistroId(transation.id)
                }}
              >
                <img src={pencil} alt="ícone para editar uma transação" />
              </button>
              <DeleteTransaction id={transation.id} />
            </div>
          </div>
        ))}
        {editModal && (
                <EditModal editModal={editModal} id={registroId} setEditModal={setEditModal} transact={transact} setTransact={setTransact} />
              )}
      </div>
  );
}
