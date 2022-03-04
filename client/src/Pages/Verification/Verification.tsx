import React from 'react'
import { Link } from 'react-router-dom';

const Verification: React.FC = () => {
  return (
    <div style={{
      display: 'grid',
      placeItems: "center",
      height: "100%"
    }}>
      <h1 style={{
        color: 'yellow',
        textAlign: 'center'
      }}>Por favor verifica tu email</h1>
    </div>
  )
}

export default Verification;
