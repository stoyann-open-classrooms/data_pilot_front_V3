import React from 'react'
import { Link } from 'react-router-dom'

function UserHome() {
  return (
    <>
    <section className="heading">
      <h1>Bienvenue sur votre espace DATA PILOT BY SQUARE</h1>
    </section>
    <section>
       <Link className="btn" to={'/user/tables'}>
       Mes Tableaux
      </Link>
       <Link className="btn" to={'/user/rapports'}>
       Mes Rapports
      </Link>
       <Link className="btn" to={'/user/parameters'}>
       Paramétres
      </Link>
    </section>
  </>
  )
}

export default UserHome