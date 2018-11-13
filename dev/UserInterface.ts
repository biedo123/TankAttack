class UserInterface implements IObserver{
    
    private liveDiv : HTMLElement;
    private pauzeDiv : HTMLElement;
    private levelDiv: HTMLElement;
    observers: Array<IObserver> = Array<IObserver>();
    private tank:ISubject
    private game:ISubject
    private lives:number
    public level:number
    
    /**
     * constructor
     */
    constructor(t: ISubject, g: ISubject){
        this.level = 0;
        this.lives = 3
        this.tank = t
        this.tank.subscribe(this)
        this.game = g
        this.game.subscribe(this)
         this.liveDiv = <HTMLElement> document.getElementById("lives");
         this.levelDiv = <HTMLElement> document.getElementById("level");

        this.liveDiv.innerHTML = 'Lives : ' + this.lives;
        this.levelDiv.innerHTML = "Level " + this.level;
       this.pauzeDiv = <HTMLElement> document.getElementById("pauze")
 
    }

  
    public UpdateLives(p: any){
        this.lives = p;
        this.liveDiv.innerHTML = 'Lives : ' + this.lives;
    }
    public UpdateLevel(c: number){
        console.log("UPDATING");
        this.level = c
        this.levelDiv.innerHTML = "Level " + this.level;
    }
    notify(p:any){
        this.UpdateLives(p);
    }
   
    
}