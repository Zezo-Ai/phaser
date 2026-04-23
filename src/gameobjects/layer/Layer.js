/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2026 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var BlendModes = require('../../renderer/BlendModes');
var Class = require('../../utils/Class');
var Components = require('../components');
var EventEmitter = require('eventemitter3');
var GameObject = require('../GameObject');
var GameObjectEvents = require('../events');
var List = require('../../structs/List');
var Render = require('./LayerRender');
var SceneEvents = require('../../scene/events');
var StableSort = require('../../utils/array/StableSort');

/**
 * @classdesc
 * A Layer Game Object.
 *
 * A Layer is a special type of Game Object that acts as a Display List. You can add any type of Game Object
 * to a Layer, just as you would to a Scene. Layers can be used to visually group together 'layers' of Game
 * Objects:
 *
 * ```javascript
 * const spaceman = this.add.sprite(150, 300, 'spaceman');
 * const bunny = this.add.sprite(400, 300, 'bunny');
 * const elephant = this.add.sprite(650, 300, 'elephant');
 *
 * const layer = this.add.layer();
 *
 * layer.add([ spaceman, bunny, elephant ]);
 * ```
 *
 * The 3 sprites in the example above will now be managed by the Layer they were added to. Therefore,
 * if you then set `layer.setVisible(false)` they would all vanish from the display.
 *
 * You can also control the depth of the Game Objects within the Layer. For example, calling the
 * `setDepth` method of a child of a Layer will allow you to adjust the depth of that child _within the
 * Layer itself_, rather than the whole Scene. The Layer, too, can have its depth set as well.
 *
 * The Layer class also offers many different methods for manipulating the list, such as the
 * methods `moveUp`, `moveDown`, `sendToBack`, `bringToTop` and so on. These allow you to change the
 * display list position of the Layers children, causing it to adjust the order in which they are
 * rendered. Using `setDepth` on a child allows you to override this.
 *
 * Layers have no position or size within the Scene. This means you cannot enable a Layer for
 * physics or input, or change the position, rotation or scale of a Layer. They also have no scroll
 * factor, texture, tint, origin, crop or bounds.
 *
 * If you need those kind of features then you should use a Container instead. Containers can be added
 * to Layers, but Layers cannot be added to Containers.
 *
 * However, you can set the Alpha, Blend Mode, Depth, Mask and Visible state of a Layer. These settings
 * will impact all children being rendered by the Layer.
 *
 * Layers should always be the topmost elements of any scene hierarchy.
 * They can be children of layers, but not of anything else.
 *
 * Until Phaser version 4.NEXT, Layer was not a true GameObject.
 * It is now a true GameObject.
 *
 * @class Layer
 * @extends Phaser.Structs.List.<Phaser.GameObjects.GameObject>
 * @memberof Phaser.GameObjects
 * @constructor
 * @since 3.50.0
 *
 * @extends Phaser.GameObjects.Components.AlphaSingle
 * @extends Phaser.GameObjects.Components.BlendMode
 * @extends Phaser.GameObjects.Components.Depth
 * @extends Phaser.GameObjects.Components.Mask
 * @extends Phaser.GameObjects.Components.Visible
 * @extends Phaser.GameObjects.GameObject
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object belongs. A Game Object can only belong to one Scene at a time.
 * @param {Phaser.GameObjects.GameObject[]} [children] - An optional array of Game Objects to add to this Layer.
 */
var Layer = new Class({

    Extends: List,

    Mixins: [
        EventEmitter,
        GameObject,
        Components.AlphaSingle,
        Components.BlendMode,
        Components.Depth,
        Components.Mask,
        Components.Visible,
        Render
    ],

    initialize:

    function Layer (scene, children)
    {
        List.call(this, scene);
        EventEmitter.call(this);
        GameObject.call(this, scene, 'Layer');

        /**
         * A reference to the Scene to which this Game Object belongs.
         *
         * Game Objects can only belong to one Scene.
         *
         * You should consider this property as being read-only. You cannot move a
         * Game Object to another Scene by simply changing it.
         *
         * @name Phaser.GameObjects.Layer#scene
         * @type {Phaser.Scene}
         * @since 3.50.0
         */
        this.scene = scene;

        /**
         * A reference to the Scene Systems.
         *
         * @name Phaser.GameObjects.Layer#systems
         * @type {Phaser.Scenes.Systems}
         * @since 3.50.0
         */
        this.systems = scene.sys;

        /**
         * A reference to the Scene Event Emitter.
         *
         * @name Phaser.GameObjects.Layer#events
         * @type {Phaser.Events.EventEmitter}
         * @since 3.50.0
         */
        this.events = scene.sys.events;

        /**
         * The flag that determines whether Game Objects should be sorted when `depthSort()` is called.
         *
         * @name Phaser.GameObjects.Layer#sortChildrenFlag
         * @type {boolean}
         * @default false
         * @since 3.50.0
         */
        this.sortChildrenFlag = false;

        //  Set the List callbacks
        this.addCallback = this.addChildCallback;
        this.removeCallback = this.removeChildCallback;

        this.clearAlpha();

        this.setBlendMode(BlendModes.SKIP_CHECK);

        if (children)
        {
            this.add(children);
        }

        // Initialize RenderSteps mixin.
        if (this.addRenderStep)
        {
            this.addRenderStep(this.renderWebGL);
        }

        //  Tell the Scene to re-sort the children
        scene.sys.queueDepthSort();
    },

    /**
     * A Layer cannot be enabled for input.
     *
     * This method does nothing and is kept to ensure
     * the Layer has the same shape as a Game Object.
     *
     * @method Phaser.GameObjects.Layer#setInteractive
     * @since 3.51.0
     *
     * @return {this} This GameObject.
     */
    setInteractive: function ()
    {
        return this;
    },

    /**
     * A Layer cannot be enabled for input.
     *
     * This method does nothing and is kept to ensure
     * the Layer has the same shape as a Game Object.
     *
     * @method Phaser.GameObjects.Layer#disableInteractive
     * @since 3.51.0
     *
     * @return {this} This GameObject.
     */
    disableInteractive: function ()
    {
        return this;
    },

    /**
     * A Layer cannot be enabled for input.
     *
     * This method does nothing and is kept to ensure
     * the Layer has the same shape as a Game Object.
     *
     * @method Phaser.GameObjects.Layer#removeInteractive
     * @since 3.51.0
     *
     * @return {this} This GameObject.
     */
    removeInteractive: function ()
    {
        return this;
    },

    /**
     * Compares the renderMask with the renderFlags to see if this Game Object will render or not.
     * Also checks the Game Object against the given Cameras exclusion list.
     *
     * @method Phaser.GameObjects.Layer#willRender
     * @since 3.50.0
     *
     * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera to check against this Game Object.
     *
     * @return {boolean} True if the Game Object should be rendered, otherwise false.
     */
    willRender: function (camera)
    {
        return !(this.renderFlags !== 15 || this.list.length === 0 || (this.cameraFilter !== 0 && (this.cameraFilter & camera.id)));
    },

    /**
     * Internal method called from `List.addCallback`.
     *
     * @method Phaser.GameObjects.Layer#addChildCallback
     * @private
     * @fires Phaser.Scenes.Events#ADDED_TO_SCENE
     * @fires Phaser.GameObjects.Events#ADDED_TO_SCENE
     * @since 3.50.0
     *
     * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object that was added to the list.
     */
    addChildCallback: function (gameObject)
    {
        var displayList = gameObject.displayList;

        if (displayList && displayList !== this)
        {
            gameObject.removeFromDisplayList();
        }

        if (!gameObject.displayList)
        {
            this.queueDepthSort();

            gameObject.displayList = this;

            gameObject.emit(GameObjectEvents.ADDED_TO_SCENE, gameObject, this.scene);

            this.events.emit(SceneEvents.ADDED_TO_SCENE, gameObject, this.scene);
        }
    },

    /**
     * Internal method called from `List.removeCallback`.
     *
     * @method Phaser.GameObjects.Layer#removeChildCallback
     * @private
     * @fires Phaser.Scenes.Events#REMOVED_FROM_SCENE
     * @fires Phaser.GameObjects.Events#REMOVED_FROM_SCENE
     * @since 3.50.0
     *
     * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object that was removed from the list.
     */
    removeChildCallback: function (gameObject)
    {
        this.queueDepthSort();

        gameObject.displayList = null;

        gameObject.emit(GameObjectEvents.REMOVED_FROM_SCENE, gameObject, this.scene);

        this.events.emit(SceneEvents.REMOVED_FROM_SCENE, gameObject, this.scene);
    },

    /**
     * Force a sort of the display list on the next call to depthSort.
     *
     * @method Phaser.GameObjects.Layer#queueDepthSort
     * @since 3.50.0
     */
    queueDepthSort: function ()
    {
        this.sortChildrenFlag = true;
    },

    /**
     * Immediately sorts the display list if the flag is set.
     *
     * @method Phaser.GameObjects.Layer#depthSort
     * @since 3.50.0
     */
    depthSort: function ()
    {
        if (this.sortChildrenFlag)
        {
            StableSort(this.list, this.sortByDepth);

            this.sortChildrenFlag = false;
        }
    },

    /**
     * Compare the depth of two Game Objects.
     *
     * @method Phaser.GameObjects.Layer#sortByDepth
     * @since 3.50.0
     *
     * @param {Phaser.GameObjects.GameObject} childA - The first Game Object.
     * @param {Phaser.GameObjects.GameObject} childB - The second Game Object.
     *
     * @return {number} The difference between the depths of each Game Object.
     */
    sortByDepth: function (childA, childB)
    {
        return childA._depth - childB._depth;
    },

    /**
     * Returns a reference to the array which contains all Game Objects in this Layer.
     *
     * This is a reference, not a copy of it, so be very careful not to mutate it.
     *
     * @method Phaser.GameObjects.Layer#getChildren
     * @since 3.50.0
     *
     * @return {Phaser.GameObjects.GameObject[]} An array of Game Objects within this Layer.
     */
    getChildren: function ()
    {
        return this.list;
    },

    /**
     * Destroys this Layer removing it from the Display List and Update List and
     * severing all ties to parent resources.
     *
     * Also destroys all children of this Layer. If you do not wish for the
     * children to be destroyed, you should move them from this Layer first.
     *
     * Use this to remove this Layer from your game if you don't ever plan to use it again.
     * As long as no reference to it exists within your own code it should become free for
     * garbage collection by the browser.
     *
     * If you just want to temporarily disable an object then look at using the
     * Game Object Pool instead of destroying it, as destroyed objects cannot be resurrected.
     *
     * @method Phaser.GameObjects.Layer#destroy
     * @fires Phaser.GameObjects.Events#DESTROY
     * @since 3.50.0
     *
     * @param {boolean} [fromScene=false] - `True` if this Game Object is being destroyed by the Scene, `false` if not.
     */
    destroy: function (fromScene)
    {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy)
        {
            return;
        }

        GameObject.prototype.destroy.call(this, fromScene);

        var list = this.list;

        while (list.length)
        {
            list[0].destroy(fromScene);
        }

        this.list = undefined;
        this.systems = undefined;
        this.events = undefined;
    }

    /**
     * Return an array listing the events for which the emitter has registered listeners.
     *
     * @method Phaser.GameObjects.Layer#eventNames
     * @since 3.50.0
     *
     * @return {Array.<string|symbol>}
     */

    /**
     * Return the listeners registered for a given event.
     *
     * @method Phaser.GameObjects.Layer#listeners
     * @since 3.50.0
     *
     * @param {(string|symbol)} event - The event name.
     *
     * @return {Function[]} The registered listeners.
     */

    /**
     * Return the number of listeners listening to a given event.
     *
     * @method Phaser.GameObjects.Layer#listenerCount
     * @since 3.50.0
     *
     * @param {(string|symbol)} event - The event name.
     *
     * @return {number} The number of listeners.
     */

    /**
     * Calls each of the listeners registered for a given event.
     *
     * @method Phaser.GameObjects.Layer#emit
     * @since 3.50.0
     *
     * @param {(string|symbol)} event - The event name.
     * @param {...*} [args] - Additional arguments that will be passed to the event handler.
     *
     * @return {boolean} `true` if the event had listeners, else `false`.
     */

    /**
     * Add a listener for a given event.
     *
     * @method Phaser.GameObjects.Layer#on
     * @since 3.50.0
     *
     * @param {(string|symbol)} event - The event name.
     * @param {function} fn - The listener function.
     * @param {*} [context=this] - The context to invoke the listener with.
     *
     * @return {this} This Layer instance.
     */

    /**
     * Add a listener for a given event.
     *
     * @method Phaser.GameObjects.Layer#addListener
     * @since 3.50.0
     *
     * @param {(string|symbol)} event - The event name.
     * @param {function} fn - The listener function.
     * @param {*} [context=this] - The context to invoke the listener with.
     *
     * @return {this} This Layer instance.
     */

    /**
     * Add a one-time listener for a given event.
     *
     * @method Phaser.GameObjects.Layer#once
     * @since 3.50.0
     *
     * @param {(string|symbol)} event - The event name.
     * @param {function} fn - The listener function.
     * @param {*} [context=this] - The context to invoke the listener with.
     *
     * @return {this} This Layer instance.
     */

    /**
     * Remove the listeners of a given event.
     *
     * @method Phaser.GameObjects.Layer#removeListener
     * @since 3.50.0
     *
     * @param {(string|symbol)} event - The event name.
     * @param {function} [fn] - Only remove the listeners that match this function.
     * @param {*} [context] - Only remove the listeners that have this context.
     * @param {boolean} [once] - Only remove one-time listeners.
     *
     * @return {this} This Layer instance.
     */

    /**
     * Remove the listeners of a given event.
     *
     * @method Phaser.GameObjects.Layer#off
     * @since 3.50.0
     *
     * @param {(string|symbol)} event - The event name.
     * @param {function} [fn] - Only remove the listeners that match this function.
     * @param {*} [context] - Only remove the listeners that have this context.
     * @param {boolean} [once] - Only remove one-time listeners.
     *
     * @return {this} This Layer instance.
     */

    /**
     * Remove all listeners, or those of the specified event.
     *
     * @method Phaser.GameObjects.Layer#removeAllListeners
     * @since 3.50.0
     *
     * @param {(string|symbol)} [event] - The event name.
     *
     * @return {this} This Layer instance.
     */

});

module.exports = Layer;
