export var selectObjBone = (objName, boneName)=> {
    return `
import bpy
def selectBone(objName,boneName):
    #select armature and active
    bpy.ops.object.mode_set(mode="OBJECT",toggle=False)
    for obj in bpy.context.scene.objects:
        obj.select = False
    rig = bpy.data.objects[objName]
    rig.select = True
    bpy.context.scene.objects.active = rig
    
    bpy.ops.object.mode_set(mode="POSE",toggle=False)
    armature = bpy.data.objects[objName].data
    bpy.ops.pose.select_all(action='DESELECT')

    armature.bones[boneName].select =True
    
selectBone('${objName}','${boneName}')
`
};