var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var GraManager = (function () {
        function GraManager() {
            this._aniShows = ["gaijiaofan", "yimian", "sela", "panini"];
            this._aniShowSeques = [
                [0, -1, 2, -1, 4, -1],
                [0, -1, 2, -1, 4, -1],
                [0, 1, 2, 3, 4, 5],
                [0, 1, 2, 3, 4, -1]
            ];
            this.aniPosition = [[[8, 5], [258, 5], [508, 5], [758, 5], [1008, 5], [1258, 5]],
                [[8, 179], [258, 1790], [508, 179], [758, 179], [1008, 179], [1258, 179]]];
            this._foods = [];
            this._users = [];
            this._sites = [];
        }
        GraManager.prototype.createUser = function (userId, name, sex, avatar) {
            var user = new app.User();
            user.userId = userId;
            user.name = name;
            user.sex = sex;
            user.avatar = avatar;
            this._users.push(user);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.NEW_USER, user));
            return user;
        };
        GraManager.prototype.findUserById = function (userId) {
            var user = new app.User();
            for (var i = 0; i < this._users.length; i++) {
                if (this._users[i].userId == userId) {
                    user.userId = this._users[i].userId;
                    user.name = this._users[i].name;
                    user.sex = this._users[i].sex;
                    user.avatar = this._users[i].avatar;
                }
            }
            return user;
        };
        GraManager.prototype.createFood = function (userId, cookId, foodType) {
            var food = new app.Food();
            food.cookId = cookId;
            food.foodType = foodType;
            food.user = this.findUserById(userId);
            food.totalStep = this.getTotalStep(foodType);
            this._foods.push(food);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.REMOVE_USER, food.user));
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.NEW_FOOD, food));
            return food;
        };
        GraManager.prototype.findFoodById = function (cookId) {
            var food = new app.Food();
            for (var i = 0; i < this._foods.length; i++) {
                if (this._foods[i].cookId == cookId) {
                    food = this._foods[i];
                }
            }
            return food;
        };
        GraManager.prototype.removeFood = function (userId, cookId, siteNum) {
            for (var i = 0; i < this._foods.length; i++) {
                if (this._foods[i].cookId == cookId) {
                    this._foods.splice(i, 1);
                }
            }
        };
        GraManager.prototype.createSite = function (userId, cookId, siteNum) {
            var site = new app.Site();
            site.food = this.findFoodById(cookId);
            site.siteNum = siteNum;
            this._sites.push(site);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.NEW_SITE, site));
            return site;
        };
        GraManager.prototype.findSiteByFood = function (food) {
            var site;
            for (var i = 0; i < this._sites.length; i++) {
                if (this._sites[i].food.cookId == food.cookId) {
                    site = this._sites[i];
                }
            }
            return site;
        };
        GraManager.prototype.removeSiteByFood = function (food) {
            for (var i = 0; i < this._sites.length; i++) {
                if (this._sites[i].food.cookId == food.cookId) {
                    this._sites.splice(i, 1);
                    break;
                }
            }
        };
        GraManager.prototype.getTotalStep = function (foodType) {
            var arr = this._aniShowSeques[foodType];
            var moveArr = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] > -1) {
                    moveArr.push(arr[i]);
                }
            }
            return moveArr.length;
        };
        /**
         * 不同种类的菜品对应不同的加工位
         */
        GraManager.prototype.getMakePositionsByFood = function (food) {
            var arr = this._aniShowSeques[food.foodType];
            var moveArr = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] > -1) {
                    moveArr.push(arr[i]);
                }
            }
            return moveArr;
        };
        /**
         * 通过菜品种类获得传送带下一个位置
         */
        GraManager.prototype.getNextPosByFood = function (food) {
            var arr = this.getMakePositionsByFood(food);
            if (food.curStep < food.totalStep - 1) {
                food.curStep = food.curStep + 1;
                return arr[food.curStep];
            }
            return -1;
        };
        GraManager.prototype.getMovieId = function (foodType, step, subStep) {
            if (subStep === void 0) { subStep = -1; }
            var originName = this._aniShows[foodType] + step.toString();
            if (subStep == -1) {
                return originName;
            }
            else {
                return originName + "_" + subStep;
            }
        };
        GraManager.prototype.getFoodName = function (foodType) {
            return this._aniShows[foodType];
        };
        GraManager.getInstance = function () {
            if (this._instance == null) {
                this._instance = new GraManager();
            }
            return this._instance;
        };
        return GraManager;
    }());
    app.GraManager = GraManager;
    __reflect(GraManager.prototype, "app.GraManager");
})(app || (app = {}));
//# sourceMappingURL=GraManager.js.map