import { _decorator, Component, Node, resources } from 'cc';
import Levels from '../../Levels';
const { ccclass, property } = _decorator;

@ccclass('TileMapManager')
export class TileMapManager extends Component {

    init() {
        //加载资源
        this.loadRes();
        //读取关卡配置
        const { mapInfo } = Levels[`level${1}`];
        for (let i = 0; i < mapInfo.length; i++) {
            const column = mapInfo[i];
            for (let j = 0; j < column.length; j++) {
                const { src,type }=column[j];
            }
            
        }
    }

    loadRes() {
        new Promise((resolve,reject) => {
            resources.loadDir('texture/tile', (err,res) => {
                if (err) {
                    reject(err);
                    return
                }
                
            })
        })

    }
}

