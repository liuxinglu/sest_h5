module app {
	export class MakeArea extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "MakeAreaSkin.exml");
		}

		upOrDown:number = -1;
		upArr:Array<MakeUnit> = [];
		downArr:Array<MakeUnit> = [];

		onActivity() {
			super.onActivity();
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.NEW_FOOD, this.addMakeUnit, this);
		}

		private _lastUpUnit:MakeUnit = new MakeUnit();
		private _lastDownUnit:MakeUnit = new MakeUnit();
		addMakeUnit(e:lxl.CEvent):void {
			this.upOrDown++;
			let makeUnit:MakeUnit = new MakeUnit();
			makeUnit.food = e.data;
			if(this.upOrDown % 2 == 0) {
				this.upArr.push(makeUnit);
			} else {
				this.downArr.push(makeUnit);
			}
			makeUnit.line = this.upOrDown % 2;
			makeUnit.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
				makeUnit.x = Gra.aniPosition[makeUnit.line][makeUnit.food.curStep][0];//一维代表第几条传送带，2维第几个位置
				makeUnit.y = Gra.aniPosition[makeUnit.line][makeUnit.food.curStep][1];
				if(makeUnit.line == 0) {
					if(this.upArr[0].x != this._lastUpUnit.x && this.upArr[0].y != this._lastUpUnit.y) {
						this._lastUpUnit = this.upArr.splice(0, 1)[0];
						this.addChild(this._lastUpUnit);
					}
				} else {
					if(this.downArr[0].x != this._lastDownUnit.x && this.downArr[0].y != this._lastDownUnit.y) {
						this._lastDownUnit = this.downArr.splice(0, 1)[0];
						this.addChild(this._lastDownUnit);
					}
				}
			}, this);
			makeUnit.addEventListener(lxl.CEvent.MOVIE_COMPLETE, this.moveUnit, this);
		}

		moveUnit(e:lxl.CEvent) {
			let makeUnit:MakeUnit = e.target;
			let data:MakeUnit = e.data;
			if(makeUnit.food.cookId == data.food.cookId) {
				let pos = Gra.getNextPosByFood(makeUnit.food);
				if(pos == -1) {
					
				} else {
					egret.Tween.get(e.target)
					.to({x:Gra.aniPosition[makeUnit.line][pos][0], y:Gra.aniPosition[makeUnit.line][pos][1]}, 2000)
					.call(()=>{
						e.target.playAni(1);
					}, this);
				}
			}
		}

		dispose() {
			super.dispose();
		}
	}
}