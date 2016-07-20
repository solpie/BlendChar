import {ServerConf} from "../model/Const";
export var execRouter = require('express').Router();
//url: exec/
execRouter.get('/', function (req:any, res:any) {
    res.send(execInfo.pop());
});
class ExecInfo {
    code:string = "import bpy;bpy.ops.object.select_all()";
    data:any;

    push(code:string) {
        this.code = code;
    }

    pop():string {
        var c = this.code;
        this.code = '';
        return c;
    }

    post(data, url) {
        return `import urllib.request
import urllib.parse
data = urllib.parse.urlencode(${data})
data = data.encode('utf-8')
request = urllib.request.Request("http://127.0.0.1:${ServerConf.port}/${url}")
request.add_header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
f = urllib.request.urlopen(request, data)`
    }
}
export var execInfo = new ExecInfo();