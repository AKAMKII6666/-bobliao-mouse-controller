
/**
 * 鼠标控制器
 * 廖力编写
 * 2011 - 2022
 */
import jQuery from "jquery";
const $ = jQuery;

let isRunningInServer = false;
try {
    var w = window;
} catch (_e) { 
    isRunningInServer = true;
}

var mouseControl = null;

(function () {
    var _mControl = {
        //当前鼠标所在位置
        nowPosition: { x: 0, y: 0 },
        //[{ 'funcName': 'goodJob', 'func': function () { alert('aa'); } }, { 'funcName': 'nice', 'func': function () { alert('bb'); } }];
        //鼠标移动的预设方法
        mMReserveFunction: [],
        //鼠标左键弹上的预设方法
        mUReserveFunction: [],
        //向鼠标移动事件数组中注册一个事件
        addMouseMoveFunc: function (name, callBack) {
            this.mMReserveFunction.push({ funcName: name, func: callBack });
        },
        //向鼠标弹起事件数组中注册一个事件
        addMouseUpFunc: function (name, callBack) {
            this.mUReserveFunction.push({ funcName: name, func: callBack });
        },
        //移除鼠标移动事件数组中的某个方法
        removeMMRFunc: function (name) {
            var tempArr = [];
            for (var i = 0; i < this.mMReserveFunction.length; i++) {
                var functionPro = this.mMReserveFunction[i];
                if (functionPro.funcName != name) {
                    tempArr.push(functionPro);
                }
            }
            this.mMReserveFunction = [];
            this.mMReserveFunction = tempArr;
        },
        //移除鼠标弹起事件数组中的某个方法
        removeMURFunc: function (name) {
            var tempArr = [];
            for (var i = 0; i < this.mUReserveFunction.length; i++) {
                var functionPro = this.mUReserveFunction[i];
                if (functionPro.funcName != name) {
                    tempArr.push(functionPro);
                }
            }
            this.mUReserveFunction = [];
            this.mUReserveFunction = tempArr;
        },
    };
    if (isRunningInServer) {
        /**
         * 如果在服务器端运行就返回个假的mousecontrol
         */
        mouseControl = _mControl;
    } else {
    
        if (typeof window.mControl === "undefined") {
            window.mControl = _mControl;
            $(document).mousemove(function (e) {
                window.mControl.nowPosition.x = e.pageX;
                window.mControl.nowPosition.y = e.pageY;
                //运行预设方法
                if (window.mControl.mMReserveFunction.length != 0) {
                    for (var i = 0; i < window.mControl.mMReserveFunction.length; i++) {
                        var functionPro = window.mControl.mMReserveFunction[i];
                        functionPro.func.call(this, e);
                    }
                }
            });
            
            //当鼠标左键弹上时
            $(document).mouseup(function (e) {
                //运行预设方法
                if (window.mControl.mUReserveFunction.length != 0) {
                    for (var i = 0; i < window.mControl.mUReserveFunction.length; i++) {
                        var functionPro = window.mControl.mUReserveFunction[i];
                        functionPro.func.call(this, e);
                    }
                }
            });
        }
    
        //在客户端上运行就返回window.mControl
        mouseControl = window.mControl;
    }
})();

export default mouseControl;
