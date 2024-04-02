import { ITile } from "../Levels";
import Singleton from "../Singleton";

export default class DataManager extends Singleton{


    static get Instance() {
        return super.getInstance <DataManager>() 
    }
    
    /**地图配置信息 */
    mapInfo: Array<Array<ITile>>
    mapRowCount: number = 0;
    mapColumnCount: number = 0;
    /**当前关卡 */
    levelIndex: number = 1;

    /**重置地图相关数据 */
    resetMap() {
        this.mapInfo = [];
        this.mapRowCount = 0;
        this.mapColumnCount = 0;
    }
}

