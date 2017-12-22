var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var Site = (function () {
        function Site() {
            this.siteNum = 0;
        }
        return Site;
    }());
    app.Site = Site;
    __reflect(Site.prototype, "app.Site");
})(app || (app = {}));
//# sourceMappingURL=Site.js.map