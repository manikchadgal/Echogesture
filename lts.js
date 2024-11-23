const convertedText = document.getElementById('converted_text');
const submitButton = document.getElementById('submit_text');
const imageDisplay = document.getElementById('image_display');

submitButton.addEventListener('click', () => {
    handleTranscript(convertedText.value);
});

function handleTranscript(transcript) {
    let words = transcript.trim().split(/\s+/);
    let imagePaths = words.map(word => "Photos/"+word.toUpperCase() + ".jpg.png"); // change file to jpg first

    

    displayImagesInSequence(imagePaths);
}

function displayImagesInSequence(imagePaths) {
    let index = 0;

    function displayNextImage() {
        if (index < imagePaths.length) {
            imageDisplay.src = imagePaths[index];
            imageDisplay.style.opacity = '1';
            index++;
        }
    }

    displayNextImage();
}
