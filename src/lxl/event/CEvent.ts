module lxl {
	export class CEventInit implements EventInit {
		bubbles: boolean;
		cancelable: boolean;
	}

	export class CEvent extends egret.Event{
		/**
		 *连接到服务器 
		 */		
		public static CONNECT_SERVER:string = "CEVENT::CONNECT_SERVER";
		
		/**
		 *连接失败 
		 */		
		public static CONNECT_FAIL:string = "CEVENT::CONNECT_FAIL";

		/**
		 *加载资源完成 
		 */		
		public static LOAD_SKIN_COMPLETE:string = "CEVENT::LOAD_SKIN_COMPLETE";
		/**
		 * 加载配置完成
		 */
		public static LOAD_CONFIG_COMPLETE:string = "CEVENT::LOAD_CONFIG_COMPLETE";
		/**
		 * 加载一组资源完成
		 */
		public static LOAD_GROUP_COMPLETE:string = "CEVENT::LOAD_GROUP_COMPLETE";
		/**
		 * 加载进度
		 */
		public static LOAD_PROGRESS:string = "CEVENT::LOAD_PROGRESS";

		public static CLICK:string = "CEVENT::CLICK";

		//完成选择
		public static SEL_COMPLETE:string = "CEVENT::SEL_COMPLETE";
		//成功完成游戏
		public static SUCCESS:string = "CEVENT::SUCCESS";
		public static SEND_MESSAGE:string = "CEVENT::SEND_MESSAGE";
		public static EYE_CHANGE:string = "CEVENT::EYE_CHANGE";
		public static PROTECTE_EYE:string = "CEVENT::PROTECTE_EYE";
		public static SPACE:string = "CEVENT::SPACE";
		public static LEFT:string = "CEVENT::LEFT";
		public static RIGHT:string = "CEVENT::RIGHT";
		public static UP:string = "CEVENT::UP";
		public static DOWN:string = "CEVENT::DOWN";
		//新用户进来
		public static NEW_USER:string = "CEVENT::NEW_USER";
		//新订单进来
		public static NEW_FOOD:string = "CEVENT::NEW_FOOD";
		//放到一个新的位置
		public static NEW_SITE:string = "CEVENT::NEW_SITE";
		public static REMOVE_USER:string = "CEVENT::REMOVE_USER";
		public static REMOVE_FOOD:string = "CEVENT::REMOVE_FOOD";
		public static REMOVE_SITE:string = "CEVENT::REMOVE_SITE";
		public static MOVIE_COMPLETE:string = "CEVENT::MOVIE_COMPLETE";
		public static MAKE_COMPLETE_UP:string = "CEVENT::MAKE_COMPLETE_UP";
		public static MAKE_COMPLETE_DOWN:string = "CEVENT::MAKE_COMPLETE_DOWN";
		public static PACK_COMPLETE:string = "CEVENT::PACK_COMPLETE";
		public static GAIZHANG_COMPLETE:string = "CEVENT::GAIZHANG_COMPLETE";
		private _param:any;
		cancelBubble;
		public constructor(type:string, param:any = null, timeSpan:number = 0, bubbles:boolean = false, cancelable:boolean = false)
		{
			super(type, bubbles, cancelable, param);
			// let ceinit:CEventInit = new CEventInit();
			// ceinit.bubbles = bubbles;
			// ceinit.cancelable = cancelable;
			this._param = param;
		}

		public get param():any {
			return this._param;
		}

	}
}