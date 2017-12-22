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
    var EndCookHandler = (function (_super) {
        __extends(EndCookHandler, _super);
        function EndCookHandler() {
            return _super.call(this) || this;
        }
        EndCookHandler.prototype.getCode = function () {
            return app.SetDataHandler.END_COOK;
        };
        EndCookHandler.prototype.handlerPackage = function (d) {
            _super.prototype.handlerPackage.call(this, d);
            var baseData = this.data.readObj();
            this.handComplete();
        };
        EndCookHandler.prototype.send = function (p) {
            var pkg = new lxl.data.PackageOut(app.SetDataHandler.END_COOK);
            pkg.writeArray(p.arr);
            lxl.GlobalData.getInstance().dataManager.send(pkg);
        };
        return EndCookHandler;
    }(lxl.data.BaseDataHandler));
    app.EndCookHandler = EndCookHandler;
    __reflect(EndCookHandler.prototype, "app.EndCookHandler");
})(app || (app = {}));
//# sourceMappingURL=EndCookHandler.js.map