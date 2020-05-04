# Hint.js
A pure JS **responsible** hint maker

## Quick Start

Include the files

```html
<link rel="stylesheet" href="hint.css">
<script src="hint.js"></script>
```

Distiguish the Hints

Create an element with some class, add a **`data-hint`** attribute  as in example below

```html
<div class="your_class" data-hint="YOUR TEXT HERE">
```

Initialize Hint.js

```js
document.getElementsByClassName('your_class').hint({
    [option: parameter]
});
```

## Options

**`pin:`** (`Boolean`) (default: false)

A little triangle near an initial div

**`maxWidth:`** (`Integer`) (default: 250)

Allow to set max width

**`trigger:`** (`"click" | "mouseover"`) (default "mouseover")

Set an event to listen

**`timer:`** (`Integer`) (default: 0) (ms)

Hides a hint automatically in milliseconds
0 - never hide

**`wait:`** (`Integer`) (default: 0) (ms)

Time delay before showing (sometimes usefull when trigger is mouseover)

**`vertical:`** (`"top" | "bottom" | "auto"`) (default "auto")

**`closeBy:`** (`Array`) (default: ["scroll", "resize", "clickOutside", "mouseOut"])

Set triggers to close the hint. Supported parameters:
- resize
- scroll
- clickOutside
- mouseOut
- button (exit button inside hint)

Note: hint opened by mouseover will be closed by mouseout automatically

**`animate:`** (`Boolean`) (default: false)

Set an animation effect to show/hide the hint

**`theme:`** (`String`) (default: "white")

Choose a box-ready style of hint
- by the background color
    - "dark"
    - "light"
- you can add your own styles in css by the **.html-hint.[own_style_name] .html-hint-content** selector

**`text:`** (`String`)

Allow to force your own text (or HTML).

**`noDelayMode:`** (`Integer`) (default: undefined) (ms)

If you set a delay option, you can also set a time interval to turn off the wait delay


## Author

Pavel Terehov

Copyright &copy; 2020 Pavel Terekhov. MIT License.