import {VueEx} from "../VueEx";
import {DashboardView} from "./Dashboard/DashboardView";
declare var io:any;
declare var host:any;
declare var wsPort:any;
export class Panel extends VueEx {
    pid:string;
    isOp:boolean;

    connect() {
        var wsUrl = `http://${host}:${wsPort}/${this.pid}`;
        console.log("init panel", this.pid, this.isOp, wsUrl);
        return io.connect(wsUrl)
    }
}
//router
import Vue = require('vue');
Vue.use(require('vue-resource'));

import VueRouter = require('vue-router');
import ComponentOption = vuejs.ComponentOption;
Vue.use(VueRouter);

var router = new VueRouter<Panel>();

router.map({
    '/': {
        component: DashboardView,
        name: 'dashboard'
    }
});
router.afterEach((transition) => {
    var toPath = transition.to.path;
    router.app.isOp = /\/op/.test(toPath);
    // if (/\/stage/.test(toPath)) {
    //     router.app.pid = PanelId.stagePanel;
    // } else if (/\/act/.test(toPath)) {
    //     router.app.pid = PanelId.actPanel;
    // } else if (/\/screen/.test(toPath)) {
    //     router.app.pid = PanelId.screenPanel;
    // }
    // console.log('after each!!!', toPath);
});
router.start(Panel, '#panel');
console.log('start router');
