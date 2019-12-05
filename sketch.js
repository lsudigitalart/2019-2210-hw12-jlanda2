//camera and directional variables
let cameraX=0,cameraY=0,cameraZ=0;
let centerX=0,centerY=0,centerZ=0;
let upX=0,upY=1,upZ=0;
let aNinety=0;
let velocity=3;
//snake variables
let num=1;
let sX=[],sY=[],sZ=[];
let sHeadX=0,sHeadY=0,sHeadZ=0;
let tLength=[];
//seed variables
let seedX=0,seedY=0,seedZ=-10;
//room variables
let room;
let roomHighlight=0;
function preload(){
  room=loadModel("snake_room_F.obj",true);
}
function setup(){
  createCanvas(1500,700,WEBGL)
    background(0);
    randomSeed=int(random(1,4));
    //fill snake's array
    for (var i = 0; i < num; i++) {
      sX[i] = 0;
      sY[i] = 0;
      sZ[i] = 0;
      }
}
function gameO(){

  createCanvas(1500,700)
  background("red");
  noLoop();
}
function draw(){
    orbitControl();
    background(0);
    cameraRig();
    rooms();
    // if(roomHighlight==0){
    // fill("white");
    // push();
    // translate(seedX,seedY,seedZ);
    // box(30);
    // pop();
    // }
    seedGen();
    //reverse snake array
    for (var i = num-1; i > 0; i--) {
      sX[i] = sX[i-1];
      sY[i] = sY[i-1];
      sZ[i] = sZ[i-1];
      if(sHeadX==sX[i]&&sHeadY==sY[i]&&sHeadZ==sZ[i]){
        gOver=1;
        gameO();
    }
    }
    sX[1]=sHeadX;
    sY[1]=sHeadY;
    sZ[1]=sHeadZ;
    push();
    stroke('yellow');
    noFill();
    translate(sHeadX,sHeadY,sHeadZ)
    box(15);
    pop();
    for (var i = 1; i < num; i++) {
    push();
    translate(sX[i],sY[i],sZ[i]);
    noStroke();
    fill("yellow");
    tLength[i] = box(15);
    pop();
    }
// for(var i = 0; i<100;i++){
//     rectangle[i]=rect(inc,0,10,50);
//     inc+=100;
// }
}
function cameraRig(){
  //perspective(1.11701);
  camera(cameraX,cameraY,cameraZ,centerX,centerY,centerZ,upX,upY,upZ);
  pointLight(255,255,255,cameraX,cameraY,cameraZ);
//up while maintaining current forward movement
  if(key==" "&&keyIsPressed==true){
    cameraY-=velocity;
    centerY=cameraY;
    sHeadY-=velocity;
  }
//down
  else if(keyCode==SHIFT&&keyIsPressed==true){
    cameraY+=velocity;
    centerY=cameraY;
    sHeadY+=velocity;
  }
//forward
  else if(aNinety==0){
    for(var i=0;i<=1;i++){
      centerX=cameraX;
      }
    cameraZ-=velocity;
    centerZ=cameraZ-1;
    sHeadZ-=velocity;
  }
//left
  else if(aNinety==1){
    for(var i=0;i<=1;i++){
    centerZ=cameraZ;
    }
    cameraX-=velocity;
    centerX=cameraX-1;
    sHeadX-=velocity;
  }
//backward
  else if(aNinety==2){
    for(var i=0;i<=1;i++){
    centerX=cameraX;
    }
    cameraZ+=velocity;
    centerZ=cameraZ+1;
    sHeadZ+=velocity;
  }
//right
  else if(aNinety==3){
    for(var i=0;i<=1;i++){
      centerZ=cameraZ;
      }
      cameraX+=velocity;
      centerX=cameraX+1;
      sHeadX+=velocity;
  }
}
function rooms(){
//guide
  // push();
  // noStroke();
  // scale(4);
  // fill('red');
  // model(room);
  // pop();
//back    
    push();
    noStroke();
    translate(0,0,-775);
    scale(4);
    fill('red');
    model(room);
    pop();
    //front    
    push();
    noStroke();
    translate(0,0,775);
    scale(4);
    fill('purple');
    model(room);
    pop();
//right    
    push();
    noStroke();
    translate(775,0,0);
    scale(4);
    fill('blue');
    model(room);
    pop();
//left    
    push();
    noStroke();
    translate(-775,0,0);
    scale(4);
    fill('green');
    model(room);
    pop();
//detect which room seed is in
// if(roomHighlight==0){
//   push();
//   noFill();
//   stroke("yellow");
//   box(775);
//   pop();
// }
if(roomHighlight==1){
    push();
    noFill();
    stroke("red");
    translate(0,0,-775);
    box(775);
    pop();
}
if(roomHighlight==2){
  push();
  noFill();
  stroke("green");
  translate(-775,0,0);
  box(775);
  pop();
}
if(roomHighlight==3){
  push();
  noFill();
  stroke("purple");
  translate(0,0,775);
  box(775);
  pop();
}
if(roomHighlight==4){
  push();
  noFill();
  stroke("blue");
  translate(775,0,0);
  box(775);
  pop();
}
}
function seedGen(){
  push();
  noStroke();
  fill("cyan");
  translate(seedX,seedY,seedZ);
  box(30);
  pop();

  if(cameraX>seedX&&cameraX<seedX+30,cameraY>seedY&&cameraY<seedY+30,cameraZ>seedZ&&cameraZ<seedZ+30){
    num+=75;
    if(randomSeed==1){

    seedX=random(-200,200);
    seedY=random(-200,200);
    seedZ=random(-500,-900);
    randomSeed=int(random(1,5));
    roomHighlight=1;
    }
    if(randomSeed==2){
      seedX=random(-500,-900);
      seedY=random(-200,200);
      seedZ=random(-200,200);
      randomSeed=int(random(1,5));
      roomHighlight=2
    }
    if(randomSeed==3){
      seedX=random(-200,200);
      seedY=random(-200,200);
      seedZ=random(500,900);
      randomSeed=int(random(1,5));
      roomHighlight=3;
      }
    if(randomSeed==4){
      seedX=random(500,900);
      seedY=random(-200,200);
      seedZ=random(-200,200);
      randomSeed=int(random(1,5));
      roomHighlight=4;
      }
    }

      print(randomSeed);

//seed highlights room it's in
// if(seedX>-387.5 && seedX<387.5 && seedY>-387.5 && seedY<387.5 && seedZ<-387.5 && seedZ>-1162.5){
//   roomHighlight=1;
// }
// if(seedX<387.5&&seedX>1162.5&&seedY>-387.5 && seedY<387.5,seedZ>-387.5 && seedZ<387.5){
//   roomHighlight=4
// }
// if(seedX>-387.5 && seedX<387.5&&seedY>-387.5 && seedY<387.5,seedZ>387.5 && seedZ<1162.5){
//   roomHighlight=3;
// }
// if(seedX>387.5&&seedX<1162.5&&seedY>-387.5 && seedY<387.5,seedZ>-387.5 && seedZ<387.5){
//   roomHighlight=2
// }
}
//90 degree turn left or right
function keyReleased(){
  if(key=="a"){
    aNinety++;
    if(aNinety>3){
      aNinety=0;
    }
  }
  if(key=="d"){
    aNinety--;
    if(aNinety<0){
      aNinety=3;
    }
  }
}
