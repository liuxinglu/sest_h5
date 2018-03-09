module app {
	export class PackUnit extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "PackUnit.exml");
		}

		private group:eui.Group;
		private _mc:egret.MovieClip;
		private _mcUp:egret.MovieClip;
		img_head:eui.Image;
		private img_mask:eui.Image;
		makeUnit:MakeUnit;

		onActivity() {
			super.onActivity();
			this._mc = Res.getMovieClip("dabao_json", "dabao_png", "dabao");
			this._mc.addEventListener(egret.Event.COMPLETE, this._packComplete, this);
			this.group.addChildAt(this._mc, 1);
			this.img_head.mask = this.img_mask;
		}

		pack() {
			this._mc.visible = true;
			this._mc.play(1);
		}

		private _packComplete(e:egret.Event) {
			this._mc.removeEventListener(egret.Event.COMPLETE, this._packComplete, this);
			this.gaizhang();
		}

		private _mcGaiZhang:egret.MovieClip;
		private gaizhang() {
			this._mcGaiZhang = Res.getMovieClip("gaizhang_json", "gaizhang_png", "gaizhang");
			this._mcGaiZhang.x = 20;
			if(this.makeUnit.index <= 3) {
				this._mcGaiZhang.y = this._mcGaiZhang.height * 2 + this.y - this.height + 70;
			} else {
				this._mcGaiZhang.y = this._mcGaiZhang.height * 2 + this.y - this.height - 90;
			}
			this.group.addChild(this._mcGaiZhang);
			this._mcGaiZhang.addEventListener(egret.Event.COMPLETE, this._gaizhangComplete, this);
			this._mcGaiZhang.play(1);	
			setTimeout(this._gaizhang1, 1700, this);
		}

		private _gaizhang1(arg:PackUnit) {
			arg.img_head.visible = true;
			Res.getResByUrl(arg.makeUnit.food.user.avatar, (e)=> {
				arg.img_head.texture = e.target.data;
			}, arg, egret.URLLoaderDataFormat.TEXTURE);
		}

		private _gaizhangComplete(e:egret.Event) {
			this._mcGaiZhang.removeEventListener(egret.Event.COMPLETE, this._gaizhangComplete, this);
			this.group.removeChild(this._mcGaiZhang);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GAIZHANG_COMPLETE, this));
		}

		packup() {
			this._mcUp = Res.getMovieClip("dabaoDown_json", "dabaoDown_png", "dabaoDown");
			this._mcUp.addEventListener(egret.Event.COMPLETE, this._upComplete, this);
			this.group.addChild(this._mcUp);
			this._mcUp.play(1);
		}

		private _originX:number;
		private _originY:number;
		private _originW:number;
		private _originH:number;
		private _upComplete(e:egret.Event) {
			if(this._mcUp) {
				this._mcUp.removeEventListener(egret.Event.COMPLETE, this._upComplete, this);
				this._originW = this.width;
				this._originH = this.height;
				this._originX = this.x;
				this._originY = this.y;
				lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.PACK_COMPLETE, this))
			}
		}

		removeQianZi() {
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
		}

		getBox() {
			this.x = this._originX;
			this.y = this._originY - 400;
			this.scaleX = 1;
			this.scaleY = 1;
			this.img_head.visible = false;
			egret.Tween.get(this)
				.to({y:this._originY}, 1000)
				.call(()=>{
				}, this);
			this._mc.gotoAndStop(1);
		}

		dispose() {
			super.dispose();
		}
	}
}