HTMLCollection.prototype.hint=function(e){null==e&&(e={});var t,i,n,o=document.createElement("div"),d=document.createElement("div"),s=document.createElement("div"),l=document.createElement("div"),a=0;switch(e.trigger){case"click":break;default:e.trigger="mouseover"}var r={maxWidth:e.maxWidth||250,trigger:e.trigger,count:this.length,timer:10<e.timer?e.timer:10,wait:e.wait||10,holdOn:e.hold||0,closeBy:e.closeBy||["scroll","resize","clickOutside"],animate:e.animate||null,duration:e.animateDuration||200,style:e.theme||null,data:e.text||null,vertical:e.vertical||"top",pin:e.pin||!1};o.classList.add("html-hint",r.style),d.classList.add("html-hint-content"),o.appendChild(d);function c(e){clearTimeout(n),o.removeEventListener("transitionend",m),u.initial_node=e.target;var t=r.data?r.data:u.initial_node.getAttribute("data-hint");null!=t&&(d.innerHTML=t,i=setTimeout(function(){"click"==r.trigger&&(10<r.timer&&(n=setTimeout(h,r.timer,{type:"timer"})),r.closeBy.includes("clickOutside")&&document.addEventListener("click",h),r.closeBy.includes("scroll")&&document.addEventListener("scroll",h),r.closeBy.includes("resize")?window.addEventListener("resize",h):window.addEventListener("resize",u.setup),r.closeBy.includes("mouseOut")&&document.addEventListener("mouseout",h)),"mouseover"==r.trigger&&document.addEventListener("mouseout",h),document.body.appendChild(o),r.animate&&(o.classList.add(r.animate),setTimeout(function(){o.classList.add("complete")},0)),u.setup(),u.isExists=!0},r.wait),"mouseover"==r.trigger&&0<r.wait&&window.addEventListener("mouseout",function(){clearTimeout(i)}))}for(var u={isExists:!1,initial_node:null,initial_node_box:null,width:r.maxWidth,height:0,x:0,y:0,center:0,offset:2,setup:function(){switch(o.style="",o.style.position="absolute",t=document.body.getBoundingClientRect().left,u.width=o.getBoundingClientRect().width,u.width>r.maxWidth&&(u.width=r.maxWidth,o.style.width=u.width+"px"),u.initial_node_box=u.initial_node.getBoundingClientRect(),u.initial_x=u.initial_node_box.left-t,u.initial_y=u.initial_node_box.top+window.pageYOffset,u.height=o.getBoundingClientRect().height,u.center=u.initial_x+u.initial_node_box.width/2,u.center+u.width/2+u.offset<=window.innerWidth&&0<=u.center-u.width/2-u.offset?u.x=u.center-u.width/2:u.center+u.width/2+u.offset>window.innerWidth?u.x=window.innerWidth-u.offset-u.width:u.x=u.offset,r.vertical){case"middle":u.y=u.initial_y+u.initial_node_box.height/2-u.height;break;case"bottom":u.y=u.initial_y+u.initial_node_box.height+a;break;default:u.y=u.initial_y-u.height-a}o.style.left=u.x+"px",o.style.top=u.y+"px",r.pin&&(s.style.left=u.center-u.x+"px",s.style.top=u.height+"px")}},m=function(){o.classList.remove(r.animate),o.removeEventListener("transitionend",m),o.remove()},h=function(e){if(u.isExists){if("click"==e.type&&e.target!=l){if(e.target==u.initial_node)return;if(!(e.clientX<u.x||e.clientX>u.x+u.width||e.clientY<u.y||e.clientY>u.height+u.y))return}document.removeEventListener("click",h),document.removeEventListener("mouseout",h),document.removeEventListener("scroll",h),window.removeEventListener("resize",h,u.setup),r.animate?(o.classList.remove("complete"),o.addEventListener("transitionend",m)):o.remove(),u.isExists=!1,clearTimeout(n),u.width=0}},v=0;v<r.count;v++)this[v].addEventListener(r.trigger,c);r.pin&&(s.style.position="absolute",s.classList.add("html-hint-pin"),o.appendChild(s),a=8),r.closeBy.includes("button")&&(o.classList.add("close-button"),o.appendChild(l),l.classList.add("html-hint-close"),l.addEventListener("click",h))};