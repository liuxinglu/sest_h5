module app {
	export class MakeUnit extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "MakeUnitSkin.exml");
		}

		private img_head:eui.Image;
		private img_mask:eui.Image;
		private group:eui.Group;
		private _mc:egret.MovieClip;
		private _hasSubArr:Array<string> = ["gaijiaofan1_5", "panini3_1", "yimian1_3"];
		food:Food;
		line:number = 0;
		subStep:number = -1;

		onActivity():void {
			super.onActivity();
			this.img_head.mask = this.img_mask;
			Res.getResByUrl(this.food.user.avatar, (e)=> {
				this.img_head.texture = e.target.data;
			}, this, egret.URLLoaderDataFormat.TEXTURE);
			this.playAni(1);
		}

		playAni(num:number) {
			for(let i = 0; i < this._hasSubArr.length; i++) {
				if(Gra.getFoodName(this.food.foodType) + this.food.curStep.toString() == this._hasSubArr[i].split("_")[0]) {
					this.subStep++;
					break;
				}
			}
			let movieName = Gra.getMovieId(this.food.foodType, this.food.curStep, this.subStep);
			if(this._mc) {
				this._mc.removeEventListener(egret.Event.COMPLETE, this.stopAni, this);
				this.group.removeChild(this._mc);
				this._mc = null;
			}
			this._mc = Res.getMovieClip(movieName + "_json", movieName + "_png", movieName);
			this._mc.addEventListener(egret.Event.COMPLETE, this.stopAni, this);
			this.group.addChild(this._mc);
			this._mc.play(num);
		}

		stopAni(e:lxl.CEvent) {
			if(this.subStep >= 0) {
				for(let i = 0; i < this._hasSubArr.length; i++) {
					if((Gra.getFoodName(this.food.foodType) + this.food.curStep.toString() == this._hasSubArr[i].split("_")[0]) && this.subStep.toString() == this._hasSubArr[i].split("_")[1]) {
						this._mc.stop();
						this.subStep = -1;
						this.dispatchEvent(new lxl.CEvent(lxl.CEvent.MOVIE_COMPLETE, this));
					} else if(Gra.getFoodName(this.food.foodType) + this.food.curStep.toString() == this._hasSubArr[i].split("_")[0]) {
						this.playAni(1);
					} 
				}
			} else {
				this._mc.stop();
				this.dispatchEvent(new lxl.CEvent(lxl.CEvent.MOVIE_COMPLETE, this));
			}
		}

		dispose() {
			super.dispose();
		}
	}
}