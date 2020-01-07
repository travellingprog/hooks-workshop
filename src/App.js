import React, { useEffect, useRef, useState } from 'react';
import { saveAs } from 'file-saver';

import './App.css';
import memeTemplates from './memeTemplates.json';

function App() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(new window.Image());
  const [caption, setCaption] = useState('');
  const [meme, setMeme] = useState(memeTemplates[0].value);

  const onCaptionInput = (event) => {
    setCaption(event.target.value);
  };

  const onMemeSelect = (event) => {
    setMeme(event.target.value);
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    canvas.toBlob(blob => {
      saveAs(blob, 'meme.png');
    });
  };

  const drawCanvas = (image, caption) => {
    const { height, width } = image;
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0);
    ctx.font = "40px sans-serif";
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(caption, width * 0.5, height * 0.15);
    ctx.strokeText(caption, width * 0.5, height * 0.15);
  };

  useEffect(() => {
    async function loadMemeTemplate(memeValue) {
      const template = memeTemplates.find(template => template.value === memeValue);
      const img = new window.Image();

      const imgLoadPromise = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      img.src = process.env.PUBLIC_URL + template.path;
      await imgLoadPromise;
      setImage(img);
    }

    loadMemeTemplate(meme).catch(err => console.error(err));
  }, [meme]);

  useEffect(() => {
    drawCanvas(image, caption);
  }, [image, caption]);

  return (
    <div className="App">
      <label>
        Select a meme template <br />
        <select value={meme} onChange={onMemeSelect}>
          { memeTemplates.map(template =>
            <option key={template.value} value={template.value}>{template.text}</option>
          )}
        </select>
      </label>
      <label>
        Enter your meme caption <br />
        <input type="text" value={caption} onChange={onCaptionInput} />
      </label>
      <canvas ref={canvasRef} />
      <button onClick={downloadMeme}>Download</button>
    </div>
  );
}

export default App;
