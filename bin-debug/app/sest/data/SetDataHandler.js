var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var SetDataHandler = (function () {
        function SetDataHandler() {
            lxl.GlobalData.getInstance().dataManager.addDataHandler(new app.GetNewUserStatusHandler());
            lxl.GlobalData.getInstance().dataManager.addDataHandler(new app.StartCookHandler());
            lxl.GlobalData.getInstance().dataManager.addDataHandler(new app.EndCookHandler());
            lxl.GlobalData.getInstance().dataManager.addDataHandler(new app.GetFoodHandler());
            setInterval(this.getNewUser, 3000);
            setInterval(this.startCook, 5000);
            setInterval(this.endCook, 4000);
            setInterval(this.getFood, 7000);
        }
        SetDataHandler.setHandlers = function () {
            if (this.instance == null) {
                this.instance = new app.SetDataHandler();
            }
        };
        SetDataHandler.prototype.getNewUser = function () {
            var d = lxl.GlobalData.getInstance().dataManager.getDataHandler(SetDataHandler.GET_NEW_USER_STATUS);
            var b = new lxl.data.BaseData();
            d.send(b);
        };
        SetDataHandler.prototype.startCook = function () {
            var d = lxl.GlobalData.getInstance().dataManager.getDataHandler(SetDataHandler.START_COOK);
            var b = new lxl.data.BaseData();
            d.send(b);
        };
        SetDataHandler.prototype.endCook = function () {
            var d = lxl.GlobalData.getInstance().dataManager.getDataHandler(SetDataHandler.END_COOK);
            var b = new lxl.data.BaseData();
            d.send(b);
        };
        SetDataHandler.prototype.getFood = function () {
            var d = lxl.GlobalData.getInstance().dataManager.getDataHandler(SetDataHandler.GET_FOOD);
            var b = new lxl.data.BaseData();
            d.send(b);
        };
        return SetDataHandler;
    }());
    SetDataHandler.GET_NEW_USER_STATUS = "getNewUserStatus"; //轮询获取新用户 没有新用户则列表为[]
    SetDataHandler.START_COOK = "startCook"; //轮询获取开始加工哪个用户哪道菜 返回用户列表 没有则[]
    SetDataHandler.END_COOK = "endCook"; //轮询获取哪个用户的哪个餐品加工完毕 放到几号位置
    SetDataHandler.GET_FOOD = "getFood"; //轮询获取哪个放餐位置空了
    app.SetDataHandler = SetDataHandler;
    __reflect(SetDataHandler.prototype, "app.SetDataHandler");
})(app || (app = {}));
//# sourceMappingURL=SetDataHandler.js.map