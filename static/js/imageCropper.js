document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('image_file');
    const imageContainer = document.querySelector('.cropper-container');
    const imageToCrop = document.getElementById('image-to-crop');
    const cropButton = document.getElementById('crop-button');
    const cancelButton = document.getElementById('cancel-crop');
    const predictButton = document.getElementById('predict-button');
    const croppedImageData = document.getElementById('cropped-image-data');
    let cropper;

    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imageToCrop.src = event.target.result;
                imageContainer.style.display = 'block';
                predictButton.style.display = 'none';
                
                if (cropper) {
                    cropper.destroy();
                }
                
                cropper = new Cropper(imageToCrop, {
                    aspectRatio: 1,
                    viewMode: 1,
                    autoCropArea: 1,
                });
            };
            reader.readAsDataURL(file);
        }
    });

    cropButton.addEventListener('click', function() {
        if (cropper) {
            const croppedCanvas = cropper.getCroppedCanvas({
                width: 32,
                height: 32
            });
            
            croppedImageData.value = croppedCanvas.toDataURL('image/jpeg');
            imageContainer.style.display = 'none';
            predictButton.style.display = 'block';
        }
    });

    cancelButton.addEventListener('click', function() {
        if (cropper) {
            cropper.destroy();
        }
        imageContainer.style.display = 'none';
        imageInput.value = '';
        predictButton.style.display = 'none';
    });
});