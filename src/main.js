import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight , 0.1, 1000)

const renderer = new THREE.WebGLRenderer(
  {
    canvas : document.querySelector("#bg"),
  }
)

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10,3,16,100)

const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 }); 

const torus = new THREE.Mesh(geometry,material);

scene.add(torus)

const light = new THREE.PointLight(0xff0000);

light.position.set(5,5,5)

scene.add( light );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); 

scene.add(ambientLight);

// const lightHelper = new THREE.PointLightHelper(light)

// const gridHelpher = new THREE.GridHelper(200,50)

// scene.add(lightHelper,gridHelpher)

const controls = new OrbitControls(camera,renderer.domElement)

// const spaceTexture = new THREE.TextureLoader().load('/andro.jpg');
// scene.background = spaceTexture;


function addStar () {
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})

  const star = new THREE.Mesh( geometry, material);
  camera.position.setZ(100);

  const [x , y ,z ] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);

}

document.querySelector('#info').innerHTML = 'Ansel Three JS'


Array(200).fill().forEach(addStar)

function animate (){
  requestAnimationFrame( animate )
  renderer.render(scene,camera)

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
controls.update()
}

animate()