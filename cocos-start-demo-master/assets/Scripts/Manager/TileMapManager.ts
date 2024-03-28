/**
 * 地图管理
 */
import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform, v3 } from 'cc';
import Levels from '../../Levels';
import { TileManager } from './TileManager';
import { createUINode } from '../../Utils';
const { ccclass, property } = _decorator;

export const TILE_WIDTH = 55
export const TILE_HEIGHT = 55

@ccclass('TileMapManager')
export class TileMapManager extends Component {

    async init() {
        //加载资源
        const spriteFrames = await this.loadRes();
        console.log('spriteFrames', spriteFrames);

        //读取关卡配置
        const { mapInfo } = Levels[`level${1}`];
        for (let i = 0; i < mapInfo.length; i++) {
            const column = mapInfo[i];
            for (let j = 0; j < column.length; j++) {
                const item = column[j];
                //空地块跳过
                if (item.src == null || item.type == null) {
                    continue
                }
                //单个瓦片图片
                const imgSrc = `tile (${item.src})`;
                const spriteFrame = spriteFrames.find(v => v.name === imgSrc) || spriteFrames[0];
                //初始化瓦片属性
                const node = createUINode(imgSrc);
                const tileManager= node.addComponent(TileManager)
                tileManager.init(spriteFrame, i, j);
                node.parent = this.node;
            }

        }
    }

    loadRes() {
        return new Promise<SpriteFrame[]>((resolve, reject) => {
            resources.loadDir('texture/tile/tile', SpriteFrame, (err, res: SpriteFrame[]) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(res)
            })
        })

    }
}

