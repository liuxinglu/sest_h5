var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Res = lxl.GlobalData.getInstance().resManager;
var Dat = lxl.GlobalData.getInstance().dataManager;
var Gra = app.GraManager.getInstance();
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.start = function () {
        _super.prototype.start.call(this);
        lxl.GlobalData.getInstance().connectServer();
        lxl.GlobalData.getInstance().root = this;
        app.SetDataHandler.setHandlers();
        // app.SetDataHandler.instance.insertStudent();
        app.SetDataHandler.instance.getNewUser();
        this.root = new app.MainSence();
    };
    return Main;
}(lxl.Application));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map