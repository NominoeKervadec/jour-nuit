const St = imports.gi.St;
const Main = imports.ui.main;
const Util = imports.misc.util;
const Gio = imports.gi.Gio;

let text, button;
let _dark = 'Arc';
let _darker = 'Arc-Dark';
let _themeName = _dark;

function changeTheme() {
    let _stylesheet = null;
    if(_themeName == _dark) {
        _themeName = _darker;
    } else {
        _themeName = _dark;
    }
    
    Util.spawnCommandLine("gsettings set org.gnome.desktop.interface gtk-theme \""+_themeName+"\"");
}

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'weather-few-clouds-symbolic',
                             style_class: 'system-status-icon' });
    let schema = new Gio.Settings({ schema: "org.gnome.desktop.interface"});
    _themeName = schema.get_user_value("gtk-theme").get_string()[0];
    
    button.set_child(icon);
    button.connect('button-press-event', changeTheme);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
