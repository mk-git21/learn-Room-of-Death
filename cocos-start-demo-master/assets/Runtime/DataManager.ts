import { ITile } from "../Levels";
import Singleton from "../Singleton";

export default class DataManager extends Singleton{

    static get Instance() {
        return super.getInstance <DataManager>() 
    }
    
    /**地图配置信息 */
    mapInfo: Array<Array<ITile>>
    mapRowCount: number
    mapColumnCount:number
}

