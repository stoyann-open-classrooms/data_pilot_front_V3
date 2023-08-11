import React from 'react'
import { Link } from 'react-router-dom'

function AdminHome() {
  return (
    <>
    <section className="heading">
      <h1>Bienvenue sur votre espace DATA PILOT BY SQUARE</h1>
    </section>
    <section>
    <Link className="btn" to={'/admin/users'}>
        Gestion des Utilisateurs
      </Link>
    <Link className="btn" to={'/admin/tables'}>
        Mes tableaux
      </Link>
    <Link className="btn" to={'/admin/rapports'}>
        Mes Rapports
      </Link>
    <Link className="btn" to={'/admin/parameters'}>
        Parametres
      </Link>
    
    </section>
  </>
  )
}

export default AdminHome