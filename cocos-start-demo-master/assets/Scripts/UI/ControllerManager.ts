import { Component, _decorator } from "cc";
import { CONTROLLER_ENUM, EVENT_ENUM } from "../../Enums";
import EventManager from "../../Runtime/EventManager";
const { ccclass, property } = _decorator;

@ccclass('ControllerManager')
export class ControllerManager extends Component {
    handCtrl(event: Event, customEventData: string) {
        EventManager.Instance.emit(EVENT_ENUM.PLAYER_CTRL,[customEventData as CONTROLLER_ENUM]);
    }
}

