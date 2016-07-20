export var execRouter = require('express').Router();

execRouter.get('/', function (req:any, res:any) {
    res.send(execInfo.pop());
});
class ExecInfo {
    code:string = "import bpy;bpy.ops.object.select_all()";

    push(code:string) {
        this.code = code;
    }

    pop():string {
        var c = this.code;
        this.code = '';
        return c;
    }
}
export var execInfo = new ExecInfo();