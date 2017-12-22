module lxl.data {
	export class NetData extends egret.HashObject{
		public constructor(dataManager:interfaces.IDataManager) {
			super();
			this._dataManager = dataManager;
			this._httpRequest = new egret.HttpRequest();
			
		}

		private errorHandler(e:egret.IOErrorEvent):void {
			logs.log(e.type);
			this._dataManager.handlerSecurityError();
		}

		private _httpRequest:egret.HttpRequest;
		private _dataManager:interfaces.IDataManager;
		private _cb:Function;
		private _ctx:any;

		public send(pkg:interfaces.IPackageOut, cb:Function = null, ctx:any = null):boolean {
			this._httpRequest.responseType = egret.HttpResponseType.TEXT;
			this._httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
			this._httpRequest.addEventListener(egret.Event.COMPLETE, this._completeHandler, this);
			this._httpRequest.open(pkg.getFullUrl(), egret.HttpMethod.POST);
			this._cb = cb;
			this._ctx = ctx;
			
			if(pkg.getParamLen() > 0) {
				this._httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				this._httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
				let param = Tool.MapToField(pkg.getParam());
				this._httpRequest.send(param);
			} else {
				this._httpRequest.send();
			}
			lxl.logs.log("发送协议名：" + pkg.code() + " url:" + pkg.getFullUrl());
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SEND_MESSAGE, pkg));
			return true;
		}

		private _completeHandler(e:egret.Event):void {
			let request = <egret.HttpRequest>e.currentTarget;
			// this._cb(request.response, this._ctx);
			let json = JSON.parse(request.response);
			let pin:interfaces.IPackageIn = new lxl.data.PackageIn(json.code, request.response);
			lxl.logs.log("收到协议名：" + pin.code() + " data:" + request.response);
			this._dataManager.handlerPackage(pin);
			this.dispose();
		}

		public dispose():void {
			if(this._httpRequest.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
				this._httpRequest.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
				this._httpRequest.removeEventListener(egret.Event.COMPLETE, this._cb, this._ctx);
			}
		}

	}
}