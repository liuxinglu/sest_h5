module app {
	export class PackArea extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "PackAreaSkin.exml");
		}

		private p0:PackUnit;
		private p1:PackUnit;
		private p2:PackUnit;
		private p3:PackUnit;
		private p4:PackUnit;
		private p5:PackUnit;
		private p6:PackUnit;
		private p7:PackUnit;
		private _packArr:Array<number> = [];
		private _downMC:egret.MovieClip;
		private _upMC:egret.MovieClip;

		onActivity() {
			super.onActivity();
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.MAKE_COMPLETE_DOWN, this._makeComplete, this);
		}

		private _makeComplete(e:lxl.CEvent) {
			let mu:MakeUnit = e.data;
			let n = Gra.getFoodName(mu.food.foodType);
			this._upMC = Res.getMovieClip(n + "Down_json", n + "Down_png", n + "Down");
			this._upMC.x = this["p" + this._packArr.length].x;
			this._upMC.y = this["p" + this._packArr.length].y + this["p" + this._packArr.length].height;
			this.addChildAt(this._upMC, 0);
			this._upMC.addEventListener(egret.Event.COMPLETE, this._upComplete, this);
			this._upMC.play(1);
		}

		private _upComplete(e:egret.Event) {
			this.removeEventListener(egret.Event.COMPLETE, this._upComplete, this);
			this.removeChild(this._upMC);
		}

		dispose() {
			super.dispose();
		}
	}
}