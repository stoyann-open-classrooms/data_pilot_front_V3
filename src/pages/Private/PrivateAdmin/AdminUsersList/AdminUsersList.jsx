import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../features/user/userSlice";
import { getCustomers } from "../../../../features/customer/customerSlice";
import { toast } from "react-toastify";
import { BackButton } from "../../../../components/shared/BackButton";
import Ticket from "../../../../components/shared/ticket/Ticket";
import Modal from "../../../../components/shared/modal/Modal";
import { createUser } from "../../../../features/user/userSlice";
import BigTitle from '../../../../components/shared/BigTitle/BigTitle';

function AdminUsersList() {
  const { users, isLoading, isError, message } = useSelector((state) => state.user);
  const { customers } = useSelector((state) => state.customer);

  // Récupérer l'ID du client de l'utilisateur connecté depuis le localStorage
  const loggedInUserClientId = JSON.parse(localStorage.getItem("userCustomer"));


  console.log(loggedInUserClientId);
  const filteredUsers = users.data ? users.data.filter((user) => user.customer === loggedInUserClientId) : [];
  const filteredCustomers = customers.data ? customers.data.filter((customer) => customer._id === loggedInUserClientId) : [];
  

  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    customer: loggedInUserClientId,
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const openNewUserModal = () => setIsNewUserModalOpen(true);
  const closeNewUserModal = () => setIsNewUserModalOpen(false);

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const handleNewUserSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(newUserData))
      .unwrap()
      .then(() => {
        toast.success("Le nouveau utilisateur a été créé avec succès.");
        closeNewUserModal();
        dispatch(getUsers());
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        toast.error("Une erreur s'est produite lors de la création de l'utilisateur.");
      });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getUsers());
    dispatch(getCustomers());
  }, [dispatch, isError, message]);

  if (isLoading || !filteredUsers || !filteredCustomers) {
    return <h1>CHARGEMENT ....</h1>;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }
  



  return (
    <>
      <section className="headings">
        <BackButton url={"/admin/home"} />
        <h1></h1>
        <BigTitle title={"Gestion des utilisateurs"} subtitle={"Ajoutez, supprimez ou modifiez l'un de vos utilisateurs. Lors de la création d'un compte, l'utilisateur est informé par email et reçoit ses identifiants, qu'il pourra ensuite modifier."} />
        <button onClick={openNewUserModal} className="btn btn-block btn-danger">
          Ajouter un nouveau utilisateur
        </button>
      </section>

      <div className="ticket-headings">
        <div>Client</div>
        <div>Nom</div>
        <div>Email</div>
        <div>Créer le</div>
        <div>Modifier le</div>
      </div>

      {filteredUsers.map((user) => {
        const customer = filteredCustomers.find((customer) => customer.id === user.customer);
        if (!customer) return null;
        
        return (
          <Ticket key={user.id}>
            <div>{customer.name}</div>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{new Date(user.createdAt).toLocaleDateString()}</div>
            <div>{new Date(user.updatedAt).toLocaleDateString()}</div>
          </Ticket>
        );
      })}

      <Modal
        titleModal="Ajouter un nouveau utilisateur"
        btnTxt="Ajouter"
        isOpen={isNewUserModalOpen}
        onClose={closeNewUserModal}
      >
     

  <form onSubmit={handleNewUserSubmit}>
    <div className="form-group">
      <label htmlFor="username">Nom d'utilisateur</label>
      <input
        type="text"
        name="username"
        required
        onChange={handleNewUserChange}
        value={newUserData.username}
      />
    </div>

    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        required
        onChange={handleNewUserChange}
        value={newUserData.email}
      />
    </div>

    <div className="form-group">
      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        required
        onChange={handleNewUserChange}
        value={newUserData.password}
      />
    </div>

    <div className="form-group">
      <label htmlFor="role">Rôle</label>
      <select
        name="role"
        required
        onChange={handleNewUserChange}
        value={newUserData.role}
      >
        <option default value="">Selectioner...</option>
        <option value="user">Utilisateur</option>
        <option value="admin">Admin</option>
      </select>
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

export default AdminUsersList;
