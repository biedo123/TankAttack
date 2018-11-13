/// <reference path="gameobject.ts" />

class Tank extends GameObject {

  public Playertank:PlayerTank;
  public Behavior: ITankBehavior;
  public Attitude: string;
  public health: number;
  public bulletCoolDown: number;
  private _lastTimeShot: number;
  public EnemyBulletFactory: BulletFactory;

  constructor(f: PlayerTank){
    super("tank");
    this.Playertank = f;
    this.health = 2;
    let BehaviorNumber = Math.floor(Math.random() * 2 + 1);

    if(BehaviorNumber == 1){
      this.Behavior = new AgroStrategy(this);
    }
    else{
      this.Behavior = new CalmStrategy(this)
    }
    this.EnemyBulletFactory = new BulletFactory();
    this._lastTimeShot = 0;
    
    this.initialize();
  }
  public initialize(){this.update()};

  public update(){
    this.CalculateRotation();
     this.draw();
    this.Behavior.update();
    this.Shoot();
    this.checkIfInGame();
  }
  public draw() : void {
    this.div.style.transform = `translate(${this.x-this.width/2}px, ${this.y-this.height/2}px)  rotate(${this.rotation}deg)`;
    }

  public CalculateRotation(){
    let xdist:number =  this.Playertank.x - this.x;
    let ydist:number =  this.Playertank.y - this.y;

    let angle = Math.atan2(xdist, ydist) * (180/Math.PI) ;
      angle = 180 - (angle);
    this.rotation = angle ;

  }
  private Shoot(){
  
    if( this._lastTimeShot < this.bulletCoolDown){
      this._lastTimeShot++;
    }

    else if (this._lastTimeShot >= this.bulletCoolDown){
      this._lastTimeShot = 0;
      this.EnemyBulletFactory.createBullet(this.x, this.y, this.rotation, this.tag);

    }
  }
  public Shot(){
    this.health -= 1;
    if (this.Attitude === "calm"){
      this.Behavior = new AgroStrategy(this);
    }
    if (this.health <= 0){
      this.destroy();
    }
  }

      public destroy(){
        this.div.remove();
        Game.getInstance().removeFromArray(this)
    }
}
