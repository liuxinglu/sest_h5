module app {
	export class ReadyUnit extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "ReadyUnitSkin.exml");
		}

		private img_status:eui.Image;
		private img_num:eui.Image;
		private img_change:eui.Image;
		private group:eui.Group;
		data:Site;
		private _num:number = 0;
		changeNum:number = 0;

		onActivity() {
			super.onActivity();
			this.img_change.alpha = 0;
			this.img_change.visible = true;
		}

		set num(num:number) {
			this._num = num;
			this.img_num.source = "num_" + this._num + "_png";
		}

		changeStatusImg() {
			this.changeNum++;
			egret.Tween.get(this.img_change)
			.to({alpha:1}, 500)
			.to({alpha:0}, 500)
			.call(()=>{
				if(this.changeNum == 2) {
					this.changeNum = 0;
					return;
				}
				this.changeStatusImg()
			}, this);
		}

		dispose() {
			super.dispose();
		}
	}
}