function startClassification() {
    navigator.mediaDevices.getUserMedia({
        audio: true
    });
    classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/ncF_qxU8o/model.json', modelReady);
}

function modelReady() {
    classifier.classify(gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        rnr = Math.floor(Math.random() * 255) + 1;
        rng = Math.floor(Math.random() * 255) + 1;
        rnb = Math.floor(Math.random() * 255) + 1;

        document.getElementById("result_label").innerHTML = 'I can hear - ' + results[0].label;
        document.getElementById("result_confidence").innerHTML = 'Accuracy - ' + (results[0].confidence * 100).toFixed(2) + " %";
        document.getElementById("result_label").style.color = "rgb(" + rnr + "," + rng + "," + rnb + ")";
        document.getElementById("result_confidence").style.color = "rgb(" + rnb + "," + rnr + "," + rng + ")";

        img1 = document.getElementById("display_img");

        if (results[0].label == "Barking") {
            img1.src = 'dog.png';
        } else if (results[0].label == "Meowing") {
            img1.src = 'cat.png';
        } else if (results[0].label == "Mooing") {
            img1.src = 'moo.png';
        } else if (results[0].label == "Roar") {
            img1.src = 'roar.jpg';
        } else {
            img1.src = 'ear.jpg';
        }
    }
}