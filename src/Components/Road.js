import * as THREE from 'three';
import { Position } from './Position';

export default class Road{
constructor(roadData, center, adjFactor){
    this.roadData = roadData;
    this.center = center;

    this.materialRoad = undefined;
                
    this.iR = undefined;
    this.adjFactor = adjFactor;
    this.geoRoads = []

}
addRoad(){
    this.iR =new THREE.Group();
    this.iR.name = "Road";
    this.materialRoad = new THREE.LineBasicMaterial({ color: 0xffffff});
    
    this.roadData.forEach(
        (item)=>{
         this.genRoad(item.geometry.coordinates)
    })
    // this.iR.layers.set(1)

   return this.iR;

}
genRoad(coordinates){
    
    this.materialRoad = new THREE.LineBasicMaterial({ color: 0xffffff});

    const points =[];
    
    coordinates.forEach(item => {
        if(!coordinates[0][1]) return
        if(!item[0] || !item[1]) return

        let point = [item[0], item[1]]

        const newPoint = Position([point[0],point[1]],this.center,this.adjFactor)

        points.push(new THREE.Vector3(newPoint[0], 0.01, newPoint[1]))
        
    });

    // console.log(points);
    let geometry = new THREE.BufferGeometry().setFromPoints(points)
    geometry.rotateZ(Math.PI);

    this.geoRoads.push(geometry);

    let line = new THREE.Line(geometry, this.materialRoad)
    line.layers.set(1)
    this.iR.add(line)

}
}