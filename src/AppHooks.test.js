import React from 'react';
import { Image, CanvasRenderingContext2D } from 'canvas';
import { fireEvent, render, act } from '@testing-library/react';
import { saveAs } from 'file-saver';

import App from './AppHooks';

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

test('renders component correctly', async () => {
  let getByLabelText;

  await act(async () => {
    ({ getByLabelText } = render(<App />));
  });

  const selectElement = getByLabelText(/meme template/i);
  expect(selectElement).toBeInTheDocument();
  const inputElement = getByLabelText(/meme caption/i);
  expect(inputElement).toBeInTheDocument();
});

test('sets up the canvas on load', async () => {
  let container;
  const drawImgSpy = jest.spyOn(CanvasRenderingContext2D.prototype, 'drawImage');
  const fillTxtSpy = jest.spyOn(CanvasRenderingContext2D.prototype, 'fillText');

  await act(async () => {
    ({ container } = render(<App />));
  });

  expect(drawImgSpy).toHaveBeenCalledTimes(1);
  expect(drawImgSpy).toHaveBeenCalledWith(expect.any(Image), 0, 0);
  expect(fillTxtSpy).toHaveBeenCalledTimes(1);
  expect(fillTxtSpy).toHaveBeenCalledWith('', expect.any(Number), expect.any(Number));

  const canvas = container.querySelector('canvas');
  expect(canvas.width).toBe(500); // match dawson.jpg width
  expect(canvas.height).toBe(451); // match dawson.jpg height
  const dataUrl = canvas.toDataURL('image/png', 0.92);
  expect(dataUrl).toMatchSnapshot();

  drawImgSpy.mockRestore();
  fillTxtSpy.mockRestore();
});

test('updates the canvas on caption change', async () => {
  let container;
  let getByLabelText;
  const fillTxtSpy = jest.spyOn(CanvasRenderingContext2D.prototype, 'fillText');

  await act(async () => {
    ({ container, getByLabelText } = render(<App />));
  });

  expect(fillTxtSpy).toHaveBeenCalledTimes(1);
  expect(fillTxtSpy).toHaveBeenCalledWith('', expect.any(Number), expect.any(Number));

  // update caption
  await act(async () => {
    const inputElement = getByLabelText(/meme caption/i);
    fireEvent.change(inputElement, { target: { value: 'Hello' } });
  });

  expect(fillTxtSpy).toHaveBeenCalledTimes(2);
  expect(fillTxtSpy).toHaveBeenLastCalledWith('Hello', expect.any(Number), expect.any(Number));

  const canvas = container.querySelector('canvas');
  expect(canvas.width).toBe(500); // match dawson.jpg width
  expect(canvas.height).toBe(451); // match dawson.jpg height
  const dataUrl = canvas.toDataURL('image/png', 0.92);
  expect(dataUrl).toMatchSnapshot();

  fillTxtSpy.mockRestore();
});

test('updates the canvas when another template is selected', async () => {
  let container;
  let getByLabelText;
  const drawImgSpy = jest.spyOn(CanvasRenderingContext2D.prototype, 'drawImage');

  await act(async () => {
    ({ container, getByLabelText } = render(<App />));
  });

  expect(drawImgSpy).toHaveBeenCalledTimes(1);
  expect(drawImgSpy).toHaveBeenCalledWith(expect.any(Image), 0, 0);

  // update template
  await act(async () => {
    const selectElement = getByLabelText(/meme template/i);
    fireEvent.change(selectElement, { target: { value: 'jackieChan' } });
  });

  expect(drawImgSpy).toHaveBeenCalledTimes(2);
  expect(drawImgSpy).toHaveBeenLastCalledWith(expect.any(Image), 0, 0);

  const canvas = container.querySelector('canvas');
  expect(canvas.width).toBe(500); // match jackie-chan.jpg width
  expect(canvas.height).toBe(327); // match jackie-chan.jpg height
  const dataUrl = canvas.toDataURL('image/png', 0.92);
  expect(dataUrl).toMatchSnapshot();

  drawImgSpy.mockRestore();
});

test('triggers a save of the canvas Blob when clicking Download btn', async () => {
  // set a Promise that resolves when our saveAs mock is called
  const saveCalled = new Promise((resolve) => {
    saveAs.mockClear();
    saveAs.mockImplementation(resolve);
  });

  let getByText;
  await act(async () => {
    ({ getByText } = render(<App />));
  });

  // click Download btn
  await act(async () => {
    const dlBtn = getByText(/download/i);
    fireEvent.click(dlBtn);
  });

  await saveCalled;
  expect(saveAs).toHaveBeenCalledTimes(1);

  saveAs.mockImplementation(() => {}); // set mock back to a noop
});
