

 class BulletFactory{
    createBullet(xlocation: number, ylocation: number, tankrotation: number, owner: string): Bullet;

    public createBullet(xlocation: number, ylocation: number, tankrotation: number, owner: string) : Bullet{
        let bullet = new Bullet(xlocation, ylocation, tankrotation, owner);
        Game.getInstance().gameObjectsArray.push(bullet);
        return bullet;
    }
}
