import React from 'react';
import './WaitingRoom.css';

function WaitingRoom() {
    return (
        <div className="waiting-room-container">
            <h1 className="waiting-room-title">En Attente de Validation</h1>
            <p className="waiting-room-message">Nous sommes ravis de vous voir ici. Votre demande d'inscription est actuellement en cours de traitement par notre équipe administrative. Nous comprenons que l'attente peut parfois être frustrante, mais soyez assuré que nous faisons de notre mieux pour traiter votre demande dans les plus brefs délais.</p>
            <p className="waiting-room-message">Nos administrateurs vérifient chaque demande avec soin afin de garantir la meilleure expérience possible pour tous nos utilisateurs. Nous vous remercions de votre patience pendant ce processus.</p>
            <p className="waiting-room-message">Merci pour votre compréhension.</p>
            <p className="waiting-room-signature">L'équipe de <strong>Organiz'asso</strong></p>
        </div>
    );
}

export default WaitingRoom;
