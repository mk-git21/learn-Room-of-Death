import {Layers, Node, UITransform, v2} from 'cc'


/**
 * 创建带UItransform节点，层级为UI_2D
 * @param name 节点名称
 **/
export const createUINode=(name: string='')=>{
    const node = new Node(name);
    const transForm = node.addComponent(UITransform);
    //设置锚点为左上角
    transForm.anchorPoint = v2(0, 1);
    //设置渲染层级
    node.layer = 1 << Layers.nameToLayer('UI_2D');
    return node;
}

/**范围内随机数 */
export const randomRange = (start: number, end: number) => { return Math.floor(start + (end - start) * Math.random()); }

