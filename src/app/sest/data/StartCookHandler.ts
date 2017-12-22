module app {
	export class StartCookHandler extends lxl.data.BaseDataHandler{
		public constructor() {
			super();
		}

		getCode():string {
			return SetDataHandler.START_COOK;
		}

		handlerPackage(d:lxl.data.BaseData) {
			super.handlerPackage(d);
			let baseData = this.data.readObj();
			let arr = baseData.data;
			for(let i = 0; i < arr.length; i++) {
				Gra.createFood(arr[i].userId, arr[i].cookId, parseInt(arr[i].foodType));
			}
			this.handComplete();
		}

		send(p:lxl.data.BaseData) {
			let pkg:lxl.interfaces.IPackageOut = new lxl.data.PackageOut(SetDataHandler.START_COOK);
			pkg.writeArray(p.arr);
			lxl.GlobalData.getInstance().dataManager.send(pkg);
		}
	}
}