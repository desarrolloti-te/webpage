import { useEffect, useState } from 'react';
import axios from 'axios';
import gsap from 'gsap';

function App() {
  const [mensaje, setMensaje] = useState("Esperando al servidor...");

  useEffect(() => {
    // Llamada a tu Django local
    axios.get('http://127.0.0.1:8000/api/test/')
      .then(res => {
        setMensaje(res.data.status);
        // Animación GSAP cuando llega la respuesta
        gsap.fromTo(".status-card", 
          { opacity: 0, scale: 0.8, y: 50 }, 
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" }
        );
      })
      .catch(err => setMensaje("Error de conexión"));
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', background: '#111', color: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <div className="status-card" style={{ padding: '40px', border: '1px solid #333', borderRadius: '15px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.2rem', color: '#888' }}>TECNOLOGÍA EMPRESARIAL</h1>
        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{mensaje}</p>
      </div>
    </div>
  );
}

export default App;