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
    var PackArea = (function (_super) {
        __extends(PackArea, _super);
        function PackArea() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "PackAreaSkin.exml") || this;
            _this._packArr = [];
            return _this;
        }
        PackArea.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.MAKE_COMPLETE_DOWN, this._makeComplete, this);
        };
        PackArea.prototype._makeComplete = function (e) {
            var mu = e.data;
            var n = Gra.getFoodName(mu.food.foodType);
            this._upMC = Res.getMovieClip(n + "Down_json", n + "Down_png", n + "Down");
            this._upMC.x = this["p" + this._packArr.length].x;
            this._upMC.y = this["p" + this._packArr.length].y + this["p" + this._packArr.length].height;
            this.addChildAt(this._upMC, 0);
            this._upMC.addEventListener(egret.Event.COMPLETE, this._upComplete, this);
            this._upMC.play(1);
        };
        PackArea.prototype._upComplete = function (e) {
            this.removeEventListener(egret.Event.COMPLETE, this._upComplete, this);
            this.removeChild(this._upMC);
        };
        PackArea.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PackArea;
    }(lxl.CComponent));
    app.PackArea = PackArea;
    __reflect(PackArea.prototype, "app.PackArea");
})(app || (app = {}));
//# sourceMappingURL=PackArea.js.map