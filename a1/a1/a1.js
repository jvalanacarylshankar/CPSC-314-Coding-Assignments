/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  Vsep2018
//  Assignment 1 Template
/////////////////////////////////////////////////////////////////////////////////////////

//console.log('hello world');
console.log('Assignment 1 (Jvalana)'); //Question a

a=5;  
b=2.6;
console.log('a=',a,'b=',b);

console.log('Question b : ', a/0);      //infinity

//console.log('Question c : ', blah);   //blank screen

var foo;
console.log('Question d : ', foo);      //undefined

console.log('Question e : ', a)       //everything works perfectly (JS engine will try to insert semicolon on its own)

a=4;
b=5;
function go(){
  var a = 14;
  b = 15;
}
go();
console.log('Question f : a=',a,'b=',b);  //a=4, b=15

myvector = new THREE.Vector3(0,1,2);
console.log('myvector =',myvector);

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
//renderer.setClearColor(0xd0f0d0);     // set background colour

renderer.setClearColor(0xDDA0DD);     //Question g : light purple

canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(0,12,20);
camera.lookAt(0,0,0);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

///////////////////////////////////// 
// ADD LIGHTS  and define a simple material that uses lighting
///////////////////////////////////// 

light = new THREE.PointLight(0xffffff);
light.position.set(0,4,2);
scene.add(light);
ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide } );
var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var armadilloMaterial = new THREE.MeshBasicMaterial( {color: 0x7fff7f} );

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  OBJECTS /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////// 
// WORLD COORDINATE FRAME
///////////////////////////////////// 

var worldFrame = new THREE.AxesHelper(5) ;
scene.add(worldFrame);


///////////////////////////////////// 
// FLOOR with texture
///////////////////////////////////// 

floorTexture = new THREE.TextureLoader().load('images/floor.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);
floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

///////////////////////////////////////////////////////////////////////
//   sphere, representing the light 
///////////////////////////////////////////////////////////////////////

sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
sphere = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial( {color: 0xffff00} ));
sphere.position.set(0,4,2);
sphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(sphere);

///////////////////////////////////////////////////////////////////////
//   box
///////////////////////////////////////////////////////////////////////

boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
box = new THREE.Mesh( boxGeometry, diffuseMaterial );
box.position.set(-4, 0, 0);
scene.add( box );

///////////////////////////////////////////////////////////////////////
//  mcc:  multi-colour cube     [https://stemkoski.github.io/Three.js/HelloWorld.html] 
///////////////////////////////////////////////////////////////////////

  // Create an array of materials to be used in a cube, one for each side
var cubeMaterialArray = [];
  // order to add materials: x+,x-,y+,y-,z+,z-
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


///////////////////////////////////////////////////////////////////////
//  twisting stack of 3 cubes
///////////////////////////////////////////////////////////////////////

//cube 1
cubeMaterialArray = [];
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
  // Cube parameters: width (x), height (y), depth (z), 
  //        (optional) segments along x, segments along y, segments along z
var mccGeometry = new THREE.BoxGeometry( 1, 1, 1, 1, 1, 1 );
mcc = new THREE.Mesh( mccGeometry, cubeMaterialArray );
mcc.position.set(-2,0,5);
mcc.rotation.set(0, 0, 0);
scene.add( mcc );

//cube 2
cubeMaterialArray = [];
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
  // Cube parameters: width (x), height (y), depth (z), 
  //        (optional) segments along x, segments along y, segments along z
var mccGeometry = new THREE.BoxGeometry( 1, 1, 1, 1, 1, 1 );
mcc = new THREE.Mesh( mccGeometry, cubeMaterialArray );
mcc.position.set(-2,1,5);
mcc.rotation.set(0, Math.PI / 4, 0);
scene.add( mcc );

//cube 3
cubeMaterialArray = [];
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff00ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff00ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff00ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff00ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff00ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff00ff } ) );
  // Cube parameters: width (x), height (y), depth (z), 
  //        (optional) segments along x, segments along y, segments along z
var mccGeometry = new THREE.BoxGeometry( 1, 1, 1, 1, 1, 1 );
mcc = new THREE.Mesh( mccGeometry, cubeMaterialArray );
mcc.position.set(-2,2,5);
mcc.rotation.set(0, Math.PI / 2, 0);
scene.add( mcc );


/////////////////////////////////////////////////////////////////////////
// cylinder
/////////////////////////////////////////////////////////////////////////

// parameters:    
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
//cylinderGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 0.80, 20, 4 );
//cylinder = new THREE.Mesh( cylinderGeometry, diffuseMaterial);
//cylinder.position.set(2, 0, 0);
//scene.add( cylinder );

/////////////////////////////////////////////////////////////////////////
// cone -> xmas tree
/////////////////////////////////////////////////////////////////////////

// parameters:    
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
coneGeometry = new THREE.CylinderGeometry( 0.0, 3, 2, 20, 4 );
cone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( {color: 0x196f3d} ) );
cone.position.set(4, 0, 0);
scene.add( cone);

coneGeometry = new THREE.CylinderGeometry( 0.0, 2, 2, 20, 4 );
cone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( {color: 0x1e8449} ) );
cone.position.set(4, 2, 0);
scene.add( cone);

coneGeometry = new THREE.CylinderGeometry( 0.0, 1, 2, 20, 4 );
cone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( {color: 0x229954} ) );
cone.position.set(4, 4, 0);
scene.add( cone);

/////////////////////////////////////////////////////////////////////////
// snow man
/////////////////////////////////////////////////////////////////////////

sphereX = new THREE.SphereGeometry(1.5, 32, 32);    // radius, segments, segments
sphere1 = new THREE.Mesh(sphereX, new THREE.MeshBasicMaterial( {color: 0xffffff} ));
sphere1.position.set(-5, 0, 5);
scene.add(sphere1);

sphereX = new THREE.SphereGeometry(1, 32, 32);    // radius, segments, segments
sphere1 = new THREE.Mesh(sphereX, new THREE.MeshBasicMaterial( {color: 0xffffff} ));
sphere1.position.set(-5, 2.3, 5);
scene.add(sphere1);

sphereX = new THREE.SphereGeometry(0.1, 32, 32);    // radius, segments, segments
sphere1 = new THREE.Mesh(sphereX, new THREE.MeshBasicMaterial( {color: 0x000000} ));
sphere1.position.set(-5.2, 2.3, 6);
scene.add(sphere1);

sphereX = new THREE.SphereGeometry(0.1, 32, 32);    // radius, segments, segments
sphere1 = new THREE.Mesh(sphereX, new THREE.MeshBasicMaterial( {color: 0x000000} ));
sphere1.position.set(-4.8, 2.3, 6);
scene.add(sphere1);

sphereX = new THREE.SphereGeometry(0.1, 32, 32);    // radius, segments, segments
sphere1 = new THREE.Mesh(sphereX, new THREE.MeshBasicMaterial( {color: 0x000000} ));
sphere1.position.set(-5, 0, 6.5);
scene.add(sphere1);

sphereX = new THREE.SphereGeometry(0.1, 32, 32);    // radius, segments, segments
sphere1 = new THREE.Mesh(sphereX, new THREE.MeshBasicMaterial( {color: 0x000000} ));
sphere1.position.set(-5, 0.6, 6.4);
scene.add(sphere1);

sphereX = new THREE.SphereGeometry(0.1, 32, 32);    // radius, segments, segments
sphere1 = new THREE.Mesh(sphereX, new THREE.MeshBasicMaterial( {color: 0x000000} ));
sphere1.position.set(-5, 1.2, 6);
scene.add(sphere1);

coneGeometry = new THREE.CylinderGeometry( 0.0, 1, 1, 20, 4 );
cone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( {color: 0xff0000} ) );
cone.position.set(-5, 3.8, 5);
scene.add( cone);

/////////////////////////////////////////////////////////////////////////
// torus
/////////////////////////////////////////////////////////////////////////

// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus.position.set(6, 2, 3.5);   // translation
torus.rotation.set(0, Math.PI / 2, 0);     // rotation about x,y,z axes
scene.add( torus );

torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus.position.set(6, 2, 5);   // translation
torus.rotation.set(Math.PI / 2, 0, 0);     // rotation about x,y,z axes
scene.add( torus );

/////////////////////////////////////
//  CUSTOM OBJECT 
////////////////////////////////////

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

customObject = new THREE.Mesh( geom,  new THREE.MeshLambertMaterial( {color: 0xff5733, side: THREE.DoubleSide } ));
customObject.position.set(0, 0, -2);
scene.add(customObject);

geom = new THREE.Geometry(); 
v0 = new THREE.Vector3(0,0,0);
v1 = new THREE.Vector3(4,0,0);
v2 = new THREE.Vector3(0,3,0);
v3 = new THREE.Vector3(4,3,0);

geom.vertices.push(v0);
geom.vertices.push(v1);
geom.vertices.push(v2);
geom.vertices.push(v3);

geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
geom.computeFaceNormals();

customObject = new THREE.Mesh( geom, new THREE.MeshLambertMaterial( {color: 0xff5733, side: THREE.DoubleSide } ) );
customObject.position.set(0, 0, -2);
customObject.rotation.set(0, Math.PI / 2, 0);
scene.add(customObject);

geom = new THREE.Geometry(); 
v0 = new THREE.Vector3(0,0,0);
v1 = new THREE.Vector3(5,0,0);
v2 = new THREE.Vector3(0,3,0);
v3 = new THREE.Vector3(5,3,0);

geom.vertices.push(v0);
geom.vertices.push(v1);
geom.vertices.push(v2);
geom.vertices.push(v3);

geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
geom.computeFaceNormals();

customObject = new THREE.Mesh( geom, new THREE.MeshLambertMaterial( {color: 0xff5733, side: THREE.DoubleSide } ) );
customObject.position.set(3, 0, -2);
customObject.rotation.set(0, ((Math.PI/2) + 0.64350111), 0);
scene.add(customObject);

/////////////////////////////////////////////////////////////////////////////////////
//  create armadillo material
/////////////////////////////////////////////////////////////////////////////////////

var armadilloMaterial = new THREE.ShaderMaterial( {
//  uniforms: uniforms,
        uniforms: { textureSampler: {type: 't', value: floorTexture}},
  vertexShader: document.getElementById( 'armadilloVertexShader' ).textContent,
  fragmentShader: document.getElementById( 'armadilloFragmentShader' ).textContent
} );

var ctx = renderer.context;
ctx.getShaderInfoLog = function () { return '' };   // stops shader warnings, seen in some browsers

/////////////////////////////////////////////////////////////////////////////////////
//  ARMADILLO
/////////////////////////////////////////////////////////////////////////////////////

var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {
  console.log( item, loaded, total );
};

var onProgress = function ( xhr ) {
  if ( xhr.lengthComputable ) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};
var onError = function ( xhr ) {
};
var loader = new THREE.OBJLoader( manager );
loader.load( 'obj/armadillo.obj', function ( object ) {
  object.traverse( function ( child ) {
    if ( child instanceof THREE.Mesh ) {
      child.material = armadilloMaterial;
    }
  } );
  scene.add( object );
}, onProgress, onError );

///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
   
  if (keyboard.pressed("W")) {
    //console.log('W pressed');
    if (light.position.y < 5.0) {
      light.position.y += 0.1;
    }
  } 
  else if (keyboard.pressed("S")) {

    if (light.position.y > -5.0) {
      light.position.y -= 0.1;
    }
  }
 
  if (keyboard.pressed("A")) {

    if (light.position.x > -5.0) {
      light.position.x -= 0.1;
    }
  }
  else if (keyboard.pressed("D")) {

    if (light.position.x < 5.0) {
      light.position.x += 0.1;
    }
  }


  sphere.position.set(light.position.x, light.position.y, light.position.z);
}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK
///////////////////////////////////////////////////////////////////////////////////////

function update() {
  checkKeyboard();
  requestAnimationFrame(update);      // requests the next update call;  this creates a loop
  renderer.render(scene, camera);
}

update();

