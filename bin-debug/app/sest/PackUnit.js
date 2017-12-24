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
    var PackUnit = (function (_super) {
        __extends(PackUnit, _super);
        function PackUnit() {
            return _super.call(this, lxl.Config.SKIN_PATH + "PackUnit.exml") || this;
        }
        PackUnit.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this._mc = Res.getMovieClip("dabao_json", "dabao_png", "dabao");
            this._mc.addEventListener(egret.Event.COMPLETE, this._packComplete, this);
            this.group.addChildAt(this._mc, 1);
        };
        PackUnit.prototype.pack = function () {
            this._mc.play(1);
        };
        PackUnit.prototype._packComplete = function (e) {
            this._mc.removeEventListener(egret.Event.COMPLETE, this._packComplete, this);
            this._mcUp = Res.getMovieClip("dabaoDown_json", "dabaoDown_png", "dabaoDown");
            this._mcUp.addEventListener(egret.Event.COMPLETE, this._upComplete, this);
            this.group.addChildAt(this._mcUp, 0);
            this._mcUp.play(1);
        };
        PackUnit.prototype._upComplete = function (e) {
        };
        PackUnit.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PackUnit;
    }(lxl.CComponent));
    app.PackUnit = PackUnit;
    __reflect(PackUnit.prototype, "app.PackUnit");
})(app || (app = {}));
//# sourceMappingURL=PackUnit.js.map