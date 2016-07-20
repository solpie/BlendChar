import {ServerConf} from "../model/Const";
export var blendCharRouter = require('express').Router();

blendCharRouter.get('/', function (req:any, res:any) {
    res.render('BlendChar/index',{host:ServerConf.host,wsPort:ServerConf.wsPort});
});