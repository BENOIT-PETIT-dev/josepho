import Cropper from 'cropperjs';
import mergeImages from 'merge-images';
import frame from '../ressources/frame.png';

const OPTIONS = {
  viewMode: 1,
  dragMode: 'move',
  aspectRatio: 1/1.348,
  background: false,
  modal: false,
  cropBoxResizable: false
};

const fileInput = document.querySelector('input[name="baseImage"]');
const validateButton = document.querySelector('.submit-photo');
const zoomInButton = document.querySelector('#zoomin');
const zoomOutButton = document.querySelector('#zoomout');
const rotateButton = document.querySelector('#rotate');
const image = document.querySelector('.cropper-image');

fileInput.addEventListener('change', (e) => {
  const reader = new FileReader();
  reader.onload = function(){
    var dataURL = reader.result;
    image.src = dataURL;
  };
  reader.readAsDataURL(fileInput.files[0]);
});

const setMergedImage = (croppedImage) => {
  mergeImages([croppedImage, frame])
  .then(b64 => {
    if (!document.querySelector('.final-photo')) {
      let newImage = document.createElement("img");
      newImage.className = 'final-photo';
      document.querySelector('.final-page main').appendChild(newImage);
      newImage.src = b64;
      document.querySelector('.final-photo-link').href = b64;
    }
    else {
      let newImage = document.querySelector('.final-photo');
      newImage.src = b64;
      document.querySelector('.final-photo-link').href = b64;
    }
  });
}

const observer = new MutationObserver((changes) => {
  changes.forEach(change => {
      if(change.attributeName.includes('src')){
        const cropper = new Cropper(image, OPTIONS);
      
        validateButton.addEventListener('click', () => {
          const croppedImage = cropper.getCroppedCanvas({width: 490, height: 640, minWidth: 490, minHeight: 640}).toDataURL('image/jpeg');
          setMergedImage(croppedImage);
          cropper.destroy();
        });
        
        zoomInButton.addEventListener('click', () => {
          cropper.zoom(0.2);
        });
        
        zoomOutButton.addEventListener('click', () => {
          cropper.zoom(-0.2);
        });
        
        rotateButton.addEventListener('click', () => {
          cropper.rotate(90);
        });
      }
  });
});
observer.observe(image, {attributes : true});
