import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfil } from "../../../../features/user/userSlice";
import BigTitle from "../../../../components/shared/BigTitle/BigTitle";
import { getPermissions } from "../../../../features/permissionRapport/permissionRaportSlice";
import Ticket from "../../../../components/shared/ticket/Ticket";
import { FaDatabase } from "react-icons/fa";

function PrivateUserRapports() {
  const dispatch = useDispatch();
  const { profil, isLoading, isError } = useSelector((state) => state.user);
  const { permissions } = useSelector((state) => state.permission);

  useEffect(() => {
    dispatch(getProfil());
    dispatch(getPermissions());
  }, [dispatch]);

  if (isLoading || !profil || !profil.data || !permissions || !permissions.data) {

    return <h1>Chargement...</h1>;
  }

  if (isError) {
    return <h3>Une erreur s'est produite lors du chargement du profil</h3>;
  }

  const userPermissions = permissions && permissions.data 
  ? permissions.data.filter((permission) => permission.user._id === profil.data._id)
  : [];
  

  return (
    <>
      <BigTitle title={`Mes Rapports - Bonjour, ${profil.data.username}!`} />
      <p className="acces-review">Vous avez accées a {userPermissions.length} Rapports</p>
    
      <div className="ticket-headings">
        <div>Rapport</div>
        <div>Créer le</div>
        <div>Modifié le:</div>
        <div>Actions</div>
      </div>
      {userPermissions.map((perm) => (
  <Ticket key={perm._id}> {/* Assurez-vous que "perm.id" est la propriété correcte pour la clé unique */}
    {/* Afficher le nom du client */}
    <div>{perm.rapport.title}</div>
    <div>{new Date(perm.rapport.createdAt).toLocaleDateString()}</div>
    <div>{new Date(perm.rapport.updatedAt).toLocaleDateString()}</div>
    <div>
      <a href={perm.rapport.rapport} target="_blank" rel="noopener noreferrer">
        <FaDatabase
          title="Voir Rapport"
          style={{ marginRight: 20, color: "black", fontSize: "20px" }}
        />
      </a>
    </div>
 
  </Ticket>
))}



    </>
  );
}

export default PrivateUserRapports;
