// var AnimationBlending = pc.createScript('animationBlending');

// // initialize code called once per entity
// AnimationBlending.prototype.initialize = function() {
    
// };

// // update code called every frame
// AnimationBlending.prototype.update = function(dt) {
    
// };

// swap method called for script hot-reloading
// inherit your script state here
// AnimationBlending.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/
// 
// 
// 
var AnimationBlending = pc.createScript('animationBlending');

AnimationBlending.states = {
    idle: { 
        animation: 'male.json' 
    },
    punch: { 
        animation: 'male_uppercut_jab.json' 
    }
};

// initialize code called once per entity
AnimationBlending.prototype.initialize = function() {
    this.blendTime = 0.2;

    this.setState('idle');

    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.keyDown, this);
    this.app.keyboard.on(pc.EVENT_KEYUP, this.keyUp, this);
    
    // Only register touch events if the device supports touch
    var touch = this.app.touch;
    if (touch) {
        touch.on(pc.EVENT_TOUCHSTART, this.keyDown, this);
        // touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        touch.on(pc.EVENT_TOUCHEND, this.keyUp, this);
        touch.on(pc.EVENT_TOUCHCANCEL, this.keyUp, this);
    }
    
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.keyDown, this);
    this.app.mouse.on(pc.EVENT_MOUSEUP, this.keyUp, this);

};

AnimationBlending.prototype.setState = function (state) {
    var states = AnimationBlending.states;
    
    this.state = state;
    // Set the current animation, taking 0.2 seconds to blend from
    // the current animation state to the start of the target animation.
    this.entity.animation.play(states[state].animation, this.blendTime);
};

AnimationBlending.prototype.keyDown = function (e) {
    if(this.state !== 'punch'){
        if((this.app.touch && e.touches && e.touches.length === 1) || (e.key === pc.KEY_P) || (e.button === pc.MOUSEBUTTON_LEFT)){
            this.setState('punch');
        } 
    }
    // if ((e.key === pc.KEY_P) && (this.state !== 'punch')) {
    //     this.setState('punch');
    // } 
};

AnimationBlending.prototype.keyUp = function (e) {
    if(this.state === 'punch'){
        if((this.app.touch && e.touches && e.touches.length === 0) || (e.key === pc.KEY_P) || (e.button === pc.MOUSEBUTTON_LEFT)){
            this.setState('idle');
        } 
    }
    // if ((e.key === pc.KEY_P) && (this.state === 'punch')) {
    //     this.setState('idle');
    // }
};
