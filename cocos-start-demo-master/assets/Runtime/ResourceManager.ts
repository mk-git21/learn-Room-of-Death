import { Asset, SpriteFrame, resources } from "cc";
import { ITile } from "../Levels";
import Singleton from "../Singleton";

export default class ResourceManager extends Singleton {

    static get Instance() {
        return super.getInstance<ResourceManager>()
    }

    /**加载目录下图片文件 */
    loadDir(url:string,type:typeof SpriteFrame=SpriteFrame) {
        return new Promise<SpriteFrame[]>((resolve, reject) => {
            resources.loadDir(url, type, (err, res: SpriteFrame[]) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(res)
            })
        })

    }
}

