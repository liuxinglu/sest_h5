var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var test = (function () {
        function test() {
        }
        return test;
    }());
    app.test = test;
    __reflect(test.prototype, "app.test");
})(app || (app = {}));
//# sourceMappingURL=test.js.map