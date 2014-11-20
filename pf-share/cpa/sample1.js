/**
 * @blog     http://terryyoung.blogspot.com/2011/08/connector-points-in-raphaeljs.html
 */


/**
 * Simplifies something like this:
 *
 * this.ox = this.type == 'rect' ? this.attr('x') : this.attr('cx');
 * this.oy = this.type == 'rect' ? this.attr('y') : this.attr('cy');
 *
 * to this:
 *
 * el.o();    // and better, it supports chaining
 *
 * @copyright   Terry Young <terryyounghk [at] gmail.com>
 * @license     WTFPL Version 2 ( http://en.wikipedia.org/wiki/WTFPL )
 */
Raphael.el.is = function (type) { return this.type == (''+type).toLowerCase(); };
Raphael.el.x = function () { return this.is('circle') ? this.attr('cx') : this.attr('x'); };
Raphael.el.y = function () { return this.is('circle') ? this.attr('cy') : this.attr('y'); };
Raphael.el.o = function () { this.ox = this.x(); this.oy = this.y(); return this; };


/**
 *
 * getABox() for RaphaelJS - getBBox() On Steroids
 * More routine, pre-calculated values that getBBox() doesn't provide
 *
 * @author      Terry Young <terryyounghk [at] gmail.com>
 * @license     WTFPL Version 2 ( http://en.wikipedia.org/wiki/WTFPL )
 *
 */
Raphael.el.getABox = function ()
{
    var b = this.getBBox(); // thanks, I'll take it from here...

    var o =
    {
        // we'd still return what the original getBBox() provides us with
        x:              b.x,
        y:              b.y,
        width:          b.width,
        height:         b.height,

        // now we can actually pre-calculate the following into properties that are more readible for humans
        // x coordinates have three points: left edge, centered, and right edge
        xLeft:          b.x,
        xCenter:        b.x + b.width / 2,
        xRight:         b.x + b.width,


        // y coordinates have three points: top edge, middle, and bottom edge
        yTop:           b.y,
        yMiddle:        b.y + b.height / 2,
        yBottom:        b.y + b.height
    };


    // now we can produce a 3x3 combination of the above to derive 9 x,y coordinates

    // center
    o.center      = {x: o.xCenter,    y: o.yMiddle };

    // edges
    o.topLeft     = {x: o.xLeft,      y: o.yTop };
    o.topRight    = {x: o.xRight,     y: o.yTop };
    o.bottomLeft  = {x: o.xLeft,      y: o.yBottom };
    o.bottomRight = {x: o.xRight,     y: o.yBottom };

    // corners
    o.top         = {x: o.xCenter,    y: o.yTop };
    o.bottom      = {x: o.xCenter,    y: o.yBottom };
    o.left        = {x: o.xLeft,      y: o.yMiddle };
    o.right       = {x: o.xRight,     y: o.yMiddle };

    // shortcuts to get the offset of paper's canvas
    o.offset      = $(this.paper.canvas).parent().offset();

    return o;
};



/**
 *
 * Routine method, so that you can just do this.drag(move, start, end);
 *
 * @author      Terry Young <terryyounghk [at] gmail.com>
 * @license     WTFPL Version 2 ( http://en.wikipedia.org/wiki/WTFPL )
 *
 *
 */
Raphael.el.draggable = function (options)
{
    $.extend(true, this, {
        margin: 0               // I might expand this in the future
    }, options || {margin: 10});

    var start = function () {
            this.o().toFront(); // store original pos, and zIndex to top

            if (this.dots && this.drawDots)
            {
                this.drawDots();
            }
        },
        move = function (dx, dy, mx, my, ev) {
            var b = this.getABox(); // Raphael's getBBox() on steroids
            var px = mx - b.offset.left,
                py = my - b.offset.top,
                x = this.ox + dx,
                y = this.oy + dy,
                r = this.is('circle') ? b.width / 2 : 0;

            var x = Math.min(
                        Math.max(0 + this.margin + (this.is('circle') ? r : 0), x),
                        this.paper.width - (this.is('circle') ? r : b.width) - this.margin),
                y = Math.min(
                        Math.max(0 + this.margin + (this.is('circle') ? r : 0), y),
                        this.paper.height - (this.is('circle') ? r : b.height) - this.margin);

            var pos = { x: x, y: y, cx: x, cy: y };

            this.attr(pos);

            if (this.dots && this.drawDots)
            {
                this.drawDots();
            }
        },
        end = function () {
        };

        this.drag(move, start, end);

    return this; // chaining
};


/**
 *
 * Makes Raphael.el.draggable applicable to Raphael Sets, and chainable
 *
 * @author      Terry Young <terryyounghk [at] gmail.com>
 * @license     WTFPL Version 2 ( http://en.wikipedia.org/wiki/WTFPL )
 *
 */
Raphael.st.draggable = function (options) { for (var i in this.items) this.items[i].draggable(options); return this; };


/**
 * This is a custom function for Raphael elements, and is designed
 * to be used with properties added and defined in Raphael.styles
 *
 * @author      Terry Young <terryyounghk [at] gmail.com>
 * @license     WTFPL Version 2 ( http://en.wikipedia.org/wiki/WTFPL )
 */
Raphael.el.style = function (state, style, aniOptions)
{
    if (!this.class)
    {
        this.class = style ? style : 'default';
        this.aniOptions = aniOptions ? aniOptions : null;

        // start assigning some basic behaviors
        this.mouseover(function () { this.style('hover'); });
        this.mouseout(function () { this.style('base'); });
        this.mousedown(function () { this.style('mousedown'); });
        this.mouseup(function () { this.style('hover'); });
    }

    style = this.class ? this.class : style;
    state = state ? state : 'base';
    aniOptions = this.aniOptions ? this.aniOptions : null;


    // The structure of Raphael.styles is " type --> style --> state "
    if (aniOptions)
    {
        this.animate(
            Raphael.styles[this.type][style][state],
            aniOptions.duration,
            aniOptions.easing,
            function () {
                if (aniOptions.callback)
                {
                    aniOptions.callback()
                }

                // do it again without the animation, to apply attributes that can't be animated, such as cursor, etc.
                this.attr(Raphael.styles[this.type][style][state]);
            });
    }
    else
    {
        this.attr(Raphael.styles[this.type][style][state]);
    }

return this; // chaining, e.g. shape.attr({ stroke: '#fff'}).style('dragging').toFront();
};


/**
 * Same API as Raphael.el.style for Raphael Sets
 *
 * @author      Terry Young <terryyounghk [at] gmail.com>
 * @license     WTFPL Version 2 ( http://en.wikipedia.org/wiki/WTFPL )
 */
Raphael.st.style = function (state, style, animated)
{
    for (var i = 0, j = this.items.length; i < j; i++)
    {
        var item = this.items[i];
        item.style(state, style, animated);
    }

return this; // chaining, e.g. set.attr({ stroke: '#fff'}).style('dragging').toFront();
};


/**
 * This is a method to add more style sets at runtime
 *
 * @author      Terry Young <terryyounghk [at] gmail.com>
 * @license     WTFPL Version 2 ( http://en.wikipedia.org/wiki/WTFPL )
 */
Raphael.setStyles = function (styles)
{
Raphael.styles = $.extend(true, {}, styles);
};



Raphael.setStyles
(
    {
        rect:
        {
        // base:        base style of a shape (For on/off states, "base" is the "off" state)
        // dragging:    style when this shape is being dragged
        // hover:       style when this line is directly hovered (previous state will be stored to prev)
        // mousedown:   style when mousedown onto this line (mouseup restores to hover style)

            // you can add your own set of visual states
            'default':
            {
                base:
                {
                    fill:           '#c4cedf',
                    stroke:         '#9cadc9',
                    'stroke-width': 2
                },
                dragging:
                {
                    fill:           '#f07171'
                },
                hover:
                {
                    cursor:         'pointer',
                    fill:           '#7c95a7',
                    stroke:         '#577082',
                    'stroke-width': 4
                },
                mousedown:
                {
                    fill:           '#617b8f',
                    stroke:         '#465968'
                }
            }
        },

        circle:
        {
            // you can add your own set of visual states
            'default':
            {
                base:
                {
                    fill:           '#e0c9c2',
                    stroke:         '#c4978a',
                    'stroke-width': 2
                },
                dragging:
                {
                    fill:           '#d07d7d'
                },
                hover:
                {
                    cursor:         'pointer',
                    fill:           '#d3837a',
                    stroke:         '#c15144',
                    'stroke-width': 4
                },
                mousedown:
                {
                    fill:           '#ba6561',
                    stroke:         '#9d4844'
                }
            },

            'connectorDots':
            {
                'base':
                {
                    r:              4,      // fixed radius
                    cursor:         'pointer',
                    fill:           '#fff',
                    stroke:         '#000',
                    'stroke-width': 1,
                    opacity:        0
                },
                'show':
                {
                    cursor:         'pointer',
                    opacity:        1
                },
                'hover':
                {
                    cursor:         'pointer',
                    r:              8,
                    fill:           '#ffff00',
                    opacity:        1
                },
                mousedown:
                {
                    cursor:         'pointer',
                    fill:           '#e8bc62'
                }
            }
        }
    }
);



/**
 * This creates and refreshes possible connector points for rects and circles.
 * This is just a prototype.
 *
 * @author      Terry Young <terryyounghk [at] gmail.com>
 * @license     WTFPL Version 2 ( http://en.wikipedia.org/wiki/WTFPL )
 */
Raphael.el.drawDots = function (aniOptions)
{
    var o = this.getABox(); // This is the getBBox() on steroids

    if (!this.dots)
    {
        // default animation options. If you don't want animation, pass in null
        this.aniOptions = aniOptions ? aniOptions : {
            duration:       300,
            easing:         'backOut'
        };

        var c = {
            set: this.paper.set()
        };

        c.set.push(c.center        = this.paper.circle(1, 1, 3).attr({cx: o.center.x, cy: o.center.y}));

        c.set.push(c.top           = this.paper.circle(1, 1, 3).attr({cx: o.top.x, cy: o.top.y}));
        c.set.push(c.left          = this.paper.circle(1, 1, 3).attr({cx: o.left.x, cy: o.left.y}));
        c.set.push(c.right         = this.paper.circle(1, 1, 3).attr({cx: o.right.x, cy: o.right.y}));
        c.set.push(c.bottom        = this.paper.circle(1, 1, 3).attr({cx: o.bottom.x, cy: o.bottom.y}));


        if (this.is('circle') == false)
        {
            c.set.push(c.topLeft       = this.paper.circle(1, 1, 3).attr({cx: o.topLeft.x, cy: o.topLeft.y}));
            c.set.push(c.topRight      = this.paper.circle(1, 1, 3).attr({cx: o.topRight.x, cy: o.topRight.y}));
            c.set.push(c.bottomLeft    = this.paper.circle(1, 1, 3).attr({cx: o.bottomLeft.x, cy: o.bottomLeft.y}));
            c.set.push(c.bottomRight   = this.paper.circle(1, 1, 3).attr({cx: o.bottomRight.x, cy: o.bottomRight.y}));
        }


        // cyclic references
        c.center.set =        c.set;

        c.top.set =
        c.left.set =
        c.right.set =
        c.bottom.set =        c.set;

        if (this.is('circle') == false)
        {
            c.topLeft.set =
            c.topRight.set =
            c.bottomLeft.set =
            c.bottomRight.set =   c.set;
        }

    c.set
        .hide()
        .style('base', 'connectorDots', this.aniOptions) // Behold the power of .style()
        .toFront();


    this
        .mouseover(function () { c.set.show().style('show'); })
        .mouseout(function () { c.set.style('base'); })
        .drag(
            function () { c.set.hide(); },
            function () { c.set.hide(); },
            function () { c.set.show()}
            );

    c.set
        .mouseover(function () { this.set.style('show'); })
        .mouseout(function () { this.set.style('base'); });


    this.dots = c; // looks readible in Firebug
    }
    else
    {
        var c = this.dots;

        aniOptions = this.aniOptions ? this.aniOptions : null;


        c.center      .attr({cx: o.center.x,          cy: o.center.y});

        c.top         .attr({cx: o.top.x,             cy: o.top.y});
        c.left        .attr({cx: o.left.x,            cy: o.left.y});
        c.right       .attr({cx: o.right.x,           cy: o.right.y});
        c.bottom      .attr({cx: o.bottom.x,          cy: o.bottom.y});

        if (this.is('circle') == false)
        {
            c.topLeft     .attr({cx: o.topLeft.x,         cy: o.topLeft.y});
            c.topRight    .attr({cx: o.topRight.x,        cy: o.topRight.y});
            c.bottomLeft  .attr({cx: o.bottomLeft.x,      cy: o.bottomLeft.y});
            c.bottomRight .attr({cx: o.bottomRight.x,     cy: o.bottomRight.y});
        }

        c.set.toFront(); // Bam!
    }

    return this; // chaining
};

/**
 *
 * Makes Raphael.el.drawDots applicable to Raphael Sets, and chainable
 *
 * @author      Terry Young <terryyounghk [at] gmail.com>
 * @license     WTFPL Version 2 ( http://en.wikipedia.org/wiki/WTFPL )
 *
 */
Raphael.st.drawDots = function (aniOptions)
{
    for (var i = 0, j = this.items.length; i < j; i++)
    {
        this.items[i].drawDots(aniOptions);
    }

    return this; // chaining
}


/**
 * getABox() for RaphaelJS - getBBox() On Steroids: DEMO
 *
 * @copyright   Terry Young <terryyounghk [at] gmail.com>
 * @license     WTFPL Version 2 ( http://en.wikipedia.org/wiki/WTFPL )
 */

///////////////////////////////////////////////////////////////////////////////
// The demo

$(document).ready(function () {

    var paper       = Raphael('SVG_GETABOX_HOLDER_1', 640, 200),
        set         = paper.set(),
        rect        = paper.rect(50, 50, 100, 100),
        circle      = paper.circle(250, 100, 50);


        // Damn, it looks so simple, and it just works.
        set .push(rect, circle)
            .style()
            .drawDots()
            .draggable();

});



