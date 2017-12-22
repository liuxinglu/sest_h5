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

		onActivity() {
			super.onActivity();
			
		}

		dispose() {
			super.dispose();
		}
	}
}