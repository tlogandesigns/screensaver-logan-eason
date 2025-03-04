const { St, GObject, Clutter } = imports.gi;
const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;

let screensaver;

const Screensaver = GObject.registerClass(
    class Screensaver extends St.Widget {
        _init() {
            super._init({
                style_class: 'screensaver',
                reactive: true,
                x: 0, y: 0,
                width: global.stage.width,
                height: global.stage.height
            });

            this._animation = new Clutter.Actor();
            this._animation.set_background_color(new Clutter.Color({ red: 0, green: 0, blue: 0, alpha: 255 }));
            this.add_child(this._animation);

            this.connect('button-press-event', () => this.destroy());
            this.connect('motion-event', () => this.destroy());

            global.stage.add_actor(this);
        }
    }
);

function enable() {
    if (!screensaver) {
        screensaver = new Screensaver();
    }
}

function disable() {
    if (screensaver) {
        screensaver.destroy();
        screensaver = null;
    }
}
