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

**`pin:`** (`Boolean`) (default: true)

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

**`vertical:`** (`"top" | "middle" | "bottom"`)

**`closeBy:`** (`Array`) (default: ["scroll", "resize", "clickOutside", "mouseOut"])

Set triggers to close the hint. Supported parameters:
- resize
- scroll
- clickOutside
- mouseOut
- button (exit button inside hint)

Note: hint opened by mouseover will be closed by mouseout automatically

**`animate:`** (`Array`) (default: null)

Set an animation effect to show/hide the hint
- fadeDown

**`theme:`** (`String`) (default: "white")

Choose a box-ready style of hint
- by the background color
    - "dark"
    - "light"
    - own_style_name
- for show borders add
    - "border"
- you can add your own styles in css by the **.html-hint.[own_style_name] .html-hint-content** selector

**`text:`** (`String`)

Allow to force your own text (or HTML).

==========

Options under development

**`nonWaitMode:`** (`Integer`) (default: 5000) (ms)

If you set a wait option, you also can set a time interval to off the wait option, not to make user already waited


## Author

Pavel Terehov

Copyright &copy; 2020 Pavel Terehov. MIT License.