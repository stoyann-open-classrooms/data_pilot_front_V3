import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BackButton } from '../../../../components/shared/BackButton';
import { getUsers } from '../../../../features/user/userSlice';
import BigTitle from '../../../../components/shared/BigTitle/BigTitle';
import Modal from '../../../../components/shared/modal/Modal';
import { FaCheck, FaEdit, FaTimes, FaTrash, FaPlus } from 'react-icons/fa';
import {
  getPermissions,
  createPermission,
  deletePermission,
} from '../../../../features/permissionRapport/permissionRaportSlice'; // Importer les actions nécessaires
import Ticket from '../../../../components/shared/ticket/Ticket';

function AdminRapportDetail() {
  const { permissions, isLoading, isError, message } = useSelector((state) => state.permission);
  const params = useParams();
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPermissionData, setEditPermissionData] = useState(null);
  const { users } = useSelector(
    (state) => state.user
  );

  // Récupérer le client du local storage
  const userCustomer = JSON.parse(localStorage.getItem('userCustomer'));
   // Filtrer les utilisateurs qui ont le même client que celui du local storage
 const filteredUsers = users.data
 ? users.data.filter((user) => user.customer === userCustomer)
 : [];
  const [isNewPermissionModalOpen, setIsNewPermissionModalOpen] = useState(false);
  const [newPermissionData, setNewPermissionData] = useState({
    user: '',
    rapport: params.id,
    read: true,
  });

  const handleCreatePermission = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPermission(newPermissionData));
      toast.success('Permission créée avec succès.');
      setIsNewPermissionModalOpen(false);
      dispatch(getPermissions());
    } catch (error) {
      toast.error('Erreur lors de la création de la permission.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPermissionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getPermissions());
    dispatch(getUsers())
  }, [dispatch, isError, message, params.id]);

  const permissionsFiltrees = permissions.data
    ? permissions.data.filter((perm) => perm.rapport && String(perm.rapport._id) === params.id)
    : [];



  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette permission?")) {
      try {
        await dispatch(deletePermission(id));
        toast.success("Permission supprimée avec succès.");
        dispatch(getPermissions());
      } catch (error) {
        toast.error("Erreur lors de la suppression de la permission.");
      }
    }
  };

  const fermerModalEdition = () => {
    setIsEditModalOpen(false);
  };



  if (isLoading || !permissions.data || !users.data) {
    return <h1>Chargement...</h1>;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
     <BackButton url={'/admin/rapports'} />
      <BigTitle title={'Détails du Rapport'} subtitle={'Gérer les Permissions'} />
      <button onClick={() => setIsNewPermissionModalOpen(true)} className="btn btn-success">
        <FaPlus /> Ajouter une Permission
      </button>
      <div className="ticket-headings">
        <div>Utilisateurs</div>
        <div>Rapport</div>
        <div>Lecture</div>
        <div>Actions</div>
      </div>
      {permissionsFiltrees.map((perm) => (
        <Ticket key={perm._id}>
          <div>{perm.user.username}</div>
          <div>{perm.rapport.title}</div>
          <div>{perm.read ? <FaCheck color="green" /> : <FaTimes color="red" />}</div>
          <div>
           
            <FaTrash className="icon-button delete" onClick={() => handleDelete(perm._id)} />
          </div>
        </Ticket>
      ))}
   
           {isNewPermissionModalOpen && (
        <Modal
          titleModal="Ajouter une Permission"
          btnTxt="Ajouter"
          isOpen={isNewPermissionModalOpen}
          onClose={() => setIsNewPermissionModalOpen(false)}
        >
          <form onSubmit={handleCreatePermission}>
            <div className="form-group">
              <label htmlFor="user">Utilisateur :</label>
              <select
                id="user"
                name="user"
                className="form-control"
                value={newPermissionData.user}
                onChange={handleChange}
              >
                <option value="">Sélectionner un utilisateur</option>
                {filteredUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Lecture :</label>
              <input
                type="checkbox"
                checked={newPermissionData.read}
                onChange={(e) =>
                  setNewPermissionData((prevState) => ({
                    ...prevState,
                    read: e.target.checked,
                  }))
                }
              />
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

export default AdminRapportDetail;
