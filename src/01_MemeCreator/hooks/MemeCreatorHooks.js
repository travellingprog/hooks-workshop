import React, { useEffect, useRef, useState } from 'react';
import { saveAs } from 'file-saver';

import styles from '../MemeCreator.module.css';
import memeTemplates from '../memeTemplates.json';

function MemeCreator() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [meme, setMeme] = useState(memeTemplates[0].value);

  function onCaptionInput(event){
    setCaption(event.target.value);
  }

  function onMemeSelect(event) {
    setMeme(event.target.value);
  }

  async function downloadMeme() {
    const canvas = canvasRef.current;
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    saveAs(blob, 'meme.png');
  }

  useEffect(() => {
    async function loadMemeTemplate(memeValue) {
      const template = memeTemplates.find(template => template.value === memeValue);
      const img = new window.Image();

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = process.env.PUBLIC_URL + template.path;
      });

      setImage(img);
    }

    loadMemeTemplate(meme);
  }, [meme]);

  useEffect(() => {
    function drawCanvas(image, caption) {
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
    }

    if (image) {
      drawCanvas(image, caption);
    }
  }, [image, caption]);

  return (
    <div className={styles.root}>
      <label className={styles.label}>
        Select a meme template <br />
        <select value={meme} onChange={onMemeSelect} className={styles.select}>
          { memeTemplates.map(template =>
            <option key={template.value} value={template.value}>{template.text}</option>
          )}
        </select>
      </label>
      <label className={styles.label}>
        Enter your meme caption <br />
        <input type="text" value={caption} onChange={onCaptionInput}
          className={styles.input} />
      </label>
      <canvas ref={canvasRef} className={styles.canvas} />
      <button onClick={downloadMeme} className={styles.btn}>Download</button>
    </div>
  );
}

export default MemeCreator;
