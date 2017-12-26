module app {
	export class ReadyArea extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "ReadyAreaSkin.exml");
		}

		private _xPosArr:Array<number> = [0, 77, 154, 231, 308, 385, 462, 539];
		private group0:eui.Group;
		private group1:eui.Group;
		private u01:ReadyUnit;
		private u02:ReadyUnit;
		private u03:ReadyUnit;
		private u04:ReadyUnit;
		private u05:ReadyUnit;
		private u06:ReadyUnit;
		private u07:ReadyUnit;
		private u08:ReadyUnit;
		private u09:ReadyUnit;
		private u10:ReadyUnit;
		private u11:ReadyUnit;
		private u12:ReadyUnit;
		private u13:ReadyUnit;
		private u14:ReadyUnit;
		private u15:ReadyUnit;
		private u16:ReadyUnit;
		private img0:eui.Image;
		private img1:eui.Image;
		private p0:PackUnit;
		private p1:PackUnit;
		private p2:PackUnit;
		private p3:PackUnit;
		private p4:PackUnit;
		private p5:PackUnit;
		private p6:PackUnit;
		private p7:PackUnit;
		private _packArr:Array<number> = [];
		private _downMC:egret.MovieClip;
		private _upMC:egret.MovieClip;

		onActivity() {
			super.onActivity();
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.MAKE_COMPLETE_DOWN, this._makeComplete, this);
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.NEW_SITE, this._newSiteHandler, this);
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PACK_COMPLETE, this._packCompleteHandler, this);
			for(let i = 0; i < 16; i++) {
				if(i < 9)
					this["u0" + (i + 1)].num = i + 1;
				else
					this["u" + (i + 1)].num = i + 1;
			} 
		}

		private _makeComplete(e:lxl.CEvent) {
			let mu:MakeUnit = e.data;
			let n = Gra.getFoodName(mu.food.foodType);
			this._upMC = Res.getMovieClip(n + "Down_json", n + "Down_png", n + "Down");
			this._upMC.x = this["p" + this._packArr.length].x + this["p" + this._packArr.length].width / 2;
			this._upMC.y = this["p" + this._packArr.length].y + this["p" + this._packArr.length].height;
			mu.index = this._packArr.length;
			this["p" + this._packArr.length].makeUnit = mu;
			mu.x = this._upMC.x - this["p" + this._packArr.length].width / 2;
			mu.y = -100;
			mu.visible = true;
			this.addChildAt(mu, 6);
			this.addChildAt(this._upMC, 6);
			this._upMC.addEventListener(egret.Event.COMPLETE, this._upComplete, this);
			this._upMC.play(1);
			let muDown:number = 0;
			if(this._packArr.length <= 3) {
				muDown = 800;
			} else {
				muDown = 500;
			}
			egret.Tween.get(mu)
			.to({y : this._upMC.y - 141}, muDown)
			.call(()=>{
				this.removeChild(mu);
			}, this);;
			this._packArr.push(1);
		}

		private _upComplete(e:egret.Event) {
			this._upMC.removeEventListener(egret.Event.COMPLETE, this._upComplete, this);
			egret.Tween.get(this._upMC)
			.to({y : -100}, 1000)
			.call(()=>{
				this.removeChild(this._upMC);
				this["p" + (this._packArr.length - 1)].pack();
			});
			
			this["p" + this._packArr]
		}

		private _newSiteHandler(e:lxl.CEvent) {
			let site:Site = e.data;
			for(let i = 0; i < 8; i++) {
				if(this["p" + i].makeUnit) {
					if(this["p" + i].makeUnit.food.cookId == site.food.cookId) {
						this["p" + i].packup();
						break;
					}
				}
			}
		}

		private _imgArr:Array<Target> = [];
		private _packCompleteHandler(e:lxl.CEvent) {
			let pu:PackUnit = e.data;
			let mu:MakeUnit = pu.makeUnit;
			let site:Site = Gra.findSiteByFood(mu.food);
			let targetX:number;
			let targetY:number;
			let targetW:number;
			let targetH:number;
			let targetIndex:number;
			switch(site.siteNum) {
				case "01":
				case "02":
				case "03":
				case "04":
				case "05":
				case "06":
				case "07":
				case "08":
				targetX = this.img0.x;
				targetY = this.img0.y;
				targetW = this.img0.width;
				targetH = this.img0.height;
				targetIndex = 0;
				break;
				case "09":
				case "10":
				case "11":
				case "12":
				case "13":
				case "14":
				case "15":
				case "16":
				targetX = this.img1.x;
				targetY = this.img1.y;
				targetW = this.img1.width;
				targetH = this.img1.height;
				targetIndex = 1;
				break;
			}
			egret.Tween.get(e.data)
			.to({x:targetX, y:targetY, width:targetW, height:targetH}, 1000)
			.call(()=>{
				let target:Target = new Target();
				target.x = targetX;
				target.y = targetY;
				target.width = targetW;
				target.height = targetH;
				target.food = mu.food;
				this._imgArr.push(target);
				this["group" + targetIndex].addChildAt(target, 1);
				e.data.removeQianZi();
			}, this);
			egret.Tween.get(this._imgArr[this._imgArr.length - 1])
			.to({x:this._xPosArr[(parseInt(site.siteNum) - 1) % 8]}, 2000)
			.call(()=>{
				this["u" + site.siteNum]
			}, this);
		}

		dispose() {
			super.dispose();
		}
	}
}