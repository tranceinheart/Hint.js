/**
 * DOM Hint
 * Copyright 2020 Pavel Terekhov
 * Responsible animated custom hints, not sensitive to overflow
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
/*TODO: close button*/
HTMLCollection.prototype.hint = function(options){
    if(options == null){
        options = {}
    }
    var MIN_TIMER = 10;
    var hint_node = document.createElement("div"),
        hint_node_text = document.createElement("div"),
        hint_node_pin = document.createElement("div"),
        hint_node_close_button = document.createElement("div"),
        //hold,
        margin = 0,
        body_offset,
        create_timeout,
        remove_timeout;
    
        switch(options.trigger){
            case "click": break;
            default: options.trigger = "mouseover"; break;
        }
    
    var prop = {
        maxWidth: options.maxWidth || 250,
        trigger: options.trigger,
        count: this.length,
        timer: options.timer > MIN_TIMER ? options.timer : MIN_TIMER,
        wait: options.wait || 10,
        holdOn: options.hold || 0,
        closeBy: options.closeBy || ["scroll", "resize", "clickOutside"],
        animate: options.animate || null,
        duration: options.animateDuration || 200,
        style: options.theme || null,
        data: options.text || null,
        vertical: options.vertical || "top",
        pin: options.pin || false
    };

    hint_node.classList.add("html-hint", prop.style);
    hint_node_text.classList.add("html-hint-content");
    hint_node.appendChild(hint_node_text);

    var el = {
        isExists: false,
        initial_node: null, // initial
        initial_node_box: null,
        width: prop.maxWidth,
        height: 0,
        x: 0,
        y: 0,
        center: 0,
        offset: 2,
        setup: function(){
            hint_node.style = "";
            hint_node.style.position = "absolute";
            body_offset = document.body.getBoundingClientRect().left;
            el.width = hint_node.getBoundingClientRect().width;
            if(el.width > prop.maxWidth){
                el.width = prop.maxWidth;
                hint_node.style.width = el.width + "px";
            }
            el.initial_node_box = el.initial_node.getBoundingClientRect();
            el.initial_x = el.initial_node_box.left - body_offset;
            el.initial_y = el.initial_node_box.top;

            el.height = hint_node.getBoundingClientRect().height;
            el.center = el.initial_x + el.initial_node_box.width/2;
            if(el.center + el.width/2 + el.offset <= window.innerWidth && el.center - el.width/2 - el.offset >= 0){
                el.x = el.center - el.width/2;
            }else{
                if(el.center + el.width/2 + el.offset > window.innerWidth){
                    el.x = window.innerWidth - el.offset - el.width
                }else{
                    el.x = el.offset
                }
            }
            switch (prop.vertical){
                case "middle":
                    el.y = el.initial_y + el.initial_node_box.height/2 - el.height;
                    break;
                case "bottom":
                    el.y = el.initial_y + el.initial_node_box.height + margin;
                    break;
                default:
                    el.y = el.initial_y - el.height - margin;
                    break;
            }
            
            hint_node.style.left = el.x +"px";
            hint_node.style.top = el.y + "px";
            if(prop.pin){
                hint_node_pin.style.left = el.center - el.x + "px";
                hint_node_pin.style.top = el.height + "px";
            }
        }
    };
    var safe_animation_remove = function(){
        hint_node.classList.remove(prop.animate);
        hint_node.removeEventListener("transitionend", safe_animation_remove);
        hint_node.remove();
    };
    var removeHint = function(e){
        if(el.isExists){
            if(e.type == "click" && e.target != hint_node_close_button) {
                if (e.target == el.initial_node) {
                    return
                }
                if (!(e.clientX < el.x || e.clientX > el.x + el.width || e.clientY < el.y || e.clientY > el.height + el.y)) {
                    return
                }
            }
            document.removeEventListener("click", removeHint);
            document.removeEventListener("mouseout", removeHint);
            document.removeEventListener("scroll", removeHint);
            window.removeEventListener("resize", removeHint,  el.setup);
            if(prop.animate){
                hint_node.classList.remove("complete");
                hint_node.addEventListener("transitionend", safe_animation_remove);
            }else{
                hint_node.remove();
            }
            el.isExists = false;
            clearTimeout(remove_timeout);
            el.width = 0;
        }
    };
    var createHint = function(e) {
        clearTimeout(remove_timeout);
        hint_node.removeEventListener("transitionend", safe_animation_remove);
        el.initial_node = e.target;
        var text = prop.data ? prop.data : el.initial_node.getAttribute("data-hint");
        if(text == undefined){return}
        hint_node_text.innerHTML = text;
        create_timeout = setTimeout(function(){
            if(prop.trigger == "click"){
                if (prop.timer > MIN_TIMER) {
                    remove_timeout = setTimeout(removeHint, prop.timer, {type: "timer"});
                }
                if(prop.closeBy.includes("clickOutside")){
                    document.addEventListener("click", removeHint);
                }
                if(prop.closeBy.includes("scroll")){
                    document.addEventListener("scroll", removeHint);
                }
                if(prop.closeBy.includes("resize")){
                    window.addEventListener("resize", removeHint);
                }else{
                    window.addEventListener("resize", el.setup);
                }
                if(prop.closeBy.includes("mouseOut")){
                    document.addEventListener("mouseout", removeHint);
                }
            }

            if(prop.trigger == "mouseover"){
                document.addEventListener("mouseout", removeHint);
            }

            document.body.appendChild(hint_node);
            if(prop.animate){
                hint_node.classList.add(prop.animate);
                setTimeout(function(){hint_node.classList.add("complete");}, 0);

            }
            
            el.setup();
            el.isExists = true;
            /* TODO: Hold until */
//			if(prop.wait > 0 && prop.holdOn > 0){
//				holdUntil = new Date().now()
//			}
        }, prop.wait);

        //Cancel waitin
        if(prop.trigger == "mouseover" && prop.wait > 0){
            window.addEventListener("mouseout", function(){
                clearTimeout(create_timeout);
            });
        }
    };

    for(var i = 0; i < prop.count; i++){
        this[i].addEventListener(prop.trigger, createHint);
    }

    if(prop.pin){
        hint_node_pin.style.position = "absolute";
        hint_node_pin.classList.add("html-hint-pin");
        hint_node.appendChild(hint_node_pin);
        margin = 8;
    }
    if(prop.closeBy.includes("button")){
        hint_node.classList.add("close-button");
        hint_node.appendChild(hint_node_close_button);
        hint_node_close_button.classList.add("html-hint-close");
        hint_node_close_button.addEventListener("click", removeHint);
    }
};