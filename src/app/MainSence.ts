module app {
	export class MainSence extends lxl.ui.CLayer {
		public constructor() {
			super();
		}

		onActivity(): void {
            super.onActivity();
			let main:MainView = new app.MainView();
			// main.width = this.stage.stageWidth;
			// main.height = this.stage.stageHeight;
			main.name = "man";
			main.once(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
				this.addChild(main);
			}, this);
		}

	}
}