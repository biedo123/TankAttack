/// <reference path="gameobject.ts" />

class Bullet extends GameObject{ 
  private speed: number;
  public bulletOwner: string;
  private angle: number;
  public rotation: number;
  //private color: string;


  constructor(xlocation: number, ylocation: number, tankrotation: number, owner: string){
    super("bullet");  
    this.x = xlocation;
    this.y = ylocation;
    this.rotation = tankrotation;
    this.speed = 5;
    this.bulletOwner = owner;
    this.initialize();
    this.angle = 180 - (this.rotation);

    }

    public initialize(){
      let fire = new Audio('./audio/boom.mp3');
      fire.play();
    }
    
    public update(){
      this.Movement();
      this.draw();
      this.checkIfInGame();
      this.hitDetection();
    }

    public destroy(){
        this.div.remove();
        Game.getInstance().removeFromArray(this)
    }
    
  private Movement(){
    let dX = Math.cos(this.angle * Math.PI / 180);
    let dY = Math.sin(this.angle * Math.PI / 180);
    this.y += dX * this.speed;
    this.x += dY * this.speed;
  }

  public draw() : void {
    this.div.style.transform = `translate(${this.x-this.width/2}px, ${this.y-this.height/2}px)  rotate(${this.rotation}deg)`;
    //this.div.style.transform = `rotate(${this.rotation})`;
  }

  public hitDetection(){
    for(let i = 0; i <  Game.getInstance().tankObjectsArray.length; i++){
      let j = Game.getInstance().tankObjectsArray[i];
      let hit = this.checkCollision(this.getRectangle(), j.getRectangle())
      if(hit){
        let hit = new Audio('./audio/hit.mp3');
        if(this.bulletOwner === j.tag){
        }

        else if(j.tag === "playertank"){
            Game.getInstance().playertank.Shot();
       
            hit.play();
            this.destroy();
        }

        else{
          j.Shot();
          hit.play();
          this.destroy();
        }
      }
    } 
  } 

  checkCollision(a: ClientRect, b: ClientRect) {
    return (a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom)
  }
}
  