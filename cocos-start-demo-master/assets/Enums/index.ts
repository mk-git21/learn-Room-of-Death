
/**地版类型 */
export enum TILE_TYPE_ENUM {
    /**横墙 */
    WALL_ROW = 'WALL_ROW',
    /**竖墙 */
    WALL_COLUMN = 'WALL_COLUMN',
    /**左上 */
    WALL_LEFT_TOP = 'WALL_LEFT_TOP',
    /**右上 */
    WALL_RIGHT_TOP = 'WALL_RIGHT_TOP',
    /**左下 */
    WALL_LEFT_BOTTOM = 'WALL_LEFT_BOTTOM',
    /**右下 */
    WALL_RIGHT_BOTTOM = 'WALL_RIGHT_BOTTOM',
    /**悬崖左 */
    CLIFF_LEFT = 'CLIFF_ROW_START',
    CLIFF_CENTER = 'CLIFF_ROW_CENTER',
    CLIFF_RIGHT = 'CLIFF_ROW_END',
    /**地板 */
    FLOOR = 'FLOOR',
}

/**事件类型 */
export enum EVENT_ENUM {
    /**切换下一关 */
    NEXT_LEVEL = 'NEXT_LEVEL',
}
