"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AgroStrategy = (function () {
    function AgroStrategy(enemyTank) {
        this.enemyTank = enemyTank;
        this.enemyTank.bulletCoolDown = 50;
        this.enemyTank.div.style.backgroundImage = "url(images/agrotank.png)";
        this.enemyTank.Attitude = "agro";
    }
    AgroStrategy.prototype.update = function () {
        this.movement();
    };
    AgroStrategy.prototype.draw = function () {
        this.enemyTank.div.style.transform = "translate(" + (this.enemyTank.x - this.enemyTank.width / 2) + "px, " + (this.enemyTank.y - this.enemyTank.height / 2) + "px)  rotate(" + this.enemyTank.rotation + "deg)";
    };
    AgroStrategy.prototype.movement = function () {
        var xdist = this.enemyTank.x - this.enemyTank.Playertank.x;
        var ydist = this.enemyTank.y - this.enemyTank.Playertank.y;
        var distance = Math.sqrt(xdist * xdist + ydist * ydist);
        this.enemyTank.xspeed = xdist / distance * (280 / distance);
        this.enemyTank.yspeed = ydist / distance * (280 / distance);
        if (distance > 100) {
            this.enemyTank.x -= this.enemyTank.xspeed;
            this.enemyTank.y -= this.enemyTank.yspeed;
        }
    };
    return AgroStrategy;
}());
var GameObject = (function () {
    function GameObject(tag) {
        this.width = 0;
        this.height = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.x = 0;
        this.y = 0;
        this.tag = tag;
        this.x = window.innerWidth / 4 + Math.random() * (window.innerWidth / 2);
        this.y = window.innerHeight / 4 + Math.random() * (window.innerHeight / 2);
        this.rotation = 0;
        var parent = document.getElementsByTagName("game")[0];
        this.div = document.createElement(this.tag);
        this.div.style.backgroundImage = "url(images/" + this.tag + ".png)";
        parent.appendChild(this.div);
        this.width = this.div.clientWidth;
        this.height = this.div.clientHeight;
        this.hitbox = this.div.getBoundingClientRect();
    }
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + (this.x - this.width / 2) + "px, " + (this.y - this.height / 2) + "px)  rotate(" + this.rotation + ")";
    };
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    GameObject.prototype.update = function () {
        this.draw();
    };
    GameObject.prototype.Shot = function () {
    };
    GameObject.prototype.destroy = function () {
    };
    GameObject.prototype.checkIfInGame = function () {
        var windowHeight = (window.innerHeight);
        var windowWidth = (window.innerWidth);
        var vertInView = (this.getRectangle().top <= windowHeight) && ((this.getRectangle().top + this.getRectangle().height) >= 0);
        var horInView = (this.getRectangle().left <= windowWidth) && ((this.getRectangle().left + this.getRectangle().width) >= 0);
        if (vertInView === false || horInView === false) {
            this.destroy();
        }
    };
    return GameObject;
}());
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(xlocation, ylocation, tankrotation, owner) {
        var _this = _super.call(this, "bullet") || this;
        _this.x = xlocation;
        _this.y = ylocation;
        _this.rotation = tankrotation;
        _this.speed = 5;
        _this.bulletOwner = owner;
        _this.initialize();
        _this.angle = 180 - (_this.rotation);
        return _this;
    }
    Bullet.prototype.initialize = function () {
        var fire = new Audio('./audio/boom.mp3');
        fire.play();
    };
    Bullet.prototype.update = function () {
        this.Movement();
        this.draw();
        this.checkIfInGame();
        this.hitDetection();
    };
    Bullet.prototype.destroy = function () {
        this.div.remove();
        Game.getInstance().removeFromArray(this);
    };
    Bullet.prototype.Movement = function () {
        var dX = Math.cos(this.angle * Math.PI / 180);
        var dY = Math.sin(this.angle * Math.PI / 180);
        this.y += dX * this.speed;
        this.x += dY * this.speed;
    };
    Bullet.prototype.draw = function () {
        this.div.style.transform = "translate(" + (this.x - this.width / 2) + "px, " + (this.y - this.height / 2) + "px)  rotate(" + this.rotation + "deg)";
    };
    Bullet.prototype.hitDetection = function () {
        for (var i = 0; i < Game.getInstance().tankObjectsArray.length; i++) {
            var j = Game.getInstance().tankObjectsArray[i];
            var hit = this.checkCollision(this.getRectangle(), j.getRectangle());
            if (hit) {
                var hit_1 = new Audio('./audio/hit.mp3');
                if (this.bulletOwner === j.tag) {
                }
                else if (j.tag === "playertank") {
                    Game.getInstance().playertank.Shot();
                    hit_1.play();
                    this.destroy();
                }
                else {
                    j.Shot();
                    hit_1.play();
                    this.destroy();
                }
            }
        }
    };
    Bullet.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom);
    };
    return Bullet;
}(GameObject));
var BulletFactory = (function () {
    function BulletFactory() {
    }
    BulletFactory.prototype.createBullet = function (xlocation, ylocation, tankrotation, owner) {
        var bullet = new Bullet(xlocation, ylocation, tankrotation, owner);
        Game.getInstance().gameObjectsArray.push(bullet);
        return bullet;
    };
    return BulletFactory;
}());
var CalmStrategy = (function () {
    function CalmStrategy(enemyTank) {
        this.enemyTank = enemyTank;
        this.enemyTank.div.style.backgroundImage = "url(images/tank.png)";
        this.enemyTank.bulletCoolDown = 100;
        this.enemyTank.Attitude = "calm";
    }
    CalmStrategy.prototype.update = function () {
        this.movement();
    };
    CalmStrategy.prototype.movement = function () {
        var xdist = this.enemyTank.x - this.enemyTank.Playertank.x;
        var ydist = this.enemyTank.y - this.enemyTank.Playertank.y;
        var distance = Math.sqrt(xdist * xdist + ydist * ydist);
        this.enemyTank.xspeed = xdist / distance * (280 / distance);
        this.enemyTank.yspeed = ydist / distance * (280 / distance);
        if (distance > 100) {
            this.enemyTank.x -= this.enemyTank.xspeed;
            this.enemyTank.y -= this.enemyTank.yspeed;
        }
    };
    return CalmStrategy;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.gameObjectsArray = Array();
        this.tankObjectsArray = Array();
        this.ObjectiveArray = Array();
        this.observers = [];
        this.bulletFactory = new BulletFactory();
        this.enemyTankFactory = new TankFactory();
        this.level = 0;
        this.playertank = new PlayerTank(this.bulletFactory);
        this.UI = new UserInterface(this.playertank, this);
        this.gameObjectsArray.push(this.playertank);
        this.tankObjectsArray.push(this.playertank);
        this.CreateLevel();
        this.runstate = true;
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        switch (this.runstate) {
            case true:
                for (var _i = 0, _a = this.gameObjectsArray; _i < _a.length; _i++) {
                    var gameObject = _a[_i];
                    gameObject.update();
                    gameObject.draw();
                }
                this.aniID = requestAnimationFrame(function () { return _this.gameLoop(); });
                break;
            case false: {
                cancelAnimationFrame(this.aniID);
            }
        }
    };
    Game.prototype.CreateLevel = function () {
        this.level += 1;
        for (var i = 0; i < this.level; i++) {
            var newtank = this.enemyTankFactory.createTank(this.playertank);
            this.gameObjectsArray.push(newtank);
            this.tankObjectsArray.push(newtank);
            this.ObjectiveArray.push(newtank);
        }
        this.UI.UpdateLevel(this.level);
    };
    Game.prototype.removeFromArray = function (removeObject) {
        var i = this.gameObjectsArray.indexOf(removeObject);
        this.gameObjectsArray.splice(i, 1);
        if (removeObject.tag === "tank") {
            var j = this.tankObjectsArray.indexOf(removeObject);
            this.tankObjectsArray.splice(j, 1);
            var a = this.ObjectiveArray.indexOf(removeObject);
            this.ObjectiveArray.splice(a, 1);
            if (this.ObjectiveArray.length === 0) {
                this.CreateLevel();
            }
        }
        if (removeObject.tag === "playertank") {
            var j = this.tankObjectsArray.indexOf(removeObject);
            this.tankObjectsArray.splice(j, 1);
        }
    };
    Game.prototype.gameOver = function () {
        window.location.reload(true);
    };
    Game.prototype.subscribe = function (c) {
        this.observers.push(c);
    };
    Game.getInstance = function () {
        if (!Game._instance) {
            this._instance = new Game();
        }
        return Game._instance;
    };
    return Game;
}());
var PlayerTank = (function (_super) {
    __extends(PlayerTank, _super);
    function PlayerTank(bulletfactory) {
        var _this = _super.call(this, "playertank") || this;
        _this.speedUp = 0;
        _this.speedDown = 0;
        _this.speedRight = 0;
        _this.speedLeft = 0;
        _this.observers = [];
        _this.rotation = 0;
        _this.lives = 3;
        _this.x = window.innerWidth / 2;
        _this.y = window.innerHeight / 2;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keypress", function (e) { return _this.onKeyPress(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        _this.bulletFactory = bulletfactory;
        return _this;
    }
    PlayerTank.prototype.onKeyPress = function (event) {
        switch (event.code) {
            case "Space":
                this.Shoot();
                break;
        }
    };
    PlayerTank.prototype.onKeyDown = function (event) {
        switch (event.code) {
            case "KeyD":
                this.speedLeft = 5;
                this.rotation = 90;
                break;
            case "KeyA":
                this.speedRight = -5;
                this.rotation = 270;
                break;
            case "KeyW":
                this.speedUp = -5;
                this.rotation = 0;
                break;
            case "KeyS":
                this.speedDown = 5;
                this.rotation = 180;
                break;
        }
    };
    PlayerTank.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 68:
                this.speedLeft = 0;
                break;
            case 65:
                this.speedRight = 0;
                break;
            case 87:
                this.speedUp = 0;
                break;
            case 83:
                this.speedDown = 0;
                break;
        }
    };
    PlayerTank.prototype.update = function () {
        this.Movement();
        this.draw();
        this.checkIfInGame();
    };
    PlayerTank.prototype.Shoot = function () {
        this.bulletFactory.createBullet(this.x, this.y, this.rotation, this.tag);
    };
    PlayerTank.prototype.Shot = function () {
        this.lives += -1;
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var c = _a[_i];
            c.notify(this.lives);
        }
        if (this.lives <= 0) {
            Game.getInstance().gameOver();
        }
    };
    PlayerTank.prototype.Movement = function () {
        this.x += this.speedLeft + this.speedRight;
        this.y += this.speedUp + this.speedDown;
    };
    PlayerTank.prototype.draw = function () {
        this.div.style.transform = "translate(" + (this.x - this.width / 2) + "px, " + (this.y - this.height / 2) + "px)  rotate(" + this.rotation + "deg)";
    };
    PlayerTank.prototype.subscribe = function (c) {
        this.observers.push(c);
    };
    PlayerTank.prototype.checkIfInGame = function () {
        var windowHeight = (window.innerHeight);
        var windowWidth = (window.innerWidth);
        var vertInView = (this.getRectangle().top <= windowHeight) && ((this.getRectangle().top + this.getRectangle().height) >= 0);
        var horInView = (this.getRectangle().left <= windowWidth) && ((this.getRectangle().left + this.getRectangle().width) >= 0);
        if (vertInView === false || horInView === false) {
            Game.getInstance().gameOver;
        }
    };
    PlayerTank.prototype.destroy = function () {
        this.div.remove();
        Game.getInstance().removeFromArray(this);
    };
    return PlayerTank;
}(GameObject));
var TankFactory = (function () {
    function TankFactory() {
    }
    TankFactory.prototype.createTank = function (f) {
        var enemytank = new Tank(f);
        return enemytank;
    };
    return TankFactory;
}());
var UserInterface = (function () {
    function UserInterface(t, g) {
        this.observers = Array();
        this.level = 0;
        this.lives = 3;
        this.tank = t;
        this.tank.subscribe(this);
        this.game = g;
        this.game.subscribe(this);
        this.liveDiv = document.getElementById("lives");
        this.levelDiv = document.getElementById("level");
        this.liveDiv.innerHTML = 'Lives : ' + this.lives;
        this.levelDiv.innerHTML = "Level " + this.level;
        this.pauzeDiv = document.getElementById("pauze");
    }
    UserInterface.prototype.UpdateLives = function (p) {
        this.lives = p;
        this.liveDiv.innerHTML = 'Lives : ' + this.lives;
    };
    UserInterface.prototype.UpdateLevel = function (c) {
        console.log("UPDATING");
        this.level = c;
        this.levelDiv.innerHTML = "Level " + this.level;
    };
    UserInterface.prototype.notify = function (p) {
        this.UpdateLives(p);
    };
    return UserInterface;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Tank = (function (_super) {
    __extends(Tank, _super);
    function Tank(f) {
        var _this = _super.call(this, "tank") || this;
        _this.Playertank = f;
        _this.health = 2;
        var BehaviorNumber = Math.floor(Math.random() * 2 + 1);
        if (BehaviorNumber == 1) {
            _this.Behavior = new AgroStrategy(_this);
        }
        else {
            _this.Behavior = new CalmStrategy(_this);
        }
        _this.EnemyBulletFactory = new BulletFactory();
        _this._lastTimeShot = 0;
        _this.initialize();
        return _this;
    }
    Tank.prototype.initialize = function () { this.update(); };
    ;
    Tank.prototype.update = function () {
        this.CalculateRotation();
        this.draw();
        this.Behavior.update();
        this.Shoot();
        this.checkIfInGame();
    };
    Tank.prototype.draw = function () {
        this.div.style.transform = "translate(" + (this.x - this.width / 2) + "px, " + (this.y - this.height / 2) + "px)  rotate(" + this.rotation + "deg)";
    };
    Tank.prototype.CalculateRotation = function () {
        var xdist = this.Playertank.x - this.x;
        var ydist = this.Playertank.y - this.y;
        var angle = Math.atan2(xdist, ydist) * (180 / Math.PI);
        angle = 180 - (angle);
        this.rotation = angle;
    };
    Tank.prototype.Shoot = function () {
        if (this._lastTimeShot < this.bulletCoolDown) {
            this._lastTimeShot++;
        }
        else if (this._lastTimeShot >= this.bulletCoolDown) {
            this._lastTimeShot = 0;
            this.EnemyBulletFactory.createBullet(this.x, this.y, this.rotation, this.tag);
        }
    };
    Tank.prototype.Shot = function () {
        this.health -= 1;
        if (this.Attitude === "calm") {
            this.Behavior = new AgroStrategy(this);
        }
        if (this.health <= 0) {
            this.destroy();
        }
    };
    Tank.prototype.destroy = function () {
        this.div.remove();
        Game.getInstance().removeFromArray(this);
    };
    return Tank;
}(GameObject));
//# sourceMappingURL=main.js.map