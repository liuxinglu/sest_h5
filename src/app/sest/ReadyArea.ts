module app {
	export class ReadyArea extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "ReadyAreaSkin.exml");
		}

		private _xPosArr:Array<number> = [0, 77, 154, 231, 308, 385, 462, 539];
		private group0:eui.Group;
		private group1:eui.Group;
		private u01:ReadyUnit;
		private u02:ReadyUnit;
		private u03:ReadyUnit;
		private u04:ReadyUnit;
		private u05:ReadyUnit;
		private u06:ReadyUnit;
		private u07:ReadyUnit;
		private u08:ReadyUnit;
		private u09:ReadyUnit;
		private u10:ReadyUnit;
		private u11:ReadyUnit;
		private u12:ReadyUnit;
		private u13:ReadyUnit;
		private u14:ReadyUnit;
		private u15:ReadyUnit;
		private u16:ReadyUnit;
		private img0:eui.Image;
		private img1:eui.Image;

		onActivity() {
			super.onActivity();
			
		}

		dispose() {
			super.dispose();
		}
	}
}