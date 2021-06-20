Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 100,
});
Webcam.attach("#camera")

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="' + data_uri + '"> '
    });
}
console.log('ml5 version', ml5.version)
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/mSncuex-E/model.json', modelLoaded)

//project-105

function modelLoaded() {
    console.log('model is loaded')
}

function check() {
    img = document.getElementById('selfie_image')
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results)
        document.getElementById("shape_name").innerHTML = results[0].label
        document.getElementById("shape_name_2").innerHTML = results[1].label
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak()
        if (results[0].label == "Square") {
            document.getElementById("shape_emoji").innerHTML = "&#9634;"
        }
        if (results[1].label == "Square") {
            document.getElementById("shape_emoji_2").innerHTML = "&#9634;"
        }

        if (results[0].label == "Circle") {
            document.getElementById("shape_emoji").innerHTML = "&#9711;"
        }
        if (results[1].label == "Circle") {
            document.getElementById("shape_emoji_2").innerHTML = "&#9711;"
        }

        if (results[0].label == "Triangle") {
            document.getElementById("shape_emoji").innerHTML = "&#9651;"
        }
        if (results[1].label == "Triangle") {
            document.getElementById("shape_emoji_2").innerHTML = "&#9651;"
        }

        if (results[0].label == "Rectangle") {
            document.getElementById("shape_emoji").innerHTML = "&#9645;"
        }
        if (results[1].label == "Rectangle") {
            document.getElementById("shape_emoji_2").innerHTML = "&#9645;"
        }



    }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "the first prediction is " + prediction_1;
    speak_data_2 = "the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    utterThis.rate = 1;
    synth.speak(utterThis)
}
