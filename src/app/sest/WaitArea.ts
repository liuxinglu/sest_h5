module app {
	export class WaitArea extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "WaitAreaSkin.exml");
		}

		private group:eui.Group;
		private waitArr:Array<WaitUnit> = [];

		onActivity() {
			super.onActivity();
			// setInterval(this.addWaitUnit, 5000, this);
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.NEW_USER, this.addWaitUnit, this);
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.REMOVE_USER, this.removeWaitUnit, this);
		}

		addWaitUnit(e:lxl.CEvent):void {
			let waitUnit:WaitUnit = new WaitUnit();
			waitUnit.data = e.data;
			waitUnit.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
				this.waitArr.push(waitUnit);
				this.group.addChild(waitUnit);
			}, this);
		}

		removeWaitUnit(e:lxl.CEvent):void {
			let user:User = e.data;
			for(let i = 0; i < this.waitArr.length; i++) {
				if(this.waitArr[i].data.userId == user.userId) {
					this.group.removeChild(this.waitArr[i]);
					this.waitArr.splice(i, 1);
					break;
				}
			}
		}

		dispose() {
			super.dispose();
		}
	}
}