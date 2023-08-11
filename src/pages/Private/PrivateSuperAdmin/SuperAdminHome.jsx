import React from 'react'
import { Link } from 'react-router-dom'

function SuperAdminHome() {
  return (
    <>
    <section className="heading">
      <h1>Bienvenue sur l'administration de l'application DATA PILOT BY SQUARE</h1>
    </section>
    <section>
    <Link className="btn" to={'/superAdmin/customers'}>
        Gestion des Clients
      </Link>
    <Link className="btn" to={'/superAdmin/users'}>
        Gestion des Utilisateurs
      </Link>
    <Link className="btn" to={'/superAdmin/post-rapport'}>
       Gestion des rapports
      </Link>
    <Link className="btn" to={'/superAdmin/parameters'}>
     parametres
      </Link>
    
    </section>
  </>
  )
}

export default SuperAdminHome