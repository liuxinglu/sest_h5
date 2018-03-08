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
    var StartCookHandler = (function (_super) {
        __extends(StartCookHandler, _super);
        function StartCookHandler() {
            return _super.call(this) || this;
        }
        StartCookHandler.prototype.getCode = function () {
            return app.SetDataHandler.START_COOK;
        };
        StartCookHandler.prototype.handlerPackage = function (d) {
            _super.prototype.handlerPackage.call(this, d);
            var baseData = this.data.readObj();
            var arr = baseData.data;
            for (var i = 0; i < arr.length; i++) {
                Gra.createFood(arr[i].userId, "201712151909031499", parseInt(arr[i].foodType)); //arr[i].cookId
            }
            this.handComplete();
        };
        StartCookHandler.prototype.send = function (p) {
            var pkg = new lxl.data.PackageOut(app.SetDataHandler.START_COOK);
            pkg.writeArray(p.arr);
            lxl.GlobalData.getInstance().dataManager.send(pkg);
        };
        return StartCookHandler;
    }(lxl.data.BaseDataHandler));
    app.StartCookHandler = StartCookHandler;
    __reflect(StartCookHandler.prototype, "app.StartCookHandler");
})(app || (app = {}));
//# sourceMappingURL=StartCookHandler.js.map