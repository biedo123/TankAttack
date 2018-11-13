class AgroStrategy implements ITankBehavior{
    public enemyTank:Tank;
   
    
    constructor(enemyTank: Tank){
        this.enemyTank = enemyTank;
        this.enemyTank.bulletCoolDown = 50;
        this.enemyTank.div.style.backgroundImage= "url(images/agrotank.png)";
        this.enemyTank.Attitude = "agro"

    }
      public update(){
          this.movement();
      }

      public draw() : void {
        this.enemyTank.div.style.transform = `translate(${this.enemyTank.x-this.enemyTank.width/2}px, ${this.enemyTank.y-this.enemyTank.height/2}px)  rotate(${this.enemyTank.rotation}deg)`;
        }
     private movement(){
        let xdist:number = this.enemyTank.x - this.enemyTank.Playertank.x;
        let ydist:number = this.enemyTank.y - this.enemyTank.Playertank.y;
        let distance:number = Math.sqrt(xdist * xdist + ydist * ydist);
        
        this.enemyTank.xspeed = xdist/distance * (280/distance);
        this.enemyTank.yspeed = ydist/distance * (280/distance);        
      
        if(distance > 100){
            this.enemyTank.x -= this.enemyTank.xspeed;
            this.enemyTank.y -= this.enemyTank.yspeed;
            }
    }
 
}