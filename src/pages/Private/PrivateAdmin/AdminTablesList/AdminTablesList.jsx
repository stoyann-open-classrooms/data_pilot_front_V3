import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTable, getTables } from '../../../../features/table/tableSlice';
import { toast } from 'react-toastify';
import { BackButton } from '../../../../components/shared/BackButton';
import Ticket from '../../../../components/shared/ticket/Ticket';
import Modal from '../../../../components/shared/modal/Modal';
import { Link } from 'react-router-dom';

function AdminTablesList() {
  const { tables, isLoading, isError, message } = useSelector((state) => state.table);



  // Récupérer l'ID du client de l'utilisateur connecté depuis le localStorage
  const loggedInUserClientId = JSON.parse(localStorage.getItem('userCustomer'));


  const [isNewTableModalOpen, setIsNewTableModalOpen] = useState(false);
  const [newTableData, setNewTableData] = useState({
    customer: loggedInUserClientId,
    name: "",
    description: "",
    type: "",
    columns: Array(5).fill(''),
  });
  const openNewTableModal = () => setIsNewTableModalOpen(true);
  const closeNewTableModal = () => setIsNewTableModalOpen(false);

  const handleNewTableChange = (e) => {
    const { name, value } = e.target;
    setNewTableData({
      ...newTableData,
      [name]: value,
    });
  };
  const handleColumnChange = (index, value) => {
    setNewTableData({
      ...newTableData,
      columns: newTableData.columns.map((col, colIndex) => (colIndex === index ? value : col)),
    });
  };
  const handleNewTableSubmit = (e) => {
    e.preventDefault();
    dispatch(createTable(newTableData))
      .unwrap()
      .then(() => {
        toast.success("Le nouveau tableau a été créé avec succès.");
        closeNewTableModal();
        dispatch(getTables());
      })
      .catch((error) => {
        console.error("Erreur lors de la création du tableau:", error);
        toast.error("Une erreur s'est produite lors de la création du tableau.");
      });
  };

  // Filtrer les tableaux en fonction du client connecté
  const filteredTables = tables.data ? tables.data.filter((table) => table.customer === loggedInUserClientId) : [];
console.log(tables);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTables());
  }, [dispatch, isError, message]);

  if (isLoading || !filteredTables) {
    return <h1>CHARGEMENT ....</h1>;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/admin/home'} />

        <h1>Gestion des tableaux</h1>
        <button onClick={openNewTableModal} className="btn">
        Ajouter un nouveau tableau
      </button>
      </section>

      <div className="ticket-headings">
        <div>Nom du tableau</div>
        <div>Nombre de colonnes</div>
        <div>Types de tableau</div>
        
        <div>Créer le</div>
        <div>Derniere modification</div>
      </div>

      {filteredTables.map((table) => (
        <Link key={table._id} to={`/admin/table/${table.id}`}>
        <Ticket >
          <div>{table.name}</div>
          <div>{table.columns.length}</div>
          <div>{table.type}</div>
          <div>{new Date(table.createdAt).toLocaleDateString()}</div>
          <div>{new Date(table.updatedAt).toLocaleDateString()}</div>
        </Ticket>
        </Link>
      ))}


        
<Modal
        titleModal="Ajouter un nouveau tableau"
        btnTxt="Ajouter"
        isOpen={isNewTableModalOpen}
        onClose={closeNewTableModal}
      >
     <form onSubmit={handleNewTableSubmit}>
  <div className="form-group">
    <label htmlFor="name">Nom du tableau</label>
    <input
      type="text"
      name="name"
      required
      onChange={handleNewTableChange}
      value={newTableData.name}
    />
  </div>

  <div className="form-group">
    <label htmlFor="description">Description</label>
    <textarea
      name="description"
      onChange={handleNewTableChange}
      value={newTableData.description}
    />
  </div>

  <div className="form-group">
    <label htmlFor="type">Type</label>
    <select
      name="type"
      required
      onChange={handleNewTableChange}
      value={newTableData.type}
    >
      <option value="" disabled>Selectioner...</option>
      <option value="Horodaté">Horodaté</option>
      <option value="Statique">Statique</option>
    </select>
  </div>

  <div className="form-group">
    <label>Colonnes</label>
    {Array.from({ length: 5 }).map((_, index) => (
      <input
        type="text"
        name={`column${index}`}
        onChange={(e) => handleColumnChange(index, e.target.value)}
        placeholder={`Colonne ${index + 1}`}
      />
    ))}
  </div>

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

export default AdminTablesList;
