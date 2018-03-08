module app {
	export class SetDataHandler {

		public static instance:app.SetDataHandler;
		public static GET_NEW_USER_STATUS:string = "getNewUserStatus";//轮询获取新用户 没有新用户则列表为[]
		public static START_COOK:string = "startCook";//轮询获取开始加工哪个用户哪道菜 返回用户列表 没有则[]
		public static END_COOK:string = "endCook";//轮询获取哪个用户的哪个餐品加工完毕 放到几号位置
		public static GET_FOOD:string = "getFood";//轮询获取哪个放餐位置空了
		
		public static setHandlers() {
			if(this.instance == null) {
				this.instance = new app.SetDataHandler();
			}
		}

		public constructor() {
			lxl.GlobalData.getInstance().dataManager.addDataHandler(new GetNewUserStatusHandler());
			lxl.GlobalData.getInstance().dataManager.addDataHandler(new StartCookHandler());
			lxl.GlobalData.getInstance().dataManager.addDataHandler(new EndCookHandler());
			lxl.GlobalData.getInstance().dataManager.addDataHandler(new GetFoodHandler());
			setInterval(this.getNewUser, 3000);
			setInterval(this.startCook, 5000);
			setInterval(this.endCook, 4000);
			setInterval(this.getFood, 7000);
		}

		public getNewUser() {
			let d:lxl.interfaces.IDataHandler = lxl.GlobalData.getInstance().dataManager.getDataHandler(SetDataHandler.GET_NEW_USER_STATUS);
			let b:lxl.data.BaseData = new lxl.data.BaseData();
			d.send(b);
		}

		public startCook() {
			let d:lxl.interfaces.IDataHandler = lxl.GlobalData.getInstance().dataManager.getDataHandler(SetDataHandler.START_COOK);
			let b:lxl.data.BaseData = new lxl.data.BaseData();
			d.send(b);
		}

		public endCook() {
			let d:lxl.interfaces.IDataHandler = lxl.GlobalData.getInstance().dataManager.getDataHandler(SetDataHandler.END_COOK);
			let b:lxl.data.BaseData = new lxl.data.BaseData();
			d.send(b);
		}

		public getFood() {
			let d:lxl.interfaces.IDataHandler = lxl.GlobalData.getInstance().dataManager.getDataHandler(SetDataHandler.GET_FOOD);
			let b:lxl.data.BaseData = new lxl.data.BaseData();
			d.send(b);
		}
	}
}