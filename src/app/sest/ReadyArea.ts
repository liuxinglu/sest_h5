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
		private _packArr:Array<string> = [];
		private _downMC:egret.MovieClip;
		private _upMC:egret.MovieClip;

		onActivity() {
			super.onActivity();
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.MAKE_COMPLETE_DOWN, this._makeComplete, this);
			
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PACK_COMPLETE, this._packCompleteHandler, this);
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.GAIZHANG_COMPLETE, this._gaizhangHandler, this);
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
			let index = 0;
			if(this._packArr.length <= 7) {
				index = this._packArr.length;
				this._packArr.push(mu.food.cookId);
			} else {
				for(let i = 0; i < this._packArr.length; i++) {
					if(this._packArr[i] == "") {
						index = i;
						break;
					}
				}
			}
			this._upMC.x = this["p" + index].x + this["p" + index].width / 2;
			this._upMC.y = this["p" + index].y + this["p" + index].height;
			this._upMC.name = index.toString();
			mu.index = index;
			this["p" + index].makeUnit = mu;
			mu.x = this._upMC.x - this["p" + index].width / 2;
			mu.y = -100;
			mu.visible = true;
			this.addChildAt(mu, 6);
			this.addChildAt(this._upMC, 6);
			this._packArr.push(mu.food.cookId);
			this._upMC.addEventListener(egret.Event.COMPLETE, this._upComplete, this);
			this._upMC.play(1);
			let muDown:number = 0;
			if(index <= 3) {
				muDown = 800;
			} else {
				muDown = 500;
			}
			egret.Tween.get(mu)
			.to({y : this._upMC.y - 141}, muDown)
			.call(()=>{
				this.removeChild(mu);
			}, this);
		}

		private _upComplete(e:egret.Event) {
			this._upMC.removeEventListener(egret.Event.COMPLETE, this._upComplete, this);
			egret.Tween.get(this._upMC)
			.to({y : -100}, 1000)
			.call(()=>{
				this["p" + this._upMC.name].pack();
				this.removeChild(this._upMC);
			}, this, [e]);
			
		}

		private _gaizhangHandler(e:lxl.CEvent) {
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.NEW_SITE, this._newSiteHandler, this);
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
				targetX = this.img0.x + this.group0.x;
				targetY = this.img0.y + this.group0.y - this.img0.height;
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
				targetX = this.img1.x + this.group1.x;
				targetY = this.img1.y + this.group1.y - this.img1.height;
				targetW = this.img1.width;
				targetH = this.img1.height;
				targetIndex = 1;
				break;
			}
			egret.Tween.get(e.data)
			.to({x:targetX, y:targetY - 20, scaleX:0.4, scaleY:0.55}, 1000)
			.call(()=>{
				let target:Target = new Target();
				target.x = this["img" + targetIndex].x;
				target.y = this["img" + targetIndex].y;
				target.width = targetW;
				target.height = targetH;
				target.food = mu.food;
				this._imgArr.push(target);
				this["group" + targetIndex].addChildAt(target, 1);
				e.data.removeQianZi();
				e.data.getBox();
				for(let i = 0; i < this._packArr.length; i++) {
					if(this._packArr[i] == mu.food.cookId){
						this._packArr[i] = "";
					}
				}
				egret.Tween.get(this._imgArr[this._imgArr.length - 1])
				.to({x:this._xPosArr[(parseInt(site.siteNum) - 1) % 8]}, 2000)
				.call(()=>{
					this["u" + site.siteNum].changeStatusImg();
				}, this);
			}, this);
		}

		dispose() {
			super.dispose();
		}
	}
}