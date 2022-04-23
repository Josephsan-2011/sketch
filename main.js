function setup() {
    canvas = createCanvas(300, 300)
    canvas.center()
    background("white")
    canvas.mouseReleased(classifyCanvas)
    s1 = window.speechSynthesis
}

function preload() {
    classifier = ml5.imageClassifier("DoodleNet")
}

function draw() {
    strokeWeight(15)
    stroke("blue")
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult)
}
function clearCanvas() {
    background("white")
}
function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("label").innerHTML="label :"+results[0].label;
        document.getElementById("confidence").innerHTML="confidence :"+Math.round(results[0].confidence*100)+"%";
        utter=new SpeechSynthesisUtterance(results[0].label)
        s1.speak(utter)
    }
}