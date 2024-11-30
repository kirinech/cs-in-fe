const uploaded = document.getElementById("uploaded");
const grayscale = document.getElementById("grayscale");
const inverse = document.getElementById("inverse");
const both = document.getElementById("both");

const dropArea = document.getElementById("drop-area");

function handleFiles(files) {
  files = [...files];
  files.forEach(processImg);
}

function handleClear() {
  clearCanvas(uploaded);
}

function clearCanvas(canvasRef) {
  const ctx = canvasRef.getContext("2d");
  ctx.reset();
}

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

["dragenter", "dragover"].forEach((eventName) => {
  dropArea.addEventListener(eventName, highlight, false);
});
["dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
  dropArea.classList.add("highlight");
}

function unhighlight(e) {
  dropArea.classList.remove("highlight");
}

dropArea.addEventListener("drop", handleDrop, false);

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
}

// const testImg = new Image();
// testImg.src = './orange.jpg';
// testImg.onload = () => {
//   processImg('./orange.jpg');
// }

function processImg(image) {
  const img = new Image;
  img.src = typeof image === 'string' ? image : URL.createObjectURL(image);
  img.onload = () => {
    applyImageOnCanvas(uploaded, img);
    applyImageOnCanvas(grayscale, img, grayscaleImg);
    applyImageOnCanvas(inverse, img, inverseImg);
    applyImageOnCanvas(
      both,
      img,
      (data) => {
        grayscaleImg(data);
        inverseImg(data);
      }
    );
  }
}

function applyImageOnCanvas(canvas, img, processImgData) {
  const ctx = canvas.getContext("2d");
  const { width, height } = getScaledDims(img, 300);
  ctx.drawImage(img, 0, 0, width, height);
  if (processImgData) {
    const imgData = ctx.getImageData(0, 0, width, height);
    processImgData(imgData);
    ctx.putImageData(imgData, 0, 0);
  }
}

const grayscaleImg = (imgData) => {
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = data[i + 1] = data[i + 2] = gray;
  }
}

const inverseImg = (imgData) => {
  const data = imgData.data;
  for (let i = 0; i < data.length; i ++) {
    if ((i + 1) % 4) data[i] = data[i] ^ 255;
  }
}

function getScaledDims(img, toWidth = 200) {
  const width = img.width, height = img.height;
  return { width: toWidth, height: (height / width) * toWidth };
}
