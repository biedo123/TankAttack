class TankFactory{
    createTank(f: PlayerTank): Tank;

    public createTank(f: PlayerTank) : Tank{
        let enemytank = new Tank(f);
    
        return enemytank;
    }
}
