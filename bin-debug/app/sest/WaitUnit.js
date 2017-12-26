var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var WaitUnit = (function (_super) {
        __extends(WaitUnit, _super);
        function WaitUnit() {
            return _super.call(this, lxl.Config.SKIN_PATH + "WaitUnitSkin.exml") || this;
        }
        WaitUnit.prototype.onActivity = function () {
            var _this = this;
            _super.prototype.onActivity.call(this);
            this.img_head.mask = this.img_mask;
            Res.getResByUrl(this.data.avatar, function (e) {
                _this.img_head.texture = e.target.data;
            }, this, egret.URLLoaderDataFormat.TEXTURE);
            this._animation();
        };
        WaitUnit.prototype._animation = function () {
            var _this = this;
            egret.Tween.get(this)
                .to({ scaleX: 0.9, scaleY: 0.9 }, 800)
                .to({ scaleX: 1, scaleY: 1 }, 500).call(function () {
                _this._animation();
            });
        };
        WaitUnit.prototype._disposeAnimation = function () {
            var _this = this;
            egret.Tween.get(this)
                .to({ scaleX: 0.1, scaleY: 0.1, alpha: 0 }, 700)
                .call(function () {
                _super.prototype.dispose.call(_this);
            }, this);
        };
        WaitUnit.prototype.dispose = function () {
            this._disposeAnimation();
        };
        return WaitUnit;
    }(lxl.CComponent));
    app.WaitUnit = WaitUnit;
    __reflect(WaitUnit.prototype, "app.WaitUnit");
})(app || (app = {}));
//# sourceMappingURL=WaitUnit.js.map