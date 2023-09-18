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
        this.lvlBox = new non_colliding.Sprite()
        this.lvlBox.visible = false;
    }
    boxVis(){
        this.lvlBox.visible = true;
    }
    boxInvis(){
        this.lvlBox.visible = false;
    }
};
