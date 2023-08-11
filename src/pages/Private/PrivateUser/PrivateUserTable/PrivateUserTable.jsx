import React, { useState, useEffect } from "react";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getTable } from "../../../../features/table/tableSlice";
import { toast } from "react-toastify";
import { BackButton } from "../../../../components/shared/BackButton";
import BigTitle from "../../../../components/shared/BigTitle/BigTitle";
import Table from "../../../../components/table/Table";
import {
  createLine,
  getLinesForTable,
  updateLine,
  deleteLine,
  reset,
} from "../../../../features/line/lineslice";
import Modal from "../../../../components/shared/modal/Modal";
import PermissionTable from "../../../../components/table/PermissionTable/PermissionTable";
import Spinner from "../../../../components/shared/spinner/Spinner";
import { getAuthorizations } from "../../../../features/permission/permissionSlice";
import { getProfil } from "../../../../features/user/userSlice";
function PrivateUserTables() {
    const dispatch = useDispatch();
    const { table, isLoading, isError, message } = useSelector(
        (state) => state.table
        );
        const { lines } = useSelector((state) => state.line);
        const { profil} = useSelector((state) => state.user);
  const params = useParams();
  const { authorizations } = useSelector((state) => state.authorization);
  let columns = [];
  if (table.data) {
    columns = table.data.columns;
    if (table.data.type === "Horodaté") {
      columns = [...columns, "Date de début", "Date de fin"];
    }
  }
  const tableRows = lines.data || [];

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getProfil());
    dispatch(getTable(params.id));
    dispatch(getAuthorizations())
    dispatch(getLinesForTable(params.id));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, params.id]);



  const [isNewLineModalOpen, setIsNewLineModalOpen] = useState(false);
  const [newLineData, setNewLineData] = useState({});
  const [isEditLineModalOpen, setIsEditLineModalOpen] = useState(false);
  const [editLineData, setEditLineData] = useState({});
  // Fonction pour ouvrir la modal d'édition avec les données de la ligne sélectionnée
  const openEditLineModal = (row) => {
    setEditLineData(row);
    setIsEditLineModalOpen(true);
  };

  const closeEditLineModal = () => {
    setIsEditLineModalOpen(false);
  };

  const handleEditLineSubmit = (e) => {
    e.preventDefault();
    // Construire l'objet lineData basé sur les données de la ligne
    const lineData = {
      ...editLineData, // Copie toutes les propriétés de editLineData
    };

    // Supprimer les propriétés que vous ne voulez pas mettre à jour (si nécessaire)
    // delete lineData.id;

    // Déclenchez l'action Redux pour mettre à jour la ligne
    console.log("Dispatching updateLine with data:", {
      lineId: editLineData.id,
      lineData,
    });
    dispatch(updateLine({ lineId: editLineData.id, lineData }))
      .unwrap()
      .then(() => {
        toast.success("La ligne a été modifiée avec succès.");
        closeEditLineModal();
        dispatch(getLinesForTable(params.id)); // Actualisez les lignes
      })
      .catch((error) => {
        console.error("Erreur lors de la modification de la ligne:", error);
        toast.error(
          "Une erreur s'est produite lors de la modification de la ligne."
        );
      });
  };
console.log(profil);
  const handleEditLineChange = (e, colName) => {
    setEditLineData({
      ...editLineData,
      [colName]: e.target.value,
    });
  };
  // Fonction pour gérer la suppression de la ligne
  const handleDeleteLine = (row) => {
    // Demandez confirmation avant de supprimer
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette ligne ?")) {
      dispatch(deleteLine(row.id))
        .unwrap()
        .then(() => {
          toast.success("La ligne a été supprimée avec succès.");
          dispatch(getLinesForTable(params.id)); // Actualisez les lignes
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de la ligne:", error);
          toast.error(
            "Une erreur s'est produite lors de la suppression de la ligne."
          );
        });
    }
  };
  const openNewLineModal = () => {
    setIsNewLineModalOpen(true);
  };

  const closeNewLineModal = () => {
    setIsNewLineModalOpen(false);
  };

  const handleNewLineChange = (e, colName) => {
    setNewLineData({
      ...newLineData,
      [colName]: e.target.value,
    });
  };

  const handleNewLineSubmit = (e) => {
    e.preventDefault();

    // Construire l'objet lineData basé sur les colonnes et le type de tableau
    const lineData = {
      tableau: params.id, // Suppose que l'ID du tableau est dans params
    };

    // Ajouter les dates si le tableau est de type "Horodaté"
    if (table.data.type === "Horodaté") {
      lineData.dateStart = newLineData["Date de début"];
      lineData.dateEnd = newLineData["Date de fin"];
    }

    // Ajouter les données des colonnes
    let dataIndex = 1;
    columns.forEach((column) => {
      if (column !== "Date de début" && column !== "Date de fin") {
        lineData[`data_${dataIndex}`] = newLineData[column];
        dataIndex += 1;
      }
    });

    console.log(lineData);
    // Déclencher l'action Redux pour créer la ligne
    dispatch(createLine(lineData))
      .unwrap()
      .then(() => {
        toast.success("La nouvelle ligne a été créée avec succès.");
        closeNewLineModal();
        dispatch(getLinesForTable(params.id)); // Actualiser les lignes
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la ligne:", error);
        toast.error(
          "Une erreur s'est produite lors de la création de la ligne."
        );
      });
  };

  console.log('avant le filtre', authorizations.data);

  const userAuthorizations = authorizations.data
    ? authorizations.data.filter(
        (auto) => auto.user && auto.user._id === (profil.data && profil.data._id)
      )
    : [];
  
  console.log("USER AUTHO", userAuthorizations);
  
  console.log("Longueur de userAuthorizations:", userAuthorizations.length);
  
  const tableAuthorization = userAuthorizations.find(
    (authorization) => authorization.tableau._id === params.id.toString()
  );
  

  
  if (isLoading || !table.data) {
    return <h1>Chargement...</h1>;
  }
  
  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }
  
  


  return (
    <>
    <BackButton url={"/admin/tables"} />
    <BigTitle title={table.data.name} subtitle={table.data.description} />
    <div className="authorizaton-container">
        <div>

  <h4>Vos droits sur ce tableau :</h4>
        </div>
        <div className="rignt">

  <h5>Lecture : {tableAuthorization.read ? <FaCheck color="green" /> : <FaTimes color="red" />}</h5>
  <h5>Écriture : {tableAuthorization.write ? <FaCheck color="green" /> : <FaTimes color="red" />}</h5>
        </div>
</div>


{tableAuthorization.write && (
    <button onClick={openNewLineModal} className="btn">
      Ajouter une nouvelle ligne
    </button>
  )
   }
    <Table
      columns={columns}
      rows={tableRows}
      onEdit={openEditLineModal} // Passez la fonction pour ouvrir la modal d'édition
      onDelete={handleDeleteLine} // Passez la fonction pour supprimer la ligne
      canEdit={tableAuthorization.write} // Nouvelle prop
  />

    <Modal
      titleModal="Modifier la ligne"
      btnTxt="Modifier"
      isOpen={isEditLineModalOpen}
      onClose={closeEditLineModal}
    >
      <form onSubmit={handleEditLineSubmit}>
        {columns.map((column, colIndex) => (
          <div className="form-group" key={colIndex}>
            <label htmlFor={column}>{column}</label>
            <input
              type={
                column === "Date de début" || column === "Date de fin"
                  ? "date"
                  : "text"
              }
              name={column}
              required
              onChange={(e) => handleEditLineChange(e, column)}
              value={editLineData[column] || ""}
            />
          </div>
        ))}
        <div className="form-group">
          <button className="btn btn-block btn-danger" type="submit">
            Modifier
          </button>
        </div>
      </form>
    </Modal>
    <Modal
      titleModal="Ajouter une nouvelle ligne"
      btnTxt="Ajouter"
      isOpen={isNewLineModalOpen}
      onClose={closeNewLineModal}
    >
      <form onSubmit={handleNewLineSubmit}>
        {columns.map((column, colIndex) => (
          <div className="form-group" key={colIndex}>
            <label htmlFor={column}>{column}</label>
            <input
              type={
                column === "Date de début" || column === "Date de fin"
                  ? "date"
                  : "text"
              }
              name={column}
              required
              onChange={(e) => handleNewLineChange(e, column)}
              value={newLineData[column] || ""}
            />
          </div>
        ))}
        <div className="form-group">
          <button className="btn btn-block btn-danger" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </Modal>
  </>
  );
}

export default PrivateUserTables;
