const video = document.getElementById("webcam");
const label = document.getElementById("label");

const DogBtn = document.querySelector("#Dog");
const CatBtn = document.querySelector("#Cat");
const ClassifyBtn = document.querySelector("#Classify");
const trainbtn = document.querySelector("#train");
const savebtn = document.querySelector("#save");


// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
// // Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, videoReady);

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

label.innerText = "Ready when you are!";

//Extractor
// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
    DogBtn.addEventListener("click", () => addDog());
    CatBtn.addEventListener("click", () => addCat());
    ClassifyBtn.addEventListener("click", () => classify());
    savebtn.addEventListener("click", () => save());
    trainbtn.addEventListener("click", () => train());
}


// // Triggers when the video is ready
function videoReady() {
    console.log('The video is ready!');
}

// Add a new image with a label
function addDog() {
    classifier.addImage (video, 'Dog');
    console.log('Dog');
}

// Add a new image with a label
function addCat() {
    classifier.addImage (video, 'Cat');
    console.log('Cat');
}

// // Retrain the network
function train() {
    classifier.train((lossValue) => {
        console.log('Loss is', lossValue)
    });
}

function save(){
    featureExtractor.save();
}

function load(){
    featureExtractor.load(filesOrPath = null, callback);
}


// Get a prediction for that image
classifier.classify(document.getElementById('image'), (err, result) => {
    console.log(result);
});

function classify() {
    classifier.classify(document.getElementById('webcam'), (err, result) => {
        console.log(result);
        label.innerText = result[0].label;
        speak (result[0].label);
    });
}

const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

fileButton.addEventListener("change", (event)=>{
    image.src = URL.createObjectURL(event.target.files[0])
})

image.addEventListener('load', () => userImageUploaded())

function userImageUploaded(){
    console.log("The image is now visible in the DOM")
}



ClassifyBtn.addEventListener("click", () => classify());


// Get a prediction for that image
classifier.classify(document.getElementById('image'), (err, result) => {
    console.log(result);
});


let synth = window.speechSynthesis

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

speak("Cat or Dog!")