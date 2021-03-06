/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  Vsep2018
//  Assignment 3 Template
/////////////////////////////////////////////////////////////////////////////////////////

console.log('hello world');

a=5;  
b=2.6;
console.log('a=',a,'b=',b);
myvector = new THREE.Vector3(0,1,2);
console.log('myvector =',myvector);

var animation = true;
var move1 = true;
var move2 = false;
var move3 = false;

// var myboxMotion = new Motion(myboxSetMatrices);     
// var handMotion = new Motion(handSetMatrices);
var alienMotion = new Motion(alienSetMatrices);
var alienMotion1 = new Motion(alienSetMatrices1);
var alienMotion2 = new Motion(alienSetMatrices2);
var link1, link2, link3, link4, link5, link6, link7, link8, link9, link10, link11, link12;
var linkFrame1, linkFrame2, linkFrame3, linkFrame4, linkFrame5, linkFrame6, linkFrame7, linkFrame8, linkFrame9, linkFrame10, linkFrame11, linkFrame12;
var meshes = {};  
var RESOURCES_LOADED = false;

// SETUP RENDERER & SCENE

var canvas = document.getElementById('canvas');
var camera;
var light;
var ambientLight;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xd0f0d0);     // set background colour
canvas.appendChild(renderer.domElement);

//////////////////////////////////////////////////////////
//  initCamera():   SETUP CAMERA
//////////////////////////////////////////////////////////

function initCamera() {
    var cameraFov = 30;     // initial camera vertical field of view, in degrees

    // set up M_proj    (internally:  camera.projectionMatrix )
    camera = new THREE.PerspectiveCamera(cameraFov,1,0.1,1000); 
      // view angle, aspect ratio, near, far

    // set up M_view:   (internally:  camera.matrixWorldInverse )
    camera.position.set(0,12,20);
    camera.up = new THREE.Vector3(0,1,0);
    camera.lookAt(0,0,0);
    scene.add(camera);

      // SETUP ORBIT CONTROLS OF THE CAMERA
    var controls = new THREE.OrbitControls(camera);
    controls.damping = 0.2;
    controls.autoRotate = false;
};

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
}

////////////////////////////////////////////////////////////////////////	
// init():  setup up scene
////////////////////////////////////////////////////////////////////////	

function init() {
    console.log('init called');

    initCamera();
    initMotions();
    initLights();
    initObjects();
    initAlien();
    initFileObjects();

    window.addEventListener('resize',resize);
    resize();
};

////////////////////////////////////////////////////////////////////////
// initMotions():  setup Motion instances for each object that we wish to animate
////////////////////////////////////////////////////////////////////////

function initMotions() {

      // keyframes for the mybox animated motion:   name, time, [x, y, z]
    /*myboxMotion.addKeyFrame(new Keyframe('rest pose',0.0, [0,1.9,0]));
    myboxMotion.addKeyFrame(new Keyframe('rest pose',1.0, [1,1.9,0]));
    myboxMotion.addKeyFrame(new Keyframe('rest pose',2.0, [1,5,0]));
    myboxMotion.addKeyFrame(new Keyframe('rest pose',3.0, [0,5,0]));

    // to go higher 
    // myboxMotion.addKeyFrame(new Keyframe('rest pose',2.0, [1,10,0]));
    // myboxMotion.addKeyFrame(new Keyframe('rest pose',3.0, [0,10,0]));

    myboxMotion.addKeyFrame(new Keyframe('rest pose',4.0, [0,1.9,0]));

      // basic interpolation test
    myboxMotion.currTime = 0.1;
    console.log('kf',myboxMotion.currTime,'=',myboxMotion.getAvars());    // interpolate for t=0.1
    myboxMotion.currTime = 2.9;
    console.log('kf',myboxMotion.currTime,'=',myboxMotion.getAvars());    // interpolate for t=2.9*/

      // keyframes for hand:    name, time, [x, y, theta1, theta2, theta3, theta4, theta5]
    /*handMotion.addKeyFrame(new Keyframe('straight',         0.0, [2, 3,    0, 0, 0, 0, 0]));
    handMotion.addKeyFrame(new Keyframe('right finger curl',1.0, [2, 3,   0, -90, -90, 0,0]));

    // make finger curl more
    // handMotion.addKeyFrame(new Keyframe('right finger curl',1.0, [2, 3,   0, -120, -120, 0,0]));

    handMotion.addKeyFrame(new Keyframe('straight',         2.0, [2, 3,    0, 0, 0, 0, 0]));
    handMotion.addKeyFrame(new Keyframe('left finger curl', 3.0, [2, 3,   0, 0, 0, -90,-90]));
    handMotion.addKeyFrame(new Keyframe('straight',         4.0, [2, 3,    0, 0, 0, 0, 0]));
    handMotion.addKeyFrame(new Keyframe('left finger curl', 5.0, [2, 3,   0, -90, -90, -90,-90]));
    handMotion.addKeyFrame(new Keyframe('straight',         6.0, [2, 3,    0, 0, 0, 0, 0]));*/


    //first dance move : keyframes
    // name, time, [x, y, theta1, theta2, theta3, theta4]
    alienMotion.addKeyFrame(new Keyframe('straight',               0.0, [4, 5,    0, 0, 0, 0]));
    alienMotion.addKeyFrame(new Keyframe('move right',             1.0, [3, 5,    -90, 90, -20, 0]));
    alienMotion.addKeyFrame(new Keyframe('straight',               2.0, [4, 5,    0, 0, 0, 0]));
    alienMotion.addKeyFrame(new Keyframe('move left',              3.0, [3, 5,    -90, 90, 0, 20]));
    alienMotion.addKeyFrame(new Keyframe('straight',               4.0, [4, 5,    0, 0, 0, 0]));

    //second dance move : keyframes
    // name, time, [x, y, theta1, theta2, theta3, theta4]
    alienMotion1.addKeyFrame(new Keyframe('straight',               0.0, [0, 4,    0, 0, 0, 0]));
    alienMotion1.addKeyFrame(new Keyframe('right up, left down',    1.0, [0, 5,    -90, 90, 30, 30]));
    alienMotion1.addKeyFrame(new Keyframe('straight',               2.0, [0, 4,    0, 0, 0, 0]));
    alienMotion1.addKeyFrame(new Keyframe('left up, right down',    3.0, [0, 5,    90, -90, -30, -30]));
    alienMotion1.addKeyFrame(new Keyframe('straight',               4.0, [0, 4,    0, 0, 0, 0]));

    //third dance move : keyframes
    // name, time, [x, y, theta1, theta2, theta3, theta4, theta5, theta6, theta7, theta8]
    alienMotion2.addKeyFrame(new Keyframe('straight',               0.0, [-4, 5,    -90, -90, -90, -90, 0, 0, 0, 0]));
    alienMotion2.addKeyFrame(new Keyframe('right up, left down',    1.0, [-4, 5,    -60, -120, -60, -120, 10, -10, 10, -10]));
    alienMotion2.addKeyFrame(new Keyframe('straight',               2.0, [-4, 5,    -90, -90, -90, -90, 0, 0, 0, 0]));
    alienMotion2.addKeyFrame(new Keyframe('left up, right down',    3.0, [-4, 5,    -60, -120, -60, -120, -10, 10, -10, 10]));
    alienMotion2.addKeyFrame(new Keyframe('straight',               4.0, [-4, 5,    -90, -90, -90, -90, 0, 0, 0, 0]));   
}

///////////////////////////////////////////////////////////////////////////////////////
// myboxSetMatrices(avars)
///////////////////////////////////////////////////////////////////////////////////////

/*function myboxSetMatrices(avars) {
    mybox.matrixAutoUpdate = false;     // tell three.js not to over-write our updates
    mybox.matrix.identity();              
    mybox.matrix.multiply(new THREE.Matrix4().makeTranslation(avars[0], avars[1], avars[2]));  
    mybox.matrix.multiply(new THREE.Matrix4().makeRotationY(-Math.PI/2));
    mybox.matrix.multiply(new THREE.Matrix4().makeScale(1.5,1.5,1.5));
    mybox.updateMatrixWorld();  
}*/

///////////////////////////////////////////////////////////////////////////////////////
// handSetMatrices(avars)
///////////////////////////////////////////////////////////////////////////////////////

/* function handSetMatrices(avars) {
    var deg2rad = Math.PI/180;

    var xPosition = avars[0];
    var yPosition = avars[1];
    var theta1 = avars[2]*deg2rad;
    var theta2 = avars[3]*deg2rad;
    var theta3 = avars[4]*deg2rad;
    var theta4 = avars[5]*deg2rad;
    var theta5 = avars[6]*deg2rad;

      ////////////// link1
    linkFrame1.matrix.identity(); 
    linkFrame1.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition,0));   
    linkFrame1.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));    
      // Frame 1 has been established
    link1.matrix.copy(linkFrame1.matrix);
    link1.matrix.multiply(new THREE.Matrix4().makeTranslation(2,0,0));   
    link1.matrix.multiply(new THREE.Matrix4().makeScale(4,1,1));    

    //make palm longer
    // link1.matrix.multiply(new THREE.Matrix4().makeScale(8,1,1));    

    //make palm wider
    // link1.matrix.multiply(new THREE.Matrix4().makeScale(4,1,4));    

      ////////////// link2
    linkFrame2.matrix.copy(linkFrame1.matrix);      // start with parent frame
    linkFrame2.matrix.multiply(new THREE.Matrix4().makeTranslation(4,0,1));
    linkFrame2.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta2));    
      // Frame 2 has been established
    link2.matrix.copy(linkFrame2.matrix);
    link2.matrix.multiply(new THREE.Matrix4().makeTranslation(2,0,0));   
    link2.matrix.multiply(new THREE.Matrix4().makeScale(4,1,1));    

      ///////////////  link3
    linkFrame3.matrix.copy(linkFrame2.matrix);
    linkFrame3.matrix.multiply(new THREE.Matrix4().makeTranslation(4,0,0));
    linkFrame3.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta3));    
      // Frame 3 has been established
    link3.matrix.copy(linkFrame3.matrix);
    link3.matrix.multiply(new THREE.Matrix4().makeTranslation(2,0,0));   
    link3.matrix.multiply(new THREE.Matrix4().makeScale(4,1,1));    

      /////////////// link4
    linkFrame4.matrix.copy(linkFrame1.matrix);
    linkFrame4.matrix.multiply(new THREE.Matrix4().makeTranslation(4,0,-1));
    linkFrame4.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta4));    
      // Frame 4 has been established
    link4.matrix.copy(linkFrame4.matrix);
    link4.matrix.multiply(new THREE.Matrix4().makeTranslation(2,0,0));   
    link4.matrix.multiply(new THREE.Matrix4().makeScale(4,1,1));    

      // link5
    linkFrame5.matrix.copy(linkFrame4.matrix);
    linkFrame5.matrix.multiply(new THREE.Matrix4().makeTranslation(4,0,0));
    linkFrame5.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta5));    
      // Frame 5 has been established
    link5.matrix.copy(linkFrame5.matrix);
    link5.matrix.multiply(new THREE.Matrix4().makeTranslation(2,0,0));   
    link5.matrix.multiply(new THREE.Matrix4().makeScale(4,1,1));    

    link1.updateMatrixWorld();
    link2.updateMatrixWorld();
    link3.updateMatrixWorld();
    link4.updateMatrixWorld();
    link5.updateMatrixWorld();

    linkFrame1.updateMatrixWorld();
    linkFrame2.updateMatrixWorld();
    linkFrame3.updateMatrixWorld();
    linkFrame4.updateMatrixWorld();
    linkFrame5.updateMatrixWorld();
} */

///////////////////////////////////////////////////////////////////////////////////////
// alienSetMatrices(avars)
///////////////////////////////////////////////////////////////////////////////////////

function alienSetMatrices(avars) {
    var deg2rad = Math.PI/180;

    var xPosition = avars[0];
    var yPosition = avars[1];
    var theta1 = avars[2]*deg2rad;
    var theta2 = avars[3]*deg2rad;
    var theta3 = avars[4]*deg2rad;
    var theta4 = avars[5]*deg2rad;

    link1.matrix.identity();              
    link1.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition,0));    
    link1.matrix.multiply(new THREE.Matrix4().makeScale(3,4,1));

    link2.matrix.identity();              
    link2.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition + 2.5 ,0));    
    link2.matrix.multiply(new THREE.Matrix4().makeScale(1.5,1.5,1));

    link3.matrix.identity();              
    link3.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition - 1.5,yPosition + 1,0));
    link3.matrix.multiply(new THREE.Matrix4().makeRotationZ(-120*deg2rad + theta1));    
    link3.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1)); 

    link4.matrix.copy(link3.matrix);              
    link4.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));

    link5.matrix.identity();              
    link5.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition + 1.5,yPosition + 1,0));
    link5.matrix.multiply(new THREE.Matrix4().makeRotationZ(-60*deg2rad + theta2));    
    link5.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1)); 

    link6.matrix.copy(link5.matrix);                
    link6.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));

    link7.matrix.identity();              
    link7.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition - 1,yPosition - 2.6,0));
    link7.matrix.multiply(new THREE.Matrix4().makeRotationZ(-90*deg2rad + theta3));
    link7.matrix.multiply(new THREE.Matrix4().makeRotationX(-90*deg2rad));     
    link7.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1)); 

    link8.matrix.copy(link7.matrix);              
    link8.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));

    link9.matrix.copy(link8.matrix);              
    link9.matrix.multiply(new THREE.Matrix4().makeTranslation(0.5,-0.2,0));    
    link9.matrix.multiply(new THREE.Matrix4().makeScale(0.5,1.5,1));  

    link10.matrix.identity();              
    link10.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition + 1,yPosition - 2.6,0));
    link10.matrix.multiply(new THREE.Matrix4().makeRotationZ(-90*deg2rad + theta4));
    link10.matrix.multiply(new THREE.Matrix4().makeRotationX(90*deg2rad));    
    link10.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1)); 

    link11.matrix.copy(link10.matrix);              
    link11.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));

    link12.matrix.copy(link11.matrix);              
    link12.matrix.multiply(new THREE.Matrix4().makeTranslation(0.5,0.2,0));
    link12.matrix.multiply(new THREE.Matrix4().makeScale(0.5,1.5,1));


    link1.updateMatrixWorld();
    link2.updateMatrixWorld();
    link3.updateMatrixWorld();
    link4.updateMatrixWorld();
    link5.updateMatrixWorld();
    link6.updateMatrixWorld();
    link7.updateMatrixWorld();
    link8.updateMatrixWorld(); 
    link9.updateMatrixWorld();   
    link10.updateMatrixWorld();
    link11.updateMatrixWorld(); 
    link12.updateMatrixWorld();     
}

function alienSetMatrices1(avars) {
    var deg2rad = Math.PI/180;

    var xPosition = avars[0];
    var yPosition = avars[1];
    var theta1 = avars[2]*deg2rad;
    var theta2 = avars[3]*deg2rad;
    var theta3 = avars[4]*deg2rad;
    var theta4 = avars[5]*deg2rad;

    link1.matrix.identity();              
    link1.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition,0));
    link1.matrix.multiply(new THREE.Matrix4().makeRotationY(90*deg2rad));
    link1.matrix.multiply(new THREE.Matrix4().makeScale(3,4,1));

    link2.matrix.identity();              
    link2.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition + 2.5 ,0));
    link2.matrix.multiply(new THREE.Matrix4().makeRotationY(90*deg2rad));    
    link2.matrix.multiply(new THREE.Matrix4().makeScale(1.5,1.5,1));

    link3.matrix.identity();              
    link3.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition - 0.5,yPosition + 1,-2));
    link3.matrix.multiply(new THREE.Matrix4().makeRotationX(90*deg2rad));
    link3.matrix.multiply(new THREE.Matrix4().makeRotationY(-180*deg2rad + theta1));    
    link3.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1)); 

    link4.matrix.copy(link3.matrix);              
    link4.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));                

    link5.matrix.identity();              
    link5.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition + 1,2));
    link5.matrix.multiply(new THREE.Matrix4().makeRotationX(90*deg2rad));
    link5.matrix.multiply(new THREE.Matrix4().makeRotationY(-180*deg2rad + theta2));    
    link5.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1)); 

    link6.matrix.copy(link5.matrix);                
    link6.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));

    link7.matrix.identity();              
    link7.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition - 2.6,-1));
    link7.matrix.multiply(new THREE.Matrix4().makeRotationZ(-90*deg2rad + theta3));    
    link7.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1)); 

    link8.matrix.copy(link7.matrix);              
    link8.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));

    link9.matrix.copy(link8.matrix);              
    link9.matrix.multiply(new THREE.Matrix4().makeTranslation(0.5,-0.2,0));    
    link9.matrix.multiply(new THREE.Matrix4().makeScale(0.5,1.5,1));  

    link10.matrix.identity();              
    link10.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition - 2.6,1));
    link10.matrix.multiply(new THREE.Matrix4().makeRotationY(180*deg2rad));
    link10.matrix.multiply(new THREE.Matrix4().makeRotationZ(-90*deg2rad + theta4));    
    link10.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1)); 

    link11.matrix.copy(link10.matrix);              
    link11.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));

    link12.matrix.copy(link11.matrix);              
    link12.matrix.multiply(new THREE.Matrix4().makeTranslation(0.5,0.2,0));
    link12.matrix.multiply(new THREE.Matrix4().makeScale(0.5,1.5,1));


    link1.updateMatrixWorld();
    link2.updateMatrixWorld();
    link3.updateMatrixWorld();
    link4.updateMatrixWorld();
    link5.updateMatrixWorld();
    link6.updateMatrixWorld();
    link7.updateMatrixWorld();
    link8.updateMatrixWorld(); 
    link9.updateMatrixWorld();   
    link10.updateMatrixWorld();
    link11.updateMatrixWorld(); 
    link12.updateMatrixWorld();     
}

function alienSetMatrices2(avars) {
    var deg2rad = Math.PI/180;

    var xPosition = avars[0];
    var yPosition = avars[1];
    var theta1 = avars[2]*deg2rad;
    var theta2 = avars[3]*deg2rad;
    var theta3 = avars[4]*deg2rad;
    var theta4 = avars[5]*deg2rad;
    var theta5 = avars[6]*deg2rad;
    var theta6 = avars[7]*deg2rad;
    var theta7 = avars[8]*deg2rad;
    var theta8 = avars[9]*deg2rad;

    link1.matrix.identity();              
    link1.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition,0));    
    link1.matrix.multiply(new THREE.Matrix4().makeScale(3,4,1));

    link2.matrix.identity();              
    link2.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition + 2.5 ,0));    
    link2.matrix.multiply(new THREE.Matrix4().makeScale(1.5,1.5,1));

    link3.matrix.identity();              
    link3.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition - 1.5,yPosition + 1.5,0.5));
    link3.matrix.multiply(new THREE.Matrix4().makeRotationY(theta1));
    link3.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta5));
    link3.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1)); 

    link4.matrix.copy(link3.matrix);              
    link4.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));

    link5.matrix.identity();              
    link5.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition + 1.5,yPosition + 1.5,0.5));
    link5.matrix.multiply(new THREE.Matrix4().makeRotationY(theta2)); 
    link5.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta6));   
    link5.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1)); 

    link6.matrix.copy(link5.matrix);                
    link6.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));

    link7.matrix.identity();              
    link7.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition - 1,yPosition - 2.6,0));
    link7.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta3));
    link7.matrix.multiply(new THREE.Matrix4().makeRotationY(theta7));       
    link7.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1)); 

    link8.matrix.copy(link7.matrix);              
    link8.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));

    link9.matrix.copy(link8.matrix);              
    link9.matrix.multiply(new THREE.Matrix4().makeTranslation(0.5,-0.2,0));    
    link9.matrix.multiply(new THREE.Matrix4().makeScale(0.5,1.5,1));  

    link10.matrix.identity();              
    link10.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition + 1,yPosition - 2.6,0));
    link10.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta4));
    link10.matrix.multiply(new THREE.Matrix4().makeRotationY(theta8));   
    link10.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1)); 

    link11.matrix.copy(link10.matrix);              
    link11.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));

    link12.matrix.copy(link11.matrix);              
    link12.matrix.multiply(new THREE.Matrix4().makeTranslation(0.5,0.2,0));
    link12.matrix.multiply(new THREE.Matrix4().makeScale(0.5,1.5,1));


    link1.updateMatrixWorld();
    link2.updateMatrixWorld();
    link3.updateMatrixWorld();
    link4.updateMatrixWorld();
    link5.updateMatrixWorld();
    link6.updateMatrixWorld();
    link7.updateMatrixWorld();
    link8.updateMatrixWorld(); 
    link9.updateMatrixWorld();   
    link10.updateMatrixWorld();
    link11.updateMatrixWorld(); 
    link12.updateMatrixWorld();     
}

/////////////////////////////////////	
// initLights():  SETUP LIGHTS
/////////////////////////////////////	

function initLights() {
    light = new THREE.PointLight(0xffffff);
    light.position.set(-5,4,2);
    scene.add(light);
    ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
}

/////////////////////////////////////	
// MATERIALS
/////////////////////////////////////	

var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide } );
var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var armadilloMaterial = new THREE.MeshBasicMaterial( {color: 0x7fff7f} );

/////////////////////////////////////	
// initObjects():  setup objects in the scene
/////////////////////////////////////	

function initObjects() {
    worldFrame = new THREE.AxesHelper(5) ;
    scene.add(worldFrame);

    // mybox 
    /*myboxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
    mybox = new THREE.Mesh( myboxGeometry, diffuseMaterial );
    scene.add( mybox ); */

    // textured floor
    floorTexture = new THREE.TextureLoader().load('images/floor.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(1, 1);
    floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -2.1;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    // sphere, located at light position
    sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
    sphere = new THREE.Mesh(sphereGeometry, basicMaterial);
    sphere.position.set(-5,4,2);
    sphere.position.set(light.position.x, light.position.y, light.position.z);
    scene.add(sphere);

    // box
    /* boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
    box = new THREE.Mesh( boxGeometry, diffuseMaterial );
    box.position.set(-4, 0, 0);
    scene.add( box );

    // multi-colored cube      [https://stemkoski.github.io/Three.js/HelloWorld.html] cvx 
    var cubeMaterialArray = [];    // order to add materials: x+,x-,y+,y-,z+,z-
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
      // Cube parameters: width (x), height (y), depth (z), 
      //        (optional) segments along x, segments along y, segments along z
    var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
    mcc = new THREE.Mesh( mccGeometry, cubeMaterialArray );
    mcc.position.set(-2,0,0);
    scene.add( mcc );	

    // cylinder
    // parameters:  radiusAtTop, radiusAtBottom, height, radialSegments, heightSegments
    cylinderGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 0.80, 20, 4 );
    cylinder = new THREE.Mesh( cylinderGeometry, diffuseMaterial);
    cylinder.position.set(2, 0, 0);
    scene.add( cylinder );

    // cone:   parameters --  radiusTop, radiusBot, height, radialSegments, heightSegments
    coneGeometry = new THREE.CylinderGeometry( 0.0, 0.30, 0.80, 20, 4 );
    cone = new THREE.Mesh( coneGeometry, diffuseMaterial);
    cone.position.set(4, 0, 0);
    scene.add( cone);

    // torus:   parameters -- radius, diameter, radialSegments, torusSegments
    torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
    torus = new THREE.Mesh( torusGeometry, diffuseMaterial);
    torus.position.set(6, 0, 0);   // translation
    torus.rotation.set(0,0,0);     // rotation about x,y,z axes
    scene.add( torus );

    // custom object
    var geom = new THREE.Geometry(); 
    var v0 = new THREE.Vector3(0,0,0);
    var v1 = new THREE.Vector3(3,0,0);
    var v2 = new THREE.Vector3(0,3,0);
    var v3 = new THREE.Vector3(3,3,0);
    geom.vertices.push(v0);
    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);
    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
    geom.computeFaceNormals();
    customObject = new THREE.Mesh( geom, diffuseMaterial2 );
    customObject.position.set(0, 0, -2);
    scene.add(customObject); */
}

/////////////////////////////////////////////////////////////////////////////////////
//  initAlien():  define all geometry associated with the alien
/////////////////////////////////////////////////////////////////////////////////////

function initAlien() {
    alienMaterial = new THREE.MeshLambertMaterial( {color: 0xff0000} );
    boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth

    link1 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( link1 );
    linkFrame1   = new THREE.AxesHelper(1) ;   //scene.add(linkFrame1);
    link2 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( link2 );
    linkFrame2   = new THREE.AxesHelper(1) ;   //scene.add(linkFrame2);
    link3 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( link3 );
    linkFrame3   = new THREE.AxesHelper(1) ;   //scene.add(linkFrame3);
    link4 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( link4 );
    linkFrame4   = new THREE.AxesHelper(1) ;   //scene.add(linkFrame4);
    link5 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( link5 );
    linkFrame5   = new THREE.AxesHelper(1) ;   //scene.add(linkFrame5);
    link6 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( link6 );
    linkFrame6   = new THREE.AxesHelper(1) ;   //scene.add(linkFrame6);
    link7 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( link7 );
    linkFrame7   = new THREE.AxesHelper(1) ;   //scene.add(linkFrame7);
    link8 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( link8 );
    linkFrame8   = new THREE.AxesHelper(1) ;   //scene.add(linkFrame8);
    link9 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( link9 );
    linkFrame9   = new THREE.AxesHelper(1) ;   //scene.add(linkFrame9);
    link10 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( link10 );
    linkFrame10   = new THREE.AxesHelper(1) ;   //scene.add(linkFrame10);
    link11 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( link11 );
    linkFrame11   = new THREE.AxesHelper(1) ;   //scene.add(linkFrame11);
    link12 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( link12 );
    linkFrame12   = new THREE.AxesHelper(1) ;   //scene.add(linkFrame12);

    link1.matrixAutoUpdate = false;  
    link2.matrixAutoUpdate = false;  
    link3.matrixAutoUpdate = false;  
    link4.matrixAutoUpdate = false;  
    link5.matrixAutoUpdate = false;
    link6.matrixAutoUpdate = false;
    link7.matrixAutoUpdate = false;
    link8.matrixAutoUpdate = false;
    link9.matrixAutoUpdate = false;
    link10.matrixAutoUpdate = false;
    link11.matrixAutoUpdate = false;
    link12.matrixAutoUpdate = false;
    linkFrame1.matrixAutoUpdate = false;  
    linkFrame2.matrixAutoUpdate = false;  
    linkFrame3.matrixAutoUpdate = false;  
    linkFrame4.matrixAutoUpdate = false;  
    linkFrame5.matrixAutoUpdate = false;
    linkFrame6.matrixAutoUpdate = false;  
    linkFrame7.matrixAutoUpdate = false;  
    linkFrame8.matrixAutoUpdate = false;  
    linkFrame9.matrixAutoUpdate = false;  
    linkFrame10.matrixAutoUpdate = false;  
    linkFrame11.matrixAutoUpdate = false;  
    linkFrame12.matrixAutoUpdate = false;  
}

/////////////////////////////////////////////////////////////////////////////////////
//  create customShader material
/////////////////////////////////////////////////////////////////////////////////////

var customShaderMaterial = new THREE.ShaderMaterial( {
//        uniforms: { textureSampler: {type: 't', value: floorTexture}},
	vertexShader: document.getElementById( 'customVertexShader' ).textContent,
	fragmentShader: document.getElementById( 'customFragmentShader' ).textContent
} );

var ctx = renderer.context;
ctx.getShaderInfoLog = function () { return '' };   // stops shader warnings, seen in some browsers

////////////////////////////////////////////////////////////////////////	
// initFileObjects():    read object data from OBJ files;  see onResourcesLoaded() for instances
////////////////////////////////////////////////////////////////////////	

function initFileObjects() {
        // list of OBJ files that we want to load, and their material
    models = {     
//	bunny:     {obj:"obj/bunny.obj", mtl: diffuseMaterial, mesh: null},
//	horse:     {obj:"obj/horse.obj", mtl: diffuseMaterial, mesh: null },
//	minicooper:{obj:"obj/minicooper.obj", mtl: diffuseMaterial, mesh: null },
//	trex:      { obj:"obj/trex.obj", mtl: normalShaderMaterial, mesh: null },
	teapot:    {obj:"obj/teapot.obj", mtl: customShaderMaterial, mesh: null	},
	armadillo: {obj:"obj/armadillo.obj", mtl: customShaderMaterial, mesh: null },
	dragon:    {obj:"obj/dragon.obj", mtl: customShaderMaterial, mesh: null }
    };

    var manager = new THREE.LoadingManager();
    manager.onLoad = function () {
	console.log("loaded all resources");
	RESOURCES_LOADED = true;
	onResourcesLoaded();
    }
    var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
	    var percentComplete = xhr.loaded / xhr.total * 100;
	    console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
    };
    var onError = function ( xhr ) {
    };

    // Load models;  asynchronous in JS, so wrap code in a fn and pass it the index
    for( var _key in models ){
	console.log('Key:', _key);
	(function(key){
	    var objLoader = new THREE.OBJLoader( manager );
	    objLoader.load( models[key].obj, function ( object ) {
		object.traverse( function ( child ) {
		    if ( child instanceof THREE.Mesh ) {
			child.material = models[key].mtl;
			child.material.shading = THREE.SmoothShading;
		    }	} );
		models[key].mesh = object;
//		scene.add( object );
	    }, onProgress, onError );
	})(_key);
    }
}

/////////////////////////////////////////////////////////////////////////////////////
// onResourcesLoaded():  once all OBJ files are loaded, this gets called
//                       Object instancing is done here
/////////////////////////////////////////////////////////////////////////////////////

function onResourcesLoaded(){
	
 // Clone models into meshes;   [Michiel:  AFAIK this makes a "shallow" copy of the model,
 //                             i.e., creates references to the geometry, and not full copies ]
    /* meshes["armadillo1"] = models.armadillo.mesh.clone();
    meshes["armadillo2"] = models.armadillo.mesh.clone();
    meshes["dragon1"] = models.dragon.mesh.clone();
    // meshes["dragon2"] = models.dragon.mesh.clone();
    meshes["teapot1"] = models.teapot.mesh.clone();
    
    // position the object instances and parent them to the scene, i.e., WCS
    
    meshes["armadillo1"].position.set(-6, 1.5, 2);
    meshes["armadillo1"].rotation.set(0,-Math.PI/2,0);
    meshes["armadillo1"].scale.set(1,1,1);
    scene.add(meshes["armadillo1"]);

    meshes["armadillo2"].position.set(-3, 1.5, 2);
    meshes["armadillo2"].rotation.set(0,-Math.PI/2,0);
    meshes["armadillo2"].scale.set(1,1,1);
    scene.add(meshes["armadillo2"]);

    meshes["dragon1"].position.set(-5, 0.2, 4);
    meshes["dragon1"].rotation.set(0, Math.PI, 0);
    meshes["dragon1"].scale.set(0.3,0.3,0.3);
    scene.add(meshes["dragon1"]);

    // extra dragon
    meshes["dragon2"].position.set(-5, 0.2, 6);
    meshes["dragon2"].rotation.set(0, Math.PI/2, 0);
    meshes["dragon2"].scale.set(0.3,0.3,0.3);
    scene.add(meshes["dragon2"]); 

    meshes["teapot1"].position.set(3, 0, 3);
    meshes["teapot1"].scale.set(0.5, 0.5, 0.5);
    scene.add(meshes["teapot1"]); */
}


///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("A")) {
        move1 = true;
        move2 = false;
        move3 = false;
  }
  else if (keyboard.pressed("B")) {
        move1 = false;
        move2 = true;
        move3 = false;
  } 
  else if (keyboard.pressed("C")) {
        move1 = false;
        move2 = false;
        move3 = true;
  }
  else if (keyboard.pressed(" "))
    animation = !animation;
}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK:    This is the main animation loop
///////////////////////////////////////////////////////////////////////////////////////

function update() {
    var dt=0.02;
    checkKeyboard();
    if (animation) {
	  // advance the motion of all the animated objects
	// myboxMotion.timestep(dt);
	// handMotion.timestep(dt);
    if (move1)
        alienMotion.timestep(dt);
    else if (move2)
        alienMotion1.timestep(dt);
    else if (move3)
        alienMotion2.timestep(dt);
    }

    sphere.position.set(light.position.x, light.position.y, light.position.z);
    requestAnimationFrame(update);      // requests the next update call;  this creates a loop
    renderer.render(scene, camera);
}

init();
update();

