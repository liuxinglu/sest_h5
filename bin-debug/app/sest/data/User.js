var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var User = (function () {
        function User() {
            this.userId = "";
            this.name = "";
            this.sex = 0;
            this.avatar = "";
        }
        return User;
    }());
    app.User = User;
    __reflect(User.prototype, "app.User");
})(app || (app = {}));
//# sourceMappingURL=User.js.map