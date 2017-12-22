module app {
	export class GraManager {
		public constructor() {
		}

		private _aniShows = ["gaijiaofan", "yimian", "sela", "panini"];
		private _aniShowSeques = [
			[0, -1, 2, -1, 4, -1], 
			[0, -1, 2, -1, 4, -1], 
			[0, 1, 2, 3, 4, 5], 
			[0, 1, 2, 3, 4, -1]];
		aniPosition = [[[8,5], [258,5], [508,5], [758,5], [1008,5], [1258,5]], 
		[[8,179], [258,1790], [508,179], [758,179], [1008,179], [1258,179]]];
		private _foods:Array<Food> = [];
		private _users:Array<User> = [];
		private _sites:Array<Site> = [];

		createUser(userId:string, name:string, sex:number, avatar:string):User {
			let user:User = new User();
			user.userId = userId;
			user.name = name;
			user.sex = sex;
			user.avatar = avatar;
			this._users.push(user);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.NEW_USER, user))
			return user;
		}

		findUserById(userId:string):User {
			let user:User = new User();
			for(let i = 0; i < this._users.length; i++) {
				if(this._users[i].userId == userId) {
					user.userId = this._users[i].userId;
					user.name = this._users[i].name;
					user.sex = this._users[i].sex;
					user.avatar = this._users[i].avatar;
				}
			}
			return user;
		}

		findFoodById(cookId:string):Food {
			let food:Food = new Food();
			for(let i = 0; i < this._foods.length; i++) {
				if(this._foods[i].cookId == cookId) {
					food = this._foods[i];
				}
			}
			return food;
		}
		
		createFood(userId:string, cookId:string, foodType:number):Food {
			let food:Food = new Food();
			food.cookId = cookId;
			food.foodType = foodType;
			food.user = this.findUserById(userId);
			food.totalStep = this.getTotalStep(foodType);
			this._foods.push(food);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.REMOVE_USER, food.user));
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.NEW_FOOD, food))
			return food;
		}

		removeFood(userId:string, cookId:string, siteNum:number) {
			for(let i = 0; i < this._foods.length; i++) {
				if(this._foods[i].cookId == cookId) {
					this._foods.splice(i, 1);
				}
			}
		}

		createSite(userId:string, cookId:string, siteNum:number):Site {
			let site:Site = new Site();
			site.user = this.findUserById(userId);
			site.food = this.findFoodById(cookId);
			site.siteNum = siteNum;
			this._sites.push(site);
			return site;
		}

		getTotalStep(foodType:number):number {
			let arr = this._aniShowSeques[foodType];
			let moveArr = [];
			for(var i = 0; i < arr.length; i++) {
				if(arr[i] > -1) {
					moveArr.push(arr[i]);
				}
			}
			return moveArr.length;
		}

		/**
		 * 不同种类的菜品对应不同的加工位
		 */
		getMakePositionsByFood(food:Food):Array<number> {
			let arr = this._aniShowSeques[food.foodType];
			let moveArr = [];
			for(var i = 0; i < arr.length; i++) {
				if(arr[i] > -1) {
					moveArr.push(arr[i]);
				}
			}
			return moveArr;
		}

		/**
		 * 通过菜品种类获得传送带下一个位置
		 */
		getNextPosByFood(food:Food):number {
			let arr = this.getMakePositionsByFood(food);
			if(food.curStep < food.totalStep - 1) {
				food.curStep = food.curStep + 1;
				return arr[food.curStep];
			}
			return -1;
		}

		getMovieId(foodType:number,step:number, subStep:number = -1):string {
			let originName = this._aniShows[foodType] + step.toString();
			if(subStep == -1) {
				return originName;
			} else {
				return originName + "_" + subStep;
			}
		}

		getFoodName(foodType:number):string {
			return this._aniShows[foodType];
		}

		private static _instance:GraManager;
		public static getInstance():GraManager {
			if(this._instance == null) {
				this._instance = new GraManager();
			}
			return this._instance;
		}
	}
}