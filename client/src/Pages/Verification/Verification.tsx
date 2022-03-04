import React from 'react';
import { Helmet } from 'react-helmet';

const Verification: React.FC = () => {
  return (
    <div style={{
      display: 'grid',
      placeItems: "center",
      height: "100%"
    }}>
      <Helmet>
          <meta charSet="utf-8"/>
          <meta name="Error Page" content="Verifica tu email"/>
          <title>Verificación | Henry Social</title>
      </Helmet>
      <h1 style={{
        color: 'yellow',
        textAlign: 'center'
      }}>Por favor verifica tu email</h1>
    </div>
  )
}

export default Verification;
