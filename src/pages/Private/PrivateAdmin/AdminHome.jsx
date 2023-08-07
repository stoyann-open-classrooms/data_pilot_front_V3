import React from 'react'
import { Link } from 'react-router-dom'

function AdminHome() {
  return (
    <>
    <section className="heading">
      <h1>Bienvenue sur votre espace DATA PILOT BY SQUARE</h1>
    </section>
    <section>
    <Link className="btn" to={'/'}>
        Gestion des Utilisateurs
      </Link>
    <Link className="btn" to={'/'}>
        Mes tableaux
      </Link>
    
    </section>
  </>
  )
}

export default AdminHome