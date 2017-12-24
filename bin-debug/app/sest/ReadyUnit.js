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
    var ReadyUnit = (function (_super) {
        __extends(ReadyUnit, _super);
        function ReadyUnit() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "ReadyUnitSkin.exml") || this;
            _this.num = 0;
            return _this;
        }
        ReadyUnit.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
        };
        ReadyUnit.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return ReadyUnit;
    }(lxl.CComponent));
    app.ReadyUnit = ReadyUnit;
    __reflect(ReadyUnit.prototype, "app.ReadyUnit");
})(app || (app = {}));
//# sourceMappingURL=ReadyUnit.js.map