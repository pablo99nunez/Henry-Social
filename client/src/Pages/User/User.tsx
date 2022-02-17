import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function User() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: 'defecto' });
  async function getUser() {
    setLoading(true);
    let user = await fetch('http://localhost:3001/findUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
      }),
    }).then((res) => res.json());
    if (user === null) return alert('No existe el usuario');
    setUser(user);
    console.log(user);
    setLoading(false);
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <h1>Usuario</h1>
      {loading && user ? <h1>Loading</h1> : <h1>{user.name}</h1>}
    </div>
  );
}
