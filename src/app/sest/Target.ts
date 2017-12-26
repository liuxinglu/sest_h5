module app {
	export class Target extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "TargetSkin.exml");
		}

		private img_head:eui.Image;
		private img_mask:eui.Image;
		food:Food;

		onActivity() {
			super.onActivity();
		}

		boxIn() {
			
		}

		dispose() {
			super.dispose();
		}
	}
}