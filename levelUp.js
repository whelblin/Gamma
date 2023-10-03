/*
    ////////////////////////////////////////////////
    This is how I'm evisioning this works; 
        xp bar fills up
            Game Pauses
        Level Up box appears
            Box has space for 3 to 4 items that are picked randomly from an array
            After Item has been picked 
                Box dissapears
                Game Resumes
                XP bar goes to zero
    ///////////////////////////////////////////////
    Functions Needed
        Game Pause
        Box creation
        Box Popup
        Fill box
        Unpause Game 
    //////////////////////////////////////////////////
    Constructors Needed
        Level Up Box
        Item options maybe?
   */
class LevelBox{
    constructor(){
        this.lvlBox = new non_colliding.Sprite(width/2, height/2, 500, 500);
        this.lvlBox.layer = 2;
        this.lvlBox.textSize = 15;
        this.lvlBox.textColor = "white";
        this.lvlBox.text = "escape to exit";
        this.lvlBox.visible = false;
    }
    boxVis(){
        this.lvlBox.visible = true;
    }
    boxInvis(){
        this.lvlBox.visible = false;
    }
};

class ItemBox{
    constructor(){
        this.itmBox = new itmBoxes.Sprite(width/2, height/2, 400, 100);
        this.itmBox.layer = 3;
        //this.itmBox.visible = false;
        this.itmBox.textColor = "white";
        this.itmBox.text = "please work";
        items.push(this.itmBox);
    }
    boxVis(){
        this.itmBox.visible = true;
    }
    boxInvis(){
        this.itmBox.visible = false;
    }
    //ItemName(x) ItemDescription(x)
    setItem(newItem){
        this.itmBox.text = newItem;
        console.log(newItem);
    }
    removeBoxes(){
        this.itmBox.remove();
    }
    /*
    itmSelection(){
        if (this.itmBox.mouse.pressing()){
            
        }
    }
    */
}
