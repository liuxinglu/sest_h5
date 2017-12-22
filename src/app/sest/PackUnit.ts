module app {
	export class PackUnit extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "PackUnit.exml");
		}

		private group:eui.Group;
		private _mc:egret.MovieClip;
		private _mcUp:egret.MovieClip;

		onActivity() {
			super.onActivity();
			this._mc = Res.getMovieClip("dabao_json", "dabao_png", "dabao");
			this._mc.addEventListener(egret.Event.COMPLETE, this._packComplete, this);
			this.group.addChildAt(this._mc, 1);
		}

		pack() {
			this._mc.play(1);
		}

		private _packComplete(e:egret.Event) {
			this._mc.removeEventListener(egret.Event.COMPLETE, this._packComplete, this);
			this._mcUp = Res.getMovieClip("dabaoDown_json", "dabaoDown_png", "dabaoDown");
			this._mcUp.addEventListener(egret.Event.COMPLETE, this._upComplete, this);
			this.group.addChildAt(this._mcUp, 0);
			this._mcUp.play(1);
		}

		private _upComplete(e:egret.Event) {
		}

		dispose() {
			super.dispose();
		}
	}
}