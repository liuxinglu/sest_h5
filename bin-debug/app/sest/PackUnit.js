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
    var PackUnit = (function (_super) {
        __extends(PackUnit, _super);
        function PackUnit() {
            return _super.call(this, lxl.Config.SKIN_PATH + "PackUnit.exml") || this;
        }
        PackUnit.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this._mc = Res.getMovieClip("dabao_json", "dabao_png", "dabao");
            this._mc.addEventListener(egret.Event.COMPLETE, this._packComplete, this);
            this.group.addChildAt(this._mc, 1);
            this.img_head.mask = this.img_mask;
        };
        PackUnit.prototype.pack = function () {
            this._mc.visible = true;
            this._mc.play(1);
        };
        PackUnit.prototype._packComplete = function (e) {
            this._mc.removeEventListener(egret.Event.COMPLETE, this._packComplete, this);
            this.gaizhang();
        };
        PackUnit.prototype.gaizhang = function () {
            this._mcGaiZhang = Res.getMovieClip("gaizhang_json", "gaizhang_png", "gaizhang");
            this._mcGaiZhang.x = 20;
            if (this.makeUnit.index <= 3) {
                this._mcGaiZhang.y = this._mcGaiZhang.height * 2 + this.y - this.height + 70;
            }
            else {
                this._mcGaiZhang.y = this._mcGaiZhang.height * 2 + this.y - this.height - 90;
            }
            this.group.addChild(this._mcGaiZhang);
            this._mcGaiZhang.addEventListener(egret.Event.COMPLETE, this._gaizhangComplete, this);
            this._mcGaiZhang.play(1);
            setTimeout(this._gaizhang1, 1700, this);
        };
        PackUnit.prototype._gaizhang1 = function (arg) {
            arg.img_head.visible = true;
            Res.getResByUrl(arg.makeUnit.food.user.avatar, function (e) {
                arg.img_head.texture = e.target.data;
            }, arg, egret.URLLoaderDataFormat.TEXTURE);
        };
        PackUnit.prototype._gaizhangComplete = function (e) {
            this._mcGaiZhang.removeEventListener(egret.Event.COMPLETE, this._gaizhangComplete, this);
            this.group.removeChild(this._mcGaiZhang);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GAIZHANG_COMPLETE, this));
        };
        PackUnit.prototype.packup = function () {
            this._mcUp = Res.getMovieClip("dabaoDown_json", "dabaoDown_png", "dabaoDown");
            this._mcUp.addEventListener(egret.Event.COMPLETE, this._upComplete, this);
            this.group.addChild(this._mcUp);
            this._mcUp.play(1);
        };
        PackUnit.prototype._upComplete = function (e) {
            if (this._mcUp) {
                this._mcUp.removeEventListener(egret.Event.COMPLETE, this._upComplete, this);
                this._originW = this.width;
                this._originH = this.height;
                this._originX = this.x;
                this._originY = this.y;
                lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.PACK_COMPLETE, this));
            }
        };
        PackUnit.prototype.removeQianZi = function () {
            var dis1 = 0;
            var dis2 = 0;
            if (this.makeUnit.line == 0) {
                dis1 = 800;
                dis2 = 1200;
            }
            else {
                dis1 = 800;
                dis2 = 1000;
            }
            egret.Tween.get(this._mcUp)
                .to({ y: -400 }, dis2)
                .call(function () {
                if (this._mcUp) {
                    this.group.removeChild(this._mcUp);
                    this._mcUp = null;
                }
                //this.getBox();
            }, this);
        };
        PackUnit.prototype.getBox = function () {
            this.x = this._originX;
            this.y = this._originY - 400;
            this.scaleX = 1;
            this.scaleY = 1;
            this.img_head.visible = false;
            egret.Tween.get(this)
                .to({ y: this._originY }, 1000)
                .call(function () {
            }, this);
            this._mc.gotoAndStop(1);
        };
        PackUnit.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PackUnit;
    }(lxl.CComponent));
    app.PackUnit = PackUnit;
    __reflect(PackUnit.prototype, "app.PackUnit");
})(app || (app = {}));
//# sourceMappingURL=PackUnit.js.map