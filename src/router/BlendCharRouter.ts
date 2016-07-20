import {ServerConf, EventId, ScParam, PanelId} from "../model/Const";
import {execInfo} from "./ExecRouter";
export var blendCharRouter = require('express').Router();

var ws:any = {io: null, blendcharIO: null};
export var initWebSocket = ()=> {
    ws.io = require('socket.io')(ServerConf.wsPort);
    ws.blendcharIO = ws.io.of(`/${PanelId.blendchar}`)
        .on("connect", (wsc:any)=> {
            console.log('ws connect: /blendchar');
        });

};
//url: blendchar/
blendCharRouter.get('/', function (req:any, res:any) {
    res.render('BlendChar/index', {host: ServerConf.host, wsPort: ServerConf.wsPort});
});
//browser post to server
var csCmdMap:any = {};
//blender post to server
var bsCmdMap:any = {};
/////////////////////////////init data ///////////////////////////////////
csCmdMap[`${EventId.cs_initDashboard}`] = (param) => {
    execInfo.push(sync_py
        + execInfo.post("{'bpyData': bpyData}",
            `blendchar/bs/${EventId.bs_initDashboard}`));
};
var sync_py = `
import bpy
bpyData = {}
bpyData["armatures"] = []
for obj in bpy.data.objects:
    if obj.type == 'ARMATURE':
        amt = {}
        amt["name"] = obj.name
        amt["armature"] = obj.data.name
        amt["bones"] = []
        for bone in obj.data.bones:
            boneData = {}
            boneData["name"] = bone.name
            boneData["head"] = bone.head
            boneData["tail"] = bone.tail
            amt["bones"].append(boneData)
        bpyData["armatures"].append(amt)
        pass
    pass
`;
bsCmdMap[`${EventId.bs_initDashboard}`] = (param) => {
    // execInfo.data = param.bpyData;
    ws.blendcharIO.emit(`${EventId.initDashboard}`, ScParam({bpydata: param.bpyData}));
    console.log('bs_initDashboard', param.bpyData);
};
////////////////////////////////////////////////////////
blendCharRouter.post('/:cmdId', (req:any, res:any)=> {
    if (!req.body) return res.sendStatus(400);
    var cmdId = req.params.cmdId;
    var param = req.body;
    var isSend = csCmdMap[cmdId](param);
    if (!isSend)
        res.sendStatus(200);
});
blendCharRouter.post('/bs/:cmdId', (req:any, res:any)=> {
    if (!req.body) return res.sendStatus(400);
    var cmdId = req.params.cmdId;
    var param = req.body;
    var isSend = bsCmdMap[cmdId](param);
    if (!isSend)
        res.sendStatus(200);
});
