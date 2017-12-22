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
    var WaitArea = (function (_super) {
        __extends(WaitArea, _super);
        function WaitArea() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "WaitAreaSkin.exml") || this;
            _this.waitArr = [];
            return _this;
        }
        WaitArea.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            // setInterval(this.addWaitUnit, 5000, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.NEW_USER, this.addWaitUnit, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.REMOVE_USER, this.removeWaitUnit, this);
        };
        WaitArea.prototype.addWaitUnit = function (e) {
            var _this = this;
            var waitUnit = new app.WaitUnit();
            waitUnit.data = e.data;
            waitUnit.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                _this.waitArr.push(waitUnit);
                _this.group.addChild(waitUnit);
            }, this);
        };
        WaitArea.prototype.removeWaitUnit = function (e) {
            var user = e.data;
            for (var i = 0; i < this.waitArr.length; i++) {
                if (this.waitArr[i].data.userId == user.userId) {
                    this.group.removeChild(this.waitArr[i]);
                    this.waitArr.splice(i, 1);
                    break;
                }
            }
        };
        WaitArea.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return WaitArea;
    }(lxl.CComponent));
    app.WaitArea = WaitArea;
    __reflect(WaitArea.prototype, "app.WaitArea");
})(app || (app = {}));
//# sourceMappingURL=WaitArea.js.map