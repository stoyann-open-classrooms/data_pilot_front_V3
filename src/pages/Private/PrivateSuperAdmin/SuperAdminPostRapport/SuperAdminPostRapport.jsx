import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRapports, createRapport, updateRapport } from "../../../../features/rapport/rapportSlice";
import Ticket from "../../../../components/shared/ticket/Ticket";
import { FaEye, FaPlus, FaEdit } from "react-icons/fa";
import { getCustomers } from "../../../../features/customer/customerSlice";
import Modal from "../../../../components/shared/modal/Modal";

function SuperAdminPostRapport() {
  const dispatch = useDispatch();
  const { rapports, isLoading, isError, message } = useSelector((state) => state.rapport);
  const { customers } = useSelector((state) => state.customer);
  const [isNewRapportModalOpen, setIsNewRapportModalOpen] = useState(false);

  const [isEditRapportModalOpen, setIsEditRapportModalOpen] = useState(false);
  const [editRapportData, setEditRapportData] = useState(null);
  const [newRapportData, setNewRapportData] = useState({
    customer: '',
    title: '',
    rapport: '',
  });
  const handleEditRapport = async (e) => {
    e.preventDefault();
    try {
      // Extraire l'ID du rapport
      const rapportId = editRapportData._id;
      // Appeler la fonction updateRapport avec l'objet contenant l'ID du rapport et les données de rapport
      await dispatch(updateRapport({ rapportId, rapportData: editRapportData }));
      setIsEditRapportModalOpen(false);
      dispatch(getRapports())
    } catch (error) {
      console.error('Erreur lors de la modification du rapport:', error);
    }
  };

  const handleOpenEditModal = (rapport) => {
    setEditRapportData(rapport);
    setIsEditRapportModalOpen(true);
  };

  const handleCreateRapport = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createRapport(newRapportData));
      setIsNewRapportModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la création du rapport:', error);
    }
  };

  useEffect(() => {
    dispatch(getRapports());
    dispatch(getCustomers());
  }, [dispatch]);

  if (isLoading || !rapports.data || !customers.data) {
    return <h1>Chargement...</h1>;
  }

  if (isError) {
    return <h3>{message}</h3>;
  }
  return (
    <>
    <div>
      <h1>Gestion des rapports</h1>
      <button onClick={() => setIsNewRapportModalOpen(true)} className="btn btn-success">
          <FaPlus /> Ajouter un rapport
        </button>
      <div className="ticket-headings">
        <div>Client</div>
        <div>Titre</div>
        <div>Créer le</div>
        <div>Modifier le</div>
        <div>Actions</div>
      </div>
      {rapports.data.map((rapport) => {
          const customer = customers.data.find(
              (cust) => cust._id === rapport.customer
              );
              
              return (
                  <Ticket key={rapport.id}>
            <div>{customer ? customer.name : "Client inconnu"}</div>
            <div>{rapport.title}</div>
            <div>{new Date(rapport.createdAt).toLocaleDateString()}</div>
            <div>{new Date(rapport.updatedAt).toLocaleDateString()}</div>
            <div>
                <a href={rapport.rapport} target="_blank" rel="noreferrer">
                  <FaEye style={{ color: "black", fontSize: "30px" , marginRight:"20"}} />
                </a>
                <FaEdit style={{ color: "black", fontSize: "30px", cursor: "pointer" }} onClick={() => handleOpenEditModal(rapport)} />
              </div>
          </Ticket>
        );
    })}
    </div>


    {isEditRapportModalOpen && editRapportData && (
        <Modal titleModal="Modifier un rapport" btnTxt="Mettre à jour" isOpen={isEditRapportModalOpen} onClose={() => setIsEditRapportModalOpen(false)}>
         <form onSubmit={handleEditRapport}>
  <div className="form-group">
    <label htmlFor="edit-customer">Client :</label>
    <select
      id="edit-customer"
      name="customer"
      className="form-control"
      value={editRapportData.customer}
      onChange={(e) =>
        setEditRapportData({ ...editRapportData, customer: e.target.value })
      }
    >
      <option value="">Sélectionner un client</option>
      {customers.data.map((customer) => (
        <option key={customer._id} value={customer._id}>
          {customer.name}
        </option>
      ))}
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="edit-title">Titre :</label>
    <input
      type="text"
      id="edit-title"
      name="title"
      className="form-control"
      value={editRapportData.title}
      onChange={(e) =>
        setEditRapportData({ ...editRapportData, title: e.target.value })
      }
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="edit-rapport">Lien du rapport :</label>
    <input
      type="url"
      id="edit-rapport"
      name="rapport"
      className="form-control"
      value={editRapportData.rapport}
      onChange={(e) =>
        setEditRapportData({ ...editRapportData, rapport: e.target.value })
      }
      required
    />
  </div>
  <div className="form-group">
    <button className="btn btn-block btn-success" type="submit">
      Mettre à jour
    </button>
  </div>
</form>

        </Modal>
      )}


    {isNewRapportModalOpen && (
        <Modal titleModal="Ajouter un rapport" btnTxt="Ajouter" isOpen={isNewRapportModalOpen} onClose={() => setIsNewRapportModalOpen(false)}>
          <form onSubmit={handleCreateRapport}>
            <div className="form-group">
              <label htmlFor="customer">Client :</label>
              <select id="customer" name="customer" className="form-control" value={newRapportData.customer} onChange={(e) => setNewRapportData({ ...newRapportData, customer: e.target.value })}>
                <option value="">Sélectionner un client</option>
                {customers.data.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="title">Titre :</label>
              <input type="text" id="title" name="title" className="form-control" value={newRapportData.title} onChange={(e) => setNewRapportData({ ...newRapportData, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label htmlFor="rapport">Lien du rapport :</label>
              <input type="url" id="rapport" name="rapport" className="form-control" value={newRapportData.rapport} onChange={(e) => setNewRapportData({ ...newRapportData, rapport: e.target.value })} required />
            </div>
            <div className="form-group">
              <button className="btn btn-block btn-success" type="submit">
                Ajouter
              </button>
            </div>
          </form>
        </Modal>
      )}

    </>
  );
}

export default SuperAdminPostRapport;
