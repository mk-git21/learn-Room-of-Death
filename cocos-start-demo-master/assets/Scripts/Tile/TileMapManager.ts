/**
 * 地图管理
 */
import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform, v3 } from 'cc';
import Levels from '../../Levels';
import { TileManager } from './TileManager';
import { createUINode, randomRange } from '../../Utils';
import DataManager from '../../Runtime/DataManager';
import ResourceManager from '../../Runtime/ResourceManager';

const { ccclass, property } = _decorator;

@ccclass('TileMapManager')
export class TileMapManager extends Component {

    async init() {
        //加载资源
        const spriteFrames = await ResourceManager.Instance.loadDir('texture/tile/tile');

        //读取关卡配置
        const mapInfo = DataManager.Instance.mapInfo;
        for (let i = 0; i < mapInfo.length; i++) {
            const column = mapInfo[i];
            for (let j = 0; j < column.length; j++) {
                const item = column[j];
                //空地块跳过
                if (item.src == null || item.type == null) {
                    continue
                }
                //单个瓦片图片,部分地块随机
                let num = item.src;
                if ((num == 1 || num == 5 || num ==9)&&i%2==0&&j%2==0) {
                    num += randomRange(0, 4);
                }
                const imgSrc = `tile (${num})`;
                const spriteFrame = spriteFrames.find(v => v.name === imgSrc) || spriteFrames[0];
                //初始化瓦片属性
                const node = createUINode(imgSrc);
                const tileManager= node.addComponent(TileManager)
                tileManager.init(spriteFrame, i, j);
                node.parent = this.node;
            }

        }
    }
}

