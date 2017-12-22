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
    var LoadingUI = (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            return _super.call(this) || this;
        }
        LoadingUI.prototype.createView = function () {
            this.textField = new egret.TextField();
            this.textField.textColor = 0xff6699;
            this.textField.size = 20;
            this.textField.width = 280;
            this.textField.height = 100;
            this.textField.textAlign = "center";
            this.textField.x = (this.width / 2) - this.textField.width / 2;
            var bitmap = lxl.Tool.createBitmapByName("logo_png"); //img_loading
            var tw = this.height * 1.775;
            // let h = this.height * (bitmap.height / 1366);
            // let w = this.width * (bitmap.width / 768);//tw * (bitmap.width / 1366);
            var h = this.height * (bitmap.height / 1080);
            var w = tw * (bitmap.width / 1920);
            bitmap.width = w;
            bitmap.height = h;
            bitmap.anchorOffsetX = bitmap.width / 2;
            bitmap.anchorOffsetY = bitmap.height / 2;
            bitmap.x = this.width / 2;
            bitmap.y = this.height / 2;
            this.textField.y = this.height - 100;
            this.addChild(bitmap);
            this.addChild(this.textField);
        };
        LoadingUI.prototype.setProgress = function (current, total) {
            this.textField.text = "Loading..." + current + "/" + total;
        };
        return LoadingUI;
    }(egret.Sprite));
    lxl.LoadingUI = LoadingUI;
    __reflect(LoadingUI.prototype, "lxl.LoadingUI");
})(lxl || (lxl = {}));
//# sourceMappingURL=LoadingUI.js.map