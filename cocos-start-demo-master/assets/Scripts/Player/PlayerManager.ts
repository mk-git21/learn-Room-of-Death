import { _decorator, Component, Node, Animation, Sprite, UITransform, animation, SpriteFrame, AnimationClip } from 'cc';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager';
import ResourceManager from '../../Runtime/ResourceManager';
import { CONTROLLER_ENUM, EVENT_ENUM } from '../../Enums';
import EventManager from '../../Runtime/EventManager';
const { ccclass, property } = _decorator;

/**帧速度 */
const ANIMATION_SPEED = 1 / 8

@ccclass('PlayerManager')
export class PlayerManager extends Component {

    //x,y代表的是瓦片坐标
    private x: number = 0;
    private y: number = 0;
    private targetX: number = 0;
    private targetY: number = 0;

    //移动速度
    private moveSpeed: number = 1 / 10;

    init() {
        this.render()
        EventManager.Instance.on(EVENT_ENUM.PLAYER_CTRL,this.move,this);
    }

    onDestroy() {
        EventManager.Instance.off(EVENT_ENUM.PLAYER_CTRL, this.move);
    }

    update(dt: number) {
        this.updateXY();
        //将瓦片坐标设置为实际坐标
        this.node.setPosition(this.x * TILE_WIDTH-TILE_WIDTH*1.5, this.y * TILE_HEIGHT+TILE_HEIGHT*1.5);
    }

    updateXY() {
        if (this.x < this.targetX) {
            this.x += this.moveSpeed;
        } else if (this.x > this.targetX){
            this.x -= this.moveSpeed;
        }

        if (this.y < this.targetY) {
            this.y += this.moveSpeed;
        } else if (this.y > this.targetY){
            this.y -= this.moveSpeed;
        }

        if (Math.abs(this.x - this.targetX) < 0.1 && Math.abs(this.y - this.targetY) < 0.1) {
            this.x = this.targetX;
            this.y = this.targetY;
        }
    }

    move(inputDirection: CONTROLLER_ENUM) {
        switch (inputDirection) {
            case CONTROLLER_ENUM.TOP:
                this.targetY += 1;
                break;
            case CONTROLLER_ENUM.BOTTOM:
                this.targetY -= 1;
                break;
            case CONTROLLER_ENUM.LEFT:
                this.targetX -= 1;
                break;
            case CONTROLLER_ENUM.RIGHT:
                this.targetX += 1;
                break;

            default:
                break;
        }
    }

    async render() {
        //设置精灵尺寸调整模式
        const sprite = this.node.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        //设置角色大小
        const uiTransform = this.node.getComponent(UITransform);
        uiTransform.setContentSize(TILE_WIDTH * 4, TILE_HEIGHT * 4);
        //加载帧动画所需的图片
        const spriteFrames = await ResourceManager.Instance.loadDir('texture/player/idle/top');
        //设置动画
        const animationComponent = this.node.addComponent(Animation);

        const animationClip = new AnimationClip();

        const track = new animation.ObjectTrack(); // 创建一个对象轨道
        track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame'); // 指定轨道路径，即指定目标对象为 Sprite 组件上的 SpriteFrame
        const frames: Array<[number, SpriteFrame]> = spriteFrames.map((item, index) => [ANIMATION_SPEED * index, item])
        track.channel.curve.assignSorted(frames);

        //设置循环播放
        animationClip.wrapMode = AnimationClip.WrapMode.Loop;
        // 最后将轨道添加到动画剪辑以应用
        animationClip.addTrack(track);
        animationClip.duration = ANIMATION_SPEED * frames.length;
        animationComponent.defaultClip = animationClip;
        animationComponent.play();
    }
}

