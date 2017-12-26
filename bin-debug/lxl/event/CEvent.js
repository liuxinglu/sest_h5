var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lxl;
(function (lxl) {
    var CEventInit = (function () {
        function CEventInit() {
        }
        return CEventInit;
    }());
    lxl.CEventInit = CEventInit;
    __reflect(CEventInit.prototype, "lxl.CEventInit", ["EventInit"]);
    var CEvent = (function (_super) {
        __extends(CEvent, _super);
        function CEvent(type, param, timeSpan, bubbles, cancelable) {
            if (param === void 0) { param = null; }
            if (timeSpan === void 0) { timeSpan = 0; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            var _this = _super.call(this, type, bubbles, cancelable, param) || this;
            // let ceinit:CEventInit = new CEventInit();
            // ceinit.bubbles = bubbles;
            // ceinit.cancelable = cancelable;
            _this._param = param;
            return _this;
        }
        Object.defineProperty(CEvent.prototype, "param", {
            get: function () {
                return this._param;
            },
            enumerable: true,
            configurable: true
        });
        return CEvent;
    }(egret.Event));
    /**
     *连接到服务器
     */
    CEvent.CONNECT_SERVER = "CEVENT::CONNECT_SERVER";
    /**
     *连接失败
     */
    CEvent.CONNECT_FAIL = "CEVENT::CONNECT_FAIL";
    /**
     *加载资源完成
     */
    CEvent.LOAD_SKIN_COMPLETE = "CEVENT::LOAD_SKIN_COMPLETE";
    /**
     * 加载配置完成
     */
    CEvent.LOAD_CONFIG_COMPLETE = "CEVENT::LOAD_CONFIG_COMPLETE";
    /**
     * 加载一组资源完成
     */
    CEvent.LOAD_GROUP_COMPLETE = "CEVENT::LOAD_GROUP_COMPLETE";
    /**
     * 加载进度
     */
    CEvent.LOAD_PROGRESS = "CEVENT::LOAD_PROGRESS";
    CEvent.CLICK = "CEVENT::CLICK";
    //完成选择
    CEvent.SEL_COMPLETE = "CEVENT::SEL_COMPLETE";
    //成功完成游戏
    CEvent.SUCCESS = "CEVENT::SUCCESS";
    CEvent.SEND_MESSAGE = "CEVENT::SEND_MESSAGE";
    CEvent.EYE_CHANGE = "CEVENT::EYE_CHANGE";
    CEvent.PROTECTE_EYE = "CEVENT::PROTECTE_EYE";
    CEvent.SPACE = "CEVENT::SPACE";
    CEvent.LEFT = "CEVENT::LEFT";
    CEvent.RIGHT = "CEVENT::RIGHT";
    CEvent.UP = "CEVENT::UP";
    CEvent.DOWN = "CEVENT::DOWN";
    //新用户进来
    CEvent.NEW_USER = "CEVENT::NEW_USER";
    //新订单进来
    CEvent.NEW_FOOD = "CEVENT::NEW_FOOD";
    //放到一个新的位置
    CEvent.NEW_SITE = "CEVENT::NEW_SITE";
    CEvent.REMOVE_USER = "CEVENT::REMOVE_USER";
    CEvent.REMOVE_FOOD = "CEVENT::REMOVE_FOOD";
    CEvent.REMOVE_SITE = "CEVENT::REMOVE_SITE";
    CEvent.MOVIE_COMPLETE = "CEVENT::MOVIE_COMPLETE";
    CEvent.MAKE_COMPLETE_UP = "CEVENT::MAKE_COMPLETE_UP";
    CEvent.MAKE_COMPLETE_DOWN = "CEVENT::MAKE_COMPLETE_DOWN";
    CEvent.PACK_COMPLETE = "CEVENT::PACK_COMPLETE";
    lxl.CEvent = CEvent;
    __reflect(CEvent.prototype, "lxl.CEvent");
})(lxl || (lxl = {}));
//# sourceMappingURL=CEvent.js.map