import {BasePanelView} from "../BasePanelView";
import {PanelId, EventId} from "../../../model/Const";
import {Component} from "../../VueEx";
@Component({
    template: require('./dashboard.html'),
    props: {bpyCode: {}}
})
export class DashboardView extends BasePanelView {
    bpyCode:string;

    ready() {
        var io = super.ready(PanelId.dashboard);
        io.on(`${EventId.initDashboard}`, (param)=> {
            console.log('initDashboard', param);
        });
    }

    onSync() {
        console.log('onSync');
        this.$http.post(`/blendchar/${EventId.cs_initDashboard}`, (res)=> {
            console.log(res);
        })
    }
}