import {ServerConf} from "../model/Const";
import {execInfo} from "./ExecRouter";
export var blendCharRouter = require('express').Router();
//url: blendchar/
blendCharRouter.get('/', function (req:any, res:any) {
    res.render('BlendChar/index', {host: ServerConf.host, wsPort: ServerConf.wsPort});
});

blendCharRouter.get('/armature/sync', function (req:any, res:any) {
    execInfo.push(sync_py + execInfo.post("{'bpyData': bpyData}", 'blendchar/armature/sync'));
    res.send('sus');
});
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
blendCharRouter.post('/armature/sync', function (req:any, res:any) {
    if (!req.body) return res.sendStatus(400);
    var bpyData = req.body.bpyData;
    console.log('/armature/sync', bpyData);
    res.sendStatus(200);
});