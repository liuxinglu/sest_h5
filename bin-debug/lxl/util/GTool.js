var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lxl;
(function (lxl) {
    var GTool = (function () {
        function GTool() {
        }
        GTool.randomTrianglePoints = function (d, h) {
            var arr = [];
            //通過一點和距離以及另一點的X坐標算出另一點的Y坐標，然後就能確定這兩個點的直線方程式
            var pnt1 = new egret.Point(Math.floor(Math.random() * 100 + 300), Math.floor(Math.random() * 100 + 200));
            var funX = Math.random() * d + pnt1.x;
            var funY = Math.sqrt(Math.pow(d, 2) - Math.pow(funX - pnt1.x, 2)) + pnt1.y;
            var pnt2 = new egret.Point(funX, funY);
            var kbArr1 = this.getKBFromTwoPoint(pnt1, pnt2);
            //知道了直線方程式就可以知道它的垂線方程式以及這兩條線的交點坐標
            var funBT = funY + funX / kbArr1[0];
            var funXT = kbArr1[0] * (funBT - kbArr1[1]) / (Math.pow(kbArr1[0], 2) + 1);
            var funYT = (Math.pow(kbArr1[0], 2) * (funBT - kbArr1[1])) / (Math.pow(kbArr1[0], 2) + 1) + kbArr1[1];
            //通過交點坐標和高度確定另一點坐標
            // let funX1T:number = Math.random() * h + funXT;
            // let funY1T:number = Math.sqrt(Math.pow(h, 2) - Math.pow(funX1T - funXT, 2)) + funXT;
            var funPnt = new egret.Point(funXT, funYT);
            var pnt3 = new egret.Point();
            for (var i = funXT; i < funXT + h; i++) {
                pnt3.x = i;
                pnt3.y = -1 * i / kbArr1[0] + funBT; //Math.sqrt(Math.pow(h, 2) - Math.pow(i - funXT, 2)) + funXT;
                if (egret.Point.distance(pnt3, funPnt) == h)
                    break;
            }
            // funX1T = pnt3.x;
            // funY1T = pnt3.y;
            arr = [pnt1, pnt3, pnt2];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].x > lxl.GlobalData.getInstance().root.width) {
                    arr = this.randomTrianglePoints(d, h);
                    break;
                }
                if (i == arr.length - 1) {
                    return arr;
                }
            }
        };
        /**
         * 通过固定的底和高随机绘制三角形
         * d 底边长度
         * h 高的长度
         */
        GTool.drawRandomTriangle = function (g, d, h) {
            var arr = [];
            arr = this.randomTrianglePoints(d, h);
            g.lineStyle(1, 0x979797);
            g.beginFill(0x00B88E, 0.8);
            g.moveTo(arr[0].x, arr[0].y);
            g.lineTo(arr[1].x, arr[1].y);
            g.lineTo(arr[2].x, arr[2].y);
            g.lineTo(arr[0].x, arr[0].y);
            g.endFill();
            lxl.logs.log("d: " + d + ", h: " + h);
            lxl.logs.log(arr.toString());
            return arr;
        };
        GTool.drawTriangleByStaticSide = function (g, pntArr) {
            g.lineStyle(1, 0x979797);
            g.beginFill(0xA6D10A, 0.8);
            g.moveTo(pntArr[0].x, pntArr[0].y);
            g.lineTo(pntArr[1].x, pntArr[1].y);
            g.lineTo(pntArr[2].x, pntArr[2].y);
            g.lineTo(pntArr[0].x, pntArr[0].y);
            g.endFill();
        };
        /**
         * 通过pnt1，pnt2确定一条平行线，该平行线过pnt3
         */
        GTool.drawParallelLine = function (g, pnt1, pnt2, pnt3) {
            var k = this.getKBFromTwoPoint(pnt1, pnt2)[0];
            var lineB = pnt3.y - k * pnt3.x;
            var yy = 0;
            var xx = -1 * lineB / k;
            var yy2 = 640;
            var xx2 = (yy2 - lineB) / k;
            g.lineStyle(1, 0x979797);
            g.moveTo(pnt3.x, pnt3.y);
            g.lineTo(xx, yy);
            g.moveTo(pnt3.x, pnt3.y);
            g.lineTo(xx2, yy2);
            return [k, lineB];
        };
        GTool.getKBFromTwoPoint = function (pnt1, pnt2) {
            var funB = (pnt2.x * pnt1.y - pnt1.x * pnt2.y) / (pnt2.x - pnt1.x);
            var k = (pnt2.y - funB) / pnt2.x;
            return [k, funB];
        };
        /**
         * 获取相对于k b的垂线k b
         */
        // static getVerticalLineKAndB(k:number, b:number):Array<number> {
        // 	let funBT:number = funY + funX / k;
        // 	let funXT:number = k * (funBT - b) / (Math.pow(k, 2) + 1);
        // 	let funYT:number = (Math.pow(k, 2) * (funBT - b)) / (Math.pow(k, 2) + 1) + b;
        // }
        /**
         * 带箭头的线
         */
        GTool.drawArrowWithVector = function (g, pnt1, pnt2) {
            //箭头长度
            var len = 10;
            //箭头与直线的夹角
            var _a = 30;
            var x1 = pnt1.x;
            var y1 = pnt1.y;
            var x2 = pnt2.x;
            var y2 = pnt2.y;
            var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
            g.lineStyle(5, 0xff5566);
            g.moveTo(x2, y2);
            g.lineTo(x2 + len * Math.cos((angle - _a) * (Math.PI / 180)), y2 + len * Math.sin((angle - _a) * (Math.PI / 180)));
            g.moveTo(x2, y2);
            g.lineTo(x2 + len * Math.cos((angle + _a) * (Math.PI / 180)), y2 + len * Math.sin((angle + _a) * (Math.PI / 180)));
            g.moveTo(x1, y1);
            g.lineTo(x2, y2);
        };
        /**
         * color 填充色
         * r 半径
         * pnt 圆心
         * pntAngle 旋转角度所在点
         */
        GTool.drawFan = function (g, color, r, pnt, pntAngle) {
            // g.beginFill(color,50);
            // g.lineStyle(0,0xff0000);
            // g.moveTo(pnt.x, pnt.y);
            // let angle = pnt
            // angle=(Math.abs(angle)>360)?360:angle;
            // var n:Number=Math.ceil(Math.abs(angle)/45);
            // var angleA:Number=angle/n;
            // angleA=angleA*Math.PI/180;
            // startFrom=startFrom*Math.PI/180;
            // g.lineTo(x+r*Math.cos(startFrom),y+r*Math.sin(startFrom));
            // for (var i=1; i<=n; i++) {
            // 	startFrom+=angleA;
            // 	var angleMid=startFrom-angleA/2;
            // 	var bx=x+r/Math.cos(angleA/2)*Math.cos(angleMid);
            // 	var by=y+r/Math.cos(angleA/2)*Math.sin(angleMid);
            // 	var cx=x+r*Math.cos(startFrom);
            // 	var cy=y+r*Math.sin(startFrom);
            // 	g.curveTo(bx,by,cx,cy);
            // }
            // if (angle!=360) {
            // 	g.lineTo(x,y);
            // }
            // g.endFill();
        };
        GTool.drawWuJiao = function (g, color, arr) {
            g.lineStyle(1, color);
            g.beginFill(color, 0.5);
            g.moveTo(arr[0].x, arr[0].y);
            for (var i = 0; i < arr.length; i++) {
                g.lineTo(arr[i].x, arr[i].y);
            }
            g.lineTo(arr[arr.length - 1].x, arr[arr.length - 1].y);
            g.endFill();
        };
        return GTool;
    }());
    lxl.GTool = GTool;
    __reflect(GTool.prototype, "lxl.GTool");
})(lxl || (lxl = {}));
//# sourceMappingURL=GTool.js.map