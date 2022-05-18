// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property
    jumpHeight: number = 0;
    @property
    jumpDuration: number = 0;
    @property
    maxMovementSpeed: number = 0;
    @property
    accel: number = 0;
    jumpAction: any;
    accLeft: boolean;
    accRight: boolean;
    xSpeed: number;
    accUp: boolean;
    accDown: boolean;



    // LIFE-CYCLE CALLBACKS:

    setJumpAction() {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionInOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionInOut());

        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                console.log('pressed A')
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                console.log('pressed D')
                break;
            case cc.macro.KEY.w:
                this.accUp = true;
                console.log('pressed W')
                break;
            case cc.macro.KEY.s:
                this.accUp = true;
                console.log('pressed s')
                break;

        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                console.log('let go of A')
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                console.log('let go of D')
                break;
            case cc.macro.KEY.w:
                this.accUp = false;
                console.log('pressed W')
                break;
            case cc.macro.KEY.s:
                this.accUp = false;
                console.log('pressed s')
                break;

        }
    }

    onLoad() {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        this.accLeft = false;
        this.accRight = false;
        this.accUp = false;
        this.accDown = false;
        this.xSpeed = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {

    }

    update(dt) {
        if (this.accLeft ) {
            this.xSpeed -= this.accel * dt;
        }
        if (this.accRight ) {
            this.xSpeed += this.accel * dt;
        }

        if (Math.abs(this.xSpeed) > this.maxMovementSpeed) {
            this.xSpeed = this.maxMovementSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        this.node.x += this.xSpeed * dt;
    }
}
