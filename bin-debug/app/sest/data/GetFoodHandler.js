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
    var GetFoodHandler = (function (_super) {
        __extends(GetFoodHandler, _super);
        function GetFoodHandler() {
            return _super.call(this) || this;
        }
        GetFoodHandler.prototype.getCode = function () {
            return app.SetDataHandler.GET_FOOD;
        };
        GetFoodHandler.prototype.handlerPackage = function (d) {
            _super.prototype.handlerPackage.call(this, d);
            var baseData = this.data.readObj();
            this.handComplete();
        };
        GetFoodHandler.prototype.send = function (p) {
            var pkg = new lxl.data.PackageOut(app.SetDataHandler.GET_FOOD);
            pkg.writeArray(p.arr);
            lxl.GlobalData.getInstance().dataManager.send(pkg);
        };
        return GetFoodHandler;
    }(lxl.data.BaseDataHandler));
    app.GetFoodHandler = GetFoodHandler;
    __reflect(GetFoodHandler.prototype, "app.GetFoodHandler");
})(app || (app = {}));
//# sourceMappingURL=GetFoodHandler.js.map