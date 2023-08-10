import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfil } from '../../../../features/user/userSlice'; // Mettez à jour le chemin vers votre fichier slice
import BigTitle from '../../../../components/shared/BigTitle/BigTitle';

function PrivateUserInfos() {
  const dispatch = useDispatch();
  const { profil, isLoading, isError } = useSelector((state) => state.user); // Assurez-vous que 'user' correspond au nom de votre slice dans le store

  useEffect(() => {
    dispatch(getProfil());
  }, [dispatch]);
console.log(profil);
  if (isLoading || !profil.data) {
    return <h1>Chargement...</h1>;
  }

  if (isError) {
    return <h3>Une erreur s'est produite lors du chargement du profil</h3>;
  }

  return (
    <>
      <BigTitle title={` Bonjour, ${profil.data.username}!`} /> {/* Utilisez les propriétés appropriées de 'profil' */}
      
      <div>
        <h2>Mon email : <span>{profil.data.email}</span></h2>
        <h2>Rôle : <span>{profil.data.role}</span></h2>

      </div>
      <div className="danger-action">

      <button className="btn btn-block ">Modifier mon nom d'utilisateur</button>
      <button className="btn btn-block btn-danger">Modifier mon email</button>
      <button className="btn btn-block btn-danger">Modifier mon mot de passe</button>
      </div>
    </>
  );
}

export default PrivateUserInfos;
