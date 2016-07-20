
import bpy
ARMATURE_list = []
for obj in bpy.data.objects:
    if obj.type == 'ARMATURE':
        ARMATURE_list.append(obj.name)
        pass
    pass
import urllib.request
import urllib.parse
data = urllib.parse.urlencode({'list': ARMATURE_list})
data = data.encode('utf-8')
request = urllib.request.Request("http://127.0.0.1:9527/list")
request.add_header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
f = urllib.request.urlopen(request, data)