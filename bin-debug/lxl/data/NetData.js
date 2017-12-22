var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lxl;
(function (lxl) {
    var data;
    (function (data) {
        var NetData = (function (_super) {
            __extends(NetData, _super);
            function NetData(dataManager) {
                var _this = _super.call(this) || this;
                _this._dataManager = dataManager;
                _this._httpRequest = new egret.HttpRequest();
                return _this;
            }
            NetData.prototype.errorHandler = function (e) {
                lxl.logs.log(e.type);
                this._dataManager.handlerSecurityError();
            };
            NetData.prototype.send = function (pkg, cb, ctx) {
                if (cb === void 0) { cb = null; }
                if (ctx === void 0) { ctx = null; }
                this._httpRequest.responseType = egret.HttpResponseType.TEXT;
                this._httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
                this._httpRequest.addEventListener(egret.Event.COMPLETE, this._completeHandler, this);
                this._httpRequest.open(pkg.getFullUrl(), egret.HttpMethod.POST);
                this._cb = cb;
                this._ctx = ctx;
                if (pkg.getParamLen() > 0) {
                    this._httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    this._httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
                    var param = lxl.Tool.MapToField(pkg.getParam());
                    this._httpRequest.send(param);
                }
                else {
                    this._httpRequest.send();
                }
                lxl.logs.log("发送协议名：" + pkg.code() + " url:" + pkg.getFullUrl());
                lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SEND_MESSAGE, pkg));
                return true;
            };
            NetData.prototype._completeHandler = function (e) {
                var request = e.currentTarget;
                // this._cb(request.response, this._ctx);
                var json = JSON.parse(request.response);
                var pin = new lxl.data.PackageIn(json.code, request.response);
                lxl.logs.log("收到协议名：" + pin.code() + " data:" + request.response);
                this._dataManager.handlerPackage(pin);
                this.dispose();
            };
            NetData.prototype.dispose = function () {
                if (this._httpRequest.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                    this._httpRequest.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
                    this._httpRequest.removeEventListener(egret.Event.COMPLETE, this._cb, this._ctx);
                }
            };
            return NetData;
        }(egret.HashObject));
        data.NetData = NetData;
        __reflect(NetData.prototype, "lxl.data.NetData");
    })(data = lxl.data || (lxl.data = {}));
})(lxl || (lxl = {}));
//# sourceMappingURL=NetData.js.map