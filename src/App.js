import './App.css';
import sozler from "./quotes.json";
import { useEffect, useState } from 'react';
import { toPng } from 'html-to-image';

function App() {
  const [soz, setSoz] = useState(0);
  const [resim, setResim] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null); 

  useEffect(() => {
    setSoz(Math.floor(Math.random() * sozler.length));
    setResim(Math.floor(Math.random() * 6));
  }, []);

  const downloadImage = () => {
    const container = document.querySelector('.container');
    if (container && imageLoaded) {
      toPng(container)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'container-image.png';
          link.click();
        })
        .catch((error) => {
          console.error('Failed to generate image', error);
        });
    } else {
      console.error('Container element not found or image not loaded');
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', marginTop: '20px' }}>
      <div className="container" style={{ position: 'relative', display: 'inline-block', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <img
          src={`http://localhost:3000/resimler/${resim}.png`}
          className="image"
          alt="quote background"
          onLoad={handleImageLoad}
          onError={(e) => console.error('Image failed to load', e)}
          style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
        />
        <div
          className="text-overlay"
          style={{ 
            position: 'absolute', 
            top: '1.8%', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            textAlign: 'center', 
            width: '80%', 
            color: resim === 0 || resim === 5 ? "black" : "white",
          }}
        >
          {logoUrl && (
            <img src={logoUrl} style={{ width: "30%", marginBottom: '10px' }} alt="User Logo" />
          )}
        </div>
        <div
          className="text-overlay"
          style={{ 
            position: 'absolute', 
            top: '17%', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            textAlign: 'center', 
            width: '80%', 
            color: resim === 0 || resim === 5 ? "black" : "white",
            fontSize: '1.3em',
            fontWeight: 'bold'
          }}
        >
          {sozler[soz]?.quote}
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleLogoUpload} 
          style={{
            marginBottom: '10px', 
            padding: '10px', 
            borderRadius: '5px', 
            border: '1px solid #ccc', 
            cursor: 'pointer',
            fontSize: '1em'
          }} 
        />
        <br />
        <button 
          onClick={() => setLogoUrl(null)}
          style={{
            backgroundColor: '#f44336', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '5px', 
            border: 'none', 
            cursor: 'pointer', 
            marginRight: '10px',
            fontSize: '1em',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          Resmi sil
        </button>
        <button 
          onClick={downloadImage} 
          style={{
            backgroundColor: '#4CAF50', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '5px', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '1em',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          Download as PNG
        </button>
      </div>
    </div>
  );
}

export default App;
