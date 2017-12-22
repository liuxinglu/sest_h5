module app {
	export class ReadyUnit extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "ReadyUnitSkin.exml");
		}

		private img_status:eui.Image;
		private img_num:eui.Image;
		private group:eui.Group;
		data:Site;
		num:number = 0;

		onActivity() {
			super.onActivity();
		}

		dispose() {
			super.dispose();
		}
	}
}