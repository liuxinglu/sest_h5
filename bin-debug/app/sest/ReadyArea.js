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
    var ReadyArea = (function (_super) {
        __extends(ReadyArea, _super);
        function ReadyArea() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "ReadyAreaSkin.exml") || this;
            _this._xPosArr = [0, 77, 154, 231, 308, 385, 462, 539];
            _this._packArr = [];
            _this._imgArr = [];
            return _this;
        }
        ReadyArea.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.MAKE_COMPLETE_DOWN, this._makeComplete, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PACK_COMPLETE, this._packCompleteHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.GAIZHANG_COMPLETE, this._gaizhangHandler, this);
            for (var i = 0; i < 16; i++) {
                if (i < 9)
                    this["u0" + (i + 1)].num = i + 1;
                else
                    this["u" + (i + 1)].num = i + 1;
            }
        };
        ReadyArea.prototype._makeComplete = function (e) {
            var _this = this;
            var mu = e.data;
            var n = Gra.getFoodName(mu.food.foodType);
            this._upMC = Res.getMovieClip(n + "Down_json", n + "Down_png", n + "Down");
            var index = 0;
            if (this._packArr.length <= 7) {
                index = this._packArr.length;
                this._packArr.push(mu.food.cookId);
            }
            else {
                for (var i = 0; i < this._packArr.length; i++) {
                    if (this._packArr[i] == "") {
                        index = i;
                        break;
                    }
                }
            }
            this._upMC.x = this["p" + index].x + this["p" + index].width / 2;
            this._upMC.y = this["p" + index].y + this["p" + index].height;
            this._upMC.name = index.toString();
            mu.index = index;
            this["p" + index].makeUnit = mu;
            mu.x = this._upMC.x - this["p" + index].width / 2;
            mu.y = -100;
            mu.visible = true;
            this.addChildAt(mu, 6);
            this.addChildAt(this._upMC, 6);
            this._packArr.push(mu.food.cookId);
            this._upMC.addEventListener(egret.Event.COMPLETE, this._upComplete, this);
            this._upMC.play(1);
            var muDown = 0;
            if (index <= 3) {
                muDown = 800;
            }
            else {
                muDown = 500;
            }
            egret.Tween.get(mu)
                .to({ y: this._upMC.y - 141 }, muDown)
                .call(function () {
                _this.removeChild(mu);
            }, this);
        };
        ReadyArea.prototype._upComplete = function (e) {
            var _this = this;
            this._upMC.removeEventListener(egret.Event.COMPLETE, this._upComplete, this);
            egret.Tween.get(this._upMC)
                .to({ y: -100 }, 1000)
                .call(function () {
                _this["p" + _this._upMC.name].pack();
                _this.removeChild(_this._upMC);
            }, this, [e]);
        };
        ReadyArea.prototype._gaizhangHandler = function (e) {
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.NEW_SITE, this._newSiteHandler, this);
        };
        ReadyArea.prototype._newSiteHandler = function (e) {
            var site = e.data;
            for (var i = 0; i < 8; i++) {
                if (this["p" + i].makeUnit) {
                    if (this["p" + i].makeUnit.food.cookId == site.food.cookId) {
                        this["p" + i].packup();
                        break;
                    }
                }
            }
        };
        ReadyArea.prototype._packCompleteHandler = function (e) {
            var _this = this;
            var pu = e.data;
            var mu = pu.makeUnit;
            var site = Gra.findSiteByFood(mu.food);
            var targetX;
            var targetY;
            var targetW;
            var targetH;
            var targetIndex;
            switch (site.siteNum) {
                case "01":
                case "02":
                case "03":
                case "04":
                case "05":
                case "06":
                case "07":
                case "08":
                    targetX = this.img0.x + this.group0.x;
                    targetY = this.img0.y + this.group0.y - this.img0.height;
                    targetW = this.img0.width;
                    targetH = this.img0.height;
                    targetIndex = 0;
                    break;
                case "09":
                case "10":
                case "11":
                case "12":
                case "13":
                case "14":
                case "15":
                case "16":
                    targetX = this.img1.x + this.group1.x;
                    targetY = this.img1.y + this.group1.y - this.img1.height;
                    targetW = this.img1.width;
                    targetH = this.img1.height;
                    targetIndex = 1;
                    break;
            }
            egret.Tween.get(e.data)
                .to({ x: targetX, y: targetY - 20, scaleX: 0.4, scaleY: 0.55 }, 1000)
                .call(function () {
                var target = new app.Target();
                target.x = _this["img" + targetIndex].x;
                target.y = _this["img" + targetIndex].y;
                target.width = targetW;
                target.height = targetH;
                target.food = mu.food;
                _this._imgArr.push(target);
                _this["group" + targetIndex].addChildAt(target, 1);
                e.data.removeQianZi();
                e.data.getBox();
                for (var i = 0; i < _this._packArr.length; i++) {
                    if (_this._packArr[i] == mu.food.cookId) {
                        _this._packArr[i] = "";
                    }
                }
                egret.Tween.get(_this._imgArr[_this._imgArr.length - 1])
                    .to({ x: _this._xPosArr[(parseInt(site.siteNum) - 1) % 8] }, 2000)
                    .call(function () {
                    _this["u" + site.siteNum].changeStatusImg();
                }, _this);
            }, this);
        };
        ReadyArea.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return ReadyArea;
    }(lxl.CComponent));
    app.ReadyArea = ReadyArea;
    __reflect(ReadyArea.prototype, "app.ReadyArea");
})(app || (app = {}));
//# sourceMappingURL=ReadyArea.js.map