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
    var ReadyArea = (function (_super) {
        __extends(ReadyArea, _super);
        function ReadyArea() {
            return _super.call(this, lxl.Config.SKIN_PATH + "ReadyAreaSkin.exml") || this;
        }
        ReadyArea.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
        };
        ReadyArea.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return ReadyArea;
    }(lxl.CComponent));
    app.ReadyArea = ReadyArea;
    __reflect(ReadyArea.prototype, "app.ReadyArea");
})(app || (app = {}));
//# sourceMappingURL=ReadyArea.js.map