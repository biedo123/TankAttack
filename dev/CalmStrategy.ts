class CalmStrategy implements ITankBehavior{
    enemyTank:Tank;
    constructor(enemyTank: Tank){
        this.enemyTank = enemyTank;
        this.enemyTank.div.style.backgroundImage= "url(images/tank.png)";
        this.enemyTank.bulletCoolDown = 100;
        this.enemyTank.Attitude = "calm"
    }
    
    public update(){
        this.movement();
    }
    
     movement():void{
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