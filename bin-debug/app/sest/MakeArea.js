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
    var MakeArea = (function (_super) {
        __extends(MakeArea, _super);
        function MakeArea() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "MakeAreaSkin.exml") || this;
            _this.upOrDown = -1;
            _this.upArr = [];
            _this.downArr = [];
            _this._lastUpUnit = new app.MakeUnit();
            _this._lastDownUnit = new app.MakeUnit();
            return _this;
        }
        MakeArea.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.NEW_FOOD, this.addMakeUnit, this);
        };
        MakeArea.prototype.addMakeUnit = function (e) {
            var _this = this;
            this.upOrDown++;
            var makeUnit = new app.MakeUnit();
            makeUnit.food = e.data;
            if (this.upOrDown % 2 == 0) {
                this.upArr.push(makeUnit);
            }
            else {
                this.downArr.push(makeUnit);
            }
            makeUnit.line = this.upOrDown % 2;
            makeUnit.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                makeUnit.x = Gra.aniPosition[makeUnit.line][makeUnit.food.curStep][0]; //一维代表第几条传送带，2维第几个位置
                makeUnit.y = Gra.aniPosition[makeUnit.line][makeUnit.food.curStep][1];
                if (makeUnit.line == 0) {
                    if (_this.upArr[0].x != _this._lastUpUnit.x && _this.upArr[0].y != _this._lastUpUnit.y) {
                        _this._lastUpUnit = _this.upArr.splice(0, 1)[0];
                        _this.addChild(_this._lastUpUnit);
                    }
                }
                else {
                    if (_this.downArr[0].x != _this._lastDownUnit.x && _this.downArr[0].y != _this._lastDownUnit.y) {
                        _this._lastDownUnit = _this.downArr.splice(0, 1)[0];
                        _this.addChild(_this._lastDownUnit);
                    }
                }
            }, this);
            makeUnit.addEventListener(lxl.CEvent.MOVIE_COMPLETE, this.moveUnit, this);
        };
        MakeArea.prototype.moveUnit = function (e) {
            var makeUnit = e.target;
            var data = e.data;
            if (makeUnit.food.cookId == data.food.cookId) {
                var pos = Gra.getNextPosByFood(makeUnit.food);
                if (pos == -1) {
                }
                else {
                    egret.Tween.get(e.target)
                        .to({ x: Gra.aniPosition[makeUnit.line][pos][0], y: Gra.aniPosition[makeUnit.line][pos][1] }, 2000)
                        .call(function () {
                        e.target.playAni(1);
                    }, this);
                }
            }
        };
        MakeArea.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return MakeArea;
    }(lxl.CComponent));
    app.MakeArea = MakeArea;
    __reflect(MakeArea.prototype, "app.MakeArea");
})(app || (app = {}));
//# sourceMappingURL=MakeArea.js.map