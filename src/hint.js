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
        hint_holder =  document.createElement("div"),
        hint_node_text = document.createElement("div"),
        hint_node_pin = document.createElement("div"),
        hint_node_close_button = document.createElement("div"),
        //hold,
        margin = 0,
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
        style: options.theme || "white",
        data: options.text || null,
        position: options.vertical || "auto",
        pin: options.pin || false,
        stickiness: options.stickiness || 18
    };
    hint_holder.style = "position: absolute; left: 0; top: 0; height: 0; width: 100%";
    hint_node.classList.add("html-hint", prop.style);
    hint_node_text.classList.add("html-hint-content");
    hint_holder.appendChild(hint_node);
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
        position: "auto",
        offset: 2, // offset from window border
        setup: function(e){
            hint_node.style = "";
            hint_node.style.position = "absolute";
            hint_node.classList.remove("position-bottom");
            el.width = hint_node.getBoundingClientRect().width;
            if(el.width > prop.maxWidth){
                el.width = prop.maxWidth;
                hint_node.style.width = el.width + "px";
            }

            el.initial_node_box = el.initial_node.getBoundingClientRect();
            el.height = hint_node.getBoundingClientRect().height;
            el.center = e.clientX;
            if(el.center + el.width/2 + el.offset <= window.innerWidth && el.center - el.width/2 - el.offset >= 0){
                el.x = el.center - el.width/2;
            }else{
                if(el.center + el.width/2 + el.offset > window.innerWidth){
                    el.x = window.innerWidth - el.offset - el.width
                }else{
                    el.x = el.offset
                }
            }

            if(prop.position == "auto"){
                if(el.initial_node_box.y + el.initial_node_box.height + el.height < window.innerHeight){
                    el.position = "bottom";
                }else{
                    el.position = "top";
                }
                if(el.initial_node_box.y - el.height > 0){
                    el.position = "top";
                }else{
                    el.position = "bottom";
                }
            }else{
                el.position = prop.position
            }

            switch (el.position){
                case "middle":
                    el.y = e.clientY + el.initial_node_box.height/2 - el.height;
                    break;
                case "top":
                    if(e.clientY - el.initial_node_box.y > prop.stickiness){
                        el.y = el.initial_node_box.y + el.initial_node_box.height - prop.stickiness - el.height - margin;
                    }else{
                        el.y = el.initial_node_box.y - el.height - margin;
                    }
                    break;
                case "bottom":
                    if((el.initial_node_box.y + el.initial_node_box.height) - e.clientY > prop.stickiness){
                        el.y = el.initial_node_box.y + prop.stickiness + margin;
                    }else{
                        el.y = el.initial_node_box.y + el.initial_node_box.height + margin;
                    }
                    hint_node.classList.add("position-bottom");
                    break;
            }
            
            hint_node.style.left = el.x +"px";
            hint_node.style.top = el.y + "px";
            if(prop.pin){
                var position = el.center - el.x;
                if(position < 9){
                    position = 9;
                }
                if(position > el.width - 9){
                    position = el.width - 9;
                }
                hint_node_pin.style.left = position + "px";
            }
        }
    };
    var safe_animation_remove = function(){
        hint_node.classList.remove(prop.animate);
        hint_node.removeEventListener("transitionend", safe_animation_remove);
        hint_holder.remove();
    };
    var removeHint = function(e){
        if(el.isExists){
            if(prop.trigger == "mouseover"){
                if(e.type == "mouseout"){
                    if(el.position == "bottom"){
                        if (e.clientX > el.x && e.clientX < el.x + el.width && e.clientY + prop.stickiness > el.y && e.clientY < el.height + el.y){
                            return
                        }
                    }
                    if(el.position == "top"){
                        if (e.clientX > el.x && e.clientX < el.x + el.width && e.clientY > el.y && e.clientY < el.height + el.y + prop.stickiness){
                            return
                        }
                    }
                }
            }
            if(e.type == "click" && e.target != hint_node_close_button) {
                if (e.target == el.initial_node) {
                    return
                }
                if (!(e.clientX <= el.x || e.clientX >= el.x + el.width || e.clientY < el.y || e.clientY > el.height + el.y)) {
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
                hint_holder.remove();
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
        var text = prop.data ? prop.data : (el.initial_node.getAttribute("data-hint"));
        if(text == undefined){return}
        if(text[0] == "#"){
            var node_pointer = text.slice(1);
            if(document.getElementById(node_pointer)){
                text = document.getElementById(node_pointer).innerHTML;
            }
        }

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

            document.body.appendChild(hint_holder);
            if(prop.animate){
                hint_node.classList.add(prop.animate);
                setTimeout(function(){hint_node.classList.add("complete");}, 0);
                hint_node.addEventListener("transitionend", function(){
                    hint_node.style.pointerEvents = "auto";
                });
                hint_node.addEventListener("transitionstart", function(){
                    hint_node.style.pointerEvents = "none";
                });
            }
            
            el.setup(e);
            el.isExists = true;
            /* TODO: Hold until */
//			if(prop.wait > 0 && prop.holdOn > 0){
//				holdUntil = new Date().now()
//			}
        }, prop.wait);

        //Cancel waitin
        // if(prop.trigger == "mouseover" && prop.wait > 0){
        //     window.addEventListener("mouseout", function(){
        //         clearTimeout(create_timeout);
        //     });
        // }
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