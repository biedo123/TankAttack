interface ISubject {
    observers:IObserver[]
    subscribe(c: IObserver):void
}