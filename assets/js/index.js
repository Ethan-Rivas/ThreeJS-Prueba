import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


let scene, camera, renderer, controls;
function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFF000000);

  camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
  camera.position.x = 50;
  camera.position.y = 50;
  camera.position.z = 50;

  const pointLight = new THREE.PointLight( 0xFFFFFFF, 3, 100 );
  pointLight.position.set( -40, 40, 40 );
  scene.add( pointLight );

  const sphereSize = 1;
  const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
  scene.add( pointLightHelper );

  const loadingManager = new THREE.LoadingManager( () => {
	
		const loadingScreen = document.getElementById( 'loading-screen' );
		loadingScreen.classList.add( 'fade-out' );
		
		// optional: remove loader from DOM via event listener
		loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
	});

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  let loader = new GLTFLoader(loadingManager);
  loader.load('assets/models/house/scene.gltf', function(gltf){
    let obj = gltf.scene.children[0];
    obj.scale.set(1,1,1);
    
    scene.add(gltf.scene);
    animate();
  });

  window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onTransitionEnd( event ) {
	event.target.remove();
}

init();