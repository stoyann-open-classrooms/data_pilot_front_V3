import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCustomers } from "../../../../features/customer/customerSlice"
import { toast } from "react-toastify"
import { BackButton } from "../../../../components/shared/BackButton"
import Ticket from "../../../../components/shared/ticket/Ticket"
import Modal from "../../../../components/shared/modal/Modal"
import { useState } from 'react';
import { createCustomer } from '../../../../features/customer/customerSlice';

function SuperAdminCustomersList() {


    const { customers, isLoading, isError, message } = useSelector(
        (state) => state.customer,
      )
      const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);
      const [newCustomerData, setNewCustomerData] = useState({
        name: '', 
      });
    
      const openNewCustomerModal = () => {
        setIsNewCustomerModalOpen(true);
      };
    
      const closeNewCustomerModal = () => {
        setIsNewCustomerModalOpen(false);
      };
    
      const handleNewCustomerChange = (e) => {
        const { name, value } = e.target;
        setNewCustomerData({
          ...newCustomerData,
          [name]: value,
        });
      };
    
      const handleNewCustomerSubmit = (e) => {
        e.preventDefault();
        dispatch(createCustomer(newCustomerData))
          .unwrap()
          .then(() => {
            toast.success('Le nouveau client a été créé avec succès.');
            closeNewCustomerModal();
            dispatch(getCustomers());
          })
          .catch((error) => {
            console.error("Erreur lors de la création du client:", error); // Log the error
            toast.error("Une erreur s'est produite lors de la création du client.");
          });
      };
      
    
      const dispatch = useDispatch()
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
        dispatch(getCustomers())
      }, [dispatch, isError, message])
    
      console.log(customers)
    
      if (isLoading || !customers.data) {
        return  <h1>CHARGEMENT ....</h1>
      }
    
      if (isError) {
        return <h3>Une erreur est survenue, merci de réessayer.</h3>
      }
    




  return (
    <>
    <section className="headings">
      <BackButton url={'/superAdmin/home'} />

      <h1>Gestion des clients</h1>
      <button onClick={openNewCustomerModal} className="btn">
          Ajouter un nouveau client
        </button>
    </section>



    <div className="ticket-headings">
   <div>Nom</div>
   <div>Créer le</div>
   <div>Modifier le</div>
 </div>

 {customers.data.map((customer) => (
     <Ticket key={customer.id}>
     <div>{customer.name}</div>
     <div>{new Date(customer.createdAt).toLocaleDateString()}</div>
     <div>{new Date(customer.updatedAt).toLocaleDateString()}</div>
   </Ticket>
 ))}

<Modal
        titleModal="Ajouter un nouveau client"
        btnTxt="Ajouter"
        isOpen={isNewCustomerModalOpen}
        onClose={closeNewCustomerModal}
      >
        <form onSubmit={handleNewCustomerSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleNewCustomerChange}
              value={newCustomerData.name}
            />
          </div>
          {/* Ajoutez d'autres champs de formulaire selon vos besoins */}
          <div className="form-group">
            <button className="btn btn-block btn-danger" type="submit">
              Ajouter
            </button>
          </div>
        </form>
      </Modal>
  </>
  )
}

export default SuperAdminCustomersList