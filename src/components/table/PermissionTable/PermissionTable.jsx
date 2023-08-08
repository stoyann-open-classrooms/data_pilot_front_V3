import React, { useEffect, useState } from 'react';
import Modal from '../../shared/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createAuthorization } from '../../../features/permission/permissionSlice';
import { getUsers } from '../../../features/user/userSlice';
import './permissionsTable.css'
function PermissionTable({ table }) {
    const { users, isLoading, isError, message } = useSelector(
        (state) => state.user
      );


       // Récupérer le client du local storage
  const userCustomer = JSON.parse(localStorage.getItem('userCustomer'));

 // Filtrer les utilisateurs qui ont le même client que celui du local storage
 const filteredUsers = users.data
 ? users.data.filter((user) => user.customer === userCustomer)
 : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    user: '',
    read: false,
    write: false,
    tableau: table.id
  });

  const dispatch = useDispatch();

  // Gestionnaire d'événements pour ouvrir la modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Gestionnaire d'événements pour fermer la modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Gestionnaire d'événements pour gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Gestionnaire d'événements pour soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si l'utilisateur a été sélectionné
    if (!formData.user) {
      toast.error('Veuillez sélectionner un utilisateur.');
      return;
    }

    // Envoyer les données pour créer une nouvelle autorisation
    dispatch(createAuthorization(formData))
      .unwrap()
      .then(() => {
        toast.success('L\'autorisation a été créée avec succès.');
        handleCloseModal();
        // Ajoutez ici toute logique supplémentaire après la création de l'autorisation
      })
      .catch((error) => {
        console.error('Erreur lors de la création de l\'autorisation:', error);
        toast.error('Une erreur s\'est produite lors de la création de l\'autorisation.');
      });
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getUsers());
 
  }, [dispatch, isError, message]);

  console.log(users);

  if (isLoading || !users.data ) {
    return <h1>CHARGEMENT ....</h1>;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
      <button className="btn btn-block btn-danger" onClick={handleOpenModal}>
        Gérer les autorisations pour ce tableau
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3>Ajouter des droits pour ce tableau
        </h3>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="user">Utilisateur :</label>
            <select
              id="user"
              name="user"
              className="form-control"
              value={formData.user}
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
            <div className="form-group-container">
          <div className="form-group">
            <label htmlFor="read">Lecture :</label>
            <div className="custom-checkbox">
            <input
              type="checkbox"
              id="read"
              name="read"
              checked={formData.read}
              onChange={handleChange}
            />
             <span className="checkmark"></span>
             </div>
          </div>


          <div className="form-group">
            <label htmlFor="write">Écriture :</label>
            <div className="custom-checkbox">
              <input
                type="checkbox"
                id="write"
                name="write"
                checked={formData.write}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
            </div>
          </div>
              </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block btn-danger">Ajouter</button>
            
          </div>
        </form>
      </Modal>
    </>
  );
}

export default PermissionTable;
