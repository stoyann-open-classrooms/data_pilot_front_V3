import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDetails, updatePassword } from '../../../../features/auth/authSlice';
import { toast } from 'react-toastify';
import Modal from '../../../../components/shared/modal/Modal';
import { getProfil } from '../../../../features/user/userSlice';
import BigTitle from '../../../../components/shared/BigTitle/BigTitle';

function PrivateUserInfos() {
  const dispatch = useDispatch();




  const { profil, isError } = useSelector((state) => state.user); 
  useEffect(() => {
    dispatch(getProfil());
  }, [dispatch]);

  console.log(profil);

  // État pour la mise à jour du nom d'utilisateur
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  // État pour la mise à jour de l'email
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  // État pour la mise à jour du mot de passe
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Gestionnaires pour le nom d'utilisateur
  const openUsernameModal = () => setIsUsernameModalOpen(true);
  const closeUsernameModal = () => setIsUsernameModalOpen(false);
  const handleUsernameChange = (e) => setNewUsername(e.target.value);
  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDetails({ username: newUsername }))
      .unwrap()
      .then(() => {
        toast.success("Nom d'utilisateur mis à jour avec succès.");
        setIsUsernameModalOpen(false); // Ferme la modal
            // Recharge la page après 3 secondes
            setTimeout(() => {
              window.location.reload();
            }, 3000); // 3000 ms = 3 secondes
          })
      .catch(() => toast.error("Erreur lors de la mise à jour du nom d'utilisateur."));
  };

  // Gestionnaires pour l'email
  const openEmailModal = () => setIsEmailModalOpen(true);
  const closeEmailModal = () => setIsEmailModalOpen(false);
  const handleEmailChange = (e) => setNewEmail(e.target.value);
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDetails({ email: newEmail }))
      .unwrap()

      .then(() => {
        toast.success("E-mail mis à jour avec succès.");
        setIsEmailModalOpen(false); // Ferme la modal de l'e-mail
            // Recharge la page après 3 secondes
            setTimeout(() => {
              window.location.reload();
            }, 3000); // 3000 ms = 3 secondes
          })
      .catch(() => toast.error("Erreur lors de la mise à jour de l'e-mail."));
  };

  // Gestionnaires pour le mot de passe
  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);
  const handlePasswordChange = (e) => {
    if (e.target.name === "currentPassword") {
      setCurrentPassword(e.target.value);
    } else {
      setNewPassword(e.target.value);
    }
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ currentPassword, newPassword }))
      .unwrap()
      .then(() => {
        toast.success("Mot de passe mis à jour avec succès.");
        setIsPasswordModalOpen(false); // Ferme la modal du mot de passe
         // Recharge la page après 3 secondes
         setTimeout(() => {
          window.location.reload();
        }, 3000); // 3000 ms = 3 secondes
      })
      .catch(() => toast.error("Erreur lors de la mise à jour du mot de passe."));
  };


  if (!profil || !profil.data) { 
    return <h1>Chargement...</h1>;
  }

  if (isError) {
    return <h3>Une erreur s'est produite lors du chargement du profil</h3>;
  }

  return (
    <>

    <BigTitle title={`Bonjour ${profil.data.username}`}/>
    <div>

      <div className="userInfoContainer">
        <div className="userInfo">

        <h2>  Votre email : <span>  {profil.data.email}</span> </h2>
        </div>
        <div className="userInfo">

        <h2>  Votre Role : <span>  {profil.data.role}</span> </h2>
        </div>
        <div className="userInfo">

        <h2>  Votre Nom d'utilisateur : <span>  {profil.data.username}</span> </h2>
        </div>
      
      </div>
      <button className="btn btn-block" onClick={openUsernameModal}>
        Modifier mon nom d'utilisateur
      </button>

      <button className="btn btn-block" onClick={openEmailModal}>
        Modifier mon e-mail
      </button>

      <button className="btn btn-block" onClick={openPasswordModal}>
        Modifier mon mot de passe
      </button>

      {/* Modal pour le nom d'utilisateur */}
      <Modal
        titleModal="Modifier le nom d'utilisateur"
        btnTxt="Modifier"
        isOpen={isUsernameModalOpen}
        onClose={closeUsernameModal}
      >
        <form onSubmit={handleUsernameSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={newUsername}
              onChange={handleUsernameChange}
              required
              />
          </div>
          <div className="form-group">
            <button className="btn btn-block btn-danger" type="submit">
              Modifier
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal pour l'email */}
      <Modal
        titleModal="Modifier l'e-mail"
        btnTxt="Modifier"
        isOpen={isEmailModalOpen}
        onClose={closeEmailModal}
        >
        <form onSubmit={handleEmailSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              value={newEmail}
              onChange={handleEmailChange}
              required
              />
          </div>
          <div className="form-group">
            <button className="btn btn-block btn-danger" type="submit">
              Modifier
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal pour le mot de passe */}
      <Modal
        titleModal="Modifier le mot de passe"
        btnTxt="Modifier"
        isOpen={isPasswordModalOpen}
        onClose={closePasswordModal}
        >
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Mot de passe actuel</label>
            <input
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nouveau mot de passe</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handlePasswordChange}
              required
              />
          </div>
          <div className="form-group">
            <button className="btn btn-block btn-danger" type="submit">
              Modifier
            </button>
          </div>
        </form>
      </Modal>
    </div>
              </>
  );
}

export default PrivateUserInfos;
