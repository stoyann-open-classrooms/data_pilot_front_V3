import React from 'react'
import { Link } from 'react-router-dom'

function SuperAdminHome() {
  return (
    <>
    <section className="heading">
      <h1>Bienvenue sur l'administration de l'application DATA PILOT BY SQUARE</h1>
    </section>
    <section>
    <Link className="btn" to={'/'}>
        Gestion des Clients
      </Link>
    
    </section>
  </>
  )
}

export default SuperAdminHome