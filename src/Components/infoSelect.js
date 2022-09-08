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