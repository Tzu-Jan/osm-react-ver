import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import { onClickMove } from './infoSelect'

export default class Building{
    constructor(buildingData){
        this.buildingData = buildingData
        // console.log(this.buildingData.length);
    
        //this.center = [103.847,1.283];
        //this.center = [126.9774192,37.5665521]
        this.center = [103.8496307,1.283635]
        
        this.materialBuilding = undefined;
        
        this.geoBuildings = []
        this.colliderBuilding = [];
        this.iR = undefined;

        this.adjFactor = 1000;

        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        
    }
    addBuildings(camera){
        this.iR =new THREE.Group();
        this.iR.name = "Interactive Root";
        this.materialBuilding = new THREE.MeshNormalMaterial();
        
        this.buildingData.forEach(
            (item)=>{
             this.genBuildingUnit(item.geometry.coordinates, 
                item.properties, 
                item.properties['building:levels'])
        })
        // console.log(this.buildingData.length);
       
        const mergeGeometry = BufferGeometryUtils.mergeBufferGeometries(this.geoBuildings)
        const mesh = new THREE.Mesh(mergeGeometry, this.materialBuilding)
        this.iR.add(mesh)

        document.body.addEventListener('click', (e) => onClickMove(e, this.pointer, this.raycaster, this.colliderBuilding, camera))

        return this.iR
    }
    genBuildingUnit(coordinates, properties, levels){
       
        levels = levels ? levels : 1

        let shape, geometry;
        const holes = [];
        
        coordinates.forEach((points, index)=>{
            
            if(index===0){
                shape = this.getShape(points, this.center);
            }else{
                holes.push(this.getShape(points, this.center));
            }
        })

        holes.forEach((hole)=>{
         shape.holes.push(hole);
        })

        geometry = this.genGeometry(shape,{
            curveSegment: 1,
            depth: 0.05*levels,
            bevelEnabled: false,
          });
        geometry.rotateX(Math.PI / 2)
        geometry.rotateZ(Math.PI)

        this.geoBuildings.push(geometry);

        const helper = this.genHelper(geometry);

        if(helper){
            helper.name = properties['name']? properties['name'] : 'Building';
            helper.info = properties;
            this.colliderBuilding.push(helper)
        }

    }
    getShape(points, center){

        const shape = new THREE.Shape();
        points.forEach((point, index)=>{
            
            point = this.position(point,center);
            if(index===0){
                 shape.moveTo(point[0], point[1])
            }else{
                 shape.lineTo(point[0], point[1])
            }
        })
        return shape;
    }

    genGeometry(shape, config){
        const geometry = new THREE.ExtrudeGeometry(shape, config);
        geometry.computeBoundingBox();
        return geometry;
    }

    position(dataPoint, center){
        
        const x = dataPoint[0]-center[0];
        const y = dataPoint[1]-center[1];

        return [ -x * this.adjFactor , y * this.adjFactor ]
    }
    genHelper(geometry){
        if(!geometry.boundingBox){
            geometry.computeBoundingBox();
        }
          
        const box3 = geometry.boundingBox;
        
        if(!isFinite(box3.max.x)){
            return false;
        }
        
        let helper = new THREE.Box3Helper(box3, 0xffff20);
        helper.updateMatrixWorld();
        return helper;

    }



}