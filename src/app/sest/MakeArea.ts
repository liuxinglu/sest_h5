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
					this._showHandDown(makeUnit);
				} else {
					egret.Tween.get(e.target)
					.to({x:Gra.aniPosition[makeUnit.line][pos][0], y:Gra.aniPosition[makeUnit.line][pos][1]}, 2000)
					.call(()=>{
						e.target.playAni(1);
					}, this);
				}
			}
		}

		private _downMC:egret.MovieClip;
		private _downMu:MakeUnit;
		private _showHandDown(mu:MakeUnit) {
			if(this._downMC) {
				this._downMC.removeEventListener(egret.Event.COMPLETE, this._downComplete, this);
				this.removeChild(this._downMC);
				this._downMC = null;
				this._downMu = null;
			}
			let n = Gra.getFoodName(mu.food.foodType);
			this._downMC = Res.getMovieClip(n + "Down_json", n + "Down_png", n + "Down");
			this._downMC.x = mu.x + mu.width/2;
			this._downMC.y = mu.y + mu.height;
			this._downMC.addEventListener(egret.Event.COMPLETE, this._downComplete, this);
			this.addChild(this._downMC);
			this._downMu = mu;
			this._downMC.play(1);
		}

		private _downComplete(e:egret.Event) {
			
			this._showHandUp(this._downMu);
		}

		private _upMC:egret.MovieClip;
		private _showHandUp(mu:MakeUnit) {
			// let n = Gra.getFoodName(mu.food.foodType);
			// this._upMC = Res.getMovieClip(n + "Up_json", n + "Up_png", n + "Up");
			// this._upMC.x = mu.x + mu.width / 2;
			// this._upMC.y = mu.y + mu.height + 70;
			// this._upMC.addEventListener(egret.Event.COMPLETE, this._upComplete, this);
			// this.addChild(this._upMC);
			// this._upMC.stop();
			let dis1 = 0;
			let dis2 = 0;
			if(mu.line == 0) {
				dis1 = 800;
				dis2 = 1200;
			} else {
				dis1 = 800;
				dis2 = 1000;
			}
			egret.Tween.get(mu)
			.to({y: -160}, dis1)
			.call(()=>{
				mu.visible = false;
			}, mu);
			egret.Tween.get(this._downMC)
			.to({y: -100}, dis2)
			.call(()=>{
				if(this._downMC) {
					this._downMC.removeEventListener(egret.Event.COMPLETE, this._downComplete, this);
					this.removeChild(this._downMC);
					this._downMC = null;
				}
			});
		}

		// private _upComplete(e:egret.Event) {
		// 	lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.MAKE_COMPLETE_DOWN, this._downMu));
		// 	if(this._upMC) {
		// 		this._upMC.removeEventListener(egret.Event.COMPLETE, this._upComplete, this);
		// 		// this.removeChild(this._upMC);
		// 		// this._upMC = null;
		// 	}
		// }

		dispose() {
			super.dispose();
		}
	}
}