import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../features/auth/authSlice';
import BigTitle from '../../components/shared/BigTitle/BigTitle';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email)); // Wait for the forgotPassword action to complete
    setTimeout(() => {
      window.location.reload(); // Reload the page after 3 seconds
    }, 3000);
  };

  return (
    <>
      <BigTitle title={"Réinitialisation de votre mot de passe"}/>
      {isLoading && <p className='message'>Chargement...</p>}
        {message && !isError && <p className='message message-success'>Un email a été envoyé à {email}. Veuillez vérifier vos spams.</p>}
        {isError && <p className='message message-error'>Une erreur est survenue. Veuillez réessayer.</p>}
      <form className='form container-pass' onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className='btn btn-block btn-danger' type="submit">Envoyer le lien de réinitialisation</button>
        </div>
        
        <Link className='btn btn-block btn-reverse' to={'/login'} >connexion</Link>
       
      </form>
    </>
  );
}

export default ForgotPassword;
