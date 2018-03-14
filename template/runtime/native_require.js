
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"libs/modules/dragonBones/dragonBones.js",
	"polyfill/promise.js",
	"bin-debug/lxl/event/CDispatcher.js",
	"bin-debug/lxl/ui/CLayer.js",
	"bin-debug/lxl/ui/CComponent.js",
	"bin-debug/lxl/ui/ConfirmPanel.js",
	"bin-debug/lxl/ui/AlertPanel.js",
	"bin-debug/app/sest/GraManager.js",
	"bin-debug/lxl/Application.js",
	"bin-debug/lxl/data/BaseDataHandler.js",
	"bin-debug/lxl/GlobalData.js",
	"bin-debug/lxl/data/PackageOut.js",
	"bin-debug/app/MainSence.js",
	"bin-debug/lxl/Alert.js",
	"bin-debug/app/sest/MakeUnit.js",
	"bin-debug/app/sest/PackUnit.js",
	"bin-debug/app/sest/ReadyArea.js",
	"bin-debug/app/sest/ReadyUnit.js",
	"bin-debug/app/sest/Target.js",
	"bin-debug/app/sest/WaitArea.js",
	"bin-debug/app/sest/WaitUnit.js",
	"bin-debug/app/test.js",
	"bin-debug/app/sest/data/Food.js",
	"bin-debug/app/sest/data/GetFoodHandler.js",
	"bin-debug/lxl/Config.js",
	"bin-debug/lxl/data/BaseData.js",
	"bin-debug/app/sest/data/GetNewUserStatusHandler.js",
	"bin-debug/lxl/data/NetData.js",
	"bin-debug/lxl/data/PackageIn.js",
	"bin-debug/lxl/ResManager.js",
	"bin-debug/lxl/DataManager.js",
	"bin-debug/lxl/euisys/AssetAdapter.js",
	"bin-debug/lxl/euisys/ThemeAdapter.js",
	"bin-debug/app/sest/data/SetDataHandler.js",
	"bin-debug/lxl/event/CEvent.js",
	"bin-debug/app/sest/data/Site.js",
	"bin-debug/lxl/interface/IDataHandler.js",
	"bin-debug/lxl/interface/IDataManager.js",
	"bin-debug/lxl/interface/IPackageIn.js",
	"bin-debug/lxl/interface/IPackageOut.js",
	"bin-debug/lxl/LoadingUI.js",
	"bin-debug/lxl/Log.js",
	"bin-debug/lxl/Pop.js",
	"bin-debug/app/sest/data/StartCookHandler.js",
	"bin-debug/lxl/Tool.js",
	"bin-debug/app/sest/data/User.js",
	"bin-debug/lxl/ui/CButton.js",
	"bin-debug/Main.js",
	"bin-debug/lxl/ui/CGroup.js",
	"bin-debug/app/sest/MainView.js",
	"bin-debug/app/sest/MakeArea.js",
	"bin-debug/lxl/util/GTool.js",
	"bin-debug/lxl/util/MathUtil.js",
	"bin-debug/lxl/util/NumberUtil.js",
	"bin-debug/lxl/util/TimerUtils.js",
	"bin-debug/app/sest/data/EndCookHandler.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 3840,
		contentHeight: 432,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};