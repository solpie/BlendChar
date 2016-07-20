import {getIPAddress} from "./utils/NodeJsFunc";
import {blendCharRouter, initWebSocket} from "./router/BlendCharRouter";
import {ServerConf} from "./model/Const";
import {execRouter} from "./router/ExecRouter";
var dataObj:any;
let localhost;
/**
 * WebServer
 */
export class WebServer {
    serverConf:any;
    socketIO:any;
    constructor(callback?:any) {
        this.initEnv(callback);
        this.initGlobalFunc();
    }


    initGlobalFunc() {
        // this._path = _path;
    }

    initEnv(callback:any) {
        var process = require("process");
        ServerConf.isDev = process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath);
        console.log(process.execPath, ServerConf.isDev);

        var fs = require('fs');
        fs.readFile(('resources/app/package.json'), (err:any, data:any)=> {
            if (err) throw err;
            dataObj = JSON.parse(data);
            ServerConf.port = dataObj.server.port;
            ServerConf.wsPort = dataObj.server.wsPort;
            if (dataObj.server.autoIP) {
                getIPAddress((ip)=> {
                    localhost = ip;
                    ServerConf.host = ip;
                    console.log("autoIP:", ip);
                    this.initServer();
                });
            }
            else {
                ServerConf.host = dataObj.server.host;
                this.initServer();
            }
            this.serverConf = ServerConf;
            console.log("server config:", ServerConf);
            if (callback)
                callback(dataObj);
        });
    }

    initServer() {
        var express:any = require('express');
        var app = express();

        // view engine setup
        app.set('views', "./resources/app/view");
        app.set('view engine', 'ejs');

        app.use(express.static("./resources/app/static"));//
        var bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({extended: false, limit: '55mb'}));// create application/x-www-form-urlencoded parser
        app.use(bodyParser.json({limit: '50mb'}));

        // app.all("*", function (req:any, res:any, next:any) {
        //     res.header('Access-Control-Allow-Origin', '*');
        //     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        //     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        //     if (req.method == 'OPTIONS') {
        //         res.send(200);
        //     } else {
        //         next();
        //     }
        // });

        app.get('/', function (req:any, res:any) {
            res.redirect('/blendchar');
        });

        app.use('/blendchar', blendCharRouter);
        app.use('/exec', execRouter);

        app.listen(ServerConf.port, () => {
            this.initSocketIO();
            //and... we're live
            console.log(`server on:${ServerConf.port}  ws port:${ServerConf.wsPort}`);
        });
    }

    initSocketIO() {
        initWebSocket();
        // this.socketIO = require('socket.io')(ServerConf.wsPort);
    }
}
export var webServer = new WebServer();