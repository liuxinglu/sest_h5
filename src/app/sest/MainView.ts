module app {
	export class MainView extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "MainViewSkin.exml");
		}
		
		onActivity() {
			super.onActivity();
		}

		
		dispose() {
			super.dispose();
		}
	}
}