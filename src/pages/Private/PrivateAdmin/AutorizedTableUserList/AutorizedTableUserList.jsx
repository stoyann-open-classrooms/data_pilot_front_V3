import React, { useEffect, useState } from "react"; // Ajouter useState
import { useDispatch, useSelector } from "react-redux";
import BigTitle from '../../../../components/shared/BigTitle/BigTitle'
import {
  getAuthorizations,
  updateAuthorization,
  deleteAuthorization,
} from "../../../../features/permission/permissionSlice"; // Importer les actions nécessaires
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Ticket from "../../../../components/shared/ticket/Ticket";
import Modal from "../../../../components/shared/modal/Modal";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa"; // Importer les icônes
import { getTable } from "../../../../features/table/tableSlice";

function AutorizedTableUserList() {
  const { authorizations, isLoading, isError, message } = useSelector(
    (state) => state.authorization
  );

  const { table } = useSelector(
    (state) => state.table
  );
 
  const params = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAuthorizationData, setEditAuthorizationData] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getAuthorizations());
    dispatch(getTable(params.id))
  }, [dispatch, isError, message]);

  const filteredAuthorizations = authorizations.data
  ? authorizations.data.filter(
      (auto) => auto.tableau && String(auto.tableau._id) === params.id
    )
  : [];

  const handleEdit = (id) => {
    const authorizationToEdit = authorizations.data.find(
      (auth) => auth._id === id
    );
    if (authorizationToEdit) {
      setEditAuthorizationData(authorizationToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette autorisation?")) {
      try {
        await dispatch(deleteAuthorization(id));
        toast.success("Autorisation supprimée avec succès.");
        dispatch(getAuthorizations());
      } catch (error) {
        console.log("Erreur lors de la suppression :", error); // Affiche l'erreur
        toast.error("Erreur lors de la suppression de l'autorisation.");
      }
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateAuthorization = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateAuthorization({
          authorizationId: editAuthorizationData._id,
          authorizationData: editAuthorizationData,
        })
      );
      closeEditModal();
      toast.success("Autorisation mise à jour avec succès.");
      dispatch(getAuthorizations());
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de l'autorisation.");
    }
  };

  if (isLoading || !authorizations.data || !table.data) {
    return <h1>CHARGEMENT ....</h1>;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>

     <BigTitle title={`Liste des authorisations tableau : ${table.data.name}`}/>
      <div className="ticket-headings">
        <div>Utilisateurs</div>
        <div>tableau</div>
        <div>Ecriture</div>
        <div>Lecture</div>
        <div>Actions</div>
      </div>
      {filteredAuthorizations.map((auto) => (
        <Ticket key={auto._id}>
          <div>{auto.user.username}</div>
          <div>{auto.tableau.name}</div>
          <div>
            {auto.write ? <FaCheck color="green" /> : <FaTimes color="red" />}
          </div>
          <div>
            {auto.read ? <FaCheck color="green" /> : <FaTimes color="red" />}
          </div>
          <div>
            <FaEdit
              className="icon-button"
              onClick={() => handleEdit(auto._id)}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
            <FaTrash
              className="icon-button delete"
              onClick={() => handleDelete(auto._id)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </Ticket>
      ))}
      {isEditModalOpen && (
        <Modal
          titleModal="Modifier l'autorisation"
          btnTxt="Mettre à jour"
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
        >
          <form onSubmit={handleUpdateAuthorization}>
            {/* Vos champs de formulaire pour éditer l'autorisation, par exemple: */}
            <div>
              <label>Lecture :</label>
              <input
                type="checkbox"
                checked={editAuthorizationData.read}
                onChange={(e) =>
                  setEditAuthorizationData((prevState) => ({
                    ...prevState,
                    read: e.target.checked,
                  }))
                }
              />
            </div>
            <div>
              <label>Ecriture :</label>
              <input
                type="checkbox"
                checked={editAuthorizationData.write}
                onChange={(e) =>
                  setEditAuthorizationData((prevState) => ({
                    ...prevState,
                    write: e.target.checked,
                  }))
                }
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block btn-danger" type="submit">
                Mettre à jour
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default AutorizedTableUserList;
