module app {
	export class GetFoodHandler extends lxl.data.BaseDataHandler{
		public constructor() {
			super();
		}

		getCode():string {
			return SetDataHandler.GET_FOOD;
		}

		handlerPackage(d:lxl.data.BaseData) {
			super.handlerPackage(d);
			let baseData = this.data.readObj();
			this.handComplete();
		}

		send(p:lxl.data.BaseData) {
			let pkg:lxl.interfaces.IPackageOut = new lxl.data.PackageOut(SetDataHandler.GET_FOOD);
			pkg.writeArray(p.arr);
			lxl.GlobalData.getInstance().dataManager.send(pkg);
		}
	}
}