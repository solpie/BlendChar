# -*- coding: utf-8 -*-
__author__ = 'SolPie'
import bpy

bl_info = {
    "name": "Char Tools",
    "author": "SolPie",
    "version": (1, 0),
    "blender": (2, 7, 7),
    "location": "start BlendCharServer and run.BlendCharExec Remote Web Browser 9527",
    "description": "misc tool 2",
    "warning": "",
    "category": "Rig"}

from bpy.props import StringProperty, IntProperty, BoolProperty

# Addon prefs
class BlendCharPrefs(bpy.types.AddonPreferences):
    bl_idname = __name__
    port = IntProperty(
        name="web server port",
        default=9527,
    )
    enable = BoolProperty(
        name="enable",
        default=False,
    )

    def draw(self, context):
        layout = self.layout
        row = layout.row()
        row.prop(self, "port")
        row.prop(self, "enable")
        # self.checkEnable(context)
####################################
class BlendCharExec(bpy.types.Operator):
    bl_idname = "blendchar.exec"
    bl_label = "run.BlendCharExec"

    _timer = None

    def modal(self, context, event):
        # if event.type == 'ESC':
        #     return self.cancel(context)

        if event.type == 'TIMER':
            user_preferences = context.user_preferences
            addon_prefs = user_preferences.addons[__name__].preferences
            server_port = addon_prefs.port
            try:
                from urllib.request import urlopen
                code = urlopen("http://127.0.0.1:"+str(server_port) +"/exec").read()
                if code:
                    exec(compile(code, '<string>', 'exec'))
            except:pass
        return {'PASS_THROUGH'}

    def execute(self, context):
        self._timer = context.window_manager.event_timer_add(0.1, context.window)
        context.window_manager.modal_handler_add(self)
        return {'RUNNING_MODAL'}

    def cancel(self, context):
        context.window_manager.event_timer_remove(self._timer)
        return {'CANCELLED'}

###########
def register():
    bpy.utils.register_class(BlendCharPrefs)
    bpy.utils.register_class(BlendCharExec)


def unregister():
    bpy.utils.unregister_class(BlendCharPrefs)
    bpy.utils.unregister_class(BlendCharExec)



