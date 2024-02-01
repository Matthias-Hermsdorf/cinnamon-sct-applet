const Applet = imports.ui.applet
const Util = imports.misc.util
const Settings = imports.ui.settings  // Needed for settings API
const GLib = imports.gi.GLib


const defaultIconName = "night-light-symbolic"

const homeDir = GLib.get_home_dir()
const appletPath = homeDir+ '/.local/share/cinnamon/applets/sct@skulptist.de';
const iconPath = appletPath + "/iconThermometer.svg";
    
// let currentStep = 0

function MyApplet(metadata, orientation, panel_height, instance_id) {
  this._init(metadata, orientation, panel_height, instance_id);
}

MyApplet.prototype = {
  __proto__: Applet.IconApplet.prototype,

  iconName: "night-light-symbolic",
  
  _init: function(metadata, orientation, panel_height, instance_id) {
    Applet.IconApplet.prototype._init.call(this, orientation, panel_height, instance_id);
    
    this.settings = new Settings.AppletSettings(this, metadata.uuid, instance_id)
    
    this.set_applet_tooltip(_("sct toggle"))
    
    this.settings.bindProperty(Settings.BindingDirection.OUT, "currentStep", "currentStep");

    this.settings.bindProperty(Settings.BindingDirection.IN, "colorStep1", "colorStep1");
    this.settings.bindProperty(Settings.BindingDirection.IN, "colorStep2", "colorStep2");
    this.settings.bindProperty(Settings.BindingDirection.IN, "colorStep3", "colorStep3");
    this.settings.bindProperty(Settings.BindingDirection.IN, "colorStep4", "colorStep4");
    this.settings.bindProperty(Settings.BindingDirection.IN, "colorStep5", "colorStep5");
    this.settings.bindProperty(Settings.BindingDirection.IN, "colorStep6", "colorStep6");
    this.settings.bindProperty(Settings.BindingDirection.IN, "colorStep7", "colorStep7");
    this.settings.bindProperty(Settings.BindingDirection.IN, "iconName", "iconName", this.handleIconChange);
    
    global.log("iconPath", iconPath)
    this.set_applet_icon_name(this.iconName)
    // this.set_applet_icon_path(iconPath);
    // this.set_applet_icon_name(this.iconName)
    // global.log("hi there")
    // this.notifyInstallation()
  },

  handleIconChange: function() {
    // this.set_applet_icon_name(this.iconName)
  },

  handleResetIconName: function() {

    this.set_applet_icon_name(defaultIconName)
  },

  getSteps: function() {
    let steps = []
    if (this.colorStep1) {
      steps.push(parseInt(this.colorStep1))
    }
    if (this.colorStep2) {
      steps.push(parseInt(this.colorStep2))
    }
    if (this.colorStep3) {
      steps.push(parseInt(this.colorStep3))
    }
    if (this.colorStep4) {
      steps.push(parseInt(this.colorStep4))
    }
    if (this.colorStep5) {
      steps.push(parseInt(this.colorStep5))
    }
    if (this.colorStep6) {
      steps.push(parseInt(this.colorStep6))
    }
    if (this.colorStep7) {
      steps.push(parseInt(this.colorStep7))
    }
    return steps
  },
  
  on_applet_clicked: function() {

    let steps = this.getSteps()
    if (this.currentStep == undefined) {
      this.currentStep = 0
    }
    
    if (this.currentStep >= (steps.length -1)) {
      this.currentStep = 0
    } else {
      this.currentStep = this.currentStep + 1
    }

    this.setColorTemperature(steps[this.currentStep])    
  },

  setColorTemperature: function (val) {
    Util.spawnCommandLine("sct "+val)
    this.set_applet_tooltip(_("sct toggle, now " + val + "K"))
  },
  
  notifyInstallation: function() {
      const title = "Please install sct"
      const body = "The sct toggle applet uses sct to set the color temperature."
      Util.spawnCommandLine(`notify-send "${title}" "${body}" -i ${this.iconName}`)
  }
};

function main(metadata, orientation, panel_height, instance_id) {
  return new MyApplet(metadata, orientation, panel_height, instance_id);
}
