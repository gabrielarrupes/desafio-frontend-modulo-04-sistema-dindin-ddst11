import "./styles.css";
import { format } from "date-fns";
import { useState } from "react";
import ptBR from "date-fns/locale/pt-BR";
import pencil from "../../assets/pencil.svg";
import DataController from "../DataController";
import DeleteTransaction from "../DeleteTransaction";
import EditModal from "../../components/EditModal/EditModal";


export default function Table({ transact, setTransact }) {
  const [registroId, setRegistroId] = useState("");
  const [editModal, setEditModal] = useState(false);

  const arrTransact = [...transact];

  const getDayOfWeek = (date) => {
    const data = new Date(date);
    const formatado = format(data, "EE", { locale: ptBR });
    return `${formatado[0].toUpperCase()}${formatado.substring(1)}`;
  };

  const formatDate = (date) => {
    const data = new Date(date);
    return format(data, "dd/MM/yy", { locale: ptBR });
  };

  return (
      <div className="table-container">
        <div className="table-header color000000 bg-colorFAFAFA text-align-center lato700 fsize-14">
          <DataController transact={transact} setTransact={setTransact}  />
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
