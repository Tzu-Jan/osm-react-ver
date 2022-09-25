import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export function onClickMove(event, pointer, raycaster, colliderBuilding, camera){
    
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    const selected = lockOn(pointer, raycaster, colliderBuilding, camera);
    if(selected["info"]["name"]!==undefined){
      alert(selected["info"]["name"]);
    }
    else{
          console.log("No data");
    }
    
}

export function lockOn(pointer, raycaster, colliderBuilding, camera)
{
    raycaster.setFromCamera(pointer, camera)
    
    const target = raycaster.intersectObjects(colliderBuilding, true);
    if(target.length > 0){
        return target[0].object;
    }
    
}

export function gui(test){
    const layers = {
      'Axis and grid': function () {
          test.camera.layers.toggle(0);
        },
        'Road': function () {
          test.camera.layers.toggle(1);
        },
        'Building': function () {
          test.camera.layers.toggle(2);
        },      
        'Enable All': function () {
          test.camera.layers.enableAll();
        },
        'Disable All': function () {
          test.camera.layers.disableAll();
        },
      }
  
      const gui = new GUI({ });
      gui.add( layers, 'Axis and grid');
      gui.add( layers, 'Road' );
      gui.add( layers, 'Building');
      gui.add( layers, 'Enable All' );
      gui.add( layers, 'Disable All' );
}