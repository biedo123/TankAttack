 class GameObject //implements IObserver
 {
    public width  : number = 0;
    public height : number = 0;
    public xspeed:number = 0;
    public yspeed:number = 0;

    public div : HTMLElement;
    public x : number = 0;
    public y : number = 0;
    public tag : string;
    public hitbox : ClientRect
    public rotation:number;

    constructor(tag: string) {
        //tag of gameobject
        this.tag = tag;
        //x and y of the gameobject within the window
        this.x = window.innerWidth/4 + Math.random() * (window.innerWidth/2);
        this.y = window.innerHeight/4 + Math.random() * (window.innerHeight/2);
        this.rotation = 0;
        //make the "game" object the parent
        let parent:HTMLElement = <HTMLElement> document.getElementsByTagName("game")[0];
        
        //create the object, with the correct image
        this.div = document.createElement(this.tag);
        this.div.style.backgroundImage = "url(images/"+this.tag+".png)";
        parent.appendChild(this.div);
        //set width/hight
        this.width  = this.div.clientWidth;
        this.height = this.div.clientHeight;
        this.hitbox  = this.div.getBoundingClientRect();
        //make it appear on screen
    }

    public draw() : void {
        this.div.style.transform = `translate(${this.x-this.width/2}px, ${this.y-this.height/2}px)  rotate(${this.rotation})`;
    }
    public getRectangle(){
        return this.div.getBoundingClientRect();
    }
    public update() {
        this.draw();
    }

    public Shot(){
    }

    public destroy(){
    }

    public checkIfInGame(){  
        const windowHeight = (window.innerHeight);
        const windowWidth = (window.innerWidth);
        const vertInView = (this.getRectangle().top <= windowHeight) && ((this.getRectangle().top + this.getRectangle().height) >= 0);
        const horInView = (this.getRectangle().left <= windowWidth) && ((this.getRectangle().left + this.getRectangle().width) >= 0);
            if (vertInView === false || horInView === false){
            this.destroy();
        }
    }
}
