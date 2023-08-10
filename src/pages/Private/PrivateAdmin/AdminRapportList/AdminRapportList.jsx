import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRapports } from "../../../../features/rapport/rapportSlice"; // Importez vos actions de Rapport
import { toast } from "react-toastify";
import { BackButton } from "../../../../components/shared/BackButton";
import Ticket from "../../../../components/shared/ticket/Ticket";
import { Link } from "react-router-dom";
import BigTitle from "../../../../components/shared/BigTitle/BigTitle";
import Spinner from "../../../../components/shared/spinner/Spinner";
import {
  FaDashcube,
  FaDatabase,
  FaEye,
  FaEyeDropper,
  FaUserPlus,
} from "react-icons/fa"; // Importer les nouvelles icônes
import Modal from "../../../../components/shared/modal/Modal";

function AdminRapportList() {
  const { rapports, isLoading, isError, message } = useSelector(
    (state) => state.rapport
  );

  // Récupérer l'ID du client de l'utilisateur connecté depuis le localStorage
  const loggedInUserClientId = JSON.parse(localStorage.getItem("userCustomer"));

  // Filtrer les rapports en fonction du client connecté
  const filteredRapports = rapports.data
    ? rapports.data.filter(
        (rapport) => rapport.customer === loggedInUserClientId
      )
    : [];

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getRapports());
  }, [dispatch, isError, message]);
  console.log(rapports);
  if (isLoading || !filteredRapports) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
      <section className="headings">
        <BackButton url={"/admin/home"} />
        <BigTitle
          title={"Gestion de vos rapports"}
          subtitle={
            "Visualisez vos rapports. Vous pouvez également les modifier ou les supprimer."
          }
        />
      </section>

      <div className="ticket-headings">
        <div>Nom du rapport</div>
        <div>Date de création</div>
        <div>Actions</div>
      </div>

      {filteredRapports.map((rapport) => (
  <Ticket key={rapport._id}>
    <div>{rapport.title}</div>
    <div>{new Date(rapport.updatedAt).toLocaleDateString()}</div>
    <div>
      <a href={rapport.rapport} target="_blank" rel="noopener noreferrer">
        <FaDatabase
          title="Voir Rapport"
          style={{ marginRight: 20, color: "black", fontSize: "20px" }}
        />
      </a>
      <Link to={`/admin/rapport/${rapport._id}`}>
        <FaEye
          title="Voir Détails"
          style={{ marginRight: 20, color: "black", fontSize: "20px" }}
        />
      </Link>
   
    </div>
  </Ticket>
))}

<Modal>

</Modal>
    </>
  );
}

export default AdminRapportList;
