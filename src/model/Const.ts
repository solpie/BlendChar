export const PanelId = {
    dashboard: 'dashboard',
    blendchar: 'blendchar',//do not modify
    playerPanel: 'player'
};
export const ViewConst = {
    STAGE_WIDTH: 1920,
    STAGE_HEIGHT: 1080
};

export enum EventId{
    initDashboard = 1000,
    cs_initDashboard,
    bs_initDashboard,
    cs_selectObjBone,
    end
}
export var ServerConf:any = {isDev: false};
export function ScParam(param) {
    return param
}
