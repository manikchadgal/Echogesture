const convertedText = document.getElementById('converted_text');
const submitButton = document.getElementById('submit_text');
const videoContainer = document.getElementById('video_container');

submitButton.addEventListener('click', () => {
    handleTranscript(convertedText.value);
});

function handleTranscript(transcript) {
    let words = transcript.trim().split(/\s+/);
    let videoPaths = words.map(word => "assets/"+word.toUpperCase() + ".mp4");

    playVideosInSequence(videoPaths);
}

function playVideosInSequence(videoPaths) {
    let index = 0;

    function playNextVideo() {
        if (index < videoPaths.length) {
            videoContainer.innerHTML = '';

            let videoElement = document.createElement("video");
            videoElement.src = videoPaths[index];
            videoElement.controls = true;
            videoElement.style.display = "block";
            videoElement.style.height = "220px";
            videoContainer.appendChild(videoElement);

            videoElement.addEventListener('ended', () => {
                index++;
                playNextVideo();
            });

            videoElement.play();
        }
    }

    playNextVideo();
}
