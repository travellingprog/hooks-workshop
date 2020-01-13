import React from 'react';
import { saveAs } from 'file-saver';

import styles from './MemeCreator.module.css';
import memeTemplates from './memeTemplates.json';

class MemeCreator extends React.Component {
  canvasRef = React.createRef();
  image = null;
  state = {
    caption: '',
    meme: memeTemplates[0].value,
  };

  onCaptionInput = (event) => {
    this.setState({ caption: event.target.value });
  };

  onMemeSelect = (event) => {
    this.setState({ meme: event.target.value });
  };

  downloadMeme = async () => {
    const canvas = this.canvasRef.current;
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    saveAs(blob, 'meme.png');
  };

  async loadMemeTemplate(memeValue) {
    const template = memeTemplates.find(template => template.value === memeValue);
    const img = new window.Image();

    const imgLoadPromise = new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    img.src = process.env.PUBLIC_URL + template.path;
    await imgLoadPromise;
    return img;
  }

  drawCanvas(image, caption) {
    const { height, width } = image;
    const canvas = this.canvasRef.current;
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

  async componentDidMount() {
    const { caption, meme } = this.state;
    this.image = await this.loadMemeTemplate(meme);
    this.drawCanvas(this.image, caption);
  }

  async componentDidUpdate(prevProps, prevState) {
    const { caption, meme } = this.state;

    if (meme !== prevState.meme) {
      this.image = await this.loadMemeTemplate(meme);
      this.drawCanvas(this.image, caption);
    }

    if (caption !== prevState.caption) {
      this.drawCanvas(this.image, caption);
    }
  }

  render() {
    const { caption, meme } = this.state;

    return (
      <main className={styles.root}>
        <label className={styles.label}>
          Select a meme template <br />
          <select value={meme} onChange={this.onMemeSelect} className={styles.select}>
            { memeTemplates.map(template =>
              <option key={template.value} value={template.value}>{template.text}</option>
            )}
          </select>
        </label>
        <label className={styles.label}>
          Enter your meme caption <br />
          <input type="text" value={caption} onChange={this.onCaptionInput}
            className={styles.input} />
        </label>
        <canvas ref={this.canvasRef} className={styles.canvas} />
        <button onClick={this.downloadMeme} className={styles.btn}>Download</button>
      </main>
    );
  }
}

export default MemeCreator;
