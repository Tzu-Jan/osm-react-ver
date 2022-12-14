import React, { useEffect } from 'react';
import building from './JSON/building.json';
import road from './JSON/road.json';
import { gui } from './Components/infoSelect'

import Initial from './Components/Initial';
import Building from './Components/Building';
import Road from './Components/Road';

function App() {
  
  const buildingData = building.features.filter((item)=>{
    return item.properties['building'];
  })
  
  const roadData = road.features.filter((item)=>{
      return (item.properties['highway'] 
       && item.geometry["type"]==="LineString" 
      && item.properties['highway']!=="pedestrian" 
      && item.properties['highway']!=="footway" 
      && item.properties['highway']!=="path");
    
  })
  const adjFactor = 1000; 

  
  useEffect(() => {
    const center = [103.8496307,1.283635]
    const test = new Initial('myCanvas');
    test.init();
    test.animate();

    const buildings = new Building(buildingData, center,adjFactor)
    const buildingGroup =  buildings.addBuildings(test.camera); 
    test.scene.add(buildingGroup)

    const roads = new Road(roadData,center,adjFactor) 
    const RoadGroup = roads.addRoad(); 
    test.scene.add(RoadGroup)
    
    gui(test)

  },[buildingData, roadData]);

  
  return (
    <canvas id="myCanvas"></canvas>
  );
}

export default App;
