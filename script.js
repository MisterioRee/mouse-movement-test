
let movementTrack = [];

let recording = false;
let follow = false;

let theThing = document.querySelector("#thing");
let container = document.querySelector("#contentContainer");

let btnRecord = document.querySelector("#btnRecord");
let btnPlay = document.querySelector("#btnStart");
let btnStop = document.querySelector("#btnStop");
let btnReset = document.querySelector("#btnReset");
let btnFollow = document.querySelector("#btnFollow");

container.addEventListener("mousemove", getClickPosition, false);
btnRecord.addEventListener("click", startRecording);
btnPlay.addEventListener("click", playAction);
btnReset.addEventListener("click", reset);
btnStop.addEventListener("click", stopRecording);
btnFollow.addEventListener("click", toggleFollow);

function toggleFollow() {
    follow = !follow;
}

function stopRecording() {
    recording = false;
}

function reset() {
    recording = false;
    movementTrack.clear();
}
function startRecording() {
    recording = true;
}

function playAction() {
    recording = false;
    let index = 0;
    let loop = setInterval(moveItem, 100);
    function moveItem() {
        theThing.style.left = movementTrack[index].x + "px";
        theThing.style.top = movementTrack[index].y + "px";
        index++;
        console.log("Step Taken");
        if (index >= movementTrack.length)
            clearInterval(loop);
    }
}

function getClickPosition(e) {
    let parentPosition = getPosition(e.currentTarget);
    let xPosition = e.clientX - parentPosition.x - (theThing.clientWidth / 2);
    let yPosition = e.clientY - parentPosition.y - (theThing.clientHeight / 2);

    if (recording) {
        movementTrack.push({ x: xPosition, y: yPosition });
        console.log("Step is Recorded");
    }
    if (follow) {
        theThing.style.left = xPosition + "px";
        theThing.style.top = yPosition + "px";
    }


}


// Helper function to get an element's exact position
function getPosition(el) {
    let xPos = 0;
    let yPos = 0;

    while (el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            let yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}