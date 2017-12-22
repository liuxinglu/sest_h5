module app {
	export class GetNewUserStatusHandler extends lxl.data.BaseDataHandler{
		public constructor() {
			super();
		}

		getCode():string {
			return SetDataHandler.GET_NEW_USER_STATUS;
		}

		handlerPackage(d:lxl.data.BaseData) {
			super.handlerPackage(d);
			var baseData = this.data.readObj();
			let arr = baseData.data;
			for(let i = 0; i < arr.length; i++) {
				Gra.createUser(arr[i].userId, arr[i].name, arr[i].userId, arr[i].avatar);
			}
			this.handComplete();
		}

		send(params:lxl.data.BaseData) {
			let pkg:lxl.interfaces.IPackageOut = new lxl.data.PackageOut(SetDataHandler.GET_NEW_USER_STATUS);
			lxl.GlobalData.getInstance().dataManager.send(pkg);
		}
	}
}