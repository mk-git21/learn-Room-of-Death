import { _decorator, Component, Node } from 'cc';
import { TileMapManager } from './Manager/TileMapManager';
const { ccclass, property } = _decorator;

@ccclass('BattleScene')
export class BattleScene extends Component {
    start() {
        this.generateTileMap();
    }

    generateTileMap() {
        const stage = new Node();
        stage.parent = this.node;
        const tileMap = new Node();
        tileMap.parent = this.node;
        const tileMapManager = tileMap.addComponent(TileMapManager);
        tileMapManager.init();
    }

}

