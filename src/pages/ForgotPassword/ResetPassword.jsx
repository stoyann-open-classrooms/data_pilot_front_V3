import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams , useNavigate } from 'react-router-dom';
import { resetPassword } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

function ResetPassword() {
  const dispatch = useDispatch();
  const { token } = useParams(); // Récupération du token depuis les paramètres de l'URL
  const navigate = useNavigate(); // Obtenez la fonction navigate
  const [password, setPassword] = useState('');
  const isLoading = useSelector(state => state.auth.isLoading);
  const message = useSelector(state => state.auth.message);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatching l'action pour réinitialiser le mot de passe
    dispatch(resetPassword({ resetToken: token, newPassword: password }))
      .then(() => {
        toast.success("Votre mot de passe a été réinitialisé. Vous pouvez maintenant vous connecter.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Redirigez vers /login après 3 secondes
        setTimeout(() => {
         
        }, 3000);
      });
  }
  return (
    <div>
      <h2>Réinitialisation de votre mot de passe</h2>

     

      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'> 
          <label htmlFor="password">Nouveau mot de passe :</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button className='btn btn-block' type="submit" disabled={isLoading}>Valider</button>
      </form>
    </div>
  )
}

export default ResetPassword;
