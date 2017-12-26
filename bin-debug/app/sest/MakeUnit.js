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
    var MakeUnit = (function (_super) {
        __extends(MakeUnit, _super);
        function MakeUnit() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "MakeUnitSkin.exml") || this;
            _this._hasSubArr = ["gaijiaofan1_5", "panini3_1", "yimian1_3"];
            _this.line = 0;
            _this.subStep = -1;
            _this.index = 0; //第几个临时盒子
            return _this;
        }
        MakeUnit.prototype.onActivity = function () {
            var _this = this;
            _super.prototype.onActivity.call(this);
            this.img_head.mask = this.img_mask;
            Res.getResByUrl(this.food.user.avatar, function (e) {
                _this.img_head.texture = e.target.data;
            }, this, egret.URLLoaderDataFormat.TEXTURE);
        };
        MakeUnit.prototype.mcPos = function () {
            return this._mc;
        };
        MakeUnit.prototype.groupPos = function () {
            return this.group;
        };
        MakeUnit.prototype.playAni = function (num) {
            for (var i = 0; i < this._hasSubArr.length; i++) {
                if (Gra.getFoodName(this.food.foodType) + this.food.curStep.toString() == this._hasSubArr[i].split("_")[0]) {
                    this.subStep++;
                    break;
                }
            }
            var movieName = Gra.getMovieId(this.food.foodType, this.food.curStep, this.subStep);
            if (this._mc) {
                this._mc.removeEventListener(egret.Event.COMPLETE, this.stopAni, this);
                this.group.removeChild(this._mc);
                this._mc = null;
            }
            this._mc = Res.getMovieClip(movieName + "_json", movieName + "_png", movieName);
            this._mc.addEventListener(egret.Event.COMPLETE, this.stopAni, this);
            this.group.addChild(this._mc);
            this._mc.play(num);
        };
        MakeUnit.prototype.stopAni = function (e) {
            if (this.subStep >= 0) {
                for (var i = 0; i < this._hasSubArr.length; i++) {
                    if ((Gra.getFoodName(this.food.foodType) + this.food.curStep.toString() == this._hasSubArr[i].split("_")[0]) && this.subStep.toString() == this._hasSubArr[i].split("_")[1]) {
                        this._mc.stop();
                        this.subStep = -1;
                        this.dispatchEvent(new lxl.CEvent(lxl.CEvent.MOVIE_COMPLETE, this));
                    }
                    else if (Gra.getFoodName(this.food.foodType) + this.food.curStep.toString() == this._hasSubArr[i].split("_")[0]) {
                        this.playAni(1);
                    }
                }
            }
            else {
                this._mc.stop();
                this.dispatchEvent(new lxl.CEvent(lxl.CEvent.MOVIE_COMPLETE, this));
            }
        };
        MakeUnit.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return MakeUnit;
    }(lxl.CComponent));
    app.MakeUnit = MakeUnit;
    __reflect(MakeUnit.prototype, "app.MakeUnit");
})(app || (app = {}));
//# sourceMappingURL=MakeUnit.js.map