
/*
removes the asteroid from the array and the sprite from the screen
must do both to avoid memory leak
*/

function removal(array,object){
    let index = array.indexOf(object);
    object.remove();
    array.splice(index,1); 
}

function cullObjects(){
    asteroidGroup.cull(50, (object) => {
        let index = asteroids.indexOf(object);
        object.remove();
        asteroids.splice(index,1);
      });
    trackerGroup.cull(50, (object) => {
        console.log(object)
        let index = trackers.indexOf(object);
        object.remove();
        trackers.splice(index,1);
      });
}