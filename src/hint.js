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
    var hint_node = document.createElement("div"),
        hint_node_text = document.createElement("div"),
        hint_node_pin = document.createElement("div"),
        //hold,
        margin,
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
        timer: options.timer > 10 ? options.timer : 10,
        wait: options.wait || 10,
        holdOn: options.hold || 0,
        closeBy: options.closeBy || ["scroll", "resize", "clickOutside"],
        animate: options.animate || null,
        duration: options.animateDuration || 200,
        style: options.theme || null,
        data: options.text || null,
        pin: options.pin || true
    };

    hint_node.classList.add("html-hint", prop.style);
    hint_node_text.classList.add("html-hint-content");
    hint_node.appendChild(hint_node_text);
    if(prop.pin){
        hint_node_pin.style.position = "absolute";
        hint_node_pin.classList.add("html-hint-pin");
        hint_node.appendChild(hint_node_pin);
        margin = 8;
    }

    var el = {
        isExists: false,
        ititial_node: null, // initial
        initial_x: 0,
        initial_y: 0,
        width: prop.maxWidth,
        height: 0,
        x: 0,
        y: 0,
        center: 0,
        offset: 2,
        setup: function(){
            hint_node.style = "";
            hint_node.style.position = "absolute";
            el.width = hint_node.offsetWidth;
            if(el.width > prop.maxWidth){
                el.width = prop.maxWidth;
                hint_node.style.width = el.width;
            }
            var box = el.ititial_node.getBoundingClientRect();
            el.ititial_node_x = box.left + pageXOffset;
            el.ititial_node_y = box.top + pageYOffset;
            el.height = hint_node.offsetHeight;
            el.center = el.initial_x + el.ititial_node.offsetWidth/2;
            if(el.center + el.width/2 + el.offset <= window.innerWidth && el.center - el.width/2 - el.offset >= 0){
                el.x = el.center - el.width/2;
            }else{
                if(el.center + el.width/2 + el.offset > window.innerWidth){
                    el.x = window.innerWidth - el.offset - el.width
                }else{
                    el.x = el.offset
                }
            }
            el.y = el.initial_y - el.height - margin;
            hint_node.style.left = el.x +"px";
            hint_node.style.top = el.y + "px";
            if(hint_node){
                hint_node_pin.style.left = el.center - el.x;
                hint_node_pin.style.top = el.height;
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
            if(e.type == "click") {
                if (e.target == el.ititial_node) {
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
        el.ititial_node = e.target;
        var text = prop.data ? prop.data : el.ititial_node.getAttribute("data-hint");
        if(text == undefined){return}
        hint_node_text.innerHTML = text;
        create_timeout = setTimeout(function(){
            if(prop.trigger == "click"){
                if (prop.timer != 0) {
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
                setTimeout(function(){hint_node.classList.add("complete");}, 0)
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
};