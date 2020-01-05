import React from 'react';
import './App.css';

const { Image } = window;

const memeTemplates = [
  {
    value: 'cryingDawson',
    text: 'Crying Dawson',
    path: '/memes/dawson.jpg',
  },
  {
    value: 'jackieChan',
    text: 'Jackie Chan',
    path: '/memes/jackie-chan.jpg',
  }
];

class App extends React.Component {
  canvasRef = React.createRef()

  image = null

  state = {
    caption: '',
    meme: memeTemplates[0].value,
  }

  onCaptionInput = (event) => {
    this.setState({ caption: event.target.value });
  }

  onMemeSelect = (event) => {
    this.setState({ meme: event.target.value });
  }

  async loadMemeTemplate(memeValue) {
    const component = this;
    const template = memeTemplates.find(template => template.value === memeValue);
    const img = new Image();

    return new Promise(resolve => {
      img.onload = function () {
        component.image = this;
        resolve();
      };

      img.src = template.path;
    });
  }

  drawCanvas() {
    if (!this.image) {
      return;
    }

    const { caption } = this.state;
    const { height, width } = this.image;

    const canvas = this.canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(this.image, 0, 0);
    ctx.font = "40px sans-serif";
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(caption, width * 0.5, height * 0.15);
    ctx.strokeText(caption, width * 0.5, height * 0.15);
  }

  async componentDidMount() {
    const { caption, meme } = this.state;

    await this.loadMemeTemplate(meme);
    this.drawCanvas();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { caption, meme } = this.state;

    if (meme !== prevState.meme) {
      await this.loadMemeTemplate(meme);
      this.drawCanvas();
    }

    if (caption !== prevState.caption) {
      this.drawCanvas();
    }
  }

  render() {
    const { caption, meme } = this.state;

    return (
      <div className="App">
        <label>
          Select a meme template <br />
          <select value={meme} onChange={this.onMemeSelect}>
            { memeTemplates.map(template =>
              <option key={template.value} value={template.value}>{template.text}</option>
            )}
          </select>
        </label>
        <label>
          Enter your meme caption <br />
          <input type="text" value={caption} onChange={this.onCaptionInput} />
        </label>
        <canvas ref={this.canvasRef} />
      </div>
    );
  }
}

export default App;
