/// <reference path="gameobject.ts" />

class PlayerTank extends GameObject implements ISubject {
    private speedUp: number = 0
    private speedDown: number = 0
    private speedRight: number = 0
    private speedLeft: number = 0
    private bulletFactory: BulletFactory;
    private lives:number;
    public observers:IObserver[] = []
    public rotation: number = 0;
   
    constructor(bulletfactory:BulletFactory){
        //create dom element
        super("playertank");
        this.lives = 3;
        this.x = window.innerWidth/2
        this.y = window.innerHeight/2

        window.addEventListener("keydown" , (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keypress" , (e:KeyboardEvent) => this.onKeyPress(e))
        window.addEventListener("keyup", (e:KeyboardEvent)=>this.onKeyUp(e))
        this.bulletFactory = bulletfactory;
    
    }
    onKeyPress(event:KeyboardEvent):void{
        switch(event.code){
        case "Space":
        this.Shoot();
        break;
        }
    }
    onKeyDown(event:KeyboardEvent):void{
        switch(event.code){
            case "KeyD":
            this.speedLeft = 5
            this.rotation = 90
            break
            case "KeyA":
            this.speedRight = -5
            this.rotation =  270
            break
            case "KeyW":
            this.speedUp = -5
            this.rotation =  0
            break
            case "KeyS":
            this.speedDown = 5
            this.rotation = 180
            break
        }
    }

    onKeyUp(event:KeyboardEvent):void{
        switch(event.keyCode){
            case 68:
               this.speedLeft = 0
               break
               case 65:
               this.speedRight = 0
               break
               case 87:
               this.speedUp = 0
               break
               case 83:
               this.speedDown = 0
               break
        }
    } 
       
    public update(){
        this.Movement();
        this.draw();
        this.checkIfInGame();
    }   

    private Shoot(){
        this.bulletFactory.createBullet(this.x, this.y, this.rotation, this.tag);
    }   

    public Shot(){
        this.lives += -1;
        for (let c of this.observers){
            c.notify(this.lives)
        }
        if(this.lives <= 0){
            Game.getInstance().gameOver();
        }
    }
         
    private Movement(){
        this.x += this.speedLeft + this.speedRight;
        this.y +=  this.speedUp + this.speedDown;
    }
   
    public draw() : void {
    
    this.div.style.transform = `translate(${this.x-this.width/2}px, ${this.y-this.height/2}px)  rotate(${this.rotation}deg)`;
    }

    subscribe(c: IObserver){
        this.observers.push(c)
    }

    public checkIfInGame(){  
        const windowHeight = (window.innerHeight);
        const windowWidth = (window.innerWidth);
        const vertInView = (this.getRectangle().top <= windowHeight) && ((this.getRectangle().top + this.getRectangle().height) >= 0);
        const horInView = (this.getRectangle().left <= windowWidth) && ((this.getRectangle().left + this.getRectangle().width) >= 0);
        if (vertInView === false || horInView === false){
            Game.getInstance().gameOver;
        }
    }
    public destroy(){
        this.div.remove();
        Game.getInstance().removeFromArray(this)
    }
}


   