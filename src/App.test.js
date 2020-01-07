import React from 'react';
import { Image } from 'canvas';
import { fireEvent, render } from '@testing-library/react';
import { saveAs } from 'file-saver';

import App from './App';

jest.mock('./memeTemplates.json', () => [
  {
    value: 'cryingDawson',
    text: 'Crying Dawson',
    path: '/memes/dawson.jpg',
  },
  {
    value: 'jackieChan',
    text: 'Jackie Chan',
    path: '/memes/jackie-chan.jpg',
  },
]);

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

const RealImage = window.Image;

beforeAll(() => {
  window.Image = Image;
});

afterAll(() => {
  window.Image = RealImage;
});

test('renders component correctly', () => {
  const { getByLabelText } = render(<App />);
  const selectElement = getByLabelText(/meme template/i);
  expect(selectElement).toBeInTheDocument();
  const inputElement = getByLabelText(/meme caption/i);
  expect(inputElement).toBeInTheDocument();
});

test('sets up the canvas on load', async () => {
  const mountSpy = jest.spyOn(App.prototype, 'componentDidMount');
  const drawSpy = jest.spyOn(App.prototype, 'drawCanvas');

  const { container } = render(<App />);

  // wait for componentDidMount() to finish
  expect(mountSpy).toHaveBeenCalledTimes(1);
  const mountPromise = mountSpy.mock.results[0].value;
  await mountPromise;

  expect(drawSpy).toHaveBeenCalledTimes(1);
  expect(drawSpy).toHaveBeenCalledWith(expect.any(Image), '');

  const canvas = container.querySelector('canvas');
  expect(canvas.width).toBe(500); // match dawson.jpg width
  expect(canvas.height).toBe(451); // match dawson.jpg height
  const dataUrl = canvas.toDataURL('image/png', 0.92);
  expect(dataUrl).toMatchSnapshot();

  mountSpy.mockRestore();
  drawSpy.mockRestore();
});

test('updates the canvas on caption change', async () => {
  const mountSpy = jest.spyOn(App.prototype, 'componentDidMount');
  const drawSpy = jest.spyOn(App.prototype, 'drawCanvas');
  const updateSpy = jest.spyOn(App.prototype, 'componentDidUpdate');

  const { container, getByLabelText } = render(<App />);

  // wait for componentDidMount() to finish
  expect(mountSpy).toHaveBeenCalledTimes(1);
  const mountPromise = mountSpy.mock.results[0].value;
  await mountPromise;

  // update caption
  const inputElement = getByLabelText(/meme caption/i);
  fireEvent.change(inputElement, { target: { value: 'Hello' } });

  // wait for componentDidUpdate() to finish
  expect(updateSpy).toHaveBeenCalledTimes(1);
  const updatePromise = updateSpy.mock.results[0].value;
  await updatePromise;

  expect(drawSpy).toHaveBeenCalledTimes(2);
  expect(drawSpy).toHaveBeenLastCalledWith(expect.any(Image), 'Hello');

  const canvas = container.querySelector('canvas');
  expect(canvas.width).toBe(500); // match dawson.jpg width
  expect(canvas.height).toBe(451); // match dawson.jpg height
  const dataUrl = canvas.toDataURL('image/png', 0.92);
  expect(dataUrl).toMatchSnapshot();

  mountSpy.mockRestore();
  drawSpy.mockRestore();
  updateSpy.mockRestore();
});

test('updates the canvas when another template is selected', async () => {
  const mountSpy = jest.spyOn(App.prototype, 'componentDidMount');
  const drawSpy = jest.spyOn(App.prototype, 'drawCanvas');
  const updateSpy = jest.spyOn(App.prototype, 'componentDidUpdate');

  const { container, getByLabelText } = render(<App />);

  // wait for componentDidMount() to finish
  expect(mountSpy).toHaveBeenCalledTimes(1);
  const mountPromise = mountSpy.mock.results[0].value;
  await mountPromise;

  // update template
  const selectElement = getByLabelText(/meme template/i);
  fireEvent.change(selectElement, { target: { value: 'jackieChan' } });

  // wait for componentDidUpdate() to finish
  expect(updateSpy).toHaveBeenCalledTimes(1);
  const updatePromise = updateSpy.mock.results[0].value;
  await updatePromise;

  expect(drawSpy).toHaveBeenCalledTimes(2);
  expect(drawSpy).toHaveBeenLastCalledWith(expect.any(Image), '');

  const canvas = container.querySelector('canvas');
  expect(canvas.width).toBe(500); // match jackie-chan.jpg width
  expect(canvas.height).toBe(327); // match jackie-chan.jpg height
  const dataUrl = canvas.toDataURL('image/png', 0.92);
  expect(dataUrl).toMatchSnapshot();

  mountSpy.mockRestore();
  drawSpy.mockRestore();
  updateSpy.mockRestore();
});

test('triggers a save of the canvas Blob when clicking Download btn', async () => {
  const mountSpy = jest.spyOn(App.prototype, 'componentDidMount');

  const { getByText } = render(<App />);

  // wait for componentDidMount() to finish
  expect(mountSpy).toHaveBeenCalledTimes(1);
  const mountPromise = mountSpy.mock.results[0].value;
  await mountPromise;

  // when canvas.toBlob is used, set up a Promise that resolves when Blob is handled
  let toBlobPromise;
  const realToBlob = HTMLCanvasElement.prototype.toBlob;
  HTMLCanvasElement.prototype.toBlob = function (handler) {
    const canvas = this;
    toBlobPromise = new Promise(resolve => {
      realToBlob.call(canvas, blob => {
        handler(blob);
        resolve();
      });
    });
  };

  // click Download btn
  const dlBtn = getByText(/download/i);
  fireEvent.click(dlBtn);

  await toBlobPromise;
  expect(saveAs).toHaveBeenCalledTimes(1);

  HTMLCanvasElement.prototype.toBlob = realToBlob;
  mountSpy.mockRestore();
});
