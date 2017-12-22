var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lxl;
(function (lxl) {
    var CComponent = (function (_super) {
        __extends(CComponent, _super);
        function CComponent(skinName) {
            var _this = _super.call(this) || this;
            _this.hasActivi = false;
            _this.hasDispos = false;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
            _this.skinName = lxl.Tool.callJS("getURL") + skinName;
            _this.funOnActivity = _this.onActivity;
            _this.funDispose = _this.dispose;
            return _this;
        }
        CComponent.prototype.loadComplete = function () {
            var _this = this;
            egret.Tween.get(this).wait(0.1).call(function () {
                _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onActivity, _this);
                _this.dispatchEvent(new egret.Event(lxl.CEvent.LOAD_SKIN_COMPLETE));
            }, this);
        };
        CComponent.prototype.onActivity = function () {
            for (var i = 0; i < this.numChildren; i++) {
                this.doAcivity(this.getChildAt(i));
            }
            this.hasActivi = true;
        };
        CComponent.prototype.doAcivity = function (com) {
            if (com.hasOwnProperty("funOnActivity") && com.hasActivi == false)
                com["funOnActivity"]();
            if (com.numChildren == 0) {
                return;
            }
            else {
                for (var i = 0; i < com.numChildren; i++) {
                    this.doAcivity(com.getChildAt(i));
                }
            }
        };
        CComponent.prototype.dispose = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
            this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onActivity, this);
            for (var i = 0; i < this.numChildren; i++) {
                this.doDispos(this.getChildAt(i));
            }
            this.parent.removeChild(this);
            this.hasDispos = true;
        };
        CComponent.prototype.doDispos = function (com) {
            if (com.hasOwnProperty("funDispose") && com.hasDispos == false)
                com["funDispose"]();
            if (com.numChildren == 0) {
                return;
            }
            else {
                for (var i = 0; i < com.numChildren; i++) {
                    this.doDispos(com.getChildAt(i));
                }
            }
        };
        CComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        CComponent.prototype.removeChildByName = function (name) {
            this.removeChild(this.getChildByName(name));
        };
        /**
         * 在自己上面弹出
         */
        CComponent.prototype.pop = function (com, ani) {
            var _this = this;
            if (ani === void 0) { ani = false; }
            com.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                com.anchorOffsetX = com.width / 2;
                com.anchorOffsetY = com.height / 2;
                com.x = _this.stage.stageWidth / 2;
                if (ani == false) {
                    com.y = _this.stage.stageHeight / 2;
                }
                else {
                    com.y = 0;
                    com.alpha = 0;
                }
                _this.addChild(com);
                if (ani == true) {
                    egret.Tween.get(com)
                        .to({ y: _this.stage.stageHeight / 2, alpha: 1 }, 200)
                        .to({ y: _this.stage.stageHeight / 2 - 30 }, 100)
                        .to({ y: _this.stage.stageHeight / 2 + 10 }, 100)
                        .to({ y: _this.stage.stageHeight / 2 }, 100);
                }
            }, this);
        };
        return CComponent;
    }(eui.Component));
    lxl.CComponent = CComponent;
    __reflect(CComponent.prototype, "lxl.CComponent");
})(lxl || (lxl = {}));
//# sourceMappingURL=CComponent.js.map