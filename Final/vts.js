const convertedText = document.getElementById('converted_text');
const startButton = document.getElementById('click_to_record');
const submitButton = document.getElementById('submit_text');
const videoContainer = document.getElementById('video_container');
const videoDisplay = document.getElementById('video_display');
let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition();
} else {
    console.log("Speech recognition not supported in this browser.");
}

let isRecording = false;

function toggleRecording() {
    isRecording = !isRecording;
    const button = document.getElementById("click_to_record");
    if (isRecording) {
        button.classList.add("recording");
        recognition.start();
    } else {
        button.classList.remove("recording");
        recognition.stop();
    }
}

let lastTranscript = '';

recognition.onresult = (event) => {
    // clickToRecord.textContent = 'Recording';

    const result = event.results[event.results.length - 1];
    const transcript = result[0].transcript;
    convertedText.value += transcript;
    lastTranscript = transcript;
};

recognition.onend = () => {
    startButton.textContent = 'Start Recording';
};

recognition.onerror = (event) => {
    console.error('Speech recognition error detected: ' + event.error);
};

submitButton.addEventListener('click', () => {
    handleTranscript(lastTranscript);
    // convertedText.value = '';
    imageDisplay.style.display= 'none';
    videoDisplay.style.display = 'block';
});

startButton.addEventListener('click', () => {
    convertedText.value = '';
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
            // videoElement.style.padding = "130px";
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

