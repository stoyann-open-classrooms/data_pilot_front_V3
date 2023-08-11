import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfil } from "../../../../features/user/userSlice";
import BigTitle from "../../../../components/shared/BigTitle/BigTitle";
import { getAuthorizations } from "../../../../features/permission/permissionSlice";
import Ticket from "../../../../components/shared/ticket/Ticket";
import Spinner from "../../../../components/shared/spinner/Spinner";

import { FiEye } from 'react-icons/fi';
import { Link } from "react-router-dom";


function PrivateUserTables() {
  const dispatch = useDispatch();
  const { profil, isLoading, isError } = useSelector((state) => state.user);
  const { authorizations } = useSelector((state) => state.authorization);

  useEffect(() => {
    dispatch(getProfil());
    dispatch(getAuthorizations());
  }, [dispatch]);

  if (isLoading || !profil || !profil.data || !authorizations || !authorizations.data) {

    return <Spinner/>;
  }

  if (isError) {
    return <h3>Une erreur s'est produite lors du chargement du profil</h3>;
  }

  console.log("Authorizations avant filtrage:", authorizations.data);

  const userAuthorizations = authorizations && authorizations.data
  ? authorizations.data.filter(
      (auto) => auto.user && auto.user._id === (profil.data && profil.data._id)
    )
  : [];


  return (
    <>
    <BigTitle title={`Mes Rapports - Bonjour, ${profil.data.username}!`} />
   
   <p className="acces-review">Vous avez accées a {userAuthorizations.length} Tableau</p>
    <div className="ticket-headings">
        <div>Tableau</div>
        <div>Créer le</div>
        <div>Modifié le:</div>
        <div>Actions</div>
      </div>


    {userAuthorizations.map((auth) => (
      <Link key={auth._id} to={`/user/table/${auth.tableau._id}`}>
      <Ticket >
        <div>{auth.tableau.name}</div> {/* Assurez-vous que "auth.tableau.title" est la propriété correcte */}
        <div>{new Date(auth.tableau.createdAt).toLocaleDateString()}</div>
        <div>{new Date(auth.tableau.updatedAt).toLocaleDateString()}</div>
    
      </Ticket>
      </Link>
    ))}
  </>

  );
}

export default PrivateUserTables;
