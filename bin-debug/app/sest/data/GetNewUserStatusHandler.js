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
    var GetNewUserStatusHandler = (function (_super) {
        __extends(GetNewUserStatusHandler, _super);
        function GetNewUserStatusHandler() {
            return _super.call(this) || this;
        }
        GetNewUserStatusHandler.prototype.getCode = function () {
            return app.SetDataHandler.GET_NEW_USER_STATUS;
        };
        GetNewUserStatusHandler.prototype.handlerPackage = function (d) {
            _super.prototype.handlerPackage.call(this, d);
            var baseData = this.data.readObj();
            var arr = baseData.data;
            for (var i = 0; i < arr.length; i++) {
                Gra.createUser(arr[i].userId, arr[i].name, arr[i].userId, arr[i].avatar);
            }
            this.handComplete();
        };
        GetNewUserStatusHandler.prototype.send = function (params) {
            var pkg = new lxl.data.PackageOut(app.SetDataHandler.GET_NEW_USER_STATUS);
            lxl.GlobalData.getInstance().dataManager.send(pkg);
        };
        return GetNewUserStatusHandler;
    }(lxl.data.BaseDataHandler));
    app.GetNewUserStatusHandler = GetNewUserStatusHandler;
    __reflect(GetNewUserStatusHandler.prototype, "app.GetNewUserStatusHandler");
})(app || (app = {}));
//# sourceMappingURL=GetNewUserStatusHandler.js.map