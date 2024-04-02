import { _decorator, Component, Node, Animation, Sprite, UITransform, animation, SpriteFrame, AnimationClip } from 'cc';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager';
import ResourceManager from '../../Runtime/ResourceManager';
const { ccclass, property } = _decorator;

/**帧速度 */
const ANIMATION_SPEED=1/8

@ccclass('PlayerManager')
export class PlayerManager extends Component {
    
    async init() {

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

