var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var Food = (function () {
        function Food() {
            this.cookId = "";
            this.foodType = 0;
            this.user = new app.User();
            this.totalStep = 0;
            this.curStep = 0;
        }
        return Food;
    }());
    app.Food = Food;
    __reflect(Food.prototype, "app.Food");
})(app || (app = {}));
//# sourceMappingURL=Food.js.map