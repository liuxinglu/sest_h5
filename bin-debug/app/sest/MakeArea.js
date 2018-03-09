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
                    if (_this.upArr[0].x != _this._lastUpUnit.x) {
                        _this._lastUpUnit = _this.upArr.splice(0, 1)[0];
                        _this._lastUpUnit.playAni(1);
                        _this.addChild(_this._lastUpUnit);
                    }
                }
                else {
                    if (_this.downArr[0].x != _this._lastDownUnit.x) {
                        _this._lastDownUnit = _this.downArr.splice(0, 1)[0];
                        _this._lastDownUnit.playAni(1);
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
                    this._showHandDown(makeUnit);
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
        MakeArea.prototype._showHandDown = function (mu) {
            if (this._downMC) {
                this._downMC.removeEventListener(egret.Event.COMPLETE, this._downComplete, this);
                this.removeChild(this._downMC);
                this._downMC = null;
                this._downMu = null;
            }
            var n = Gra.getFoodName(mu.food.foodType);
            this._downMC = Res.getMovieClip(n + "Down_json", n + "Down_png", n + "Down");
            var mc = mu.mcPos();
            this._downMC.x = mu.x + mc.x + mc.width / 2 + 27;
            this._downMC.y = mu.y + mu.height;
            this._downMC.addEventListener(egret.Event.COMPLETE, this._downComplete, this);
            this.addChild(this._downMC);
            this._downMu = mu;
            this._downMC.play(1);
        };
        MakeArea.prototype._downComplete = function (e) {
            this._showHandUp(this._downMu);
        };
        MakeArea.prototype._showHandUp = function (mu) {
            var _this = this;
            var dis1 = 0;
            var dis2 = 0;
            if (mu.line == 0) {
                dis1 = 800;
                dis2 = 1200;
            }
            else {
                dis1 = 800;
                dis2 = 1000;
            }
            egret.Tween.get(mu)
                .to({ y: -160 }, dis1)
                .call(function () {
                mu.visible = false;
            }, mu);
            egret.Tween.get(this._downMC)
                .to({ y: -100 }, dis2)
                .call(function () {
                if (_this._downMC) {
                    _this._downMC.removeEventListener(egret.Event.COMPLETE, _this._downComplete, _this);
                    _this.removeChild(_this._downMC);
                    _this._downMC = null;
                }
                lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.MAKE_COMPLETE_DOWN, _this._downMu));
            });
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