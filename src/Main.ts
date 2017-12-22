var Res = lxl.GlobalData.getInstance().resManager;
var Dat = lxl.GlobalData.getInstance().dataManager;
var Gra = app.GraManager.getInstance();
class Main extends lxl.Application {
    
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected start(): void {
        super.start();
        lxl.GlobalData.getInstance().connectServer();
        lxl.GlobalData.getInstance().root = this;
        app.SetDataHandler.setHandlers();
        // app.SetDataHandler.instance.insertStudent();
        app.SetDataHandler.instance.getNewUser();
        this.root = new app.MainSence();
    }
}
