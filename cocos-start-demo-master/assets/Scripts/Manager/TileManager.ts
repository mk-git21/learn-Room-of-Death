/**
 * 单个瓦片初始化属性
 * */

import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform, v3 } from 'cc';
import Levels from '../../Levels';
const { ccclass, property } = _decorator;

export const TILE_WIDTH = 55
export const TILE_HEIGHT = 55

@ccclass('TileManager')
export class TileManager extends Component {

    /**
     *  @param spriteFrame 瓦片贴图
     *  @param i 行
     *  @param j 列
     * */
    init(spriteFrame: SpriteFrame, i: number, j: number) {
        //初始化
        const sprite = this.addComponent(Sprite);
        sprite.spriteFrame = spriteFrame;
        const transForm = this.getComponent(UITransform);
        transForm.setContentSize(TILE_WIDTH, TILE_HEIGHT);
        //按所在行列设置坐标
        this.node.setPosition(v3(i * TILE_WIDTH, -j * TILE_HEIGHT, 1))
    }
}

