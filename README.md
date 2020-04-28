# Hint.js
A pure JS hint maker

## Quick Start

Include the files

```html
<link rel="stylesheet" href="hint.css">
<script src="hint.js"></script>
```

Distiguish the Hints

Create an element with some class and add attribute data-hint as in example below

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

**`text:`** (`String`)

Allow to force your own text (or HTML).

**`pin:`** (`Boolean`) (Default: true)

A little triangle near an initial div

**`maxWidth:`** (`Integer`) (Default: 250)

Allow to set max width

**`trigger:`** (`"click" | "mouseover"`) (Default

Set an event to listen

**`timer:`** (`Integer`) (Default: 0) (ms)

Hides a hint automatically in milliseconds
0 - never hide

**`wait:`** (`Integer`) (Default: 0) (ms)

Time delay before showing (sometimes usefull when trigger is mouseover)

**`closeBy:`** (`Array`) (Default: ["scroll", "resize", "clickOutside", "mouseOut"])

Set triggers to close the hint.
    Supported parameters
       * resize
       * scroll
       * clickOutside
       * mouseOut
       ~~* button (adds a exit button inside hint)~~
Note: hint opened by mouseover close by mouseout automatically

**`animate:`** (`Array`) (Default: null)

Set an animation effect to show/hide the hint
    - fadeDown

**`duration:`** (`Integer`) (Default: 200) (ms)

Animation duration in milliseconds (less is faster)

**`theme:`** (`String`) (Default: "white")

Choose a box-ready style of hint
  * by the background color
        * "dark"
        * "light"
        * own_style_name
  * for show borders add
        * "border"
  * you can add your own styles in css by the **.html-hint.[own_style_name] .html-hint-content** selector

Options under development

**`nonWaitMode:`** (`Integer`) (Default: 5000) (ms)

If you set a wait option, you also can set a time interval to off the wait option, not to make user to wait if he has already waited


## Author

Pavel Terehov [@tranceinheart](https://instagram.com/tranceinheart)

Copyright &copy; 2020 Pavel Terehov. MIT License.