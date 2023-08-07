import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../features/user/userSlice";
import { toast } from "react-toastify";
import { BackButton } from "../../../../components/shared/BackButton";
import Ticket from "../../../../components/shared/ticket/Ticket";
import Modal from "../../../../components/shared/modal/Modal";
import { useState } from "react";
import { createUser } from "../../../../features/user/userSlice";
import { getCustomers } from "../../../../features/customer/customerSlice";

function SuperAdminUsersList() {
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.user
  );
  const { customers } = useSelector((state) => state.customer);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    customer: "",
    username: "",
    email: "",
    password: "",
    role: "user", // Valeur par défaut
  });

  const openNewUserModal = () => {
    setIsNewUserModalOpen(true);
  };

  const closeNewUserModal = () => {
    setIsNewUserModalOpen(false);
  };

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
        console.error("Erreur lors de la création de l'utilisateur:", error); // Log the error
        toast.error(
          "Une erreur s'est produite lors de la création de l'utilisateur."
        );
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

  console.log(users);

  if (isLoading || !users.data || !customers.data) {
    return <h1>CHARGEMENT ....</h1>;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
      <section className="headings">
        <BackButton url={"/superAdmin/home"} />

        <h1>Gestion des utilisateurs</h1>
        <button onClick={openNewUserModal} className="btn">
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

      {users.data.map((user) => {
        // Trouver le client dans customers.data qui a le même ID que user.customer
        const customer = customers.data.find(
          (customer) => customer.id === user.customer
        );

        // Si aucun client n'a été trouvé, vous pouvez retourner null ou une interface utilisateur de secours
        if (!customer) {
          return null; // ou retournez quelque chose d'autre selon vos besoins
        }

        return (
          <Ticket key={user.id}>
            {/* Afficher le nom du client */}
            <div>{customer.name}</div>
            {/* Afficher le nom d'utilisateur */}
            <div>{user.username}</div>
            {/* Afficher l'e-mail de l'utilisateur */}
            <div>{user.email}</div>
            {/* Afficher la date de création de l'utilisateur */}
            <div>{new Date(user.createdAt).toLocaleDateString()}</div>
            {/* Afficher la date de modification de l'utilisateur */}
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
      <label htmlFor="customer">Client</label>
      <select
        name="customer"
        required
        onChange={handleNewUserChange}
        value={newUserData.customer}
      >
        {customers.data.map((customer) => (
          <option value={customer.id} key={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
    </div>

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
        <option value="user">Utilisateur</option>
        <option value="admin">Admin</option>
        <option value="superAdmin">Super Admin</option>
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

export default SuperAdminUsersList;
