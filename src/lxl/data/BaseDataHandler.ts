module lxl.data {
	export class BaseDataHandler
		extends CDispatcher
		implements interfaces.IDataHandler {

		public data:lxl.interfaces.IPackageIn;
		public constructor() {
			super();
		}

		public getCode(): string {
			return "";
		}

		public handlerPackage(_data: data.BaseData): void {
			if(_data != undefined) {
				this.data = new lxl.data.PackageIn(this.getCode(), _data);	
				lxl.logs.log("收到协议名：" + this.getCode() + "内容:" + this.data.readObj().toString());
			}
		}

		public configure(data:interfaces.IPackageIn): void {
			this.data = data;
		}

		public send(data: data.BaseData = null): void {

		}

		public handComplete() {
			this.data = null;
		}

	}
}