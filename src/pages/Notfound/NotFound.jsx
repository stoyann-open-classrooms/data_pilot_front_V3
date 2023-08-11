import React from 'react';
import { BackButton } from '../../components/shared/BackButton';
import { Link } from 'react-router-dom';
import './NotFound.css'
function NotFound() {
    return (
        <div className='not-found-container'>
            <div className='notFoundTxt'>

            <h1>404 - Page non trouvée</h1>
            <p>Désolé, la page que vous recherchez n'existe pas.</p>
            </div>

            <Link to={'/login'} className='btn btn-block btn-danger'>Retour a l'acceuil</Link>
        </div>
    );
}

export default NotFound;