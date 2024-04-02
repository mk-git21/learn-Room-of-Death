import { _decorator, Component, Node } from 'cc';
import { TileMapManager } from './Tile/TileMapManager';
import Levels, { ILevel } from '../Levels';

import { createUINode } from '../Utils';
import { TILE_WIDTH } from './Tile/TileManager';
import DataManager from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('BattleScene')
export class BattleScene extends Component {
    //当前关卡数据
    private level: ILevel;
    //当前战斗舞台节点
    private stage: Node;
    start() {
        this.generateStage();
        this.initLevel()
    }

    initLevel() {
        this.level = Levels[`level${1}`];
        if (this.level) {
            DataManager.Instance.mapInfo = this.level.mapInfo;
            DataManager.Instance.mapRowCount = this.level.mapInfo.length;
            DataManager.Instance.mapColumnCount = this.level.mapInfo[0].length;

            this.generateTileMap();
        }
    }

    /**创建战斗场景挂载节点*/
    generateStage() {
        this.stage = createUINode('stage');
        this.stage.parent = this.node;
    }

    /**创建地图*/
    generateTileMap() {

        const tileMap = createUINode('tileMap');
        tileMap.parent = this.stage;
        const tileMapManager = tileMap.addComponent(TileMapManager);
        tileMapManager.init();

        this.adaptPos();
    }

    /**战斗场景位置适配*/
    adaptPos() {
        const {mapRowCount,mapColumnCount}=DataManager.Instance
        const disX = TILE_WIDTH * mapColumnCount / 2;
        const disY = TILE_WIDTH * mapRowCount / 2 + 80;
        this.stage.setPosition(-disX, disY, 1);
    }

}

