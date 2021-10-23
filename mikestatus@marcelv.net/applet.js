// Debuggen: Alt+F2 en type lg (Melange debugger)
const GLib = imports.gi.GLib;
const Applet = imports.ui.applet;
const Util = imports.misc.util;
const Lang = imports.lang;
const Mainloop = imports.mainloop;

const AppletDirectory = imports.ui.appletManager.appletMeta["mikestatus@marcelv.net"].path

function MyApplet(orientation, panel_height, instance_id) {
 this._init(orientation, panel_height, instance_id);
}

MyApplet.prototype = {
 __proto__: Applet.IconApplet.prototype,

 _init: function(orientation, panel_height, instance_id) {
  Applet.IconApplet.prototype._init.call(this, orientation, panel_height, instance_id);

  this.set_applet_icon_name("audio-input-microphone");
  this.set_applet_tooltip(_("Microfoonstatus"));
  this.Mute=true;
  this._update_loop();
 },
    
 _get_status:function() {
  try {
   let [result, uit, stderr]=GLib.spawn_command_line_sync(`amixer -D pulse get Capture`);
   let x= uit.toString().indexOf("[on]")>=0;
   this.set_applet_icon_name(x? "groen" : "rood");
   this.Mute = !x;
  }
  catch(e){global.log("Foutje",e);}
 },
 
 _update_loop: function () {
  this._get_status();
  Mainloop.timeout_add(500, Lang.bind(this, this._update_loop));
 },
   
 on_applet_clicked: function() {
  if(this.Mute) {
   Util.spawnCommandLine(AppletDirectory + "/aan.sh")
   this.set_applet_icon_name("groen");
  }
  else {
   Util.spawnCommandLine(AppletDirectory + "/mute.sh")
   this.set_applet_icon_name("rood");
  }
 }
};

function main(metadata, orientation, panel_height, instance_id) {
 return new MyApplet(orientation, panel_height, instance_id);
}

