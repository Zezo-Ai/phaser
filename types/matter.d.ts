// Type definitions specifically for Matter.js as used by Phaser 3
//
// Definitions by: Ivane Gegia <https://twitter.com/ivanegegia>,
//                 David Asmuth <https://github.com/piranha771>,
//                 Piotr Pietrzak <https://github.com/hasparus>,
//                 Richard Davey <rich@photonstorm.com>

/// <reference types="./phaser" />
declare namespace MatterJS {

    //  --------------------------------------------------------------
    //  Interfaces
    //  --------------------------------------------------------------

    interface IChamfer {

        radius?: number | Array<number>;
        quality?: number;
        qualityMin?: number;
        qualityMax?: number;

    }

    interface IChamferableBodyDefinition extends IBodyDefinition {

        chamfer?: IChamfer;

    }

    interface IBodyDefinition {

        /**
         * A `Number` specifying the angle of the body, in radians.
         *
         * @property angle
         * @type number
         * @default 0
         */
        angle?: number;

        /**
         * A `Number` that _measures_ the current angular speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.angularVelocity`).
         *
         * @readOnly
         * @property angularSpeed
         * @type number
         * @default 0
         */
        angularSpeed?: number;

        /**
         * A `Number` that _measures_ the current angular velocity of the body after the last `Body.update`. It is read-only.
         * If you need to modify a body's angular velocity directly, you should apply a torque or simply change the body's `angle` (as the engine uses position-Verlet integration).
         *
         * @readOnly
         * @property angularVelocity
         * @type number
         * @default 0
         */
        angularVelocity?: number;

        /**
         * A `Number` that _measures_ the area of the body's convex hull, calculated at creation by `Body.create`.
         *
         * @property area
         * @type string
         * @default
         */
        area?: number;

        /**
         * An array of unique axis vectors (edge normals) used for collision detection.
         * These are automatically calculated from the given convex hull (`vertices` array) in `Body.create`.
         * They are constantly updated by `Body.update` during the simulation.
         *
         * @property axes
         * @type vector[]
         */
        axes?: Array<Vector>;

        /**
         * A `Bounds` object that defines the AABB region for the body.
         * It is automatically calculated from the given convex hull (`vertices` array) in `Body.create` and constantly updated by `Body.update` during simulation.
         *
         * @property bounds
         * @type bounds
         */
        bounds?: IBound;

        /**
         * A `Number` that defines the density of the body, that is its mass per unit area.
         * If you pass the density via `Body.create` the `mass` property is automatically calculated for you based on the size (area) of the object.
         * This is generally preferable to simply setting mass and allows for more intuitive definition of materials (e.g. rock has a higher density than wood).
         *
         * @property density
         * @type number
         * @default 0.001
         */
        density?: number;

        /**
         * A `Vector` that specifies the force to apply in the current step. It is zeroed after every `Body.update`. See also `Body.applyForce`.
         *
         * @property force
         * @type vector
         * @default { x: 0, y: 0 }
         */
        force?: Vector;

        /**
         * A `Number` that defines the friction of the body. The value is always positive and is in the range `(0, 1)`.
         * A value of `0` means that the body may slide indefinitely.
         * A value of `1` means the body may come to a stop almost instantly after a force is applied.
         *
         * The effects of the value may be non-linear.
         * High values may be unstable depending on the body.
         * The engine uses a Coulomb friction model including static and kinetic friction.
         * Note that collision response is based on _pairs_ of bodies, and that `friction` values are _combined_ with the following formula:
         *
         *     Math.min(bodyA.friction, bodyB.friction)
         *
         * @property friction
         * @type number
         * @default 0.1
         */
        friction?: number;

        /**
         * A `Number` that defines the air friction of the body (air resistance).
         * A value of `0` means the body will never slow as it moves through space.
         * The higher the value, the faster a body slows when moving through space.
         * The effects of the value are non-linear.
         *
         * @property frictionAir
         * @type number
         * @default 0.01
         */
        frictionAir?: number;

        /**
         * A `Number` that defines the moment of inertia (i.e. second moment of area) of the body.
         * It is automatically calculated from the given convex hull (`vertices` array) and density in `Body.create`.
         * If you modify this value, you must also modify the `body.inverseInertia` property (`1 / inertia`).
         *
         * @property inertia
         * @type number
         */
        inertia?: number;

        /**
         * A `Number` that defines the inverse moment of inertia of the body (`1 / inertia`).
         * If you modify this value, you must also modify the `body.inertia` property.
         *
         * @property inverseInertia
         * @type number
         */
        inverseInertia?: number;

        /**
         * A `Number` that defines the inverse mass of the body (`1 / mass`).
         * If you modify this value, you must also modify the `body.mass` property.
         *
         * @property inverseMass
         * @type number
         */
        inverseMass?: number;

        /**
         * A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically.
         *
         * @property isSensor
         * @type boolean
         * @default false
         */
        isSensor?: boolean;

        /**
         * A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken.
         * If you need to set a body as sleeping, you should use `Sleeping.set` as this requires more than just setting this flag.
         *
         * @property isSleeping
         * @type boolean
         * @default false
         */
        isSleeping?: boolean;

        /**
         * A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed.
         * If you need to set a body as static after its creation, you should use `Body.setStatic` as this requires more than just setting this flag.
         *
         * @property isStatic
         * @type boolean
         * @default false
         */
        isStatic?: boolean;

        /**
         * An arbitrary `String` name to help the user identify and manage bodies.
         *
         * @property label
         * @type string
         * @default "Body"
         */
        label?: string;

        /**
         * A `Number` that defines the mass of the body, although it may be more appropriate to specify the `density` property instead.
         * If you modify this value, you must also modify the `body.inverseMass` property (`1 / mass`).
         *
         * @property mass
         * @type number
         */
        mass?: number;

        /**
         * A `Number` that _measures_ the amount of movement a body currently has (a combination of `speed` and `angularSpeed`). It is read-only and always positive.
         * It is used and updated by the `Matter.Sleeping` module during simulation to decide if a body has come to rest.
         *
         * @readOnly
         * @property motion
         * @type number
         * @default 0
         */
        motion?: number;

        /**
         * A `Vector` that specifies the current world-space position of the body.
         *
         * @property position
         * @type vector
         */
        position?: Vector;

        /**
         * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
         *
         * @property render
         * @type object
         */
        render?: IBodyRenderOptions;

        /**
         * A `Number` that defines the restitution (elasticity) of the body. The value is always positive and is in the range `(0, 1)`.
         * A value of `0` means collisions may be perfectly inelastic and no bouncing may occur.
         * A value of `0.8` means the body may bounce back with approximately 80% of its kinetic energy.
         * Note that collision response is based on _pairs_ of bodies, and that `restitution` values are _combined_ with the following formula:
         *
         *     Math.max(bodyA.restitution, bodyB.restitution)
         *
         * @property restitution
         * @type number
         * @default 0
         */
        restitution?: number;

        /**
         * A `Number` that defines the number of updates in which this body must have near-zero velocity before it is set as sleeping by the `Matter.Sleeping` module (if sleeping is enabled by the engine).
         *
         * @property sleepThreshold
         * @type number
         * @default 60
         */
        sleepThreshold?: number;

        /**
         * A `Number` that specifies a tolerance on how far a body is allowed to 'sink' or rotate into other bodies.
         * Avoid changing this value unless you understand the purpose of `slop` in physics engines.
         * The default should generally suffice, although very large bodies may require larger values for stable stacking.
         *
         * @property slop
         * @type number
         * @default 0.05
         */
        slop?: number;

        /**
         * A `Number` that _measures_ the current speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.velocity`).
         *
         * @readOnly
         * @property speed
         * @type number
         * @default 0
         */
        speed?: number;

        /**
         * A `Number` that allows per-body time scaling, e.g. a force-field where bodies inside are in slow-motion, while others are at full speed.
         *
         * @property timeScale
         * @type number
         * @default 1
         */
        timeScale?: number;

        /**
         * A `Number` that specifies the torque (turning force) to apply in the current step. It is zeroed after every `Body.update`.
         *
         * @property torque
         * @type number
         * @default 0
         */
        torque?: number;

        /**
         * A `String` denoting the type of object.
         *
         * @property type
         * @type string
         * @default "body"
         */
        type?: string;

        /**
         * A `Vector` that _measures_ the current velocity of the body after the last `Body.update`. It is read-only.
         * If you need to modify a body's velocity directly, you should either apply a force or simply change the body's `position` (as the engine uses position-Verlet integration).
         *
         * @readOnly
         * @property velocity
         * @type vector
         * @default { x: 0, y: 0 }
         */
        velocity?: Vector;

        /**
         * An array of `Vector` objects that specify the convex hull of the rigid body.
         * These should be provided about the origin `(0, 0)`. E.g.
         *
         *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
         *
         * When passed via `Body.create`, the vertices are translated relative to `body.position` (i.e. world-space, and constantly updated by `Body.update` during simulation).
         * The `Vector` objects are also augmented with additional properties required for efficient collision detection.
         *
         * Other properties such as `inertia` and `bounds` are automatically calculated from the passed vertices (unless provided via `options`).
         * Concave hulls are not currently supported. The module `Matter.Vertices` contains useful methods for working with vertices.
         *
         * @property vertices
         * @type vector[]
         */
        vertices?: Array<Vector>;

        /**
         * An array of bodies that make up this body.
         * The first body in the array must always be a self reference to the current body instance.
         * All bodies in the `parts` array together form a single rigid compound body.
         * Parts are allowed to overlap, have gaps or holes or even form concave bodies.
         * Parts themselves should never be added to a `World`, only the parent body should be.
         * Use `Body.setParts` when setting parts to ensure correct updates of all properties.
         *
         * @property parts
         * @type body[]
         */
        parts?: Array<BodyType>;

        /**
         * A self reference if the body is _not_ a part of another body.
         * Otherwise this is a reference to the body that this is a part of.
         * See `body.parts`.
         *
         * @property parent
         * @type body
         */
        parent?: BodyType;

        /**
         * A `Number` that defines the static friction of the body (in the Coulomb friction model).
         * A value of `0` means the body will never 'stick' when it is nearly stationary and only dynamic `friction` is used.
         * The higher the value (e.g. `10`), the more force it will take to initially get the body moving when nearly stationary.
         * This value is multiplied with the `friction` property to make it easier to change `friction` and maintain an appropriate amount of static friction.
         *
         * @property frictionStatic
         * @type number
         * @default 0.5
         */
        frictionStatic?: number;

        /**
         * An `Object` that specifies the collision filtering properties of this body.
         *
         * Collisions between two bodies will obey the following rules:
         * - If the two bodies have the same non-zero value of `collisionFilter.group`,
         *   they will always collide if the value is positive, and they will never collide
         *   if the value is negative.
         * - If the two bodies have different values of `collisionFilter.group` or if one
         *   (or both) of the bodies has a value of 0, then the category/mask rules apply as follows:
         *
         * Each body belongs to a collision category, given by `collisionFilter.category`. This
         * value is used as a bit field and the category should have only one bit set, meaning that
         * the value of this property is a power of two in the range [1, 2^31]. Thus, there are 32
         * different collision categories available.
         *
         * Each body also defines a collision bitmask, given by `collisionFilter.mask` which specifies
         * the categories it collides with (the value is the bitwise AND value of all these categories).
         *
         * Using the category/mask rules, two bodies `A` and `B` collide if each includes the other's
         * category in its mask, i.e. `(categoryA & maskB) !== 0` and `(categoryB & maskA) !== 0`
         * are both true.
         *
         * @property collisionFilter
         * @type object
         */
        collisionFilter?: ICollisionFilter;

        /**
         * A reference to the Phaser Game Object this body belongs to, if any.
         *
         * @property gameObject
         * @type Phaser.GameObjects.GameObject
         */
        gameObject?: Phaser.GameObjects.GameObject;

        /**
         * Scale the influence of World gravity when applied to this body.
         *
         * @property gravityScale
         * @type vector
         * @default { x: 1, y: 1 }
         */
        gravityScale?: Vector;

        /**
         * Will this Body ignore World gravity during the Engine update?
         *
         * @property ignoreGravity
         * @type boolean
         * @default false
         */
        ignoreGravity?: boolean;

        /**
         * Will this Body ignore Phaser Pointer input events?
         *
         * @property ignorePointer
         * @type boolean
         * @default false
         */
        ignorePointer?: boolean;

        /**
         * A callback that is invoked when this Body starts colliding with any other Body.
         *
         * You can register callbacks by providing a function of type `( pair: Matter.Pair) => void`.
         *
         * @property onCollideCallback
         * @type function
         * @default null
         */
        onCollideCallback?: Function;

        /**
         * A callback that is invoked when this Body stops colliding with any other Body.
         *
         * You can register callbacks by providing a function of type `( pair: Matter.Pair) => void`.
         *
         * @property onCollideEndCallback
         * @type function
         * @default null
         */
        onCollideEndCallback?: Function;

        /**
         * A callback that is invoked for the duration that this Body is colliding with any other Body.
         *
         * You can register callbacks by providing a function of type `( pair: Matter.Pair) => void`.
         *
         * @property onCollideActiveCallback
         * @type function
         * @default null
         */
        onCollideActiveCallback?: Function;

        /**
         * A collision callback dictionary _(body id -> function)_ used by the `Body.setOnCollideWith` function.
         *
         * @property onCollideWith
         * @type {Object.<number, Function>}
         * @default {}
         */
        onCollideWith?: Record<number, Function>;

    }

    interface IBodyRenderOptions {

        /**
         * A flag that indicates if the body should be rendered.
         *
         * @property visible
         * @type boolean
         * @default true
         */
        visible?: boolean;

		/**
         * Sets the opacity. 1.0 is fully opaque. 0.0 is fully translucent.
         *
         * @property opacity
         * @type number
         * @default 1
		 */
		opacity?: number;

        /**
         * An `Object` that defines the sprite properties to use when rendering, if any.
         *
         * @property sprite
         * @type object
         */
        sprite?: IBodyRenderOptionsSprite;

        /**
         * A hex color value that defines the fill color to use when rendering the body.
         *
         * @property fillColor
         * @type number
         */
        fillColor?: number;

        /**
         * A value that defines the fill opacity to use when rendering the body.
         *
         * @property fillOpacity
         * @type number
         */
        fillOpacity?: number;

        /**
         * A hex color value that defines the line color to use when rendering the body.
         *
         * @property lineColor
         * @type number
         */
        lineColor?: number;

        /**
         * A value that defines the line opacity to use when rendering the body.
         *
         * @property lineOpacity
         * @type number
         */
        lineOpacity?: number;

        /**
         * A `Number` that defines the line width to use when rendering the body outline.
         *
         * @property lineThickness
         * @type number
         */
        lineThickness?: number;

    }

    interface IBodyRenderOptionsSprite {

        /**
         * A `Number` that defines the scaling in the x-axis for the sprite, if any.
         *
         * @property xOffset
         * @type number
         * @default 0
         */
        xOffset: number;

        /**
         * A `Number` that defines the scaling in the y-axis for the sprite, if any.
         *
         * @property yOffset
         * @type number
         * @default 0
         */
        yOffset: number;
    }

    interface IBound {

        min: { x: number, y: number }
        max: { x: number, y: number }

    }

    interface ICompositeDefinition {

        /**
         * An array of `Body` that are _direct_ children of this composite.
         * To add or remove bodies you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
         * If you wish to recursively find all descendants, you should use the `Composite.allBodies` method.
         *
         * @property bodies
         * @type body[]
         * @default []
         */
        bodies?: Array<BodyType>;

        /**
         * An array of `Composite` that are _direct_ children of this composite.
         * To add or remove composites you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
         * If you wish to recursively find all descendants, you should use the `Composite.allComposites` method.
         *
         * @property composites
         * @type composite[]
         * @default []
         */
        composites?: Array<CompositeType>;

        /**
         * An array of `Constraint` that are _direct_ children of this composite.
         * To add or remove constraints you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
         * If you wish to recursively find all descendants, you should use the `Composite.allConstraints` method.
         *
         * @property constraints
         * @type constraint[]
         * @default []
         */
        constraints?: Array<ConstraintType>;

        /**
         * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
         *
         * @property id
         * @type number
         */
        id?: number;

        /**
         * A flag that specifies whether the composite has been modified during the current step.
         * Most `Matter.Composite` methods will automatically set this flag to `true` to inform the engine of changes to be handled.
         * If you need to change it manually, you should use the `Composite.setModified` method.
         *
         * @property isModified
         * @type boolean
         * @default false
         */
        isModified?: boolean;

        /**
         * An arbitrary `String` name to help the user identify and manage composites.
         *
         * @property label
         * @type string
         * @default "Composite"
         */
        label?: string;

        /**
         * The `Composite` that is the parent of this composite. It is automatically managed by the `Matter.Composite` methods.
         *
         * @property parent
         * @type composite
         * @default null
         */
        parent?: CompositeType;

        /**
         * A `String` denoting the type of object.
         *
         * @property type
         * @type string
         * @default "composite"
         */
        type?: string;

    }

    interface IConstraintDefinition {

        /**
         * The first possible `Body` that this constraint is attached to.
         *
         * @property bodyA
         * @type body
         * @default null
         */
        bodyA?: IBodyDefinition;

        /**
         * The second possible `Body` that this constraint is attached to.
         *
         * @property bodyB
         * @type body
         * @default null
         */
        bodyB?: IBodyDefinition;

        /**
         * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
         *
         * @property id
         * @type number
         */
        id?: number;

        /**
         * An arbitrary `String` name to help the user identify and manage bodies.
         *
         * @property label
         * @type string
         * @default "Constraint"
         */
        label?: string;

        /**
         * A `Number` that specifies the target resting length of the constraint.
         * It is calculated automatically in `Constraint.create` from initial positions of the `constraint.bodyA` and `constraint.bodyB`.
         *
         * @property length
         * @type number
         */
        length?: number;

        /**
         * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
         *
         * @property pointA
         * @type vector
         * @default { x: 0, y: 0 }
         */
        pointA?: Vector;

        /**
         * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
         *
         * @property pointB
         * @type vector
         * @default { x: 0, y: 0 }
         */
        pointB?: Vector;

        /**
         * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
         *
         * @property render
         * @type object
         */
        render?: IConstraintRenderDefinition;

        /**
         * A `Number` that specifies the stiffness of the constraint, i.e. the rate at which it returns to its resting `constraint.length`.
         * A value of `1` means the constraint should be very stiff.
         * A value of `0.2` means the constraint acts like a soft spring.
         *
         * @property stiffness
         * @type number
         * @default 1
         */
        stiffness?: number;

        /**
         * A `Number` that specifies the damping of the constraint,
         * i.e. the amount of resistance applied to each body based on their velocities to limit the amount of oscillation.
         * Damping will only be apparent when the constraint also has a very low `stiffness`.
         * A value of `0.1` means the constraint will apply heavy damping, resulting in little to no oscillation.
         * A value of `0` means the constraint will apply no damping.
         *
         * @property damping
         * @type number
         * @default 0
         */
        damping?: number;

        /**
         * A `String` denoting the type of object.
         *
         * @property type
         * @type string
         * @default "constraint"
         */
        type?: string;

    }

    interface IConstraintRenderDefinition {

        /**
         * A flag that indicates if the constraint should be rendered.
         *
         * @property visible
         * @type boolean
         * @default true
         */
        visible?: boolean;

        /**
         * The type of constraint.
         *
         * @property type
         * @type string
         * @default 'line'
         */
        type?: string;

        /**
         * A flag that indicates if the constraint anchors should be rendered.
         *
         * @property anchors
         * @type boolean
         * @default true
         */
        anchors?: boolean;

        /**
         * A hex color value that defines the line color to use when rendering the body.
         *
         * @property lineColor
         * @type number
         */
        lineColor?: number;

        /**
         * A value that defines the line opacity to use when rendering the body.
         *
         * @property lineOpacity
         * @type number
         */
        lineOpacity?: number;

        /**
         * A `Number` that defines the line width to use when rendering the body outline.
         *
         * @property lineThickness
         * @type number
         */
        lineThickness?: number;

        /**
         * The size of the pins during rendering.
         *
         * @property pinSize
         * @type number
         */
        pinSize?: number;

        /**
         * A hex color value that defines the color to use when rendering the anchors.
         *
         * @property anchorColor
         * @type number
         */
        anchorColor?: number;

        /**
         * The size of the anchors during rendering.
         *
         * @property anchorSize
         * @type number
         */
        anchorSize?: number;

    }

    interface IEngineDefinition {

        /**
         * An integer `Number` that specifies the number of position iterations to perform each update.
         * The higher the value, the higher quality the simulation will be at the expense of performance.
         *
         * @property positionIterations
         * @type number
         * @default 6
         */
        positionIterations?: number;

        /**
         * An integer `Number` that specifies the number of velocity iterations to perform each update.
         * The higher the value, the higher quality the simulation will be at the expense of performance.
         *
         * @property velocityIterations
         * @type number
         * @default 4
         */
        velocityIterations?: number;

        /**
         * An integer `Number` that specifies the number of constraint iterations to perform each update.
         * The higher the value, the higher quality the simulation will be at the expense of performance.
         * The default value of `2` is usually very adequate.
         *
         * @property constraintIterations
         * @type number
         * @default 2
         */
        constraintIterations?: number;

        /**
         * A flag that specifies whether the engine should allow sleeping via the `Matter.Sleeping` module.
         * Sleeping can improve stability and performance, but often at the expense of accuracy.
         *
         * @property enableSleeping
         * @type boolean
         * @default false
         */
        enableSleeping?: boolean;

        /**
         * An `Object` containing properties regarding the timing systems of the engine.
         *
         * @property timing
         * @type object
         */
        timing?: IEngineTimingOptions;

        /**
         * An instance of a broadphase controller. The default value is a `Matter.Grid` instance created by `Engine.create`.
         *
         * @property broadphase
         * @type grid
         * @default a Matter.Grid instance
         */
        grid?: Grid;

        /**
         * A `World` composite object that will contain all simulated bodies and constraints.
         *
         * @property world
         * @type world
         * @default a Matter.World instance
         */
        world?: World;

    }

    interface IEngineTimingOptions {

        /**
         * A `Number` that specifies the global scaling factor of time for all bodies.
         * A value of `0` freezes the simulation.
         * A value of `0.1` gives a slow-motion effect.
         * A value of `1.2` gives a speed-up effect.
         *
         * @property timing.timeScale
         * @type number
         * @default 1
         */
        timeScale: number;

        /**
         * A `Number` that specifies the current simulation-time in milliseconds starting from `0`.
         * It is incremented on every `Engine.update` by the given `delta` argument.
         *
         * @property timing.timestamp
         * @type number
         * @default 0
         */
        timestamp: number;

    }

    interface IMouseConstraintDefinition {

        /**
         * The `Constraint` object that is used to move the body during interaction.
         *
         * @property constraint
         * @type constraint
         */
        constraint?: ConstraintType;

        /**
         * An `Object` that specifies the collision filter properties.
         * The collision filter allows the user to define which types of body this mouse constraint can interact with.
         * See `body.collisionFilter` for more information.
         *
         * @property collisionFilter
         * @type object
         */
        collisionFilter?: ICollisionFilter;

        /**
         * The `Body` that is currently being moved by the user, or `null` if no body.
         *
         * @property body
         * @type body
         * @default null
         */
        body?: BodyType;

        /**
         * A `String` denoting the type of object.
         *
         * @property type
         * @type string
         * @default "constraint"
         */
        type?: string;

    }

    interface IGridDefinition {}

    interface IPair {

        id: number;
        bodyA: Body;
        bodyB: Body;
        contacts: any;
        contactCount: number;
        separation: number;
        isActive: boolean;
        timeCreated: number;
        timeUpdated: number,
        inverseMass: number;
        friction: number;
        frictionStatic: number;
        restitution: number;
        slop: number;

    }

    interface ICollisionData {

        collided: boolean;
        bodyA: Body;
        bodyB: Body;
        axisBody: Body;
        axisNumber: number;
        depth: number;
        parentA: Body;
        parentB: Body;
        normal: Vector;
        tangent: Vector;
        penetration: Vector;
        supports: Vector[];
        inverseMass: number;
        friction: number;
        frictionStatic: number;
        restitution: number;
        slop: number;

    }

    interface ICollisionPair {

        id: string;
        bodyA: Body;
        bodyB: Body;
        contacts: Vector[];
        separation: number;
        isActive: boolean;
        confirmedActive: boolean;
        isSensor: boolean;
        timeCreated: number;
        timeUpdated: number;
        collision: ICollisionData;
        inverseMass: number;
        friction: number;
        frictionStatic: number;
        restitution: number;
        slop: number;

    }

    interface ICollisionFilter {

        category: number;
        mask: number;
        group: number;

    }

    interface IRunnerOptions {

        /**
         * A `Boolean` that specifies if the runner should use a fixed timestep (otherwise it is variable).
         * If timing is fixed, then the apparent simulation speed will change depending on the frame rate (but behaviour will be deterministic).
         * If the timing is variable, then the apparent simulation speed will be constant (approximately, but at the cost of determininism).
         *
         * @property isFixed
         * @type boolean
         * @default false
         */
        isFixed?: boolean;

        /**
         * A `Number` that specifies the time step between updates in milliseconds.
         * If `engine.timing.isFixed` is set to `true`, then `delta` is fixed.
         * If it is `false`, then `delta` can dynamically change to maintain the correct apparent simulation speed.
         *
         * @property delta
         * @type number
         * @default 1000 / 60
         */
        delta?: number;
    }

    interface IWorldDefinition extends ICompositeDefinition {

        gravity?: Gravity;
        bounds?: IBound;

    }

    interface Gravity extends Vector {

        scale: number;

    }

    interface IEvent<T> {

        /**
         * The name of the event
         */
        name: string;

        /**
         * The source object of the event
         */
        source: T;

    }

    interface IEventComposite<T> extends IEvent<T> {

        /**
         * EventObjects (may be a single body, constraint, composite or a mixed array of these)
         */
        object: any;

    }

    interface IEventTimestamped<T> extends IEvent<T> {

        /**
         * The engine.timing.timestamp of the event
         */
        timestamp: number;

    }

    interface IEventCollision<T> extends IEventTimestamped<T> {

        /**
         * The collision pair
         */
        pairs: Array<IPair>;

    }

    //  --------------------------------------------------------------
    //  Types
    //  --------------------------------------------------------------

    type CompositeType = {

        /**
         * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
         *
         * @property id
         * @type number
         */
        id: number;

        /**
         * A `String` denoting the type of object.
         *
         * @property type
         * @type string
         * @default "composite"
         */
        type: string;

        /**
         * The `Composite` that is the parent of this composite. It is automatically managed by the `Matter.Composite` methods.
         *
         * @property parent
         * @type composite
         * @default null
         */
        parent?: CompositeType;

        /**
         * A flag that specifies whether the composite has been modified during the current step.
         * Most `Matter.Composite` methods will automatically set this flag to `true` to inform the engine of changes to be handled.
         * If you need to change it manually, you should use the `Composite.setModified` method.
         *
         * @property isModified
         * @type boolean
         * @default false
         */
        isModified: boolean;

        /**
         * An array of `Body` that are _direct_ children of this composite.
         * To add or remove bodies you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
         * If you wish to recursively find all descendants, you should use the `Composite.allBodies` method.
         *
         * @property bodies
         * @type body[]
         * @default []
         */
        bodies: Array<BodyType>;

        /**
         * An array of `Constraint` that are _direct_ children of this composite.
         * To add or remove constraints you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
         * If you wish to recursively find all descendants, you should use the `Composite.allConstraints` method.
         *
         * @property constraints
         * @type constraint[]
         * @default []
         */
        constraints: Array<ConstraintType>;

        /**
         * An array of `Composite` that are _direct_ children of this composite.
         * To add or remove composites you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
         * If you wish to recursively find all descendants, you should use the `Composite.allComposites` method.
         *
         * @property composites
         * @type composite[]
         * @default []
         */
        composites: Array<CompositeType>;

        /**
         * An arbitrary `String` name to help the user identify and manage composites.
         *
         * @property label
         * @type string
         * @default "Composite"
         */
        label: string;

        /**
         * An object reserved for storing plugin-specific properties.
         *
         * @property plugin
         * @type {}
         */
        plugin: any;

    }

    type ConstraintType = {

        /**
         * The first possible `Body` that this constraint is attached to.
         *
         * @property bodyA
         * @type body
         * @default null
         */
        bodyA?: BodyType;

        /**
         * The second possible `Body` that this constraint is attached to.
         *
         * @property bodyB
         * @type body
         * @default null
         */
        bodyB?: BodyType;

        /**
         * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
         *
         * @property pointA
         * @type vector
         * @default { x: 0, y: 0 }
         */
        pointA: Vector;

        /**
         * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyB` if defined, otherwise a world-space position.
         *
         * @property pointB
         * @type vector
         * @default { x: 0, y: 0 }
         */
        pointB: Vector;

        /**
         * A `Number` that specifies the target resting length of the constraint.
         * It is calculated automatically in `Constraint.create` from initial positions of the `constraint.bodyA` and `constraint.bodyB`.
         *
         * @property length
         * @type number
         */
        length: number;

        /**
         * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
         *
         * @property id
         * @type number
         */
        id: number;

        /**
         * An arbitrary `String` name to help the user identify and manage bodies.
         *
         * @property label
         * @type string
         * @default "Constraint"
         */
        label: string;

        /**
         * A `String` denoting the type of object.
         *
         * @property type
         * @type string
         * @default "constraint"
         * @readOnly
         */
        type: string;

        /**
         * A `Number` that specifies the stiffness of the constraint, i.e. the rate at which it returns to its resting `constraint.length`.
         * A value of `1` means the constraint should be very stiff.
         * A value of `0.2` means the constraint acts like a soft spring.
         *
         * @property stiffness
         * @type number
         * @default 1
         */
        stiffness: number;

        /**
         * A `Number` that specifies the damping of the constraint,
         * i.e. the amount of resistance applied to each body based on their velocities to limit the amount of oscillation.
         * Damping will only be apparent when the constraint also has a very low `stiffness`.
         * A value of `0.1` means the constraint will apply heavy damping, resulting in little to no oscillation.
         * A value of `0` means the constraint will apply no damping.
         *
         * @property damping
         * @type number
         * @default 0
         */
        damping: number;

        /**
         * A `Number` that specifies the angular stiffness of the constraint.
         *
         * @property angularStiffness
         * @type number
         * @default 0
         */
        angularStiffness: number;

        /**
         * Either the angle of BodyA, or a config value.
         *
         * @property angleA
         * @type number
         * @default 0
         */
        angleA: number;

        /**
         * Either the angle of BodyB, or a config value.
         *
         * @property angleB
         * @type number
         * @default 0
         */
        angleB: number;

        /**
         * An object reserved for storing plugin-specific properties.
         *
         * @property plugin
         * @type {}
         */
        plugin: any;

        /**
         * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
         *
         * @property render
         * @type object
         */
        render: IConstraintRenderDefinition;

    };

    type BodyType = {

        /**
         * An integer `Number` uniquely identifying number generated in `Body.create` by `Common.nextId`.
         *
         * @property id
         * @type number
         */
        id: number;

        /**
         * A `String` denoting the type of object.
         *
         * @property type
         * @type string
         * @default "body"
         * @readOnly
         */
        type: string;

        /**
         * An arbitrary `String` name to help the user identify and manage bodies.
         *
         * @property label
         * @type string
         * @default "Body"
         */
        label: string;

        /**
         * An array of bodies that make up this body.
         * The first body in the array must always be a self reference to the current body instance.
         * All bodies in the `parts` array together form a single rigid compound body.
         * Parts are allowed to overlap, have gaps or holes or even form concave bodies.
         * Parts themselves should never be added to a `World`, only the parent body should be.
         * Use `Body.setParts` when setting parts to ensure correct updates of all properties.
         *
         * @property parts
         * @type body[]
         */
        parts: BodyType[];

        /**
         * An object reserved for storing plugin-specific properties.
         *
         * @property plugin
         * @type {}
         */
        plugin: any;

        /**
         * A `Number` specifying the angle of the body, in radians.
         *
         * @property angle
         * @type number
         * @default 0
         */
        angle: number;

        /**
        * A `Number` specifying the delta time, in ms, since the last game step
        */
        deltaTime: number;

        /**
         * An array of `Vector` objects that specify the convex hull of the rigid body.
         * These should be provided about the origin `(0, 0)`. E.g.
         *
         *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
         *
         * When passed via `Body.create`, the vertices are translated relative to `body.position` (i.e. world-space, and constantly updated by `Body.update` during simulation).
         * The `Vector` objects are also augmented with additional properties required for efficient collision detection.
         *
         * Other properties such as `inertia` and `bounds` are automatically calculated from the passed vertices (unless provided via `options`).
         * Concave hulls are not currently supported. The module `Matter.Vertices` contains useful methods for working with vertices.
         *
         * @property vertices
         * @type vector[]
         */
        vertices?: Vector[];

        /**
         * A `Vector` that specifies the current world-space position of the body.
         *
         * @property position
         * @type vector
         * @default { x: 0, y: 0 }
         */
        position: Vector;

        /**
         * A `Vector` that specifies the force to apply in the current step. It is zeroed after every `Body.update`. See also `Body.applyForce`.
         *
         * @property force
         * @type vector
         * @default { x: 0, y: 0 }
         */
        force: Vector;

        /**
         * A `Number` that specifies the torque (turning force) to apply in the current step. It is zeroed after every `Body.update`.
         *
         * @property torque
         * @type number
         * @default 0
         */
        torque: number;

        /**
         * A `Vector` that specifies the position impulse.
         *
         * @property positionImpulse
         * @type vector
         * @default { x: 0, y: 0 }
         */
        positionImpulse: Vector;

        /**
         * A `Vector` that specifies the previous position impulse.
         *
         * @property previousPositionImpulse
         * @type vector
         * @default { x: 0, y: 0 }
         */
        previousPositionImpulse: Vector;

        /**
         * A `Vector` that specifies the constraint impulse.
         *
         * @property constraintImpulse
         * @type vector
         * @default { x: 0, y: 0 }
         */
        constraintImpulse: Vector;

        /**
         * The total number of contacts.
         *
         * @property totalContacts
         * @type number
         * @default 0
         */
        totalContacts: number;

        /**
         * A `Number` that _measures_ the current speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.velocity`).
         *
         * @readOnly
         * @property speed
         * @type number
         * @default 0
         */
        speed: number;

        /**
         * A `Number` that _measures_ the current angular speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.angularVelocity`).
         *
         * @readOnly
         * @property angularSpeed
         * @type number
         * @default 0
         */
        angularSpeed: number;

        /**
         * A `Vector` that _measures_ the current velocity of the body after the last `Body.update`. It is read-only.
         * If you need to modify a body's velocity directly, you should either apply a force or simply change the body's `position` (as the engine uses position-Verlet integration).
         *
         * @readOnly
         * @property velocity
         * @type vector
         * @default { x: 0, y: 0 }
         */
        velocity: Vector;

        /**
         * A `Number` that _measures_ the current angular velocity of the body after the last `Body.update`. It is read-only.
         * If you need to modify a body's angular velocity directly, you should apply a torque or simply change the body's `angle` (as the engine uses position-Verlet integration).
         *
         * @readOnly
         * @property angularVelocity
         * @type number
         * @default 0
         */
        angularVelocity: number;

        /**
         * A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically.
         *
         * @property isSensor
         * @type boolean
         * @default false
         */
        isSensor: boolean;

        /**
         * A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed.
         * If you need to set a body as static after its creation, you should use `Body.setStatic` as this requires more than just setting this flag.
         *
         * @property isStatic
         * @type boolean
         * @default false
         */
        isStatic: boolean;

        /**
         * A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken.
         * If you need to set a body as sleeping, you should use `Sleeping.set` as this requires more than just setting this flag.
         *
         * @property isSleeping
         * @type boolean
         * @default false
         */
        isSleeping: boolean;

        /**
         * A `Number` that _measures_ the amount of movement a body currently has (a combination of `speed` and `angularSpeed`). It is read-only and always positive.
         * It is used and updated by the `Matter.Sleeping` module during simulation to decide if a body has come to rest.
         *
         * @readOnly
         * @property motion
         * @type number
         * @default 0
         */
        motion: number;

        /**
         * A `Number` that defines the number of updates in which this body must have near-zero velocity before it is set as sleeping by the `Matter.Sleeping` module (if sleeping is enabled by the engine).
         *
         * @property sleepThreshold
         * @type number
         * @default 60
         */
        sleepThreshold: number;

        /**
         * A `Number` that defines the density of the body, that is its mass per unit area.
         * If you pass the density via `Body.create` the `mass` property is automatically calculated for you based on the size (area) of the object.
         * This is generally preferable to simply setting mass and allows for more intuitive definition of materials (e.g. rock has a higher density than wood).
         *
         * @property density
         * @type number
         * @default 0.001
         */
        density: number;

        /**
         * A `Number` that defines the restitution (elasticity) of the body. The value is always positive and is in the range `(0, 1)`.
         * A value of `0` means collisions may be perfectly inelastic and no bouncing may occur.
         * A value of `0.8` means the body may bounce back with approximately 80% of its kinetic energy.
         * Note that collision response is based on _pairs_ of bodies, and that `restitution` values are _combined_ with the following formula:
         *
         *     Math.max(bodyA.restitution, bodyB.restitution)
         *
         * @property restitution
         * @type number
         * @default 0
         */
        restitution: number;

        /**
         * A `Number` that defines the friction of the body. The value is always positive and is in the range `(0, 1)`.
         * A value of `0` means that the body may slide indefinitely.
         * A value of `1` means the body may come to a stop almost instantly after a force is applied.
         *
         * The effects of the value may be non-linear.
         * High values may be unstable depending on the body.
         * The engine uses a Coulomb friction model including static and kinetic friction.
         * Note that collision response is based on _pairs_ of bodies, and that `friction` values are _combined_ with the following formula:
         *
         *     Math.min(bodyA.friction, bodyB.friction)
         *
         * @property friction
         * @type number
         * @default 0.1
         */
        friction: number;

        /**
         * A `Number` that defines the static friction of the body (in the Coulomb friction model).
         * A value of `0` means the body will never 'stick' when it is nearly stationary and only dynamic `friction` is used.
         * The higher the value (e.g. `10`), the more force it will take to initially get the body moving when nearly stationary.
         * This value is multiplied with the `friction` property to make it easier to change `friction` and maintain an appropriate amount of static friction.
         *
         * @property frictionStatic
         * @type number
         * @default 0.5
         */
        frictionStatic: number;

        /**
         * A `Number` that defines the air friction of the body (air resistance).
         * A value of `0` means the body will never slow as it moves through space.
         * The higher the value, the faster a body slows when moving through space.
         * The effects of the value are non-linear.
         *
         * @property frictionAir
         * @type number
         * @default 0.01
         */
        frictionAir: number;

        /**
         * An `Object` that specifies the collision filtering properties of this body.
         *
         * Collisions between two bodies will obey the following rules:
         * - If the two bodies have the same non-zero value of `collisionFilter.group`,
         *   they will always collide if the value is positive, and they will never collide
         *   if the value is negative.
         * - If the two bodies have different values of `collisionFilter.group` or if one
         *   (or both) of the bodies has a value of 0, then the category/mask rules apply as follows:
         *
         * Each body belongs to a collision category, given by `collisionFilter.category`. This
         * value is used as a bit field and the category should have only one bit set, meaning that
         * the value of this property is a power of two in the range [1, 2^31]. Thus, there are 32
         * different collision categories available.
         *
         * Each body also defines a collision bitmask, given by `collisionFilter.mask` which specifies
         * the categories it collides with (the value is the bitwise AND value of all these categories).
         *
         * Using the category/mask rules, two bodies `A` and `B` collide if each includes the other's
         * category in its mask, i.e. `(categoryA & maskB) !== 0` and `(categoryB & maskA) !== 0`
         * are both true.
         *
         * @property collisionFilter
         * @type object
         */
        collisionFilter: ICollisionFilter;

        /**
         * A `Number` that specifies a tolerance on how far a body is allowed to 'sink' or rotate into other bodies.
         * Avoid changing this value unless you understand the purpose of `slop` in physics engines.
         * The default should generally suffice, although very large bodies may require larger values for stable stacking.
         *
         * @property slop
         * @type number
         * @default 0.05
         */
        slop: number;

        /**
         * A `Number` that allows per-body time scaling, e.g. a force-field where bodies inside are in slow-motion, while others are at full speed.
         *
         * @property timeScale
         * @type number
         * @default 1
         */
        timeScale: number;

        /**
         * Holds Body event handlers.
         *
         * @property events
         * @type any
         */
        events?: any;

        /**
         * A `Bounds` object that defines the AABB region for the body.
         * It is automatically calculated from the given convex hull (`vertices` array) in `Body.create` and constantly updated by `Body.update` during simulation.
         *
         * @property bounds
         * @type bounds
         */
        bounds: IBound;

        /**
         * A Chamfer object, if this Body has them.
         *
         * @property chamfer
         * @type any
         */
        chamfer?: IChamfer;

        /**
         * The radius of this Body, if it's a circle.
         *
         * @property circleRadius
         * @type number
         * @default 0
         */
        circleRadius: number;

        /**
         * A `Vector` that specifies the previous position.
         *
         * @property positionPrev
         * @type vector
         * @default { x: 0, y: 0 }
         */
        positionPrev: Vector;

        /**
         * The previous angle.
         *
         * @property anglePrev
         * @type number
         * @default 0
         */
        anglePrev: number;

        /**
         * A self reference if the body is _not_ a part of another body.
         * Otherwise this is a reference to the body that this is a part of.
         * See `body.parts`.
         *
         * @property parent
         * @type body
         */
        parent: BodyType;

        /**
         * An array of unique axis vectors (edge normals) used for collision detection.
         * These are automatically calculated from the given convex hull (`vertices` array) in `Body.create`.
         * They are constantly updated by `Body.update` during the simulation.
         *
         * @property axes
         * @type vector[]
         */
        axes?: Array<Vector>;

        /**
         * A `Number` that _measures_ the area of the body's convex hull, calculated at creation by `Body.create`.
         *
         * @property area
         * @type number
         * @default
         */
        area: number;

        /**
         * A `Number` that defines the mass of the body, although it may be more appropriate to specify the `density` property instead.
         * If you modify this value, you must also modify the `body.inverseMass` property (`1 / mass`).
         *
         * @property mass
         * @type number
         */
        mass: number;

        /**
         * A `Number` that defines the inverse mass of the body (`1 / mass`).
         * If you modify this value, you must also modify the `body.mass` property.
         *
         * @property inverseMass
         * @type number
         */
        inverseMass: number;

        /**
         * A `Number` that defines the moment of inertia (i.e. second moment of area) of the body.
         * It is automatically calculated from the given convex hull (`vertices` array) and density in `Body.create`.
         * If you modify this value, you must also modify the `body.inverseInertia` property (`1 / inertia`).
         *
         * @property inertia
         * @type number
         */
        inertia: number;

        /**
         * A `Number` that defines the inverse moment of inertia of the body (`1 / inertia`).
         * If you modify this value, you must also modify the `body.inertia` property.
         *
         * @property inverseInertia
         * @type number
         */
        inverseInertia: number;

        /**
         * Holds the original friction, mass, etc values from when this Body was made static.
         *
         * @property _original
         * @type any
         */
        _original: any;

        /**
         * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
         *
         * @property render
         * @type object
         */
        render: IBodyRenderOptions;

        /**
         * A reference to the Phaser Game Object this body belongs to, if any.
         *
         * @property gameObject
         * @type Phaser.GameObjects.GameObject
         */
        gameObject?: Phaser.GameObjects.GameObject;

        /**
         * The scale of the Body.
         *
         * @property scale
         * @readonly
         * @type vector
         * @default { x: 1, y: 1 }
         */
        scale: Vector;

        /**
         * The center of mass of the Body.
         *
         * @property centerOfMass
         * @type vector
         * @default { x: 0, y: 0 }
         */
        centerOfMass: Vector;

        /**
         * The center of the body in pixel values.
         * Used by Phaser for texture aligment.
         *
         * @property centerOffset
         * @type vector
         * @default { x: 0, y: 0 }
         */
        centerOffset: Vector;

        /**
         * Scale the influence of World gravity when applied to this body.
         *
         * @property gravityScale
         * @type vector
         * @default { x: 1, y: 1 }
         */
        gravityScale: Vector;

        /**
         * Will this Body ignore World gravity during the Engine update?
         *
         * @property ignoreGravity
         * @type boolean
         * @default false
         */
        ignoreGravity: boolean;

        /**
         * Will this Body ignore Phaser Pointer input events?
         *
         * @property ignorePointer
         * @type boolean
         * @default false
         */
        ignorePointer: boolean;

        /**
         * A callback that is invoked when this Body starts colliding with any other Body.
         *
         * You can register callbacks by providing a function of type `( pair: Matter.Pair) => void`.
         *
         * @property onCollideCallback
         * @type function
         * @default null
         */
        onCollideCallback?: Function;

        /**
         * A callback that is invoked when this Body stops colliding with any other Body.
         *
         * You can register callbacks by providing a function of type `( pair: Matter.Pair) => void`.
         *
         * @property onCollideEndCallback
         * @type function
         * @default null
         */
        onCollideEndCallback?: Function;

        /**
         * A callback that is invoked for the duration that this Body is colliding with any other Body.
         *
         * You can register callbacks by providing a function of type `( pair: Matter.Pair) => void`.
         *
         * @property onCollideActiveCallback
         * @type function
         * @default null
         */
        onCollideActiveCallback?: Function;

        /**
         * A collision callback dictionary _(body id -> function)_ used by the `Body.setOnCollideWith` function.
         *
         * @property onCollideWith
         * @type {Object.<number, Function>}
         * @default {}
         */
        onCollideWith?: Record<number, Function>;

        /**
         * Sets the onCollideWith callback.
         *
         * @property setOnCollideWith
         * @type Function
         */
        setOnCollideWith: (body: BodyType, callback: Function) => BodyType;

    };

    //  --------------------------------------------------------------
    //  Modules
    //  --------------------------------------------------------------

    /**
     * Installs the given plugins on the `Matter` namespace.
     * This is a short-hand for `Plugin.use`, see it for more information.
     * Call this function once at the start of your code, with all of the plugins you wish to install as arguments.
     * Avoid calling this function multiple times unless you intend to manually control installation order.
     * @method use
     * @param ...plugin {Function} The plugin(s) to install on `base` (multi-argument).
     */
    function use (...plugins: (Plugin | string)[]): void;

    /**
     * The `Matter.Axes` module contains methods for creating and manipulating sets of axes.
     *
     * @class Axes
     */
    class Axes {

        /**
         * Creates a new set of axes from the given vertices.
         * @method fromVertices
         * @param {vertices} vertices
         * @return {axes} A new axes from the given vertices
         */
        static fromVertices (vertices: Array<Vector>): Array<Vector>;

        /**
         * Rotates a set of axes by the given angle.
         * @method rotate
         * @param {axes} axes
         * @param {number} angle
         */
        static rotate (axes: Array<Vector>, angle: number): void;

    }

    class AxesFactory {

        /**
         * Creates a new set of axes from the given vertices.
         * @method fromVertices
         * @param {vertices} vertices
         * @return {axes} A new axes from the given vertices
         */
        fromVertices (vertices: Array<Vector>): Array<Vector>;

        /**
         * Rotates a set of axes by the given angle.
         * @method rotate
         * @param {axes} axes
         * @param {number} angle
         */
        rotate (axes: Array<Vector>, angle: number): void;

    }

    /**
     * The `Matter.Bodies` module contains factory methods for creating rigid body models
     * with commonly used body configurations (such as rectangles, circles and other polygons).
     *
     * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
     */
    class Bodies {

        /**
         * Creates a new rigid body model with a circle hull.
         * The options parameter is an object that specifies any properties you wish to override the defaults.
         * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
         * @method circle
         * @param {number} x
         * @param {number} y
         * @param {number} radius
         * @param {object} [options]
         * @param {number} [maxSides]
         * @return {body} A new circle body
         */
        static circle (x: number, y: number, radius: number, options?: IBodyDefinition, maxSides?: number): BodyType;

        /**
         * Creates a new rigid body model with a regular polygon hull with the given number of sides.
         * The options parameter is an object that specifies any properties you wish to override the defaults.
         * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
         * @method polygon
         * @param {number} x
         * @param {number} y
         * @param {number} sides
         * @param {number} radius
         * @param {object} [options]
         * @return {body} A new regular polygon body
         */
        static polygon (x: number, y: number, sides: number, radius: number, options?: IChamferableBodyDefinition): BodyType;

        /**
         * Creates a new rigid body model with a rectangle hull.
         * The options parameter is an object that specifies any properties you wish to override the defaults.
         * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
         * @method rectangle
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {object} [options]
         * @return {body} A new rectangle body
         */
        static rectangle (x: number, y: number, width: number, height: number, options?: IChamferableBodyDefinition): BodyType;

        /**
         * Creates a new rigid body model with a trapezoid hull.
         * The `slope` is parameterised as a fraction of `width` and must be < 1 to form a valid trapezoid.
         * The options parameter is an object that specifies any properties you wish to override the defaults.
         * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
         * @method trapezoid
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {number} slope
         * @param {object} [options]
         * @return {body} A new trapezoid body
         */
        static trapezoid (x: number, y: number, width: number, height: number, slope: number, options?: IChamferableBodyDefinition): BodyType;

        /**
         * Creates a body using the supplied vertices (or an array containing multiple sets of vertices).
         * If the vertices are convex, they will pass through as supplied.
         * Otherwise if the vertices are concave, they will be decomposed if [poly-decomp.js](https://github.com/schteppe/poly-decomp.js) is available.
         * Note that this process is not guaranteed to support complex sets of vertices (e.g. those with holes may fail).
         * By default the decomposition will discard collinear edges (to improve performance).
         * It can also optionally discard any parts that have an area less than `minimumArea`.
         * If the vertices can not be decomposed, the result will fall back to using the convex hull.
         * The options parameter is an object that specifies any `Matter.Body` properties you wish to override the defaults.
         * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
         * @method fromVertices
         * @param {number} x
         * @param {number} y
         * @param [[vector]] vertexSets
         * @param {object} [options]
         * @param {bool} [flagInternal=false]
         * @param {number} [removeCollinear=0.01]
         * @param {number} [minimumArea=10]
         * @return {body}
         */
        static fromVertices (x: number, y: number, vertexSets: Array<Array<Vector>>, options?: IBodyDefinition, flagInternal?: boolean, removeCollinear?: number, minimumArea?: number): BodyType;

        /**
         * Takes an array of Body objects and flags all internal edges (coincident parts) based on the maxDistance
         * value. The array is changed in-place and returned, so you can pass this function a `Body.parts` property.
         *
         * @method flagCoincidentParts
         * @param {body[]} parts - The Body parts, or array of bodies, to flag.
         * @param {number} [maxDistance=5]
         * @return {body[]} The modified `parts` parameter.
         */
        static flagCoincidentParts (parts: Array<BodyType>, maxDistance?: number): Array<BodyType>;
    }

    class BodiesFactory {

        /**
         * Creates a new rigid body model with a circle hull.
         * The options parameter is an object that specifies any properties you wish to override the defaults.
         * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
         * @method circle
         * @param {number} x
         * @param {number} y
         * @param {number} radius
         * @param {object} [options]
         * @param {number} [maxSides]
         * @return {body} A new circle body
         */
        circle (x: number, y: number, radius: number, options?: IBodyDefinition, maxSides?: number): BodyType;

        /**
         * Creates a new rigid body model with a regular polygon hull with the given number of sides.
         * The options parameter is an object that specifies any properties you wish to override the defaults.
         * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
         * @method polygon
         * @param {number} x
         * @param {number} y
         * @param {number} sides
         * @param {number} radius
         * @param {object} [options]
         * @return {body} A new regular polygon body
         */
        polygon (x: number, y: number, sides: number, radius: number, options?: IChamferableBodyDefinition): BodyType;

        /**
         * Creates a new rigid body model with a rectangle hull.
         * The options parameter is an object that specifies any properties you wish to override the defaults.
         * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
         * @method rectangle
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {object} [options]
         * @return {body} A new rectangle body
         */
        rectangle (x: number, y: number, width: number, height: number, options?: IChamferableBodyDefinition): BodyType;

        /**
         * Creates a new rigid body model with a trapezoid hull.
         * The `slope` is parameterised as a fraction of `width` and must be < 1 to form a valid trapezoid.
         * The options parameter is an object that specifies any properties you wish to override the defaults.
         * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
         * @method trapezoid
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {number} slope
         * @param {object} [options]
         * @return {body} A new trapezoid body
         */
        trapezoid (x: number, y: number, width: number, height: number, slope: number, options?: IChamferableBodyDefinition): BodyType;

        /**
         * Creates a body using the supplied vertices (or an array containing multiple sets of vertices).
         * If the vertices are convex, they will pass through as supplied.
         * Otherwise if the vertices are concave, they will be decomposed if [poly-decomp.js](https://github.com/schteppe/poly-decomp.js) is available.
         * Note that this process is not guaranteed to support complex sets of vertices (e.g. those with holes may fail).
         * By default the decomposition will discard collinear edges (to improve performance).
         * It can also optionally discard any parts that have an area less than `minimumArea`.
         * If the vertices can not be decomposed, the result will fall back to using the convex hull.
         * The options parameter is an object that specifies any `Matter.Body` properties you wish to override the defaults.
         * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
         * @method fromVertices
         * @param {number} x
         * @param {number} y
         * @param [[vector]] vertexSets
         * @param {object} [options]
         * @param {bool} [flagInternal=false]
         * @param {number} [removeCollinear=0.01]
         * @param {number} [minimumArea=10]
         * @return {body}
         */
        fromVertices (x: number, y: number, vertexSets: Array<Array<Vector>>, options?: IBodyDefinition, flagInternal?: boolean, removeCollinear?: number, minimumArea?: number): BodyType;

        /**
         * Takes an array of Body objects and flags all internal edges (coincident parts) based on the maxDistance
         * value. The array is changed in-place and returned, so you can pass this function a `Body.parts` property.
         *
         * @method flagCoincidentParts
         * @param {body[]} parts - The Body parts, or array of bodies, to flag.
         * @param {number} [maxDistance=5]
         * @return {body[]} The modified `parts` parameter.
         */
        flagCoincidentParts (parts: Array<BodyType>, maxDistance?: number): Array<BodyType>;

    }

    /**
     * The `Matter.Body` module contains methods for creating and manipulating body models.
     * A `Matter.Body` is a rigid body that can be simulated by a `Matter.Engine`.
     * Factories for commonly used body configurations (such as rectangles, circles and other polygons) can be found in the module `Matter.Bodies`.
     *
     * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
     *
     * @class Body
     */
    class Body {

        /**
         * Applies a force to a body from a given world-space position, including resulting torque.
         * @method applyForce
         * @param {body} body
         * @param {vector} position
         * @param {vector} force
         */
        static applyForce (body: BodyType, position: Vector, force: Vector): void;

        /**
         * Updates properties `body.velocity`, `body.speed`, `body.angularVelocity` and `body.angularSpeed` which are normalised in relation to `Body._baseDelta`.
         * @method updateVelocities
         * @param {body} body
         */
        static updateVelocities (body: BodyType): void;

        /**
         * Creates a new rigid body model. The options parameter is an object that specifies any properties you wish to override the defaults.
         * All properties have default values, and many are pre-calculated automatically based on other properties.
         * See the properties section below for detailed information on what you can pass via the `options` object.
         * @method create
         * @param {} options
         * @return {body} body
         */
        static create (options: IChamferableBodyDefinition): Body;

        /**
         * Rotates a body by a given angle relative to its current angle, without imparting any angular velocity.
         * @method rotate
         * @param {body} body
         * @param {number} rotation
         * @param {boolean} [updateVelocity=false]
         */
        static rotate (body: BodyType, rotation: number, updateVelocity?: boolean): void;

        /**
         * Returns the next unique group index for which bodies will collide.
         * If `isNonColliding` is `true`, returns the next unique group index for which bodies will _not_ collide.
         * See `body.collisionFilter` for more information.
         * @method nextGroup
         * @param {bool} [isNonColliding=false]
         * @return {Number} Unique group index
         */
        static nextGroup (isNonColliding: boolean): number;

        /**
         * Returns the next unique category bitfield (starting after the initial default category `0x0001`).
         * There are 32 available. See `body.collisionFilter` for more information.
         * @method nextCategory
         * @return {Number} Unique category bitfield
         */
        static nextCategory (): number;

        /**
         * Given a property and a value (or map of), sets the property(s) on the body, using the appropriate setter functions if they exist.
         * Prefer to use the actual setter functions in performance critical situations.
         * @method set
         * @param {body} body
         * @param {} settings A property name (or map of properties and values) to set on the body.
         * @param {} value The value to set if `settings` is a single property name.
         */
        static set (body: BodyType, settings: any, value?: any): void;

        /**
         * Sets the mass of the body. Inverse mass and density are automatically updated to reflect the change.
         * @method setMass
         * @param {body} body
         * @param {number} mass
         */
        static setMass (body: BodyType, mass: number): void;

        /**
         * Sets the density of the body. Mass is automatically updated to reflect the change.
         * @method setDensity
         * @param {body} body
         * @param {number} density
         */
        static setDensity (body: BodyType, density: number): void;

        /**
         * Sets the moment of inertia (i.e. second moment of area) of the body of the body.
         * Inverse inertia is automatically updated to reflect the change. Mass is not changed.
         * @method setInertia
         * @param {body} body
         * @param {number} inertia
         */
        static setInertia (body: BodyType, inertia: number): void;

        /**
         * Sets the body's vertices and updates body properties accordingly, including inertia, area and mass (with respect to `body.density`).
         * Vertices will be automatically transformed to be orientated around their centre of mass as the origin.
         * They are then automatically translated to world space based on `body.position`.
         *
         * The `vertices` argument should be passed as an array of `Matter.Vector` points (or a `Matter.Vertices` array).
         * Vertices must form a convex hull, concave hulls are not supported.
         *
         * @method setVertices
         * @param {body} body
         * @param {vector[]} vertices
         */
        static setVertices (body: BodyType, vertices: Array<Vector>): void;

        /**
         * Sets the parts of the `body` and updates mass, inertia and centroid.
         * Each part will have its parent set to `body`.
         * By default the convex hull will be automatically computed and set on `body`, unless `autoHull` is set to `false.`
         * Note that this method will ensure that the first part in `body.parts` will always be the `body`.
         * @method setParts
         * @param {body} body
         * @param {body[]} parts
         * @param {bool} [autoHull=true]
         */
        static setParts (body: BodyType, parts: BodyType[], autoHull?: boolean): void;

        /**
         * Set the centre of mass of the body.
         * The `centre` is a vector in world-space unless `relative` is set, in which case it is a translation.
         * The centre of mass is the point the body rotates about and can be used to simulate non-uniform density.
         * This is equal to moving `body.position` but not the `body.vertices`.
         * Invalid if the `centre` falls outside the body's convex hull.
         * @method setCentre
         * @param {body} body
         * @param {vector} centre
         * @param {bool} relative
         */
        static setCentre (body: BodyType, centre: Vector, relative: boolean): void;

        /**
         * Sets the position of the body instantly. Velocity, angle, force etc. are unchanged.
         * @method setPosition
         * @param {body} body
         * @param {vector} position
         * @param {boolean} [updateVelocity=false]
         */
        static setPosition (body: BodyType, position: Vector, updateVelocity?: boolean): void;

        /**
         * Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
         * @method setAngle
         * @param {body} body
         * @param {number} angle
         * @param {boolean} [updateVelocity=false]
         */
        static setAngle (body: BodyType, angle: number, updateVelocity?: boolean): void;

        /**
         * Sets the linear velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
         * @method setVelocity
         * @param {body} body
         * @param {vector} velocity
         */
        static setVelocity (body: BodyType, velocity: Vector): void;

        /**
         * Sets the angular velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
         * @method setAngularVelocity
         * @param {body} body
         * @param {number} velocity
         */
        static setAngularVelocity (body: BodyType, velocity: number): void;

        /**
         * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
         * @method setStatic
         * @param {body} body
         * @param {bool} isStatic
         */
        static setStatic (body: BodyType, isStatic: boolean): void;

        /**
         * Scales the body, including updating physical properties (mass, area, axes, inertia), from a world-space point (default is body centre).
         * @method scale
         * @param {body} body
         * @param {number} scaleX
         * @param {number} scaleY
         * @param {vector} [point]
         */
        static scale (body: BodyType, scaleX: number, scaleY: number, point?: Vector): void;

        /**
         * Moves a body by a given vector relative to its current position, without imparting any velocity.
         * @method translate
         * @param {body} body
         * @param {vector} translation
         * @param {boolean} [updateVelocity=false]
         */
        static translate (body: BodyType, translation: Vector, updateVelocity?: boolean): void;

        /**
         * Performs a simulation step for the given `body`, including updating position and angle using Verlet integration.
         * @method update
         * @param {body} body
         * @param {number} deltaTime
         */
        static update (body: BodyType, deltaTime: number): void;

        /**
         * Gets the current linear speed of the body.
         * Equivalent to the magnitude of its velocity.
         * @method getSpeed
         * @param {body} body
         * @return {number} speed
         */
        static getSpeed (body: BodyType): number;

        /**
         * Sets the current linear speed of the body.
         * Direction is maintained. Affects body velocity.
         * @method setSpeed
         * @param {body} body
         * @param {number} speed
         */
        static setSpeed (body: BodyType, speed: number): void;

        /**
         * Gets the current rotational velocity of the body.
         * @method getAngularVelocity
         * @param {body} body
         * @return {number} angular velocity
         */
        static getAngularVelocity (body: BodyType): number;

        /**
         * Gets the current rotational velocity of the body.
         * @method getAngularSpeed
         * @param {body} body
         * @return {number} angular velocity
         */
        static getAngularSpeed (body: BodyType): number;

        /**
         * Sets the angular velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
         * @method setAngularSpeed
         * @param {body} body
         * @param {number} velocity
         */
        static setAngularSpeed (body: BodyType, velocity: number): void;
    }

    class BodyFactory {

        /**
         * Applies a force to a body from a given world-space position, including resulting torque.
         * @method applyForce
         * @param {body} body
         * @param {vector} position
         * @param {vector} force
         */
        applyForce (body: BodyType, position: Vector, force: Vector): void;

        /**
         * Updates properties `body.velocity`, `body.speed`, `body.angularVelocity` and `body.angularSpeed` which are normalised in relation to `Body._baseDelta`.
         * @method updateVelocities
         * @param {body} body
         */
        updateVelocities (body: BodyType): void;

        /**
         * Creates a new rigid body model. The options parameter is an object that specifies any properties you wish to override the defaults.
         * All properties have default values, and many are pre-calculated automatically based on other properties.
         * See the properties section below for detailed information on what you can pass via the `options` object.
         * @method create
         * @param {} options
         * @return {body} body
         */
        create (options: IChamferableBodyDefinition): BodyType;

        /**
         * Rotates a body by a given angle relative to its current angle, without imparting any angular velocity.
         * @method rotate
         * @param {body} body
         * @param {number} rotation
         * @param {boolean} [updateVelocity=false]
         */
        rotate (body: BodyType, rotation: number, updateVelocity?: boolean): void;

        /**
         * Returns the next unique group index for which bodies will collide.
         * If `isNonColliding` is `true`, returns the next unique group index for which bodies will _not_ collide.
         * See `body.collisionFilter` for more information.
         * @method nextGroup
         * @param {bool} [isNonColliding=false]
         * @return {Number} Unique group index
         */
        nextGroup (isNonColliding: boolean): number;

        /**
         * Returns the next unique category bitfield (starting after the initial default category `0x0001`).
         * There are 32 available. See `body.collisionFilter` for more information.
         * @method nextCategory
         * @return {Number} Unique category bitfield
         */
        nextCategory (): number;

        /**
         * Given a property and a value (or map of), sets the property(s) on the body, using the appropriate setter functions if they exist.
         * Prefer to use the actual setter functions in performance critical situations.
         * @method set
         * @param {body} body
         * @param {} settings A property name (or map of properties and values) to set on the body.
         * @param {} value The value to set if `settings` is a single property name.
         */
        set (body: BodyType, settings: any, value?: any): void;

        /**
         * Sets the mass of the body. Inverse mass and density are automatically updated to reflect the change.
         * @method setMass
         * @param {body} body
         * @param {number} mass
         */
        setMass (body: BodyType, mass: number): void;

        /**
         * Sets the density of the body. Mass is automatically updated to reflect the change.
         * @method setDensity
         * @param {body} body
         * @param {number} density
         */
        setDensity (body: BodyType, density: number): void;

        /**
         * Sets the moment of inertia (i.e. second moment of area) of the body of the body.
         * Inverse inertia is automatically updated to reflect the change. Mass is not changed.
         * @method setInertia
         * @param {body} body
         * @param {number} inertia
         */
        setInertia (body: BodyType, inertia: number): void;

        /**
         * Sets the body's vertices and updates body properties accordingly, including inertia, area and mass (with respect to `body.density`).
         * Vertices will be automatically transformed to be orientated around their centre of mass as the origin.
         * They are then automatically translated to world space based on `body.position`.
         *
         * The `vertices` argument should be passed as an array of `Matter.Vector` points (or a `Matter.Vertices` array).
         * Vertices must form a convex hull, concave hulls are not supported.
         *
         * @method setVertices
         * @param {body} body
         * @param {vector[]} vertices
         */
        setVertices (body: BodyType, vertices: Array<Vector>): void;

        /**
         * Sets the parts of the `body` and updates mass, inertia and centroid.
         * Each part will have its parent set to `body`.
         * By default the convex hull will be automatically computed and set on `body`, unless `autoHull` is set to `false.`
         * Note that this method will ensure that the first part in `body.parts` will always be the `body`.
         * @method setParts
         * @param {body} body
         * @param [body] parts
         * @param {bool} [autoHull=true]
         */
        setParts (body: BodyType, parts: BodyType[], autoHull?: boolean): void;

        /**
         * Set the centre of mass of the body.
         * The `centre` is a vector in world-space unless `relative` is set, in which case it is a translation.
         * The centre of mass is the point the body rotates about and can be used to simulate non-uniform density.
         * This is equal to moving `body.position` but not the `body.vertices`.
         * Invalid if the `centre` falls outside the body's convex hull.
         * @method setCentre
         * @param {body} body
         * @param {vector} centre
         * @param {bool} relative
         */
        setCentre (body: BodyType, centre: Vector, relative: boolean): void;

        /**
         * Sets the position of the body instantly. Velocity, angle, force etc. are unchanged.
         * @method setPosition
         * @param {body} body
         * @param {vector} position
         * @param {boolean} [updateVelocity=false]
         */
        setPosition (body: BodyType, position: Vector, updateVelocity?: boolean): void;

        /**
         * Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
         * @method setAngle
         * @param {body} body
         * @param {number} angle
         * @param {boolean} [updateVelocity=false]
         */
        setAngle (body: BodyType, angle: number, updateVelocity?: boolean): void;

        /**
         * Sets the linear velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
         * @method setVelocity
         * @param {body} body
         * @param {vector} velocity
         */
        setVelocity (body: BodyType, velocity: Vector): void;

        /**
         * Gets the current linear velocity of the body.
         * @method setVelocity
         * @param {body} body
         * @return {vector} velocity
         */
        getVelocity (body: BodyType): Vector;

        /**
         * Sets the angular velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
         * @method setAngularVelocity
         * @param {body} body
         * @param {number} velocity
         */
        setAngularVelocity (body: BodyType, velocity: number): void;

        /**
         * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
         * @method setStatic
         * @param {body} body
         * @param {bool} isStatic
         */
        setStatic (body: BodyType, isStatic: boolean): void;

        /**
         * Scales the body, including updating physical properties (mass, area, axes, inertia), from a world-space point (default is body centre).
         * @method scale
         * @param {body} body
         * @param {number} scaleX
         * @param {number} scaleY
         * @param {vector} [point]
         */
        scale (body: BodyType, scaleX: number, scaleY: number, point?: Vector): void;

        /**
         * Moves a body by a given vector relative to its current position, without imparting any velocity.
         * @method translate
         * @param {body} body
         * @param {vector} translation
         * @param {boolean} [updateVelocity=false]
         */
        translate (body: BodyType, translation: Vector, updateVelocity?: boolean): void;

        /**
         * Performs a simulation step for the given `body`, including updating position and angle using Verlet integration.
         * @method update
         * @param {body} body
         * @param {number} deltaTime
         */
        update (body: BodyType, deltaTime: number): void;

        /**
         * Gets the current linear speed of the body.
         * Equivalent to the magnitude of its velocity.
         * @method getSpeed
         * @param {body} body
         * @return {number} speed
         */
        getSpeed (body: BodyType): number;

        /**
         * Sets the current linear speed of the body.
         * Direction is maintained. Affects body velocity.
         * @method setSpeed
         * @param {body} body
         * @param {number} speed
         */
        setSpeed (body: BodyType, speed: number): void;

        /**
         * Gets the current rotational velocity of the body.
         * @method getAngularVelocity
         * @param {body} body
         * @return {number} angular velocity
         */
        getAngularVelocity (body: BodyType): number;

        /**
         * Gets the current rotational velocity of the body.
         * @method getAngularSpeed
         * @param {body} body
         * @return {number} angular velocity
         */
        getAngularSpeed (body: BodyType): number;

        /**
         * Sets the angular velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
         * @method setAngularSpeed
         * @param {body} body
         * @param {number} velocity
         */
        setAngularSpeed (body: BodyType, velocity: number): void;
    }

    /**
    * The `Matter.Bounds` module contains methods for creating and manipulating axis-aligned bounding boxes (AABB).
    *
    * @class Bounds
    */
    class Bounds {

        /**
         * Creates a new axis-aligned bounding box (AABB) for the given vertices.
         * @method create
         * @param {vertices} vertices
         * @return {IBound} A new bounds object
         */
        static create (vertices: Vertices): IBound;

        /**
         * Updates bounds using the given vertices and extends the bounds given a velocity.
         * @method update
         * @param {IBound} bounds
         * @param {vertices} vertices
         * @param {vector} velocity
         */
        static update (bounds: IBound, vertices: Vertices, velocity: Vector): void;

        /**
         * Returns true if the bounds contains the given point.
         * @method contains
         * @param {IBound} bounds
         * @param {vector} point
         * @return {boolean} True if the bounds contain the point, otherwise false
         */
        static contains (bounds: IBound, point: Vector): boolean;

        /**
         * Returns true if the two bounds intersect.
         * @method overlaps
         * @param {IBound} boundsA
         * @param {IBound} boundsB
         * @return {boolean} True if the bounds overlap, otherwise false
         */
        static overlaps (boundsA: IBound, boundsB: IBound): boolean;

        /**
        * Translates the bounds by the given vector.
        * @method translate
        * @param {IBound} bounds
        * @param {vector} vector
        */
       static translate (bounds: IBound, vector: Vector): void;

        /**
         * Shifts the bounds to the given position.
         * @method shift
         * @param {IBound} bounds
         * @param {vector} position
         */
        static shift (bounds: IBound, position: Vector): void;

    }

    class BoundsFactory {

        /**
         * Creates a new axis-aligned bounding box (AABB) for the given vertices.
         * @method create
         * @param {vertices} vertices
         * @return {IBound} A new bounds object
         */
        create (vertices: Vertices): IBound;

        /**
         * Updates bounds using the given vertices and extends the bounds given a velocity.
         * @method update
         * @param {IBound} bounds
         * @param {vertices} vertices
         * @param {vector} velocity
         */
        update (bounds: IBound, vertices: Vertices, velocity: Vector): void;

        /**
         * Returns true if the bounds contains the given point.
         * @method contains
         * @param {IBound} bounds
         * @param {vector} point
         * @return {boolean} True if the bounds contain the point, otherwise false
         */
        contains (bounds: IBound, point: Vector): boolean;

        /**
         * Returns true if the two bounds intersect.
         * @method overlaps
         * @param {IBound} boundsA
         * @param {IBound} boundsB
         * @return {boolean} True if the bounds overlap, otherwise false
         */
        overlaps (boundsA: IBound, boundsB: IBound): boolean;

        /**
        * Translates the bounds by the given vector.
        * @method translate
        * @param {IBound} bounds
        * @param {vector} vector
        */
       translate (bounds: IBound, vector: Vector): void;

        /**
         * Shifts the bounds to the given position.
         * @method shift
         * @param {IBound} bounds
         * @param {vector} position
         */
        shift (bounds: IBound, position: Vector): void;

    }

    /**
    * The `Matter.Composite` module contains methods for creating and manipulating composite bodies.
    * A composite body is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`, therefore composites form a tree structure.
    * It is important to use the functions in this module to modify composites, rather than directly modifying their properties.
    * Note that the `Matter.World` object is also a type of `Matter.Composite` and as such all composite methods here can also operate on a `Matter.World`.
    *
    * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
    *
    * @class Composite
    */
    class Composite {

        /**
         * Generic add function. Adds one or many body(s), constraint(s) or a composite(s) to the given composite.
         * Triggers `beforeAdd` and `afterAdd` events on the `composite`.
         * @method add
         * @param {ICompositeDefinition} composite
         * @param {} object
         * @return {composite} The original composite with the objects added
         */
        static add (composite: CompositeType, object: BodyType | CompositeType | ConstraintType): CompositeType;

        /**
         * Returns all bodies in the given composite, including all bodies in its children, recursively.
         * @method allBodies
         * @param {composite} composite
         * @return {body[]} All the bodies
         */
        static allBodies (composite: CompositeType): Array<BodyType>;

        /**
         * Returns all composites in the given composite, including all composites in its children, recursively.
         * @method allComposites
         * @param {composite} composite
         * @return {composite[]} All the composites
         */
        static allComposites (composite: CompositeType): Array<CompositeType>;

        /**
         * Returns all constraints in the given composite, including all constraints in its children, recursively.
         * @method allConstraints
         * @param {composite} composite
         * @return {constraint[]} All the constraints
         */
        static allConstraints (composite: CompositeType): Array<ConstraintType>;

        /**
         * Removes all bodies, constraints and composites from the given composite.
         * Optionally clearing its children recursively.
         * @method clear
         * @param {composite} composite
         * @param {boolean} keepStatic
         * @param {boolean} [deep=false]
         */
        static clear (composite: CompositeType, keepStatic: boolean, deep?: boolean): void;

        /**
         * Creates a new composite. The options parameter is an object that specifies any properties you wish to override the defaults.
         * See the properites section below for detailed information on what you can pass via the `options` object.
         * @method create
         * @param {} [options]
         * @return {composite} A new composite
         */
        static create (options?: ICompositeDefinition): CompositeType;

        /**
         * Searches the composite recursively for an object matching the type and id supplied, null if not found.
         * @method get
         * @param {composite} composite
         * @param {number} id
         * @param {string} type
         * @return {object} The requested object, if found
         */
        static get (composite: CompositeType, id: number, type: string): BodyType | CompositeType | ConstraintType;

        /**
         * Moves the given object(s) from compositeA to compositeB (equal to a remove followed by an add).
         * @method move
         * @param {compositeA} compositeA
         * @param {object[]} objects
         * @param {compositeB} compositeB
         * @return {composite} Returns compositeA
         */
        static move (compositeA: CompositeType, objects: Array<BodyType | CompositeType | ConstraintType>, compositeB: CompositeType): CompositeType;

        /**
         * Assigns new ids for all objects in the composite, recursively.
         * @method rebase
         * @param {composite} composite
         * @return {composite} Returns composite
         */
        static rebase (composite: CompositeType): CompositeType;

        /**
         * Generic remove function. Removes one or many body(s), constraint(s) or a composite(s) to the given composite.
         * Optionally searching its children recursively.
         * Triggers `beforeRemove` and `afterRemove` events on the `composite`.
         * @method remove
         * @param {composite} composite
         * @param {} object
         * @param {boolean} [deep=false]
         * @return {composite} The original composite with the objects removed
         */
        static remove (composite: CompositeType, object: BodyType | CompositeType | ConstraintType, deep?: boolean): CompositeType;

        /**
         * Sets the composite's `isModified` flag.
         * If `updateParents` is true, all parents will be set (default: false).
         * If `updateChildren` is true, all children will be set (default: false).
         * @method setModified
         * @param {composite} composite
         * @param {boolean} isModified
         * @param {boolean} [updateParents=false]
         * @param {boolean} [updateChildren=false]
         */
        static setModified (composite: CompositeType, isModified: boolean, updateParents?: boolean, updateChildren?: boolean): void;

        /**
         * Translates all children in the composite by a given vector relative to their current positions,
         * without imparting any velocity.
         * @method translate
         * @param {composite} composite
         * @param {vector} translation
         * @param {bool} [recursive=true]
         */
        static translate (composite: CompositeType, translation: Vector, recursive?: boolean): void;

        /**
         * Rotates all children in the composite by a given angle about the given point, without imparting any angular velocity.
         * @method rotate
         * @param {composite} composite
         * @param {number} rotation
         * @param {vector} point
         * @param {bool} [recursive=true]
         */
        static rotate (composite: CompositeType, rotation: number, point: Vector, recursive?: boolean): void;

        /**
         * Scales all children in the composite, including updating physical properties (mass, area, axes, inertia), from a world-space point.
         * @method scale
         * @param {composite} composite
         * @param {number} scaleX
         * @param {number} scaleY
         * @param {vector} point
         * @param {bool} [recursive=true]
         */
        static scale (composite: CompositeType, scaleX: number, scaleY: number, point: Vector, recursive?: boolean): void;

    }

    class CompositeFactory {

        /**
         * Generic add function. Adds one or many body(s), constraint(s) or a composite(s) to the given composite.
         * Triggers `beforeAdd` and `afterAdd` events on the `composite`.
         * @method add
         * @param {ICompositeDefinition} composite
         * @param {} object
         * @return {composite} The original composite with the objects added
         */
        add (composite: CompositeType, object: BodyType | CompositeType | ConstraintType): CompositeType;

        /**
         * Returns all bodies in the given composite, including all bodies in its children, recursively.
         * @method allBodies
         * @param {composite} composite
         * @return {body[]} All the bodies
         */
        allBodies (composite: CompositeType): Array<BodyType>;

        /**
         * Returns all composites in the given composite, including all composites in its children, recursively.
         * @method allComposites
         * @param {composite} composite
         * @return {composite[]} All the composites
         */
        allComposites (composite: CompositeType): Array<CompositeType>;

        /**
         * Returns all constraints in the given composite, including all constraints in its children, recursively.
         * @method allConstraints
         * @param {composite} composite
         * @return {constraint[]} All the constraints
         */
        allConstraints (composite: CompositeType): Array<ConstraintType>;

        /**
         * Removes all bodies, constraints and composites from the given composite.
         * Optionally clearing its children recursively.
         * @method clear
         * @param {composite} composite
         * @param {boolean} keepStatic
         * @param {boolean} [deep=false]
         */
        clear (composite: CompositeType, keepStatic: boolean, deep?: boolean): void;

        /**
         * Creates a new composite. The options parameter is an object that specifies any properties you wish to override the defaults.
         * See the properites section below for detailed information on what you can pass via the `options` object.
         * @method create
         * @param {} [options]
         * @return {composite} A new composite
         */
        create (options?: ICompositeDefinition): CompositeType;

        /**
         * Searches the composite recursively for an object matching the type and id supplied, null if not found.
         * @method get
         * @param {composite} composite
         * @param {number} id
         * @param {string} type
         * @return {object} The requested object, if found
         */
        get (composite: CompositeType, id: number, type: string): BodyType | CompositeType | ConstraintType;

        /**
         * Moves the given object(s) from compositeA to compositeB (equal to a remove followed by an add).
         * @method move
         * @param {compositeA} compositeA
         * @param {object[]} objects
         * @param {compositeB} compositeB
         * @return {composite} Returns compositeA
         */
        move (compositeA: CompositeType, objects: Array<BodyType | CompositeType | ConstraintType>, compositeB: CompositeType): CompositeType;

        /**
         * Assigns new ids for all objects in the composite, recursively.
         * @method rebase
         * @param {composite} composite
         * @return {composite} Returns composite
         */
        rebase (composite: CompositeType): CompositeType;

        /**
         * Generic remove function. Removes one or many body(s), constraint(s) or a composite(s) to the given composite.
         * Optionally searching its children recursively.
         * Triggers `beforeRemove` and `afterRemove` events on the `composite`.
         * @method remove
         * @param {composite} composite
         * @param {} object
         * @param {boolean} [deep=false]
         * @return {composite} The original composite with the objects removed
         */
        remove (composite: CompositeType, object: BodyType | CompositeType | ConstraintType, deep?: boolean): CompositeType;

        /**
         * Sets the composite's `isModified` flag.
         * If `updateParents` is true, all parents will be set (default: false).
         * If `updateChildren` is true, all children will be set (default: false).
         * @method setModified
         * @param {composite} composite
         * @param {boolean} isModified
         * @param {boolean} [updateParents=false]
         * @param {boolean} [updateChildren=false]
         */
        setModified (composite: CompositeType, isModified: boolean, updateParents?: boolean, updateChildren?: boolean): void;

        /**
         * Translates all children in the composite by a given vector relative to their current positions,
         * without imparting any velocity.
         * @method translate
         * @param {composite} composite
         * @param {vector} translation
         * @param {bool} [recursive=true]
         */
        translate (composite: CompositeType, translation: Vector, recursive?: boolean): void;

        /**
         * Rotates all children in the composite by a given angle about the given point, without imparting any angular velocity.
         * @method rotate
         * @param {composite} composite
         * @param {number} rotation
         * @param {vector} point
         * @param {bool} [recursive=true]
         */
        rotate (composite: CompositeType, rotation: number, point: Vector, recursive?: boolean): void;

        /**
         * Scales all children in the composite, including updating physical properties (mass, area, axes, inertia), from a world-space point.
         * @method scale
         * @param {composite} composite
         * @param {number} scaleX
         * @param {number} scaleY
         * @param {vector} point
         * @param {bool} [recursive=true]
         */
        scale (composite: CompositeType, scaleX: number, scaleY: number, point: Vector, recursive?: boolean): void;

    }

    /**
     * The `Matter.Composites` module contains factory methods for creating composite bodies
     * with commonly used configurations (such as stacks and chains).
     *
     * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
     *
     * @class Composites
     */
    class Composites {

        /**
         * Creates a composite with simple car setup of bodies and constraints.
         * @method car
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {number} wheelSize
         * @return {composite} A new composite car body
         */
        static car (x: number, y: number, width: number, height: number, wheelSize: number): CompositeType;

        /**
         * Chains all bodies in the given composite together using constraints.
         * @method chain
         * @param {composite} composite
         * @param {number} xOffsetA
         * @param {number} yOffsetA
         * @param {number} xOffsetB
         * @param {number} yOffsetB
         * @param {object} options
         * @return {composite} A new composite containing objects chained together with constraints
         */
        static chain (composite: CompositeType, xOffsetA: number, yOffsetA: number, xOffsetB: number, yOffsetB: number, options: any): CompositeType;

        /**
         * Connects bodies in the composite with constraints in a grid pattern, with optional cross braces.
         * @method mesh
         * @param {composite} composite
         * @param {number} columns
         * @param {number} rows
         * @param {boolean} crossBrace
         * @param {object} options
         * @return {composite} The composite containing objects meshed together with constraints
         */
        static mesh (composite: CompositeType, columns: number, rows: number, crossBrace: boolean, options: any): CompositeType;

        /**
         * Creates a composite with a Newton's Cradle setup of bodies and constraints.
         * @method newtonsCradle
         * @param {number} x
         * @param {number} y
         * @param {number} number
         * @param {number} size
         * @param {number} length
         * @return {composite} A new composite newtonsCradle body
         */
        static newtonsCradle (x: number, y: number, number: number, size: number, length: number): CompositeType;

        /**
         * Create a new composite containing bodies created in the callback in a pyramid arrangement.
         * This function uses the body's bounds to prevent overlaps.
         * @method pyramid
         * @param {number} x
         * @param {number} y
         * @param {number} columns
         * @param {number} rows
         * @param {number} columnGap
         * @param {number} rowGap
         * @param {function} callback
         * @return {composite} A new composite containing objects created in the callback
         */
        static pyramid (x: number, y: number, columns: number, rows: number, columnGap: number, rowGap: number, callback: Function): CompositeType;

        /**
         * Creates a simple soft body like object.
         * @method softBody
         * @param {number} x
         * @param {number} y
         * @param {number} columns
         * @param {number} rows
         * @param {number} columnGap
         * @param {number} rowGap
         * @param {boolean} crossBrace
         * @param {number} particleRadius
         * @param {} particleOptions
         * @param {} constraintOptions
         * @return {composite} A new composite softBody
         */
        static softBody (x: number, y: number, columns: number, rows: number, columnGap: number, rowGap: number, crossBrace: boolean, particleRadius: number, particleOptions: any, constraintOptions: any): CompositeType;

        /**
         * Create a new composite containing bodies created in the callback in a grid arrangement.
         * This function uses the body's bounds to prevent overlaps.
         * @method stack
         * @param {number} x Starting position in X.
         * @param {number} y Starting position in Y.
         * @param {number} columns
         * @param {number} rows
         * @param {number} columnGap
         * @param {number} rowGap
         * @param {function} callback
         * @return {composite} A new composite containing objects created in the callback
         */
        static stack (x: number, y: number, columns: number, rows: number, columnGap: number, rowGap: number, callback: Function): CompositeType;

    }

    class CompositesFactory {

        /**
         * Creates a composite with simple car setup of bodies and constraints.
         * @method car
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {number} wheelSize
         * @return {composite} A new composite car body
         */
        car (x: number, y: number, width: number, height: number, wheelSize: number): CompositeType;

        /**
         * Chains all bodies in the given composite together using constraints.
         * @method chain
         * @param {composite} composite
         * @param {number} xOffsetA
         * @param {number} yOffsetA
         * @param {number} xOffsetB
         * @param {number} yOffsetB
         * @param {object} options
         * @return {composite} A new composite containing objects chained together with constraints
         */
        chain (composite: CompositeType, xOffsetA: number, yOffsetA: number, xOffsetB: number, yOffsetB: number, options: any): CompositeType;

        /**
         * Connects bodies in the composite with constraints in a grid pattern, with optional cross braces.
         * @method mesh
         * @param {composite} composite
         * @param {number} columns
         * @param {number} rows
         * @param {boolean} crossBrace
         * @param {object} options
         * @return {composite} The composite containing objects meshed together with constraints
         */
        mesh (composite: CompositeType, columns: number, rows: number, crossBrace: boolean, options: any): CompositeType;

        /**
         * Creates a composite with a Newton's Cradle setup of bodies and constraints.
         * @method newtonsCradle
         * @param {number} x
         * @param {number} y
         * @param {number} number
         * @param {number} size
         * @param {number} length
         * @return {composite} A new composite newtonsCradle body
         */
        newtonsCradle (x: number, y: number, number: number, size: number, length: number): CompositeType;

        /**
         * Create a new composite containing bodies created in the callback in a pyramid arrangement.
         * This function uses the body's bounds to prevent overlaps.
         * @method pyramid
         * @param {number} x
         * @param {number} y
         * @param {number} columns
         * @param {number} rows
         * @param {number} columnGap
         * @param {number} rowGap
         * @param {function} callback
         * @return {composite} A new composite containing objects created in the callback
         */
        pyramid (x: number, y: number, columns: number, rows: number, columnGap: number, rowGap: number, callback: Function): CompositeType;

        /**
         * Creates a simple soft body like object.
         * @method softBody
         * @param {number} x
         * @param {number} y
         * @param {number} columns
         * @param {number} rows
         * @param {number} columnGap
         * @param {number} rowGap
         * @param {boolean} crossBrace
         * @param {number} particleRadius
         * @param {} particleOptions
         * @param {} constraintOptions
         * @return {composite} A new composite softBody
         */
        softBody (x: number, y: number, columns: number, rows: number, columnGap: number, rowGap: number, crossBrace: boolean, particleRadius: number, particleOptions: any, constraintOptions: any): CompositeType;

        /**
         * Create a new composite containing bodies created in the callback in a grid arrangement.
         * This function uses the body's bounds to prevent overlaps.
         * @method stack
         * @param {number} x
         * @param {number} y
         * @param {number} columns
         * @param {number} rows
         * @param {number} columnGap
         * @param {number} rowGap
         * @param {function} callback
         * @return {composite} A new composite containing objects created in the callback
         */
        stack (x: number, y: number, columns: number, rows: number, columnGap: number, rowGap: number, callback: Function): CompositeType;

    }

    /**
     * The `Matter.Constraint` module contains methods for creating and manipulating constraints.
     * Constraints are used for specifying that a fixed distance must be maintained between two bodies (or a body and a fixed world-space position).
     * The stiffness of constraints can be modified to create springs or elastic.
     *
     * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
     *
     * @class Constraint
     */
    class Constraint {

        /**
         * Creates a new constraint.
         * All properties have default values, and many are pre-calculated automatically based on other properties.
         * See the properties section below for detailed information on what you can pass via the `options` object.
         * @method create
         * @param {} options
         * @return {constraint} constraint
         */
        static create (options: IConstraintDefinition): ConstraintType;

        /**
         * Returns the current length of the constraint.
         * This is the distance between both of the constraint's end points.
         * See `constraint.length` for the target rest length.
         * @method currentLength
         * @param {constraint} ConstraintType
         * @return {number} the current length
         */
        static currentLength (constraint: ConstraintType): number;
    }

    class ConstraintFactory {

        /**
         * Creates a new constraint.
         * All properties have default values, and many are pre-calculated automatically based on other properties.
         * See the properties section below for detailed information on what you can pass via the `options` object.
         * @method create
         * @param {} options
         * @return {constraint} constraint
         */
        create (options: IConstraintDefinition): ConstraintType;

        /**
         * Returns the current length of the constraint.
         * This is the distance between both of the constraint's end points.
         * See `constraint.length` for the target rest length.
         * @method currentLength
         * @param {constraint} ConstraintType
         * @return {number} the current length
         */
        currentLength (constraint: ConstraintType): number;
    }

    /**
     * The `Matter.Engine` module contains methods for creating and manipulating engines.
     * An engine is a controller that manages updating the simulation of the world.
     * See `Matter.Runner` for an optional game loop utility.
     *
     * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
     *
     * @class Engine
     */
    class Engine {

        /**
         * Clears the engine including the world, pairs and broadphase.
         * @method clear
         * @param {engine} engine
         */
        static clear (engine: Engine): void;

        /**
         * Creates a new engine. The options parameter is an object that specifies any properties you wish to override the defaults.
         * All properties have default values, and many are pre-calculated automatically based on other properties.
         * See the properties section below for detailed information on what you can pass via the `options` object.
         * @method create
         * @param {HTMLElement} element
         * @param {object} [options]
         * @return {engine} engine
         * @deprecated
         */
        static create (element?: HTMLElement | IEngineDefinition, options?: IEngineDefinition): Engine;

        /**
         * Creates a new engine. The options parameter is an object that specifies any properties you wish to override the defaults.
         * All properties have default values, and many are pre-calculated automatically based on other properties.
         * See the properties section below for detailed information on what you can pass via the `options` object.
         * @method create
         * @param {object} [options]
         * @return {engine} engine
         * @deprecated
         */
        static create (options?: IEngineDefinition): Engine;

        /**
         * Merges two engines by keeping the configuration of `engineA` but replacing the world with the one from `engineB`.
         * @method merge
         * @param {engine} engineA
         * @param {engine} engineB
         */
        static merge (engineA: Engine, engineB: Engine): void;

        /**
         * Moves the simulation forward in time by `delta` ms.
         * Triggers `beforeUpdate` and `afterUpdate` events.
         * Triggers `collisionStart`, `collisionActive` and `collisionEnd` events.
         * @method update
         * @param {engine} engine
         * @param {number} [delta=16.666]
         */
        static update (engine: Engine, delta?: number): Engine;

        /**
         * An alias for `Runner.run`, see `Matter.Runner` for more information.
         * @method run
         * @param {engine} engine
         */
        static run (engine: Engine): void;

        /**
         * An instance of a broadphase controller. The default value is a `Matter.Grid` instance created by `Engine.create`.
         *
         * @property broadphase
         * @type grid
         * @default a Matter.Grid instance
         */
        broadphase: Grid;

        /**
         * An integer `Number` that specifies the number of constraint iterations to perform each update.
         * The higher the value, the higher quality the simulation will be at the expense of performance.
         * The default value of `2` is usually very adequate.
         *
         * @property constraintIterations
         * @type number
         * @default 2
         */
        constraintIterations: number;

        /**
         * A flag that specifies whether the engine is running or not.
         */
        enabled: boolean;

        /**
         * A flag that specifies whether the engine should allow sleeping via the `Matter.Sleeping` module.
         * Sleeping can improve stability and performance, but often at the expense of accuracy.
         *
        * @property enableSleeping
        * @type boolean
        * @default false
        */
        enableSleeping: boolean;

        /**
         * Collision pair set for this `Engine`.
         */
        pairs: any;

        /**
         * An integer `Number` that specifies the number of position iterations to perform each update.
         * The higher the value, the higher quality the simulation will be at the expense of performance.
         *
         * @property positionIterations
         * @type number
         * @default 6
         */
        positionIterations: number;

        /**
         * An `Object` containing properties regarding the timing systems of the engine.
         *
         * @property timing
         * @type object
         */
        timing: IEngineTimingOptions;

        /**
         * An integer `Number` that specifies the number of velocity iterations to perform each update.
         * The higher the value, the higher quality the simulation will be at the expense of performance.
         *
         * @property velocityIterations
         * @type number
         * @default 4
         */
        velocityIterations: number;

        /**
         * A `World` composite object that will contain all simulated bodies and constraints.
         *
         * @property world
         * @type world
         * @default a Matter.World instance
         */
        world: World;

    }

    /**
     * The `Matter.Grid` module contains methods for creating and manipulating collision broadphase grid structures.
     *
     * @class Grid
     */
    class Grid {

        /**
         * Creates a new grid.
         * @method create
         * @param {} options
         * @return {grid} A new grid
         */
        static create (options?: IGridDefinition): Grid;

        /**
         * Updates the grid.
         * @method update
         * @param {grid} grid
         * @param {body[]} bodies
         * @param {engine} engine
         * @param {boolean} forceUpdate
         */
        static update (grid: Grid, bodies: Array<BodyType>, engine: Engine, forceUpdate: boolean): void;

        /**
         * Clears the grid.
         * @method clear
         * @param {grid} grid
         */
        static clear (grid: Grid): void;

    }

    class GridFactory {

        /**
         * Creates a new grid.
         * @method create
         * @param {} options
         * @return {grid} A new grid
         */
        create (options?: IGridDefinition): Grid;

        /**
         * Updates the grid.
         * @method update
         * @param {grid} grid
         * @param {body[]} bodies
         * @param {engine} engine
         * @param {boolean} forceUpdate
         */
        update (grid: Grid, bodies: Array<BodyType>, engine: Engine, forceUpdate: boolean): void;

        /**
         * Clears the grid.
         * @method clear
         * @param {grid} grid
         */
        clear (grid: Grid): void;

    }

    /**
     * The `Matter.MouseConstraint` module contains methods for creating mouse constraints.
     * Mouse constraints are used for allowing user interaction, providing the ability to move bodies via the mouse or touch.
     *
     * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
     *
     * @class MouseConstraint
     */
    class MouseConstraint {

        /**
         * Creates a new mouse constraint.
         * All properties have default values, and many are pre-calculated automatically based on other properties.
         * See the properties section below for detailed information on what you can pass via the `options` object.
         * @method create
         * @param {engine} engine
         * @param {} options
         * @return {MouseConstraint} A new MouseConstraint
         */
        static create (engine: Engine, options?: IMouseConstraintDefinition): MouseConstraint;

        /**
         * The `Constraint` object that is used to move the body during interaction.
         *
         * @property constraint
         * @type constraint
         */
        constraint: ConstraintType;

        /**
         * An `Object` that specifies the collision filter properties.
         * The collision filter allows the user to define which types of body this mouse constraint can interact with.
         * See `body.collisionFilter` for more information.
         *
         * @property collisionFilter
         * @type object
         */
        collisionFilter: ICollisionFilter;

        /**
         * The `Body` that is currently being moved by the user, or `null` if no body.
         *
         * @property body
         * @type body
         * @default null
         */
        body: BodyType;

        /**
         * A `String` denoting the type of object.
         *
         * @property type
         * @type string
         * @default "constraint"
         */
        type: string;

    }

    /**
     * The `Matter.Pairs` module contains methods for creating and manipulating collision pair sets.
     *
     * @class Pairs
     */
    class Pairs {

        /**
         * Clears the given pairs structure.
         * @method clear
         * @param {pairs} pairs
         * @return {pairs} pairs
         */
        static clear (pairs: any): any;
    }

    class PairsFactory {

        /**
         * Clears the given pairs structure.
         * @method clear
         * @param {pairs} pairs
         * @return {pairs} pairs
         */
        clear (pairs: any): any;
    }

    /**
     * The `Matter.Pair` module contains methods for creating and manipulating collision pairs.
     *
     * @class Pair
     */
    class Pair {

        /**
         * Creates a pair.
         * @method create
         * @param {ICollisionData} collision
         * @param {number} timestamp
         * @return {IPair} A new pair
         */
        static create (collision: ICollisionData, timestamp: number): IPair;

        /**
         * Updates a pair given a collision.
         * @method update
         * @param {IPair} pair
         * @param {ICollisionData} collision
         * @param {number} timestamp
         */
        static update (pair: IPair, collision: ICollisionData, timestamp: number): void;

        /**
         * Set a pair as active or inactive.
         * @method setActive
         * @param {IPair} pair
         * @param {boolean} isActive
         * @param {number} timestamp
         */
        static setActive (pair: IPair, isActive: boolean, timestamp: number): void;

        /**
         * Get the id for the given pair.
         * @method id
         * @param {Body} bodyA
         * @param {Body} bodyB
         * @return {string} Unique pairId
         */
        static id (bodyA: BodyType, bodyB: BodyType): string;

    }

    class PairFactory {

        /**
         * Creates a pair.
         * @method create
         * @param {ICollisionData} collision
         * @param {number} timestamp
         * @return {IPair} A new pair
         */
        create (collision: ICollisionData, timestamp: number): IPair;

        /**
         * Updates a pair given a collision.
         * @method update
         * @param {IPair} pair
         * @param {ICollisionData} collision
         * @param {number} timestamp
         */
        update (pair: IPair, collision: ICollisionData, timestamp: number): void;

        /**
         * Set a pair as active or inactive.
         * @method setActive
         * @param {IPair} pair
         * @param {boolean} isActive
         * @param {number} timestamp
         */
        setActive (pair: IPair, isActive: boolean, timestamp: number): void;

        /**
         * Get the id for the given pair.
         * @method id
         * @param {Body} bodyA
         * @param {Body} bodyB
         * @return {string} Unique pairId
         */
        id (bodyA: BodyType, bodyB: BodyType): string;

    }

    /**
     * The `Matter.Detector` module contains methods for detecting collisions given a set of pairs.
     *
     * @class Detector
     */
    class Detector {

        /**
         * Finds all collisions given a list of pairs.
         * @method collisions
         * @param {pair[]} broadphasePairs
         * @param {engine} engine
         * @return {ICollisionData[]} collisions
         */
        static collisions (broadphasePairs: IPair[], engine: Engine): ICollisionData[];

        /**
         * Returns `true` if both supplied collision filters will allow a collision to occur.
         * See `body.collisionFilter` for more information.
         * @method canCollide
         * @param {} filterA
         * @param {} filterB
         * @return {bool} `true` if collision can occur
         */
        static canCollide (filterA: ICollisionFilter, filterB: ICollisionFilter): boolean;

    }

    class DetectorFactory {

        /**
         * Finds all collisions given a list of pairs.
         * @method collisions
         * @param {pair[]} broadphasePairs
         * @param {engine} engine
         * @return {ICollisionData[]} collisions
         */
        collisions (broadphasePairs: IPair[], engine: Engine): ICollisionData[];

        /**
         * Returns `true` if both supplied collision filters will allow a collision to occur.
         * See `body.collisionFilter` for more information.
         * @method canCollide
         * @param {} filterA
         * @param {} filterB
         * @return {bool} `true` if collision can occur
         */
        canCollide (filterA: ICollisionFilter, filterB: ICollisionFilter): boolean;

    }

    /**
     * The `Matter.Resolver` module contains methods for resolving collision pairs.
     *
     * @class Resolver
     */
    class Resolver {

        /**
         * Prepare pairs for position solving.
         * @method preSolvePosition
         * @param {pair[]} pairs
         */
        static preSolvePosition (pairs: IPair[]): void;

        /**
         * Find a solution for pair positions.
         * @method solvePosition
         * @param {pair[]} pairs
         * @param {number} delta
         * @param {number} [damping=1]
         */
        static solvePosition (pairs: IPair[], delta: number, damping?: number): void;

        /**
         * Apply position resolution.
         * @method postSolvePosition
         * @param {body[]} bodies
         */
        static postSolvePosition (bodies: BodyType[]): void;

        /**
         * Prepare pairs for velocity solving.
         * @method preSolveVelocity
         * @param {pair[]} pairs
         */
        static preSolveVelocity (pairs: IPair[]): void;

        /**
         * Find a solution for pair velocities.
         * @method solveVelocity
         * @param {pair[]} pairs
         * @param {number} delta
         */
        static solveVelocity (pairs: IPair[], delta: number): void;

    }

    class ResolverFactory {

        /**
         * Prepare pairs for position solving.
         * @method preSolvePosition
         * @param {pair[]} pairs
         */
        preSolvePosition (pairs: IPair[]): void;

        /**
         * Find a solution for pair positions.
         * @method solvePosition
         * @param {pair[]} pairs
         * @param {number} delta
         * @param {number} [damping=1]
         */
        solvePosition (pairs: IPair[], delta: number, damping?: number): void;

        /**
         * Apply position resolution.
         * @method postSolvePosition
         * @param {body[]} bodies
         */
        postSolvePosition (bodies: BodyType[]): void;

        /**
         * Prepare pairs for velocity solving.
         * @method preSolveVelocity
         * @param {pair[]} pairs
         */
        preSolveVelocity (pairs: IPair[]): void;

        /**
         * Find a solution for pair velocities.
         * @method solveVelocity
         * @param {pair[]} pairs
         * @param {number} delta
         */
        solveVelocity (pairs: IPair[], delta: number): void;

    }

    /**
     * The `Matter.SAT` module contains methods for detecting collisions using the Separating Axis Theorem.
     *
     * @class SAT
     */
    class SAT {

        /**
         * Detect collision between two bodies using the Separating Axis Theorem.
         * @method collides
         * @param {body} bodyA
         * @param {body} bodyB
         * @param {ICollisionData} previousCollision
         * @return {ICollisionData} collision
         */
        static collides (bodyA: BodyType, bodyB: BodyType, previousCollision: ICollisionData): ICollisionData;

    }

    class SATFactory {

        /**
         * Detect collision between two bodies using the Separating Axis Theorem.
         * @method collides
         * @param {body} bodyA
         * @param {body} bodyB
         * @param {ICollisionData} previousCollision
         * @return {ICollisionData} collision
         */
        collides (bodyA: BodyType, bodyB: BodyType, previousCollision: ICollisionData): ICollisionData;

    }

    /**
     * The `Matter.Query` module contains methods for performing collision queries.
     *
     * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
     *
     * @class Query
     */
    class Query {

        /**
         * Casts a ray segment against a set of bodies and returns all collisions, ray width is optional. Intersection points are not provided.
         * @method ray
         * @param {body[]} bodies
         * @param {vector} startPoint
         * @param {vector} endPoint
         * @param {number} [rayWidth]
         * @return {object[]} Collisions
         */
        static ray (bodies: Array<BodyType>, startPoint: Vector, endPoint: Vector, rayWidth?: number): Array<ICollisionData>;

        /**
         * Returns all bodies whose bounds are inside (or outside if set) the given set of bounds, from the given set of bodies.
         * @method region
         * @param {body[]} bodies
         * @param {bounds} bounds
         * @param {bool} [outside=false]
         * @return {body[]} The bodies matching the query
         */
        static region (bodies: Array<BodyType>, bounds: Bounds, outside?: boolean): Array<BodyType>;

        /**
         * Returns all bodies whose vertices contain the given point, from the given set of bodies.
         * @method point
         * @param {body[]} bodies
         * @param {vector} point
         * @return {body[]} The bodies matching the query
         */
        static point (bodies: Array<BodyType>, point: Vector): Array<BodyType>;

    }

    class QueryFactory {

        /**
         * Casts a ray segment against a set of bodies and returns all collisions, ray width is optional. Intersection points are not provided.
         * @method ray
         * @param {body[]} bodies
         * @param {vector} startPoint
         * @param {vector} endPoint
         * @param {number} [rayWidth]
         * @return {object[]} Collisions
         */
        ray (bodies: Array<BodyType>, startPoint: Vector, endPoint: Vector, rayWidth?: number): Array<ICollisionData>;

        /**
         * Returns all bodies whose bounds are inside (or outside if set) the given set of bounds, from the given set of bodies.
         * @method region
         * @param {body[]} bodies
         * @param {bounds} bounds
         * @param {bool} [outside=false]
         * @return {body[]} The bodies matching the query
         */
        region (bodies: Array<BodyType>, bounds: Bounds, outside?: boolean): Array<BodyType>;

        /**
         * Returns all bodies whose vertices contain the given point, from the given set of bodies.
         * @method point
         * @param {body[]} bodies
         * @param {vector} point
         * @return {body[]} The bodies matching the query
         */
        point (bodies: Array<BodyType>, point: Vector): Array<BodyType>;

    }

    /**
     * The `Matter.Runner` module is an optional utility which provides a game loop,
     * that handles updating and rendering a `Matter.Engine` for you within a browser.
     * It is intended for demo and testing purposes, but may be adequate for simple games.
     * If you are using your own game loop instead, then you do not need the `Matter.Runner` module.
     * Instead just call `Engine.update(engine, delta)` in your own loop.
     * Note that the method `Engine.run` is an alias for `Runner.run`.
     *
     * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
     *
     * @class Runner
     */
    class Runner {

        /**
         * Creates a new Runner. The options parameter is an object that specifies any properties you wish to override the defaults.
         * @method create
         * @param {} options
         */
        static create (options: IRunnerOptions): Runner;

        /**
         * Continuously ticks a `Matter.Engine` by calling `Runner.tick` on the `requestAnimationFrame` event.
         * @method run
         * @param {engine} engine
         */
        static run (runner: Runner, engine: Engine): Runner;

        /**
         * Continuously ticks a `Matter.Engine` by calling `Runner.tick` on the `requestAnimationFrame` event.
         * @method run
         * @param {engine} engine
         */
        static run (engine: Engine): Runner;

        /**
         * A game loop utility that updates the engine and renderer by one step (a 'tick').
         * Features delta smoothing, time correction and fixed or dynamic timing.
         * Triggers `beforeTick`, `tick` and `afterTick` events on the engine.
         * Consider just `Engine.update(engine, delta)` if you're using your own loop.
         * @method tick
         * @param {runner} runner
         * @param {engine} engine
         * @param {number} time
         */
        static tick (runner: Runner, engine: Engine, time: number): void;

        /**
         * Ends execution of `Runner.run` on the given `runner`, by canceling the animation frame request event loop.
         * If you wish to only temporarily pause the engine, see `engine.enabled` instead.
         * @method stop
         * @param {runner} runner
         */
        static stop (runner: Runner): void;

        /**
         * Alias for `Runner.run`.
         * @method start
         * @param {runner} runner
         * @param {engine} engine
         */
        static start (runner: Runner, engine: Engine): void;

        /**
         * A flag that specifies whether the runner is running or not.
         *
         * @property enabled
         * @type boolean
         * @default true
         */
        enabled: boolean;

        /**
         * A `Boolean` that specifies if the runner should use a fixed timestep (otherwise it is variable).
         * If timing is fixed, then the apparent simulation speed will change depending on the frame rate (but behaviour will be deterministic).
         * If the timing is variable, then the apparent simulation speed will be constant (approximately, but at the cost of determininism).
         *
         * @property isFixed
         * @type boolean
         * @default false
         */
        isFixed: boolean;

        /**
         * A `Number` that specifies the time step between updates in milliseconds.
         * If `engine.timing.isFixed` is set to `true`, then `delta` is fixed.
         * If it is `false`, then `delta` can dynamically change to maintain the correct apparent simulation speed.
         *
         * @property delta
         * @type number
         * @default 1000 / 60
         */
        delta: number;

    }

    /**
     * The `Matter.Sleeping` module contains methods to manage the sleeping state of bodies.
     *
     * @class Sleeping
     */
    class Sleeping {

        /**
         * Set a body as sleeping or awake.
         * @method set
         * @param {body} body
         * @param {boolean} isSleeping
         */
        static set (body: BodyType, isSleeping: boolean): void;

        /**
         * Puts bodies to sleep or wakes them up depending on their motion.
         * @method update
         * @param {body[]} bodies
         * @param {number} delta
         */
        static update (bodies: Array<BodyType>, delta: number): void;

        /**
         * Given a set of colliding pairs, wakes the sleeping bodies involved.
         * @method afterCollisions
         * @param {pair[]} pairs
         */
        static afterCollisions (pairs: Array<IPair>): void;

    }

    class SleepingFactory {

        /**
         * Set a body as sleeping or awake.
         * @method set
         * @param {body} body
         * @param {boolean} isSleeping
         */
        set (body: BodyType, isSleeping: boolean): void;

        /**
         * Puts bodies to sleep or wakes them up depending on their motion.
         * @method update
         * @param {body[]} bodies
         * @param {number} delta
         */
        update (bodies: Array<BodyType>, delta: number): void;

        /**
         * Given a set of colliding pairs, wakes the sleeping bodies involved.
         * @method afterCollisions
         * @param {pair[]} pairs
         */
        afterCollisions (pairs: Array<IPair>): void;

    }

    /**
     * The `Matter.Svg` module contains methods for converting SVG images into an array of vector points.
     *
     * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
     *
     * @class Svg
     */
    class Svg {

        /**
         * Converts an SVG path into an array of vector points.
         * If the input path forms a concave shape, you must decompose the result into convex parts before use.
         * See `Bodies.fromVertices` which provides support for this.
         * Note that this function is not guaranteed to support complex paths (such as those with holes).
         * @method pathToVertices
         * @param {SVGPathElement} path
         * @param {Number} [sampleLength=15]
         * @return {Vector[]} points
         */
        static pathToVertices (path: SVGPathElement, sampleLength: number): Array<Vector>;

    }

    class SvgFactory {

        /**
         * Converts an SVG path into an array of vector points.
         * If the input path forms a concave shape, you must decompose the result into convex parts before use.
         * See `Bodies.fromVertices` which provides support for this.
         * Note that this function is not guaranteed to support complex paths (such as those with holes).
         * @method pathToVertices
         * @param {SVGPathElement} path
         * @param {Number} [sampleLength=15]
         * @return {Vector[]} points
         */
        pathToVertices (path: SVGPathElement, sampleLength: number): Array<Vector>;

    }

    /**
    * The `Matter.Vector` module contains methods for creating and manipulating vectors.
    * Vectors are the basis of all the geometry related operations in the engine.
    * A `Matter.Vector` object is of the form `{ x: 0, y: 0 }`.
    *
    * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
    *
    * @class Vector
    */
    class Vector {

        x: number;
        y: number;

        /**
         * Creates a new vector.
         * @method create
         * @param {number} x
         * @param {number} y
         * @return {vector} A new vector
         */
        static create (x?: number, y?: number): Vector;

        /**
         * Returns a new vector with `x` and `y` copied from the given `vector`.
         * @method clone
         * @param {vector} vector
         * @return {vector} A new cloned vector
         */
        static clone (vector: Vector): Vector;

        /**
         * Returns the cross-product of three vectors.
         * @method cross3
         * @param {vector} vectorA
         * @param {vector} vectorB
         * @param {vector} vectorC
         * @return {number} The cross product of the three vectors
         */
        static cross3 (vectorA: Vector, vectorB: Vector, vectorC: Vector): number;

        /**
         * Adds the two vectors.
         * @method add
         * @param {vector} vectorA
         * @param {vector} vectorB
         * @param {vector} [output]
         * @return {vector} A new vector of vectorA and vectorB added
         */
        static add (vectorA: Vector, vectorB: Vector, output?: Vector): Vector;

        /**
         * Returns the angle in radians between the two vectors relative to the x-axis.
         * @method angle
         * @param {vector} vectorA
         * @param {vector} vectorB
         * @return {number} The angle in radians
         */
        static angle (vectorA: Vector, vectorB: Vector): number;

        /**
         * Returns the cross-product of two vectors.
         * @method cross
         * @param {vector} vectorA
         * @param {vector} vectorB
         * @return {number} The cross product of the two vectors
         */
        static cross (vectorA: Vector, vectorB: Vector): number;

        /**
         * Divides a vector and a scalar.
         * @method div
         * @param {vector} vector
         * @param {number} scalar
         * @return {vector} A new vector divided by scalar
         */
        static div (vector: Vector, scalar: number): Vector;

        /**
         * Returns the dot-product of two vectors.
         * @method dot
         * @param {vector} vectorA
         * @param {vector} vectorB
         * @return {number} The dot product of the two vectors
         */
        static dot (vectorA: Vector, vectorB: Vector): Number;

        /**
         * Returns the magnitude (length) of a vector.
         * @method magnitude
         * @param {vector} vector
         * @return {number} The magnitude of the vector
         */
        static magnitude (vector: Vector): number;

        /**
         * Returns the magnitude (length) of a vector (therefore saving a `sqrt` operation).
         * @method magnitudeSquared
         * @param {vector} vector
         * @return {number} The squared magnitude of the vector
         */
        static magnitudeSquared (vector: Vector): number;

        /**
         * Multiplies a vector and a scalar.
         * @method mult
         * @param {vector} vector
         * @param {number} scalar
         * @return {vector} A new vector multiplied by scalar
         */
        static mult (vector: Vector, scalar: number): Vector;

        /**
         * Negates both components of a vector such that it points in the opposite direction.
         * @method neg
         * @param {vector} vector
         * @return {vector} The negated vector
         */
        static neg (vector: Vector): Vector;

        /**
         * Normalises a vector (such that its magnitude is `1`).
         * @method normalise
         * @param {vector} vector
         * @return {vector} A new vector normalised
         */
        static normalise (vector: Vector): Vector;

        /**
         * Returns the perpendicular vector. Set `negate` to true for the perpendicular in the opposite direction.
         * @method perp
         * @param {vector} vector
         * @param {bool} [negate=false]
         * @return {vector} The perpendicular vector
         */
        static perp (vector: Vector, negate?: boolean): Vector;

        /**
         * Rotates the vector about (0, 0) by specified angle.
         * @method rotate
         * @param {vector} vector
         * @param {number} angle
         * @return {vector} A new vector rotated about (0, 0)
         */
        static rotate (vector: Vector, angle: number): Vector;

        /**
         * Rotates the vector about a specified point by specified angle.
         * @method rotateAbout
         * @param {vector} vector
         * @param {number} angle
         * @param {vector} point
         * @param {vector} [output]
         * @return {vector} A new vector rotated about the point
         */
        static rotateAbout (vector: Vector, angle: number, point: Vector, output?: Vector): Vector;

        /**
         * Subtracts the two vectors.
         * @method sub
         * @param {vector} vectorA
         * @param {vector} vectorB
         * @param {vector} [output]
         * @return {vector} A new vector of vectorA and vectorB subtracted
         */
        static sub (vectorA: Vector, vectorB: Vector, optional?: Vector): Vector;

    }

    class VectorFactory {

        /**
         * Creates a new vector.
         * @method create
         * @param {number} x
         * @param {number} y
         * @return {vector} A new vector
         */
        create (x?: number, y?: number): Vector;

        /**
         * Returns a new vector with `x` and `y` copied from the given `vector`.
         * @method clone
         * @param {vector} vector
         * @return {vector} A new cloned vector
         */
        clone (vector: Vector): Vector;

        /**
         * Returns the cross-product of three vectors.
         * @method cross3
         * @param {vector} vectorA
         * @param {vector} vectorB
         * @param {vector} vectorC
         * @return {number} The cross product of the three vectors
         */
        cross3 (vectorA: Vector, vectorB: Vector, vectorC: Vector): number;

        /**
         * Adds the two vectors.
         * @method add
         * @param {vector} vectorA
         * @param {vector} vectorB
         * @param {vector} [output]
         * @return {vector} A new vector of vectorA and vectorB added
         */
        add (vectorA: Vector, vectorB: Vector, output?: Vector): Vector;

        /**
         * Returns the angle in radians between the two vectors relative to the x-axis.
         * @method angle
         * @param {vector} vectorA
         * @param {vector} vectorB
         * @return {number} The angle in radians
         */
        angle (vectorA: Vector, vectorB: Vector): number;

        /**
         * Returns the cross-product of two vectors.
         * @method cross
         * @param {vector} vectorA
         * @param {vector} vectorB
         * @return {number} The cross product of the two vectors
         */
        cross (vectorA: Vector, vectorB: Vector): number;

        /**
         * Divides a vector and a scalar.
         * @method div
         * @param {vector} vector
         * @param {number} scalar
         * @return {vector} A new vector divided by scalar
         */
        div (vector: Vector, scalar: number): Vector;

        /**
         * Returns the dot-product of two vectors.
         * @method dot
         * @param {vector} vectorA
         * @param {vector} vectorB
         * @return {number} The dot product of the two vectors
         */
        dot (vectorA: Vector, vectorB: Vector): number;

        /**
         * Returns the magnitude (length) of a vector.
         * @method magnitude
         * @param {vector} vector
         * @return {number} The magnitude of the vector
         */
        magnitude (vector: Vector): number;

        /**
         * Returns the magnitude (length) of a vector (therefore saving a `sqrt` operation).
         * @method magnitudeSquared
         * @param {vector} vector
         * @return {number} The squared magnitude of the vector
         */
        magnitudeSquared (vector: Vector): number;

        /**
         * Multiplies a vector and a scalar.
         * @method mult
         * @param {vector} vector
         * @param {number} scalar
         * @return {vector} A new vector multiplied by scalar
         */
        mult (vector: Vector, scalar: number): Vector;

        /**
         * Negates both components of a vector such that it points in the opposite direction.
         * @method neg
         * @param {vector} vector
         * @return {vector} The negated vector
         */
        neg (vector: Vector): Vector;

        /**
         * Normalises a vector (such that its magnitude is `1`).
         * @method normalise
         * @param {vector} vector
         * @return {vector} A new vector normalised
         */
        normalise (vector: Vector): Vector;

        /**
         * Returns the perpendicular vector. Set `negate` to true for the perpendicular in the opposite direction.
         * @method perp
         * @param {vector} vector
         * @param {bool} [negate=false]
         * @return {vector} The perpendicular vector
         */
        perp (vector: Vector, negate?: boolean): Vector;

        /**
         * Rotates the vector about (0, 0) by specified angle.
         * @method rotate
         * @param {vector} vector
         * @param {number} angle
         * @return {vector} A new vector rotated about (0, 0)
         */
        rotate (vector: Vector, angle: number): Vector;

        /**
         * Rotates the vector about a specified point by specified angle.
         * @method rotateAbout
         * @param {vector} vector
         * @param {number} angle
         * @param {vector} point
         * @param {vector} [output]
         * @return {vector} A new vector rotated about the point
         */
        rotateAbout (vector: Vector, angle: number, point: Vector, output?: Vector): Vector;

        /**
         * Subtracts the two vectors.
         * @method sub
         * @param {vector} vectorA
         * @param {vector} vectorB
         * @param {vector} [output]
         * @return {vector} A new vector of vectorA and vectorB subtracted
         */
        sub (vectorA: Vector, vectorB: Vector, optional?: Vector): Vector;

    }

    /**
     * The `Matter.Vertices` module contains methods for creating and manipulating sets of vertices.
     * A set of vertices is an array of `Matter.Vector` with additional indexing properties inserted by `Vertices.create`.
     * A `Matter.Body` maintains a set of vertices to represent the shape of the object (its convex hull).
     *
     * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
     *
     * @class Vertices
     */
    class Vertices {

        /**
         * Returns the average (mean) of the set of vertices.
         * @method mean
         * @param {vertices} vertices
         * @return {vector} The average point
         */
        static mean (vertices: Array<Vector>): Array<Vector>;

        /**
         * Sorts the input vertices into clockwise order in place.
         * @method clockwiseSort
         * @param {vertices} vertices
         * @return {vertices} vertices
         */
        static clockwiseSort (vertices: Array<Vector>): Array<Vector>;

        /**
         * Returns true if the vertices form a convex shape (vertices must be in clockwise order).
         * @method isConvex
         * @param {vertices} vertices
         * @return {bool} `true` if the `vertices` are convex, `false` if not (or `null` if not computable).
         */
        static isConvex (vertices: Array<Vector>): boolean;

        /**
         * Returns the convex hull of the input vertices as a new array of points.
         * @method hull
         * @param {vertices} vertices
         * @return [vertex] vertices
         */
        static hull (vertices: Array<Vector>): Array<Vector>;

        /**
         * Returns the area of the set of vertices.
         * @method area
         * @param {vertices} vertices
         * @param {bool} signed
         * @return {number} The area
         */
        static area (vertices: Array<Vector>, signed: boolean): number;

        /**
         * Returns the centre (centroid) of the set of vertices.
         * @method centre
         * @param {vertices} vertices
         * @return {vector} The centre point
         */
        static centre (vertices: Array<Vector>): Vector;

        /**
         * Chamfers a set of vertices by giving them rounded corners, returns a new set of vertices.
         * The radius parameter is a single number or an array to specify the radius for each vertex.
         * @method chamfer
         * @param {vertices} vertices
         * @param {number[]} radius
         * @param {number} quality
         * @param {number} qualityMin
         * @param {number} qualityMax
         */
        static chamfer (vertices: Array<Vector>, radius: number | Array<number>, quality: number, qualityMin: number, qualityMax: number): void;

        /**
         * Returns `true` if the `point` is inside the set of `vertices`.
         * @method contains
         * @param {vertices} vertices
         * @param {vector} point
         * @return {boolean} True if the vertices contains point, otherwise false
         */
        static contains (vertices: Array<Vector>, point: Vector): boolean;

        /**
         * Creates a new set of `Matter.Body` compatible vertices.
         * The `points` argument accepts an array of `Matter.Vector` points orientated around the origin `(0, 0)`, for example:
         *
         *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
         *
         * The `Vertices.create` method returns a new array of vertices, which are similar to Matter.Vector objects,
         * but with some additional references required for efficient collision detection routines.
         *
         * Note that the `body` argument is not optional, a `Matter.Body` reference must be provided.
         *
         * @method create
         * @param {vector[]} points
         * @param {body} body
         */
        static create (points: Array<Vector>, body: BodyType): Array<Vector>;

        /**
         * Parses a string containing ordered x y pairs separated by spaces (and optionally commas),
         * into a `Matter.Vertices` object for the given `Matter.Body`.
         * For parsing SVG paths, see `Svg.pathToVertices`.
         * @method fromPath
         * @param {string} path
         * @param {body} body
         * @return {vertices} vertices
         */
        static fromPath (path: string, body: BodyType): Array<Vector>;

        /**
         * Returns the moment of inertia (second moment of area) of the set of vertices given the total mass.
         * @method inertia
         * @param {vertices} vertices
         * @param {number} mass
         * @return {number} The polygon's moment of inertia
         */
        static inertia (vertices: Array<Vector>, mass: number): number;

        /**
         * Rotates the set of vertices in-place.
         * @method rotate
         * @param {vertices} vertices
         * @param {number} angle
         * @param {vector} point
         */
        static rotate (vertices: Array<Vector>, angle: number, point: Vector): void;

        /**
         * Scales the vertices from a point (default is centre) in-place.
         * @method scale
         * @param {vertices} vertices
         * @param {number} scaleX
         * @param {number} scaleY
         * @param {vector} point
         */
        static scale (vertices: Array<Vector>, scaleX: number, scaleY: number, point: Vector): void;

        /**
         * Translates the set of vertices in-place.
         * @method translate
         * @param {vertices} vertices
         * @param {vector} vector
         * @param {number} scalar
         */
        static translate (vertices: Array<Vector>, vector: Vector, scalar: number): void;

    }

    class VerticesFactory {

        /**
         * Returns the average (mean) of the set of vertices.
         * @method mean
         * @param {vertices} vertices
         * @return {vector} The average point
         */
        mean (vertices: Array<Vector>): Array<Vector>;

        /**
         * Sorts the input vertices into clockwise order in place.
         * @method clockwiseSort
         * @param {vertices} vertices
         * @return {vertices} vertices
         */
        clockwiseSort (vertices: Array<Vector>): Array<Vector>;

        /**
         * Returns true if the vertices form a convex shape (vertices must be in clockwise order).
         * @method isConvex
         * @param {vertices} vertices
         * @return {bool} `true` if the `vertices` are convex, `false` if not (or `null` if not computable).
         */
        isConvex (vertices: Array<Vector>): boolean;

        /**
         * Returns the convex hull of the input vertices as a new array of points.
         * @method hull
         * @param {vertices} vertices
         * @return [vertex] vertices
         */
        hull (vertices: Array<Vector>): Array<Vector>;

        /**
         * Returns the area of the set of vertices.
         * @method area
         * @param {vertices} vertices
         * @param {bool} signed
         * @return {number} The area
         */
        area (vertices: Array<Vector>, signed: boolean): number;

        /**
         * Returns the centre (centroid) of the set of vertices.
         * @method centre
         * @param {vertices} vertices
         * @return {vector} The centre point
         */
        centre (vertices: Array<Vector>): Vector;

        /**
         * Chamfers a set of vertices by giving them rounded corners, returns a new set of vertices.
         * The radius parameter is a single number or an array to specify the radius for each vertex.
         * @method chamfer
         * @param {vertices} vertices
         * @param {number[]} radius
         * @param {number} quality
         * @param {number} qualityMin
         * @param {number} qualityMax
         */
        chamfer (vertices: Array<Vector>, radius: number | Array<number>, quality: number, qualityMin: number, qualityMax: number): void;

        /**
         * Returns `true` if the `point` is inside the set of `vertices`.
         * @method contains
         * @param {vertices} vertices
         * @param {vector} point
         * @return {boolean} True if the vertices contains point, otherwise false
         */
        contains (vertices: Array<Vector>, point: Vector): boolean;

        /**
         * Creates a new set of `Matter.Body` compatible vertices.
         * The `points` argument accepts an array of `Matter.Vector` points orientated around the origin `(0, 0)`, for example:
         *
         *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
         *
         * The `Vertices.create` method returns a new array of vertices, which are similar to Matter.Vector objects,
         * but with some additional references required for efficient collision detection routines.
         *
         * Note that the `body` argument is not optional, a `Matter.Body` reference must be provided.
         *
         * @method create
         * @param {vector[]} points
         * @param {body} body
         */
        create (points: Array<Vector>, body: BodyType): Array<Vector>;

        /**
         * Parses a string containing ordered x y pairs separated by spaces (and optionally commas),
         * into a `Matter.Vertices` object for the given `Matter.Body`.
         * For parsing SVG paths, see `Svg.pathToVertices`.
         * @method fromPath
         * @param {string} path
         * @param {body} body
         * @return {vertices} vertices
         */
        fromPath (path: string, body: BodyType): Array<Vector>;

        /**
         * Returns the moment of inertia (second moment of area) of the set of vertices given the total mass.
         * @method inertia
         * @param {vertices} vertices
         * @param {number} mass
         * @return {number} The polygon's moment of inertia
         */
        inertia (vertices: Array<Vector>, mass: number): number;

        /**
         * Rotates the set of vertices in-place.
         * @method rotate
         * @param {vertices} vertices
         * @param {number} angle
         * @param {vector} point
         */
        rotate (vertices: Array<Vector>, angle: number, point: Vector): void;

        /**
         * Scales the vertices from a point (default is centre) in-place.
         * @method scale
         * @param {vertices} vertices
         * @param {number} scaleX
         * @param {number} scaleY
         * @param {vector} point
         */
        scale (vertices: Array<Vector>, scaleX: number, scaleY: number, point: Vector): void;

        /**
         * Translates the set of vertices in-place.
         * @method translate
         * @param {vertices} vertices
         * @param {vector} vector
         * @param {number} scalar
         */
        translate (vertices: Array<Vector>, vector: Vector, scalar: number): void;

    }

    /**
     * The `Matter.World` module contains methods for creating and manipulating the world composite.
     * A `Matter.World` is a `Matter.Composite` body, which is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`.
     * A `Matter.World` has a few additional properties including `gravity` and `bounds`.
     * It is important to use the functions in the `Matter.Composite` module to modify the world composite, rather than directly modifying its properties.
     * There are also a few methods here that alias those in `Matter.Composite` for easier readability.
     *
     * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
     *
     * @class World
     * @extends Composite
     */
    class World {

        /**
         * Add objects or arrays of objects of types: Body, Constraint, Composite
         * @param world
         * @param body
         * @returns world
         */
        static add (world: World, body: BodyType | Array<BodyType> | CompositeType | Array<CompositeType> | ConstraintType | Array<ConstraintType> | MouseConstraint): World;

        /**
         * An alias for Composite.addBody since World is also a Composite
         * @method addBody
         * @param {world} world
         * @param {body} body
         * @return {world} The original world with the body added
         */
        static addBody (world: World, body: BodyType): World;

        /**
         * An alias for Composite.add since World is also a Composite
         * @method addComposite
         * @param {world} world
         * @param {composite} composite
         * @return {world} The original world with the objects from composite added
         */
        static addComposite (world: World, composite: CompositeType): World;

        /**
         * An alias for Composite.addConstraint since World is also a Composite
         * @method addConstraint
         * @param {world} world
         * @param {constraint} constraint
         * @return {world} The original world with the constraint added
         */
        static addConstraint (world: World, constraint: ConstraintType): World;

        /**
         * An alias for Composite.clear since World is also a Composite
         * @method clear
         * @param {world} world
         * @param {boolean} keepStatic
         */
        static clear (world: World, keepStatic: boolean): void;

        /**
         * Creates a new world composite. The options parameter is an object that specifies any properties you wish to override the defaults.
         * See the properties section below for detailed information on what you can pass via the `options` object.
         * @method create
         * @constructor
         * @param {} options
         * @return {world} A new world
         */
        static create (options: IWorldDefinition): World;

        gravity: Gravity;

        bounds: Bounds;

    }

    class Events {

        /**
         * Fired when a body starts sleeping (where `this` is the body).
         *
         * @event sleepStart
         * @this {body} The body that has started sleeping
         * @param {} event An event object
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: BodyType, name: "sleepStart", callback: (e: IEvent<BodyType>) => void): void;

        /**
         * Fired when a body ends sleeping (where `this` is the body).
         *
         * @event sleepEnd
         * @this {body} The body that has ended sleeping
         * @param {} event An event object
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: BodyType, name: "sleepEnd", callback: (e: IEvent<BodyType>) => void): void;

        /**
         * Fired when a call to `Composite.add` is made, before objects have been added.
         *
         * @event beforeAdd
         * @param {} event An event object
         * @param {} event.object The object(s) to be added (may be a single body, constraint, composite or a mixed array of these)
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "beforeAdd", callback: (e: IEventComposite<CompositeType>) => void): void;

        /**
         * Fired when a call to `Composite.add` is made, after objects have been added.
         *
         * @event afterAdd
         * @param {} event An event object
         * @param {} event.object The object(s) that have been added (may be a single body, constraint, composite or a mixed array of these)
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "afterAdd", callback: (e: IEventComposite<CompositeType>) => void): void;

        /**
         * Fired when a call to `Composite.remove` is made, before objects have been removed.
         *
         * @event beforeRemove
         * @param {} event An event object
         * @param {} event.object The object(s) to be removed (may be a single body, constraint, composite or a mixed array of these)
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "beforeRemove", callback: (e: IEventComposite<CompositeType>) => void): void;

        /**
         * Fired when a call to `Composite.remove` is made, after objects have been removed.
         *
         * @event afterRemove
         * @param {} event An event object
         * @param {} event.object The object(s) that have been removed (may be a single body, constraint, composite or a mixed array of these)
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "afterRemove", callback: (e: IEventComposite<CompositeType>) => void): void;

        /**
         * Fired after engine update and all collision events
         *
         * @event afterUpdate
         * @param {} event An event object
         * @param {number} event.timestamp The engine.timing.timestamp of the event
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "afterUpdate", callback: (e: IEventTimestamped<Engine>) => void): void;

        /**
         * Fired just before an update
         *
         * @event beforeUpdate
         * @param {} event An event object
         * @param {number} event.timestamp The engine.timing.timestamp of the event
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "beforeUpdate", callback: (e: IEventTimestamped<Engine>) => void): void;

        /**
         * Fired after engine update, provides a list of all pairs that are colliding in the current tick (if any)
         *
         * @event collisionActive
         * @param {} event An event object
         * @param {} event.pairs List of affected pairs
         * @param {number} event.timestamp The engine.timing.timestamp of the event
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "collisionActive", callback: (e: IEventCollision<Engine>) => void): void;

        /**
         * Fired after engine update, provides a list of all pairs that have ended collision in the current tick (if any)
         *
         * @event collisionEnd
         * @param {} event An event object
         * @param {} event.pairs List of affected pairs
         * @param {number} event.timestamp The engine.timing.timestamp of the event
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "collisionEnd", callback: (e: IEventCollision<Engine>) => void): void;

        /**
         * Fired after engine update, provides a list of all pairs that have started to collide in the current tick (if any)
         *
         * @event collisionStart
         * @param {} event An event object
         * @param {} event.pairs List of affected pairs
         * @param {number} event.timestamp The engine.timing.timestamp of the event
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "collisionStart", callback: (e: IEventCollision<Engine>) => void): void;

        /**
         * Fired at the start of a tick, before any updates to the engine or timing
         *
         * @event beforeTick
         * @param {} event An event object
         * @param {number} event.timestamp The engine.timing.timestamp of the event
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "beforeTick", callback: (e: IEventTimestamped<Runner>) => void): void;

        /**
         * Fired after engine timing updated, but just before update
         *
         * @event tick
         * @param {} event An event object
         * @param {number} event.timestamp The engine.timing.timestamp of the event
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "tick", callback: (e: IEventTimestamped<Runner>) => void): void;

        /**
         * Fired at the end of a tick, after engine update and after rendering
         *
         * @event afterTick
         * @param {} event An event object
         * @param {number} event.timestamp The engine.timing.timestamp of the event
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "afterTick", callback: (e: IEventTimestamped<Runner>) => void): void;

        /**
         * Fired before rendering
         *
         * @event beforeRender
         * @param {} event An event object
         * @param {number} event.timestamp The engine.timing.timestamp of the event
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "beforeRender", callback: (e: IEventTimestamped<Runner>) => void): void;

        /**
         * Fired after rendering
         *
         * @event afterRender
         * @param {} event An event object
         * @param {number} event.timestamp The engine.timing.timestamp of the event
         * @param {} event.source The source object of the event
         * @param {} event.name The name of the event
         */
        static on (obj: Engine, name: "afterRender", callback: (e: IEventTimestamped<Runner>) => void): void;

        static on (obj: any, name: string, callback: (e: any) => void): void;

        /**
         * Removes the given event callback. If no callback, clears all callbacks in eventNames. If no eventNames, clears all events.
         *
         * @param obj
         * @param eventName
         * @param callback
         */
        static off(obj: any, eventName: string, callback: (e: any) => void): void;

        /**
         * Fires all the callbacks subscribed to the given object's eventName, in the order they subscribed, if any.
         *
         * @param object
         * @param eventNames
         * @param event
         */
        static trigger(object: any, eventNames: string, event?: (e: any) => void): void;

    }

    type Dependency = {name: string, range: string} | {name: string, version: string} | string;

    class Plugin {

        name: string;
        version: string;
        install: () => void;
        for?: string;

        /**
         * Registers a plugin object so it can be resolved later by name.
         * @method register
         * @param plugin {} The plugin to register.
         * @return {object} The plugin.
         */
        static register (plugin: Plugin): Plugin;

        /**
         * Resolves a dependency to a plugin object from the registry if it exists.
         * The `dependency` may contain a version, but only the name matters when resolving.
         * @method resolve
         * @param dependency {string} The dependency.
         * @return {object} The plugin if resolved, otherwise `undefined`.
         */
        static resolve (dependency: string): Plugin | undefined;

        /**
         * Returns `true` if the object meets the minimum standard to be considered a plugin.
         * This means it must define the following properties:
         * - `name`
         * - `version`
         * - `install`
         * @method isPlugin
         * @param obj {} The obj to test.
         * @return {boolean} `true` if the object can be considered a plugin otherwise `false`.
         */
        static isPlugin (obj: {}): boolean;

        /**
         * Returns a pretty printed plugin name and version.
         * @method toString
         * @param plugin {} The plugin.
         * @return {string} Pretty printed plugin name and version.
         */
        static toString (plugin: string | Plugin): string;

        /**
         * Returns `true` if `plugin.for` is applicable to `module` by comparing against `module.name` and `module.version`.
         * If `plugin.for` is not specified then it is assumed to be applicable.
         * The value of `plugin.for` is a string of the format `'module-name'` or `'module-name@version'`.
         * @method isFor
         * @param plugin {} The plugin.
         * @param module {} The module.
         * @return {boolean} `true` if `plugin.for` is applicable to `module`, otherwise `false`.
         */
        static isFor (plugin: Plugin, module: {name?: string, [_: string]: any}): boolean;

        /**
         * Installs the plugins by calling `plugin.install` on each plugin specified in `plugins` if passed, otherwise `module.uses`.
         * For installing plugins on `Matter` see the convenience function `Matter.use`.
         * Plugins may be specified either by their name or a reference to the plugin object.
         * Plugins themselves may specify further dependencies, but each plugin is installed only once.
         * Order is important, a topological sort is performed to find the best resulting order of installation.
         * This sorting attempts to satisfy every dependency's requested ordering, but may not be exact in all cases.
         * This function logs the resulting status of each dependency in the console, along with any warnings.
         * - A green tick ✅ indicates a dependency was resolved and installed.
         * - An orange diamond 🔶 indicates a dependency was resolved but a warning was thrown for it or one if its dependencies.
         * - A red cross ❌ indicates a dependency could not be resolved.
         * Avoid calling this function multiple times on the same module unless you intend to manually control installation order.
         * @method use
         * @param module {} The module install plugins on.
         * @param [plugins=module.uses] {} The plugins to install on module (optional, defaults to `module.uses`).
         */
        static use (module: {uses?: (Plugin | string)[]; [_: string]: any}, plugins: (Plugin | string)[]): void;

        /**
         * Recursively finds all of a module's dependencies and returns a flat dependency graph.
         * @method dependencies
         * @param module {} The module.
         * @return {object} A dependency graph.
         */
        static dependencies (module: Dependency, tracked?: {[_: string]: string[]}): {[_: string]: string[]} | string | undefined;

        /**
         * Parses a dependency string into its components.
         * The `dependency` is a string of the format `'module-name'` or `'module-name@version'`.
         * See documentation for `Plugin.versionParse` for a description of the format.
         * This function can also handle dependencies that are already resolved (e.g. a module object).
         * @method dependencyParse
         * @param dependency {string} The dependency of the format `'module-name'` or `'module-name@version'`.
         * @return {object} The dependency parsed into its components.
         */
        static dependencyParse (dependency: Dependency) : {name: string, range: string};

        /**
         * Parses a version string into its components.
         * Versions are strictly of the format `x.y.z` (as in [semver](http://semver.org/)).
         * Versions may optionally have a prerelease tag in the format `x.y.z-alpha`.
         * Ranges are a strict subset of [npm ranges](https://docs.npmjs.com/misc/semver#advanced-range-syntax).
         * Only the following range types are supported:
         * - Tilde ranges e.g. `~1.2.3`
         * - Caret ranges e.g. `^1.2.3`
         * - Exact version e.g. `1.2.3`
         * - Any version `*`
         * @method versionParse
         * @param range {string} The version string.
         * @return {object} The version range parsed into its components.
         */
        static versionParse (range: string) : {
            isRange: boolean,
            version: string,
            range: string,
            operator: string
            parts: number[],
            prerelease: string,
            number: number
        };

        /**
         * Returns `true` if `version` satisfies the given `range`.
         * See documentation for `Plugin.versionParse` for a description of the format.
         * If a version or range is not specified, then any version (`*`) is assumed to satisfy.
         * @method versionSatisfies
         * @param version {string} The version string.
         * @param range {string} The range string.
         * @return {boolean} `true` if `version` satisfies `range`, otherwise `false`.
         */
        static versionSatisfies (version: string, range: string): boolean;

    }

    //  v0.18 Release Updates

    class Collision {

        /**
         * Creates a new collision record.
         * @method create
         * @param {BodyType} bodyA The first body part represented by the collision record
         * @param {BodyType} bodyB The second body part represented by the collision record
         * @return {collision} A new collision record
         */
        create (bodyA: BodyType, bodyB: BodyType): any;

        /**
         * Detect collision between two bodies.
         * @method collides
         * @param {BodyType} bodyA
         * @param {BodyType} bodyB
         * @param {Pairs | null} [pairs] Optionally reuse collision records from existing pairs, pass null to create new records.
         * @return {collision|null} A collision record if detected, otherwise null
         */
        collides (bodyA: BodyType, bodyB: BodyType, pairs: Pairs | null): any;

    }
}

declare module 'matter' {
    export = MatterJS;
}
