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

        class ItemBox{
            constructor(){
                this.itmBox = new itmBoxes.Sprite(width/2, height/2, 400, 100);
                this.itmBox.layer = 2;
                this.itmBox.visible = false;
                this.itmBox.textColor = "white";
                this.itmBox.textSize = 40;
                this.itmBox.visible = false;
                this.itmBox.text = "starting"
                
            }
            boxVis(){
                this.setItem()
                this.itmBox.visible = true;
            }
            boxInvis(){
                this.itmBox.visible = false;
            }
            //ItemName(x) ItemDescription(x)
            setItem(){
               this.itmBox.text = itemReload()
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

class LevelBox{
    constructor(){
        this.lvlBox = new non_colliding.Sprite(width/2, height/2, 500, 500);
        this.lvlBox.layer = 1;
        this.lvlBox.textSize = 15;
        this.lvlBox.textColor = "white";
        this.lvlBox.text = "escape to exit";
        this.lvlBox.visible = false;
        this.itemBoxes = [];
        for(var i = 0; i < 3; ++i){
            this.itemBoxes.push(new ItemBox())
        }
    }
    boxVis(){
        this.lvlBox.visible = true;
        for(var i = 0; i < 3; ++i){
            this.itemBoxes[i].boxVis();
        }
    }
    boxInvis(){
        this.lvlBox.visible = false;
        for(var i = 0; i < 3; ++i){
            this.itemBoxes[i].boxInvis();
        }
    }
};

// testing the power ups

let itemName = ['Sentry Cannon',
                'Big Beam',
                'Shields'];

let itemDesc = ['A sentry mounted on your ship that will attack the closest enemy',
                'A large beam fires from your ship in the direction you are facing',
                'A series of shields that rotate around your ship blocking incoming enemies and projectiles.'];

function itemReload(){
    x = floor(random(3));
    let newItem = itemName[x];
    return String(newItem)
  }