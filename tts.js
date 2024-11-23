// Countries object mapping language codes to language names
const countries = {
   "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
};

// Populate the 'From Language' dropdown
const fromLanguage = document.getElementById('from_language');
Object.keys(countries).forEach(code => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = countries[code];
    fromLanguage.appendChild(option);
});

// Element references
const inputText = document.getElementById('input_text');
const translatedText = document.getElementById('translated_text');
const translateButton = document.getElementById('translate_button');
const submitButton = document.getElementById('submit_text');
const videoContainer = document.getElementById('video_container');
const subscriptionMessage = document.getElementById('subscriptionMessage');

// Usage counter and limit
let useCount = 0;
const maxFreeUses = 5;

// Event listener for the translate button
translateButton.addEventListener('click', () => {
    if (useCount >= maxFreeUses) {
        displaySubscriptionMessage();
        return;
    }

    const text = inputText.value.trim();
    const translateFrom = fromLanguage.value;
    const translateTo = "en-GB"; // Fixed to English

    if (!text) return;
    translatedText.setAttribute('placeholder', 'Translating...');

    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.responseData && data.responseData.translatedText) {
                translatedText.value = data.responseData.translatedText;
                useCount++; // Increment usage count
                checkUsageLimit();
            } else {
                translatedText.value = 'Translation failed.';
            }
            translatedText.setAttribute('placeholder', 'Translated text will appear here...');
        })
        .catch(() => {
            translatedText.value = 'Error during translation.';
            translatedText.setAttribute('placeholder', 'Translated text will appear here...');
        });
});

// Use the translated text for text-to-video logic
submitButton.addEventListener('click', () => {
    if (useCount >= maxFreeUses) {
        displaySubscriptionMessage();
        return;
    }

    handleTranscript(translatedText.value);
    useCount++; // Increment usage count
    checkUsageLimit();
});

function handleTranscript(transcript) {
    let words = transcript.trim().split(/\s+/);
    let videoPaths = words.map(word => getVideoPath(word));
    playVideosInSequence(videoPaths);
}

// Check usage limit
function checkUsageLimit() {
    if (useCount >= maxFreeUses) {
        translateButton.disabled = true;
        submitButton.disabled = true;
        displaySubscriptionMessage();
    }
}

// Display subscription message
function displaySubscriptionMessage() {
    subscriptionMessage.style.display = 'block';
}

// Existing text-to-video logic
const availableVideos = [
    "Again.mp4",
    "All.mp4",
    "After.mp4",
    "Against.mp4",
    "Age.mp4",
    "Alone.mp4",
    "Also.mp4",
    "And.mp4",
    "Ask.mp4",
    "At.mp4",
    "Beautiful.mp4",
    "Before.mp4",
    "Best.mp4",
    "Better.mp4",
    "Busy.mp4",
    "But.mp4",
    "Bye.mp4",
    "Can.mp4",
    "Cannot.mp4",
    "Change.mp4",
    "College.mp4",
    "Come.mp4",
    "Computer.mp4",
    "Day.mp4",
    "Distance.mp4",
    "Do Not.mp4",
    "Do.mp4",
    "Does Not.mp4",
    "Eat.mp4",
    "Engineer.mp4",
    "Flight.mp4",
    "Finish.mp4",
    "From.mp4",
    "Glitter.mp4",
    "Go.mp4",
    "God.mp4",
    "Gold.mp4",
    "Good.mp4",
    "Great.mp4",
    "Hand.mp4",
    "Hands.mp4",
    "Happy.mp4",
    "Hello.mp4",
    "Her.mp4",
    "Help.mp4",
    "Here.mp4",
    "His.mp4",
    "Home.mp4",
    "How.mp4",
    "Invent.mp4",
    "It.mp4",
    "Keep.mp4",
    "LA.mp4",
    "LD.mp4",
    "LC.mp4",
    "Language.mp4",
    "Laugh.mp4",
    "ME.mp4",
    "More.mp4",
    "My.mp4",
    "Name.mp4",
    "Next.mp4",
    "Not.mp4",
    "Now.mp4",
    "Of.mp4",
    "On.mp4",
    "Our.mp4",
    "Out.mp4",
    "Pretty.mp4",
    "Right.mp4",
    "Sad.mp4",
    "Safe.mp4",
    "See.mp4",
    "Self.mp4",
    "Sign.mp4",
    "Sing.mp4",
    "So.mp4",
    "Sound.mp4",
    "Stay.mp4",
    "Study.mp4",
    "Talk.mp4",
    "Television.mp4",
    "Thank You.mp4",
    "Thank.mp4",
    "That.mp4",
    "They.mp4",
    "This.mp4",
    "Those.mp4",
    "Time.mp4",
    "To.mp4",
    "Type.mp4",
    "Us.mp4",
    "Wash.mp4",
    "Way.mp4",
    "We.mp4",
    "Welcome.mp4",
    "What.mp4",
    "Where.mp4",
    "When.mp4",
    "Which.mp4",
    "Who.mp4",
    "Whole.mp4",
    "Whose.mp4",
    "Why.mp4",
    "Will.mp4",
    "With.mp4",
    "Without.mp4",
    "Words.mp4",
    "Work.mp4",
    "World.mp4",
    "Wrong.mp4",
    "You.mp4",
    "Your.mp4",
    "Yourself.mp4",
    "Z.mp4",
    // Add more video file names as needed
];

let shuffledVideos = [...availableVideos];

function getVideoPath(word) {
    const matchingVideo = availableVideos.find(video =>
        video.toLowerCase() === `${word.toLowerCase()}.mp4`
    );

    if (matchingVideo) {
        return `assets/${matchingVideo}`;
    } else {
        if (shuffledVideos.length === 0) {
            shuffledVideos = shuffleArray([...availableVideos]);
        }
        const randomVideo = shuffledVideos.pop();
        return `assets/${randomVideo}`;
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
