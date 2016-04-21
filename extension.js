
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

let button;
let pauseIcon;
let label;

//Print with Main.notify( "Some text" )

function _toggleText() {
    if ( label.get_parent() == null ) {
        Main.uiGroup.add_child( label );
        
        let monitor = Main.layoutManager.primaryMonitor;
        label.set_position(monitor.x + Math.floor(monitor.width  / 2 - label.width  / 2),
                           monitor.y + Math.floor(monitor.height / 2 - label.height / 2));
    } else {
        Main.uiGroup.remove_child( label );
    }
}

function _dummy() {
    Main.notify( "dummy" );
}

function init() {
    //Actor constructions
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    pauseIcon = new St.Icon({ icon_name: 'media-playback-pause-symbolic',
                              style_class: 'system-status-icon' });
    label = new St.Label({ style_class: 'paused-label',
                           text: '<span size="x-large">P₂(ℝ) is away...\n</span><span size="xx-small">...but will come back soon. Stay tuned !</span>' });
    label.get_clutter_text().set_use_markup(true)
    label.opacity = 255;

    button.set_child(pauseIcon);

    //Signal connections
    button.connect('button-press-event', _toggleText);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
