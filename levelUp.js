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

function exitLevelUpScreen(){
    print("exiting")
           
}
function enterLevelUpScreen(){
    
}


        class ItemBox{
            constructor(i){
                this.itmBox = new itmBoxes.Sprite(width/2, height/2 - 120 + i*120, 400, 100, 's');
                this.itmBox.layer = 2;
                this.itmBox.visible = false;
                this.itmBox.textColor = "white";
                this.itmBox.textSize = 40;
                this.itmBox.visible = false;
                this.itmBox.text = ""
            }
            boxVis(index){
                this.setItem(index)
                this.itmBox.visible = true;
            }
            boxInvis(){
                this.itmBox.visible = false;
                this.itmBox.text = ""
            }
            //ItemName(x) ItemDescription(x)
            setItem(index){
                print("setting item:", index)
               let item = itemReload()
               let answer = lvlBox.checkDupes(item, index)
               while(answer != 1){
                    if(answer == -1){
                        item = ["",null]
                        break
                    }
                   item = itemReload();
                   answer = lvlBox.checkDupes(item, index)
               }
               this.itmBox.text =String(item[0])
               if(item[1] == null){
                this.itmBox.color = "gray"
               }
               else if(item[1].type =="passive"){
                    this.itmBox.color = "blue"
               }
               else if (item[1].type =="active"){
                   this.itmBox.color = "red"
               }
            }
            removeBoxes(){
                this.itmBox.remove();
            }
            getText(){
            return this.itmBox.text;
            }
            checkClick(){
                if (this.itmBox.mouse.pressed()){
                    powerups.every((value, index, array)=> {
                        if(this.itmBox.text == value[0]){
                            if(value[1] == null) {
                                state.leveledUp()
                                return false;
                            }
                            value[1].activate(player, index)
                            
                            state.leveledUp()
                            print("return")
                            if(powerups.length <  lvlBox.itemBoxes.length){
                                lvlBox.itemBoxes.pop()
                            }
                            return false
                        }
                        return true
                    })
                }
            }
            
        }

class LevelBox{
    constructor(){
        this.lvlBox = new non_colliding.Sprite(width/2, height/2, 500, 500, 's');
        this.lvlBox.layer = 1;
        this.lvlBox.textSize = 15;
        this.lvlBox.textColor = "white";
        this.lvlBox.text = "escape to exit";
        this.lvlBox.visible = false;
        this.itemBoxes = [];
        for(var i = 0; i <3; ++i){
            this.itemBoxes.push(new ItemBox (i));
        }
    }
    // turns the boxes on and sets the items
    boxVis(){
        this.lvlBox.visible = true;
        for(var i = 0; i < this.itemBoxes.length; ++i){
            this.itemBoxes[i].boxVis(i);
        }
    }
    // turns the boxes off
    boxInvis(){
        this.lvlBox.visible = false;
        for(var i = 0; i < this.itemBoxes.length; ++i){
            this.itemBoxes[i].boxInvis();
        }
    }
    checkClick(){
        for(var i = 0; i < this.itemBoxes.length; ++i){
            this.itemBoxes[i].checkClick();
        }
    }
    checkDupes(item,index){
        for(var i = 0; i < this.itemBoxes.length; ++i){
            if(i == index) continue
            print("testing",i, "box:",this.itemBoxes[i].getText(),"==",item[0],":= ",this.itemBoxes[i].getText() == item[0])
            if(this.itemBoxes[i].getText() == item[0]){
                if(powerups.length < 3){
                    return -1; // not enough spots yet
                }
                return 0; // dup
            }
        }
        return 1; // not a dup
    }
};

// testing the power ups


let itemDesc = ['A sentry mounted on your ship that will attack the closest enemy',
                'A large beam fires from your ship in the direction you are facing',
                'A series of shields that rotate around your ship blocking incoming enemies and projectiles.'];


function itemReload(){
    x = floor(random((powerups.length)));
    let text = powerups[x][0]
    let obj = powerups[x][1]
    return ([text, obj])
}

