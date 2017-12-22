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
    var ui;
    (function (ui) {
        var CLayer = (function (_super) {
            __extends(CLayer, _super);
            function CLayer() {
                var _this = _super.call(this) || this;
                _this.hasActivi = false;
                _this.hasDispos = false;
                _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onActivity, _this);
                _this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, _this.dispose, _this);
                _this.funOnActivity = _this.onActivity;
                _this.funDispose = _this.dispose;
                return _this;
            }
            CLayer.prototype.onActivity = function () {
                for (var i = 0; i < this.numChildren; i++) {
                    this.doAcivity(this.getChildAt(i));
                }
                this.hasActivi = true;
            };
            CLayer.prototype.doAcivity = function (com) {
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
            CLayer.prototype.dispose = function () {
                for (var i = 0; i < this.numChildren; i++) {
                    this.doDispos(this.getChildAt(i));
                }
                this.parent.removeChild(this);
                this.hasDispos = true;
            };
            CLayer.prototype.doDispos = function (com) {
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
            CLayer.prototype.pop = function (com, ani) {
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
                this.addChild(com);
            };
            CLayer.prototype.removeChildByName = function (name) {
                this.removeChild(this.getChildByName(name));
            };
            return CLayer;
        }(eui.UILayer));
        ui.CLayer = CLayer;
        __reflect(CLayer.prototype, "lxl.ui.CLayer");
    })(ui = lxl.ui || (lxl.ui = {}));
})(lxl || (lxl = {}));
//# sourceMappingURL=CLayer.js.map