class Game implements ISubject
{
    
    public playertank:PlayerTank
 
    public UI: UserInterface
    private static _instance: Game
    private runstate: boolean
    private aniID:number
    private level:number
    public gameObjectsArray:Array<GameObject> = Array<GameObject>()
    public tankObjectsArray:Array<GameObject> = Array<GameObject>()
    public ObjectiveArray: Array<GameObject> = Array<GameObject>()
    private bulletFactory: BulletFactory
    private enemyTankFactory: TankFactory;
    //collection of observers
    public observers:IObserver[] = []

    private constructor(){
        this.bulletFactory = new BulletFactory();
        this.enemyTankFactory = new TankFactory();
        this.level = 0;

        this.playertank = new PlayerTank(this.bulletFactory);
        
      
        this.UI = new UserInterface(this.playertank, this);
        
        //create the user interface
      //  window.addEventListener("keypress" , (e:KeyboardEvent) => this.onKeyPress(e))

        //create the tank for the player
        //push the gameobject into the array of gameobjects
        this.gameObjectsArray.push(this.playertank);
        this.tankObjectsArray.push(this.playertank);
        this.CreateLevel()
  
        
        this.runstate = true;
        
        requestAnimationFrame(() => this.gameLoop());

    }
    private gameLoop() {
      
        switch(this.runstate){
            case true:
          
                for(let gameObject of this.gameObjectsArray) {
                    gameObject.update();
                    gameObject.draw();
                }   
                
                //update functie van game elementen worden hier aangeroepen
                this.aniID = requestAnimationFrame(()=>this.gameLoop())
                break;
        
            case false:{
                
            cancelAnimationFrame(this.aniID)
            }
        }
    }
    public CreateLevel(){
        this.level += 1
        for(let i = 0; i < this.level; i++){
            let newtank = this.enemyTankFactory.createTank(this.playertank)
            this.gameObjectsArray.push(newtank);
            this.tankObjectsArray.push(newtank);
            this.ObjectiveArray.push(newtank);
        }
        this.UI.UpdateLevel(this.level);
    }

    public removeFromArray(removeObject: GameObject){
        let i = this.gameObjectsArray.indexOf(removeObject)
        this.gameObjectsArray.splice(i,1);

        if(removeObject.tag ==="tank" ){
            let j = this.tankObjectsArray.indexOf(removeObject)
            this.tankObjectsArray.splice(j,1)
            let a = this.ObjectiveArray.indexOf(removeObject)
            this.ObjectiveArray.splice(a, 1)
            if(this.ObjectiveArray.length === 0){
                this.CreateLevel();
            }
        }

        if (removeObject.tag ==="playertank"){
            let j = this.tankObjectsArray.indexOf(removeObject)
            this.tankObjectsArray.splice(j,1);
        }
    }

    public gameOver(){
        window.location.reload(true)
    }

    subscribe(c: IObserver){
        this.observers.push(c)
    }

    //singleton stuff
    public static getInstance(): Game {
        if(!Game._instance){
            this._instance = new Game();
        }
        return Game._instance;
    }

}
