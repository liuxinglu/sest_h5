module app {
	export class EndCookHandler extends lxl.data.BaseDataHandler{
		public constructor() {
			super();
		}

		getCode():string {
			return SetDataHandler.END_COOK;
		}

		handlerPackage(d:lxl.data.BaseData) {
			super.handlerPackage(d);
			let baseData = this.data.readObj();
			let arr = baseData.data;
			for(let i = 0; i < arr.length; i++) {
				Gra.createSite(arr[i].userId, arr[i].cookId, arr[i].siteNum);
			}
			this.handComplete();
		}

		send(p:lxl.data.BaseData) {
			let pkg:lxl.interfaces.IPackageOut = new lxl.data.PackageOut(SetDataHandler.END_COOK);
			pkg.writeArray(p.arr);
			lxl.GlobalData.getInstance().dataManager.send(pkg);
		}
	}
}