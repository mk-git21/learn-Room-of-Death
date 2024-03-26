import { TILE_TYPE_ENUM } from "../Enums";
import level1 from "./level1";


export interface ITile{
    src: number | null;
    type: TILE_TYPE_ENUM | null;
}

export interface ILevel{
    mapInfo:Array<Array<ITile>>
}

const Levels = {
    level1
}

export default Levels;
