const app = document.getElementById('container');

const dot = 10;
const ppd = 16;
const background = 'gray';

Array.from({ length: 210 }).forEach(() => {
  const img = document.createElement('img');
  const seed = randomSeed();
  const hue = Math.floor(Math.random() * 360);
  const { fill, border } = getColors(hue);
  img.setAttribute('loading', 'lazy');
  img.title = seed;
  img.src = `https://spr.hackforplay.xyz?seed=${seed}&dot=${dot}&ppd=${ppd}&fill=${encodeURIComponent(
    fill
  )}&border=${encodeURIComponent(border)}&background=${encodeURIComponent(
    background
  )}`;
  app.appendChild(img);
});

function randomSeed() {
  const rand = Math.floor(Math.random() * Math.pow(2, 32)); // 32bit random
  return rand.toString(16).padStart(4, '0'); // 32bit hex string
}

function getColors(hue) {
  return {
    fill: '#' + hex(hsv(hue, 255, 180)),
    border: '#' + hex(hsv(hue, 255, 100))
  };
}

function hex([r, g, b]) {
  const n = (r << 16) + (g << 8) + (b << 0);
  console.log(r, g, b, n.toString(16).padStart(6, '0'));

  return n.toString(16).padStart(6, '0');
}

/**
 * HSV to RGB
 * @param {*} hue
 * @param {*} saturation
 * @param {*} value
 * @return [red, green, blue]
 */
function hsv(hue, saturation, value) {
  const max = value;
  const min = Math.floor(max - (saturation / 255) * max);
  switch (Math.floor(hue / 60)) {
    case 0:
      return [max, (hue / 60) * (max - min) + min, min];
    case 1:
      return [((120 - hue) / 60) * (max - min) + min, max, min];
    case 2:
      return [min, max, ((hue - 120) / 60) * (max - min) + min];
    case 3:
      return [min, ((240 - hue) / 60) * (max - min) + min, max];
    case 4:
      return [((hue - 240) / 60) * (max - min) + min, min, max];
    default:
      return [max, min, ((360 - hue) / 60) * (max - min) + min];
  }
}
