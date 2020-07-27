//todo: fix collisions properties (don't always seem to conserve momentum in right direction)
//todo: scale the distances with the scaling

var myGameArea;
var canvasHeight = 800;
var canvasWidth = 1600;
var mouseX = 0;
var mouseY = 0;
const t = 1/50; //this will be the time interval
let scale = 50;
var myGamePieceWidth = 20;
var myGamePieceHeight = 20;
var ballRadius = 20;
var ballMass = 5*Math.pow(10,18); 
const G = 6.67*Math.pow(10,-11);
var canvas_obj = document.getElementById("canvas");
var context_obj = canvas_obj.getContext("2d");
let nodeMap = new Map();
var mouseNode;
var myCircle;
var userMass = 6*Math.pow(10,24);
var userRadius = 6*Math.pow(10,6);
var userXVelocity = 0;
var userXVelocity = 0;
var userColor = 'pink';
var userOuterColor = 'red'
var rangeslider = document.getElementById("sliderRange"); 
var xVelocityBtn = document.getElementById("xVelocityBtn");
var yVelocityBtn = document.getElementById("yVelocityBtn");
var customBtn = document.getElementById("CustomBtn");
let mouseIn = false; 

function startGame() {
    myGameArea.start();
    myGamePiece = new component( myGamePieceWidth, myGamePieceHeight,'red', 10, 30);
    mouseNode = new nodeComponent(0, 0, 0, 0, 'black', 'black', mouseX, mouseY);
    document.addEventListener("mousedown", function (event) {
            var clickedNodeObj = clickedNode();
            if (clickedNodeObj == null){
                if(mouseIn){
                addNode();
            }}
        }
    )
}

function isInCanvas(){
    var rect = canvas_obj.getBoundingClientRect();
    if (mouseX < rect.right && mouseX > 0 &&  
        mouseY < rect.bottom && mouseY > rect.top){
            return true;
        }
    return false;
}

function MouseInCanvas(){
    if (mouseX > canvasWidth || mouseX < 0 ||  
    mouseY > canvasHeight || mouseY < 0) {
    return false;}
    else {
        return true;
    }
}
function mouseOut(){ 
    mouseIn = false; 
}

function mouseOver(){
    mouseIn = true; 
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}

function clickedNode(){
    for (let key of nodeMap.keys()) {
        if (mouseX > key.x-ballRadius*2 && mouseX < key.x+ ballRadius*2){
            if(mouseY > key.y-ballRadius*2 && mouseY < key.y+ ballRadius*2){
                return key;
            }
        }
    }
    return null;
}


function addNode(){
    userXVelocity = xVelocityBtn.value;
    userYVelocity = -yVelocityBtn.value;
    newNode = new nodeComponent(userXVelocity, userYVelocity, userMass, userRadius, userColor, userOuterColor, mouseX, mouseY);
    nodeMap.set(newNode, []);   
}

SunBtn.onclick= function() {
    userMass = 2000000*Math.pow(10,24);
    userRadius = 696*Math.pow(10,6);
    userColor = 'FFE484'
    userOuterColor = 'FC9601'
}

MercuryBtn.onclick= function() {
    userMass = 3.285*Math.pow(10,23);
    userRadius = 2.44*Math.pow(10,6);
    userColor = 'b5a7a7'
    userOuterColor = '504e51'
}

VenusBtn.onclick= function() {
    userMass = 4.867*Math.pow(10,24);
    userRadius = 6.0518*Math.pow(10,6);
    userColor = 'DDD8D4'
    userOuterColor = 'BBB7AB'
}

EarthBtn.onclick= function() {
    userMass = 6*Math.pow(10,24);
    userRadius = 6*Math.pow(10,6);
    userColor = '10c135' 
    userOuterColor = '0077be'
}

MarsBtn.onclick= function() {
    userMass = 6.39*Math.pow(10,23);
    userRadius = 3.385*Math.pow(10,6);
    userColor = '#e77d11';  
    userOuterColor = '#c1440e';
}

JupiterBtn.onclick= function() {
    userMass = 2000*Math.pow(10,24);
    userRadius = 69*Math.pow(10,6);
    userColor = '#ffb459';  
    userOuterColor = '#C88B3A'; 
}
SaturnBtn.onclick= function() {
    userMass = 5.683*Math.pow(10,26)
    userRadius = 58.2*Math.pow(10,6)
    userColor = '#C5AB6E';  
    userOuterColor = '#343E47';
}

UranusBtn.onclick= function() {
    userMass = 8.68*Math.pow(10,25);
    userRadius = 25.3*Math.pow(10,6); 
    userColor = '#D5FbFc';  
    userOuterColor = '#93B8Be';
}

NeptuneBtn.onclick= function() {
    userMass = 1.024*Math.pow(10,24);
    userRadius = 24.6*Math.pow(10,6);
    userColor = '#89F3ff';  
    userOuterColor = '#3e54e8';
}

customBtn.onclick = function() {
    userMass = window.prompt("Enter mass *10^24 (enter 6 for earthlike mass)")*Math.pow(10,24)
    userRadius = window.prompt("Enter radius *10^6 (enter 6 for earthlike radius)")*Math.pow(10,6)
    userColor = String(window.prompt("Enter color (hexcode or 'black', 'red', etc...)"))
    userOuterColor = String(window.prompt("Enter outer color (hexcode or 'black', 'red', etc...)"))
}

velocityResetBtn.onclick = function() {
    xVelocityBtn.value = 0;
    yVelocityBtn.value = 0;
}

function getMapSize(x) {
    var len = 0;
    for (var count in x) {
        len++;
    }
    return len;
}


var myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function () {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, t/1000); //updates every millisecond
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
    this.update = function () {
    ctx = myGameArea.context;
    }
}



function nodeComponent(xVelocity, yVelocity, mass, radius, color, outerColor, x, y) {
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.mass = mass;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.outerColor = outerColor;
    this.currentScale = scale; 
    this.innerRad = 1/50*this.radius/Math.pow(10,7)*scale;
    this.outerRad = 3/50*this.radius/Math.pow(10,7)*scale;

    this.update = function () {
        var gradient_center = ctx.createRadialGradient(this.x, this.y, this.innerRad, this.x, this.y, this.outerRad);
        gradient_center.addColorStop(0, this.color);
        gradient_center.addColorStop(1, this.outerColor);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.outerRad, 0, 2 * Math.PI, false);
        ctx.fillStyle = gradient_center;
        ctx.fill();  
        scale = rangeslider.value;
        this.innerRad = this.innerRad*scale/this.currentScale;
        this.outerRad = this.outerRad*scale/this.currentScale;
        this.xVelocity = this.xVelocity*scale/this.currentScale;
        this.yVelocity = this.yVelocity*scale/this.currentScale;
        this.currentScale = scale; 
    }
    this.update_gradient = function () {
        var gradient_outer = ctx.createRadialGradient(this.x, this.y, this.innerRad*10, this.x, this.y, this.outerRad);
        gradient_outer.addColorStop(0, 'rgba(52, 124, 232, 0.0)');
        gradient_outer.addColorStop(1, 'rgba(52, 124, 232, 0.4)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.outerRad*7, 0, 2 * Math.PI, false);
        ctx.fillStyle = gradient_outer;
        ctx.fill();
    }
}

function updateGameArea() {
    myGameArea.clear();
    canvas_obj.addEventListener("mousemove", getMousePos, false);
    myGamePiece.x = mouseX - myGamePieceWidth/2;
    myGamePiece.y = mouseY - myGamePieceHeight/2;
    for (let key of nodeMap.keys()) {
        key.update();
    }
    for (let key of nodeMap.keys()) {
        key.update_gradient();
    }
    moveBubbles();
    myGamePiece.update();
}

function getMousePos(evt) {
    var rect = canvas_obj.getBoundingClientRect();
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;
}

function force_vector(){
    this.x = 0;
    this.y = 0;
}

function touchingAnotherNode(node){
    var touching = false;
    for (let key of nodeMap.keys()) {
        if (key != node){
            if (Math.abs(node.x - key.x) < node.radius + key.radius){
                if (Math.abs(node.y - key.y) < node.radius + key.radius){
                    nodeMap.get(node).push(key);
                    if (!nodeMap.get(node).includes(key)){
                        nodeMap.get(node).push(key);
                    }
                    touching = true;
                }
            }
        }
    }
    return touching;
}

function canMoveX(node, movement){
    nodeMap.get(node).forEach(key2 => {
        var distance_before = Math.sqrt(Math.pow(key2.x - node.x,2) + Math.pow(key2.y-node.y,2));
        var distance_after = Math.sqrt(Math.pow((node.x+movement)-key2.x  ,2) + Math.pow(key2.y-node.y,2));
        console.log("Distance before: " + distance_before.toString() + " Distance After: " + distance_after.toString());
        if (distance_before > distance_after){
            node.color = 'blue';
            return false;
        } 
        else {
            node.color = 'yellow';
        }
    });
    return true;
}

function moveBubbles(){
    scale = rangeslider.value;
    for (let key1 of nodeMap.keys()) {
        let total_force = new force_vector();
        for (let key2 of nodeMap.keys()) {
            if(key1 != key2){
                //this accounts for gravitaitonal force
                var y_diff = key1.y - key2.y;
                var x_diff = key1.x - key2.x;
                var rad_diff = Math.sqrt(Math.pow(x_diff,2)+Math.pow(y_diff,2));
                var y_scaled = 3/50*scale*Math.pow(10,7)*y_diff;
                var x_scaled = 3/50*scale*Math.pow(10,7)*x_diff;
                var rad_scaled = Math.sqrt(Math.pow(x_scaled,2)+Math.pow(y_scaled,2));
                var Xforce = -1*(x_diff/rad_diff)*G*key1.mass*key2.mass/Math.pow(rad_scaled/scale/scale,2);
                var Yforce = -1*(y_diff/rad_diff)*G*key1.mass*key2.mass/Math.pow(rad_scaled/scale/scale,2);
                total_force.x += Xforce
                total_force.y += Yforce
                if (Math.abs(rad_diff) <= (key1.outerRad + key2.outerRad)){//if two nodes are touching
                    let D = 1; //damping factor
                    let M = key1.mass + key2.mass;
                    let v1x = key1.xVelocity;
                    let v1y = key1.yVelocity;
                    let v2x = key2.xVelocity;
                    let v2y = key2.yVelocity;
                    let m1 = key1.mass;
                    let m2 = key2.mass;
                    if (key1.yVelocity*(key2.y-key1.y) > 0 && Math.abs(Math.pow(key2.y-key1.y,2) + Math.pow(key2.x-key1.x,2)) < Math.pow(rad_diff,2)) { //if the y-velocity is the same direction as the object it's hitting 
                        key1.yVelocity = D*(m1-m2)*v1y/M + (2*m2)*v2y/M
                        key2.yVelocity = D*(2*m1)*v1y/M + (m2-m1)*v2y/M
                    }
                    if (key1.xVelocity*(key2.x-key1.x) > 0 && Math.abs(Math.pow(key2.y-key1.y,2) + Math.pow(key2.x-key1.x,2)) < Math.pow(rad_diff,2)) { //if the x-velocity is the same direction as the object it's hitting 
                        key1.xVelocity = D*(m1-m2)*v1x/M + (2*m2)*v2x/M
                        key2.xVelocity = D*(2*m1)*v1x/M + (m2-m1)*v2x/M
                    }
            }
        }
        }
        key1.xVelocity += total_force.x/key1.mass*t/1000;
        key1.x += key1.xVelocity*t/1000
        key1.yVelocity += total_force.y/key1.mass*t/1000;
        key1.y += key1.yVelocity*t/1000
        key1.update();
    }
}
