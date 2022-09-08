import React, { useEffect } from 'react';
import './App.css';
import building from './JSON/building.json';
import road from './JSON/road.json';

import Initial from './Components/Initial';
import Building from './Components/Building';
import Road from './Components/Road';

function App() {
  
  const buildingData = building.features.filter((item)=>{
    return item.properties['building'];
  })
  
  // const roadData = road.filter((item)=>{
  //   return item.properties['highway'];
  // })
  
  useEffect(() => {
    const test = new Initial('myCanvas');
    test.init();
    test.animate();
    
    const buildings = new Building(buildingData)
    const buildingGroup =  buildings.addBuildings(test.camera); 
    test.scene.add(buildingGroup)

    // const roadDataGroup = new Road(roadData) 
    // roadDataGroup.addBuilding(); 
    // test.scene.add(roadDataGroup)

  },[buildingData]);
  
  
  return (
    <div className="App">
    <canvas id="myCanvas"/>
    </div>
  );
}

export default App;
