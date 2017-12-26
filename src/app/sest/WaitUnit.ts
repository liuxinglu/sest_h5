module app {
	export class WaitUnit extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "WaitUnitSkin.exml");
		}

		private img_head:eui.Image;
		private img_mask:eui.Image;
		data:User;

		onActivity() {
			super.onActivity();
			this.img_head.mask = this.img_mask;
			Res.getResByUrl(this.data.avatar, (e)=>{
				this.img_head.texture = e.target.data;
			}, this, egret.URLLoaderDataFormat.TEXTURE);
			this._animation()
		}

		private _animation():void {
			egret.Tween.get(this)
			.to({scaleX: 0.9, scaleY: 0.9}, 800)
			.to({scaleX: 1, scaleY: 1}, 500).call(()=>{
				this._animation();
			});
		}

		private _disposeAnimation():void {
			egret.Tween.get(this)
			.to({scaleX:0.1, scaleY: 0.1, alpha: 0}, 700)
			.call(()=>{
				super.dispose();
			}, this);
		}

		dispose() {
			this._disposeAnimation();
		}
	}
}