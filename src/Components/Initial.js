import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class Initial{
    constructor(canvasId){

        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;

        this.fov = 75;
        this.nearPlane = 0.1;
        this.farPlane = 1000;
        this.canvasId = canvasId;

        this.raycaster = undefined;
        this.pointer = undefined

        this.stats = undefined;
        this.controls = undefined;
        this.axesHelper = undefined;
        this.gh = undefined;

        this.light0 = undefined;
        this.light1 = undefined;
        this.light2 = undefined;

        // this.layers = undefined
        // this.gui = undefined
    }
    init(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            window.innerWidth / window.innerHeight,
            this.nearPlane,
            this.farPlane);

        this.camera.layers.enable( 0 ); 
        this.camera.layers.enable( 1 );    
        
        this.camera.position.z =0;
        this.camera.position.y =4;
        this.camera.position.x =8;
        this.camera.lookAt(this.scene.position);
        

        this.scene.add(this.camera)

        const canvas = document.getElementById(this.canvasId);
        this.renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
        })
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 1.0); // background color
        this.renderer.shadowMap.enable = true; // set shadow
        
        document.body.appendChild(this.renderer.domElement);
        
        this.light0 = new THREE.AmbientLight(0xfafafa, 0.25)
        this.light0.layers.enable( 0 );
        this.light0.layers.enable( 1 );


        this.light1 = new THREE.PointLight(0xffffff, 0.5)
        this.light1.position.set(200, 90, 40)
        this.light1.layers.enable( 0 );
        this.light1.layers.enable( 1 );
        
        this.light2 = new THREE.PointLight(0xffffff, 0.5)
        this.light2.position.set(200, 90, -40)
        this.light2.layers.enable( 0 );
        this.light2.layers.enable( 1 );

        this.camera.add(this.light0)
        this.camera.add(this.light1)
        this.camera.add(this.light2)

        this.axesHelper = new THREE.AxesHelper(1000);
        this.axesHelper.layers.set(2)
        this.scene.add(this.axesHelper);
        this.gh = new THREE.GridHelper(
          60,
          160,
          new THREE.Color(0x555555),
          new THREE.Color(0x222222)
        );
        this.gh.layers.set(2)
        this.scene.add(this.gh);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(4.5, 0, 4.5);
        this.controls.enablePan = true;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.5;
        this.controls.screenSpacePanning = false;
        this.controls.maxDistance = 800;
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);

        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();

        window.addEventListener('resize', () => this.onWindowResize(), false);
      
    }
    
    animate() {
        
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        this.stats.update();
        this.controls.update();
      }
    
    render() {
        this.renderer.render(this.scene, this.camera);
      }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    } 

}

