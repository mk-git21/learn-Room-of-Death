
//1
// export default class Singleton<T> {
//     public static getInstance<T extends {}>(this: new () => T): T {
//         if (!(<any>this).ins) {
//             (<any>this).ins = new this()
//         }
//         return (<any>this).ins;
//     }
// }
//2
export default class Singleton{
    private static _Instance:any = null;
    public static getInstance<T extends {}>(): T {
        if (this._Instance===null) {
            this._Instance = new this();
        }
        return this._Instance;
    }
}