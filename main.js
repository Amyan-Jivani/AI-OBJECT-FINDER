status="";
value="";
objects[""];

function setup(){
    canvas=createCanvas(480, 640);
    canvas.center();
    video=createCapture(VIDEO)
    video.size(440, 600);
    synth=window.speechSynthesis;
    video.hide;

}

function start(){
    object_detector=ml5.objectDetector(cocossd, modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    value=document.getElementById("textinput").value;
}

function modelLoaded(){
    console.log("Model IS Loaded");
    status=true;
    object_detector.detect(video, gotResults);
}

function draw(){
    image(video, 0, 0, 440, 600);
    if(status != ""){
        for(i=0; i < objects.length; i++){
            percent=floor(objects[i].confidence*100);
        fill("blue");
        text(objects[i].label+ " " + percent + "%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("black");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        document.getElementById("status").innerHTML="Status: Objects Detected";
        if(i==value){
            video.stop();
            object_detector.detect(gotResults);
            document.getElementById("detected").innerHTML=value + " Found";
            utterThis=new SpeechSynthesisUtterance(value);
    synth.speak(utterThis);
        }
        }
    }
}

function gotResults(error, results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    objects=results;
}
}