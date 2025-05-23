/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2025 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

//  RESERVED properties that a Tween config object uses

//  completeDelay: The time the tween will wait before the onComplete event is dispatched once it has completed
//  delay: The time the tween will wait before it first starts
//  duration: The duration of the tween
//  ease: The ease function used by the tween
//  easeParams: The parameters to go with the ease function (if any)
//  flipX: flip X the GameObject on tween end
//  flipY: flip Y the GameObject on tween end
//  hold: The time the tween will pause before running a yoyo
//  loop: The time the tween will pause before starting either a yoyo or returning to the start for a repeat
//  loopDelay:
//  paused: Does the tween start in a paused state, or playing?
//  props: The properties being tweened by the tween
//  repeat: The number of times the tween will repeat itself (a value of 1 means the tween will play twice, as it repeated once)
//  repeatDelay: The time the tween will pause for before starting a repeat. The tween holds in the start state.
//  targets: The targets the tween is updating.
//  yoyo: boolean - Does the tween reverse itself (yoyo) when it reaches the end?

module.exports = [
    'callbackScope',
    'completeDelay',
    'delay',
    'duration',
    'ease',
    'easeParams',
    'flipX',
    'flipY',
    'hold',
    'interpolation',
    'loop',
    'loopDelay',
    'onActive',
    'onActiveParams',
    'onComplete',
    'onCompleteParams',
    'onLoop',
    'onLoopParams',
    'onPause',
    'onPauseParams',
    'onRepeat',
    'onRepeatParams',
    'onResume',
    'onResumeParams',
    'onStart',
    'onStartParams',
    'onStop',
    'onStopParams',
    'onUpdate',
    'onUpdateParams',
    'onYoyo',
    'onYoyoParams',
    'paused',
    'persist',
    'props',
    'repeat',
    'repeatDelay',
    'targets',
    'yoyo'
];
