import './style.css'

import * as THREE from 'three' ;

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' ;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.3, 1000);
const renderer = new THREE.WebGLRenderer
({
  canvas: document.querySelector('#bg'),
});

const controls = new OrbitControls( camera, renderer.domElement );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize ( window.innerWidth , window.innerHeight );

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera);

function RGB(red, green, blue)
{
    var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
    return '#'+decColor.toString(16).substr(1);
}


// Torus Shape 
const geometry = new THREE.TorusGeometry( 10, 3, 16, 30 );
const material = new THREE.MeshStandardMaterial( { color: RGB, wireframe: true } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus) 

// Ruben Foto 
const RubenText = new THREE.TextureLoader().load('Ruben.jpg')

 const Ruben = new THREE.Mesh
 (
  new THREE.BoxGeometry(8,8,8), 
  new THREE.MeshBasicMaterial({ map: RubenText}) 
 );

 scene.add(Ruben)

// Moon 
const moonText = new THREE.TextureLoader().load('moon.jpg') ;
const NormalTexture = new THREE.TextureLoader().load('moonmap.jpg') ;
const moon = new THREE.Mesh
(
  new THREE.SphereGeometry(2,30,30),
  new THREE.MeshBasicMaterial
  ({ 
    map: moonText, 
    normalMap: NormalTexture 
  })
);

scene.add(moon)

moon.position.y = 10;
moon.position.setX(-10);

// Earth 
const EarthText = new THREE.TextureLoader().load('earth.jpg') ;
const earth = new THREE.Mesh
(
  new THREE.SphereGeometry(3,40,40),
  new THREE.MeshBasicMaterial
  ({ 
    map: EarthText 
  })
);

scene.add(earth)

earth.position.z = 10;
earth.position.setX(-10);

// Mars
const MarsText = new THREE.TextureLoader().load('mars.jpg') ;
const mars = new THREE.Mesh
(
  new THREE.SphereGeometry(3,30,30),
  new THREE.MeshBasicMaterial
  ({ 
    map: MarsText 
  })
);

scene.add(mars)

mars.position.y = 7;
mars.position.setX(-15);


// Create stars // Godmode_On
function makeStars() 
{
  const geometry = new THREE.SphereGeometry(0.2 , 50 , 100);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh( geometry, material);

  const [x, y ,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300
    ) )
  star.position.set(x,y,z);
  scene.add(star);
}

// lighting
const pointlight = new THREE.PointLight(0xffffff)
pointlight.position.set (5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointlight, ambientLight)


//Helpers
const lightHelper = new THREE.PointLightHelper(pointlight)
const gridHelper = new THREE.GridHelper(200, 50)
//scene.add( gridHelper)


// Planet Rotations 
function animate() 
{
  requestAnimationFrame( animate ) ;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  Ruben.rotation.x += 0.005;
  Ruben.rotation.y += 0.01;
  Ruben.rotation.z += 0.005;
  
  earth.rotation.y += 0.003; 

  mars.rotation.y += 0.005; 
  


  //moon.rotation.x += 0.004; 
  moon.rotation.y += 0.007; 
 // moon.rotation.z += 0.0013; 
 

  //controls.update();
  
  renderer.render( scene, camera) ;
}
animate();


Array(200).fill().forEach(makeStars)

 const City = new THREE.TextureLoader().load('deepspace.jpg') ;
 scene.background = City;

//scroll Anemation
 function moveCamera () 
 {
  //const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05; 
  moon.rotation.y += 0.07; 
  moon.rotation.z += 0.06; 

  earth.rotation.x += 0.05; 
  earth.rotation.y += 0.07; 
  earth.rotation.z += 0.06; 

  mars.rotation.x += 0.05; 
  mars.rotation.y += 0.07; 
  mars.rotation.z += 0.06; 
 
 
  camera.rotation.z = t * -0.005; 
  camera.rotation.x = t * -0.0003; 
  camera.rotation.y = t * -0.0003; 

 }

 document.body.onscroll = moveCamera
 moveCamera();





