// ==UserScript==
// @name           Annotations Restored (embedded)
// @description    Bring annotation support back to embedded YouTube videos
// @author         Pluie
// @version        0.1.0
// @license        GPLv3
// @homepageURL    https://github.com/PluieElectrique/annotations-restored-embed
// @supportURL     https://github.com/PluieElectrique/annotations-restored-embed/issues
// @downloadURL    https://github.com/PluieElectrique/annotations-restored-embed/raw/master/annotations-restored-embed.user.js
// @match          *://www.youtube.com/embed/*
// @grant          GM_xmlhttpRequest
// ==/UserScript==

!function(global){const Pax={};function file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fhighlight$2ejs(module,exports,require,__filename,__dirname,__import_meta){with(Object.defineProperty(exports,"__esModule",{value:!0}),function(){const t=require._esModule("./note.js");return Object.freeze(Object.create(null,{[Symbol.toStringTag]:{value:"ModuleImports"},NoteAnnotation:{get:()=>t.NoteAnnotation,enumerable:!0},getFinalAnnotationColor:{get:()=>t.getFinalAnnotationColor,enumerable:!0}}))}())!function(){"use strict";Object.defineProperties(exports,{default:{get:()=>t,enumerable:!0}});const t=class extends NoteAnnotation{constructor(t){super(t);const{bgOpacity:e}=this.data;this.element.style.backgroundColor="",this.element.style.border=`2.5px solid ${getFinalAnnotationColor(e,8748933,!1)}`}setupHoverAppearance(){const{bgOpacity:t,bgColor:e,actionType:i}=this.data;this.element.addEventListener("mouseenter",()=>{this.element.style.border=`2.5px solid ${getFinalAnnotationColor(t,e,!0)}`,this.closeElement.style.display="block"}),this.element.addEventListener("mouseleave",()=>{this.element.style.border=`2.5px solid ${getFinalAnnotationColor(t,8748933,!1)}`,this.closeElement.style.display="none"}),"url"===i&&(this.element.style.cursor="pointer")}}}()}function file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fhighlightText$2ejs(module,exports,require,__filename,__dirname,__import_meta){with(Object.defineProperty(exports,"__esModule",{value:!0}),function(){const t=require._esModule("./note.js");return Object.freeze(Object.create(null,{[Symbol.toStringTag]:{value:"ModuleImports"},NoteAnnotation:{get:()=>t.NoteAnnotation,enumerable:!0}}))}())!function(){"use strict";Object.defineProperties(exports,{default:{get:()=>t,enumerable:!0}});const t=class extends NoteAnnotation{constructor(t,e){t.x+=e.data.x,t.y+=e.data.y,super(t),this.element.style.backgroundColor="",this.element.style.border="",this.element.style.pointerEvents="none",e.element.addEventListener("mouseenter",t=>{this.show()}),e.element.addEventListener("mouseleave",t=>{this.hide()}),this.closeElement.remove()}setupHoverAppearance(){}}}()}function file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fnote$2ejs(t,e,i,n,s,o){Object.defineProperty(e,"__esModule",{value:!0}),function(){"use strict";Object.defineProperties(e,{default:{get:()=>s,enumerable:!0},NoteAnnotation:{get:()=>t,enumerable:!0},getFinalAnnotationColor:{get:()=>n,enumerable:!0},decimalToHex:{get:()=>i,enumerable:!0}});class t{static get defaultAppearanceAttributes(){return{bgColor:16777215,bgOpacity:.8,fgColor:0,textSize:3.15}}constructor(t){if(!t)throw new Error("Annotation data must be provided");this.data=t,this.element=document.createElement("div"),this.element.classList.add("__cxt-ar-annotation__"),this.element.__annotationData=this.data,this.closeElement=this.setupCloseElement(),this.element.append(this.closeElement),this.data.text&&(this.textElement=document.createElement("span"),this.textElement.textContent=this.data.text,this.element.append(this.textElement)),this.setupAppearance(),"speech"!==this.data.style&&"title"!==this.data.style&&this.setupHoverAppearance(),this.element.setAttribute("data-ar-type",this.data.type),this.data.style&&this.element.setAttribute("data-ar-style",this.data.style),this.element.setAttribute("hidden",""),this.textScaling=100,this.paddingMultiplier=1,this.closeButtonScaling=.0423,this.closeButtonOffset=-1.8}setupCloseElement(){const t=this.createCloseElement();return t.addEventListener("click",t=>{this.element.setAttribute("hidden",""),this.element.setAttribute("data-ar-closed","")}),t}setupAppearance(){let t=this.constructor.defaultAppearanceAttributes;isNaN(this.data.textSize)||(t.textSize=this.data.textSize),isNaN(this.data.fgColor)||(t.fgColor=this.data.fgColor),isNaN(this.data.bgColor)||(t.bgColor=this.data.bgColor),isNaN(this.data.bgOpacity)||(t.bgOpacity=this.data.bgOpacity),this.data.bgColor=t.bgColor,this.data.bgOpacity=t.bgOpacity,this.data.fgColor=t.fgColor,this.data.textSize=t.textSize,this.element.style.color="#"+i(t.fgColor)}setupHoverAppearance(){const{bgOpacity:t,bgColor:e}=this.data,i=n(t,e);this.element.style.backgroundColor=i,this.element.addEventListener("mouseenter",()=>{this.element.style.backgroundColor=n(t,e,!0),this.closeElement.style.display="block"}),this.element.addEventListener("mouseleave",()=>{this.element.style.backgroundColor=n(t,e,!1),this.closeElement.style.display="none"}),"url"===this.data.actionType&&(this.element.style.cursor="pointer")}createCloseElement(t=10){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 100 100"),e.classList.add("__cxt-ar-annotation-close__");const i=document.createElementNS(e.namespaceURI,"path");i.setAttribute("d","M25 25 L 75 75 M 75 25 L 25 75"),i.setAttribute("stroke","#bbb"),i.setAttribute("stroke-width",t),i.setAttribute("x",5),i.setAttribute("y",5);const n=document.createElementNS(e.namespaceURI,"circle");return n.setAttribute("cx",50),n.setAttribute("cy",50),n.setAttribute("r",50),e.append(n,i),e}show(){this.element.removeAttribute("hidden")}hide(){this.element.setAttribute("hidden","")}updateTextSize(t){if(this.data.textSize){const e=this.data.textSize/this.textScaling*t;this.fontSize=`${e}px`}}updateCloseSize(t){const e=t*this.closeButtonScaling;this.closeElement.style.width=e+"px",this.closeElement.style.height=e+"px",this.closeElement.style.right=e/this.closeButtonOffset+"px",this.closeElement.style.top=e/this.closeButtonOffset+"px",this.closeButtonSize=e}setDimensions(t,e,i,n){this.left=t,this.top=e,this.width=i,this.height=n}setPadding(t,e){t=t*this.paddingMultiplier+"px",e=e*this.paddingMultiplier+"px",this.element.style.padding=`${e} ${t} ${e} ${t}`}get closed(){return this.element.hasAttribute("data-ar-closed")}get hidden(){return this.element.hasAttribute("hidden")}get type(){return this.data.type}get style(){return this.data.style}set left(t){this.element.style.left=t}set top(t){this.element.style.top=t}set width(t){this.element.style.width=t}set height(t){this.element.style.height=t}set fontSize(t){this.element.style.fontSize=t}}function i(t){let e=t.toString(16);return e="000000".substr(0,6-e.length)+e}function n(t,e,n=!1,s=230){if(!isNaN(t)&&!isNaN(e)){const o=n?s.toString(16):Math.floor(255*t).toString(16);return`#${i(e)}${o}`}return"#FFFFFFFF"}const s=t}()}function file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fspeech$2ejs(module,exports,require,__filename,__dirname,__import_meta){with(Object.defineProperty(exports,"__esModule",{value:!0}),function(){const t=require._esModule("./note.js");return Object.freeze(Object.create(null,{[Symbol.toStringTag]:{value:"ModuleImports"},NoteAnnotation:{get:()=>t.NoteAnnotation,enumerable:!0},getFinalAnnotationColor:{get:()=>t.getFinalAnnotationColor,enumerable:!0}}))}())!function(){"use strict";Object.defineProperties(exports,{default:{get:()=>t,enumerable:!0}});const t=class extends NoteAnnotation{static get horizontalBaseStartMultiplier(){return.17379070765180116}static get horizontalBaseEndMultiplier(){return.14896346370154384}static get verticalBaseStartMultiplier(){return.12}static get verticalBaseEndMultiplier(){return.3}constructor(t){super(t),this.createSpeechBubble(),this.setupHoverAppearance(),this.textX=0,this.textY=0,this.textWidth=0,this.textHeight=0,this.baseStartX=0,this.baseStartY=0,this.baseEndX=0,this.baseEndY=0,this.pointX=0,this.pointY=0,this.directionPadding=20,this.paddingMultiplier=2}getPointDirection(t,e,i,n,s,o,a=20){return s>t+i-i/2&&o>e+n?"br":s<t+i-i/2&&o>e+n?"bl":s>t+i-i/2&&o<e-a?"tr":s<t+i-i/2&&o<e?"tl":s>t+i&&o>e-a&&o<e+n-a?"r":s<t&&o>e&&o<e+n?"l":void 0}createSpeechBubble(t="white"){this.speechSvg=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.speechSvg.classList.add("__cxt-ar-annotation-speech-bubble__"),this.speechSvg.style.position="absolute",this.speechSvg.setAttribute("width","100%"),this.speechSvg.setAttribute("height","100%"),this.speechSvg.style.left="0",this.speechSvg.style.left="0",this.speechSvg.style.display="block",this.speechSvg.style.overflow="visible",this.speechTriangle=document.createElementNS("http://www.w3.org/2000/svg","path"),this.speechTriangle.setAttribute("fill",t),this.speechSvg.append(this.speechTriangle);const{bgOpacity:e,bgColor:i}=this.data;this.speechTriangle.setAttribute("fill",getFinalAnnotationColor(e,i,!1)),this.element.prepend(this.speechSvg)}updateSpeechBubble(t,e,i,n,s,o,a="white",r=20){const l=this.constructor.horizontalBaseStartMultiplier,h=this.constructor.horizontalBaseEndMultiplier,d=this.constructor.verticalBaseStartMultiplier,f=this.constructor.verticalBaseEndMultiplier,c=this.getPointDirection(t,e,i,n,s,o,this.directionPadding);let p="";if("br"===c)this.baseStartX=i-i*l*2,this.baseEndX=this.baseStartX+i*h,this.baseStartY=n,this.baseEndY=n,this.pointX=s-t,this.pointY=o-e,this.height=o-e+"px",p=`L${i} ${n} L${i} 0 L0 0 L0 ${this.baseStartY} L${this.baseStartX} ${this.baseStartY}`,this.textWidth=i,this.textHeight=n,this.textX=0,this.textY=0;else if("bl"===c)this.baseStartX=i*l,this.baseEndX=this.baseStartX+i*h,this.baseStartY=n,this.baseEndY=n,this.pointX=s-t,this.pointY=o-e,this.height=`${o-e}px`,p=`L${i} ${n} L${i} 0 L0 0 L0 ${this.baseStartY} L${this.baseStartX} ${this.baseStartY}`,this.textWidth=i,this.textHeight=n,this.textX=0,this.textY=0;else if("tr"===c){this.baseStartX=i-i*l*2,this.baseEndX=this.baseStartX+i*h;const a=e-o;this.baseStartY=a,this.baseEndY=a,this.top=e-a+"px",this.height=n+a+"px",this.pointX=s-t,this.pointY=0,p=`L${i} ${a} L${i} ${n+a} L0 ${n+a} L0 ${a} L${this.baseStartX} ${this.baseStartY}`,this.textWidth=i,this.textHeight=n,this.textX=0,this.textY=a}else if("tl"===c){this.baseStartX=i*l,this.baseEndX=this.baseStartX+i*h;const a=e-o;this.baseStartY=a,this.baseEndY=a,this.top=e-a+"px",this.height=n+a+"px",this.pointX=s-t,this.pointY=0,p=`L${i} ${a} L${i} ${n+a} L0 ${n+a} L0 ${a} L${this.baseStartX} ${this.baseStartY}`,this.textWidth=i,this.textHeight=n,this.textX=0,this.textY=a}else if("r"===c){const a=s-(t+i);this.baseStartX=i,this.baseEndX=i,this.width=i+a+"px",this.baseStartY=n*d,this.baseEndY=this.baseStartY+n*f,this.pointX=i+a,this.pointY=o-e,p=`L${this.baseStartX} ${n} L0 ${n} L0 0 L${this.baseStartX} 0 L${this.baseStartX} ${this.baseStartY}`,this.textWidth=i,this.textHeight=n,this.textX=0,this.textY=0}else if("l"===c){const a=t-s;this.baseStartX=a,this.baseEndX=a,this.left=t-a+"px",this.width=i+a+"px",this.baseStartY=n*d,this.baseEndY=this.baseStartY+n*f,this.pointX=0,this.pointY=o-e,p=`L${this.baseStartX} ${n} L${i+this.baseStartX} ${n} L${i+this.baseStartX} 0 L${this.baseStartX} 0 L${this.baseStartX} ${this.baseStartY}`,this.textWidth=i,this.textHeight=n,this.textX=a,this.textY=0}this.textElement&&(this.textElement.style.left=this.textX+"px",this.textElement.style.top=this.textY+"px",this.textElement.style.width=this.textWidth+"px",this.textElement.style.height=this.textHeight+"px"),this.closeElement&&this.closeButtonSize&&(this.closeElement.style.left=this.textX+this.textWidth+this.closeButtonSize/this.closeButtonOffset+"px",this.closeElement.style.top=this.textY+this.closeButtonSize/this.closeButtonOffset+"px");const u=`M${this.baseStartX} ${this.baseStartY} L${this.pointX} ${this.pointY} L${this.baseEndX} ${this.baseEndY} ${p}`;this.speechTriangle.setAttribute("d",u)}updateCloseSize(t){const e=t*this.closeButtonScaling;this.closeElement.style.width=e+"px",this.closeElement.style.height=e+"px",this.closeButtonSize=e}setupHoverAppearance(){const{bgOpacity:t,bgColor:e}=this.data;this.speechTriangle.addEventListener("mouseover",()=>{this.closeElement.style.display="block",this.closeElement.style.cursor="pointer",this.speechTriangle.setAttribute("fill",getFinalAnnotationColor(t,e,!0))}),this.speechTriangle.addEventListener("mouseout",i=>{i.relatedTarget.classList.contains("__cxt-ar-annotation-close__")||(this.closeElement.style.display="none",this.closeElement.style.cursor="default",this.speechTriangle.setAttribute("fill",getFinalAnnotationColor(t,e,!1)))}),this.closeElement.addEventListener("mouseleave",()=>{this.closeElement.style.display="none",this.closeElement.style.cursor="default",this.speechTriangle.style.cursor="default",this.speechTriangle.setAttribute("fill",getFinalAnnotationColor(t,e,!1))}),"url"===this.data.actionType&&(this.element.style.cursor="pointer")}setPadding(t,e){t=t*this.paddingMultiplier+"px",e=e*this.paddingMultiplier+"px",this.textElement&&(this.textElement.style.padding=`${e} ${t} ${e} ${t}`)}}}()}function file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2findex$2ejs(module,exports,require,__filename,__dirname,__import_meta){with(Object.defineProperty(exports,"__esModule",{value:!0}),function(){const t=require._esModule("./annotations/note.js"),e=require._esModule("./annotations/speech.js"),i=require._esModule("./annotations/highlight.js"),n=require._esModule("./annotations/highlightText.js");return Object.freeze(Object.create(null,{[Symbol.toStringTag]:{value:"ModuleImports"},NoteAnnotation:{get:()=>t.default,enumerable:!0},SpeechAnnotation:{get:()=>e.default,enumerable:!0},HighlightAnnotation:{get:()=>i.default,enumerable:!0},HighlightTextAnnotation:{get:()=>n.default,enumerable:!0}}))}())!function(){"use strict";window.AnnotationRenderer=class{constructor(t,e,i,n=200){if(!t)throw new Error("Annotation objects must be provided");if(!e)throw new Error("An element to contain the annotations must be provided");i&&i.getVideoTime&&i.seekTo?this.playerOptions=i:console.info("AnnotationRenderer is running without a player. The update method will need to be called manually."),this.annotations=[],this.container=e,this.annotationsContainer=document.createElement("div"),this.annotationsContainer.classList.add("__cxt-ar-annotations-container__"),this.annotationsContainer.setAttribute("data-layer","4"),this.annotationsContainer.addEventListener("click",t=>{this.annotationClickHandler(t)}),this.container.prepend(this.annotationsContainer),this.createAnnotationElements(t),this.updateAllAnnotationSizes(),window.addEventListener("DOMContentLoaded",t=>{this.updateAllAnnotationSizes()}),this.updateInterval=n,this.updateIntervalId=null}changeAnnotationData(t){this.stop(),this.removeAnnotationElements(),this.annotations=t,this.createAnnotationElements(),this.start()}createAnnotationElements(t){const e={},i={};for(const n of t){let t;"speech"===n.style?t=new SpeechAnnotation(n):"highlight"===n.type?(t=new HighlightAnnotation(n),e[n.id]=t):"highlightText"===n.style?i[n.highlightId]=n:t=new NoteAnnotation(n),t&&(this.annotations.push(t),this.annotationsContainer.append(t.element))}for(const t in e){const n=i[t];if(n){const i=e[t],s=new HighlightTextAnnotation(n,i);this.annotations.push(s),this.annotationsContainer.append(s.element)}}}createCloseElement(){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 100 100"),t.classList.add("__cxt-ar-annotation-close__");const e=document.createElementNS(t.namespaceURI,"path");e.setAttribute("d","M25 25 L 75 75 M 75 25 L 25 75"),e.setAttribute("stroke","#bbb"),e.setAttribute("stroke-width",10),e.setAttribute("x",5),e.setAttribute("y",5);const i=document.createElementNS(t.namespaceURI,"circle");return i.setAttribute("cx",50),i.setAttribute("cy",50),i.setAttribute("r",50),t.append(i,e),t}removeAnnotationElements(){for(const t of this.annotations)t.element.remove()}update(t){for(const e of this.annotations){if(e.closed||"highlightText"===e.style)continue;const i=e.data.timeStart,n=e.data.timeEnd;e.hidden&&t>=i&&t<n?e.show():!e.hidden&&(t<i||t>n)&&e.hide()}}start(){if(!this.playerOptions)throw new Error("playerOptions must be provided to use the start method");const t=this.playerOptions.getVideoTime();this.updateIntervalId||(this.update(t),this.updateIntervalId=setInterval(()=>{const t=this.playerOptions.getVideoTime();this.update(t),window.dispatchEvent(new CustomEvent("__ar_renderer_start"))},this.updateInterval))}stop(){if(!this.playerOptions)throw new Error("playerOptions must be provided to use the stop method");const t=this.playerOptions.getVideoTime();this.updateIntervalId&&(this.update(t),clearInterval(this.updateIntervalId),this.updateIntervalId=null,window.dispatchEvent(new CustomEvent("__ar_renderer_stop")))}updateAnnotationDimensions(t,e,i){const n=this.container.getBoundingClientRect().width,s=this.container.getBoundingClientRect().height,o=n/e,a=s/i;let r=n,l=s;o%1==0&&a%1==0||(o>a?(r=s/i*e,l=s):a>o&&(r=n,l=n/e*i));const h=(n-r)/2/n*100,d=(s-l)/2/s*100,f=r/n,c=l/s;for(const e of t){let t=h+e.data.x*f,i=d+e.data.y*c,o=e.data.width*f,a=e.data.height*c;e.setDimensions(`${t}%`,`${i}%`,`${o}%`,`${a}%`);let p=.008*r,u=.008*l;if(e.setPadding(p,u),"speech"===e.style&&e.speechSvg){const r=this.percentToPixels(n,t),l=this.percentToPixels(s,i),p=this.percentToPixels(n,o),u=this.percentToPixels(s,a);let m=h+e.data.sx*f,$=d+e.data.sy*c;m=this.percentToPixels(n,m),$=this.percentToPixels(s,$),e.updateSpeechBubble(r,l,p,u,m,$,null)}e.updateTextSize(l),e.updateCloseSize(l)}}updateAllAnnotationSizes(){if(this.playerOptions&&this.playerOptions.getOriginalVideoWidth&&this.playerOptions.getOriginalVideoHeight){const t=this.playerOptions.getOriginalVideoWidth(),e=this.playerOptions.getOriginalVideoHeight();this.updateAnnotationDimensions(this.annotations,t,e)}else{const t=this.container.getBoundingClientRect().width,e=this.container.getBoundingClientRect().height;this.updateAnnotationDimensions(this.annotations,t,e)}}hideAll(){for(const t of this.annotations)t.hide()}annotationClickHandler(t){let e=t.target;if(!e.matches(".__cxt-ar-annotation__")&&!e.closest(".__cxt-ar-annotation-close__")&&!(e=e.closest(".__cxt-ar-annotation__")))return null;let i=e.__annotationData;if(e&&i)if("time"===i.actionType){const t=i.actionSeconds;if(this.playerOptions){this.playerOptions.seekTo(t);const e=this.playerOptions.getVideoTime();this.update(e)}window.dispatchEvent(new CustomEvent("__ar_seek_to",{detail:{seconds:t}}))}else if("url"===i.actionType){const t={url:i.actionUrl,target:i.actionUrlTarget||"current"},e=this.extractTimeHash(new URL(t.url));e&&e.hasOwnProperty("seconds")&&(t.seconds=e.seconds),window.dispatchEvent(new CustomEvent("__ar_annotation_click",{detail:t}))}}setUpdateInterval(t){this.updateInterval=t,this.stop(),this.start()}extractTimeHash(t){if(!t)throw new Error("A URL must be provided");const e=t.hash;if(e&&e.startsWith("#t=")){const e=t.hash.split("#t=")[1];return{seconds:this.timeStringToSeconds(e)}}return!1}timeStringToSeconds(t){let e=0;const i=t.split("h"),n=(i[1]||t).split("m"),s=(n[1]||t).split("s");return i[0]&&2===i.length&&(e+=60*parseInt(i[0],10)*60),n[0]&&2===n.length&&(e+=60*parseInt(n[0],10)),s[0]&&2===s.length&&(e+=parseInt(s[0],10)),e}percentToPixels(t,e){return t*e/100}}}()}Pax.baseRequire="undefined"!=typeof require?require:t=>{throw new Error(`Could not resolve module name: ${t}`)},Pax.modules={},Pax.files={},Pax.mains={},Pax.resolve=((t,e)=>{(t=t.split("/")).shift();for(const i of e.split("/"))".."===i?t.pop():"."!==i&&t.push(i);return"/"+t.join("/")}),Pax.Module=function(t,e){this.filename=t,this.id=t,this.loaded=!1,this.parent=e,this.children=[],this.exports={}},Pax.makeRequire=(t=>{const e=t=>e._module(t).exports;return e._deps={},e.main=t,e._esModule=(t=>{const i=e._module(t);return i.exports.__esModule?i.exports:{get default(){return i.exports}}}),e._module=(i=>{let n=t?e._deps[i]:Pax.main;if(null==n){const t={exports:Pax.baseRequire(i)};return e._deps[i]={module:t},t}if(n.module)return n.module;const s=new Pax.Module(n.filename,t);return n.module=s,s.require=Pax.makeRequire(s),s.require._deps=n.deps,s.require.main=t?t.require.main:s,t&&t.children.push(s),n(s,s.exports,s.require,n.filename,n.filename.split("/").slice(0,-1).join("/"),{url:"file://"+("/"===n.filename.charAt(0)?"":"/")+n.filename}),s.loaded=!0,s}),e}),Pax.files["/home/afrm/Desktop/annotationlib/src/renderer/annotations/highlight.js"]=file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fhighlight$2ejs,file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fhighlight$2ejs.deps={"./note.js":file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fnote$2ejs},file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fhighlight$2ejs.filename="/home/afrm/Desktop/annotationlib/src/renderer/annotations/highlight.js",Pax.files["/home/afrm/Desktop/annotationlib/src/renderer/annotations/highlightText.js"]=file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fhighlightText$2ejs,file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fhighlightText$2ejs.deps={"./note.js":file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fnote$2ejs},file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fhighlightText$2ejs.filename="/home/afrm/Desktop/annotationlib/src/renderer/annotations/highlightText.js",Pax.files["/home/afrm/Desktop/annotationlib/src/renderer/annotations/note.js"]=file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fnote$2ejs,file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fnote$2ejs.deps={},file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fnote$2ejs.filename="/home/afrm/Desktop/annotationlib/src/renderer/annotations/note.js",Pax.files["/home/afrm/Desktop/annotationlib/src/renderer/annotations/speech.js"]=file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fspeech$2ejs,file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fspeech$2ejs.deps={"./note.js":file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fnote$2ejs},file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fspeech$2ejs.filename="/home/afrm/Desktop/annotationlib/src/renderer/annotations/speech.js",Pax.files["/home/afrm/Desktop/annotationlib/src/renderer/index.js"]=file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2findex$2ejs,file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2findex$2ejs.deps={"./annotations/highlightText.js":file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fhighlightText$2ejs,"./annotations/note.js":file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fnote$2ejs,"./annotations/speech.js":file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fspeech$2ejs,"./annotations/highlight.js":file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2fannotations$2fhighlight$2ejs},file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2findex$2ejs.filename="/home/afrm/Desktop/annotationlib/src/renderer/index.js",Pax.main=file_$2fhome$2fafrm$2fDesktop$2fannotationlib$2fsrc$2frenderer$2findex$2ejs,Pax.makeRequire(null)(),"undefined"!=typeof module&&(module.exports=Pax.main.module&&Pax.main.module.exports)}("undefined"!=typeof global?global:"undefined"!=typeof window?window:this);!function(t){const e={};function n(t,e,n,r,i,s){!function(){window.AnnotationParser=class{static get attributeMap(){return{type:"tp",style:"s",x:"x",y:"y",width:"w",height:"h",sx:"sx",sy:"sy",timeStart:"ts",timeEnd:"te",text:"t",actionType:"at",actionUrl:"au",actionUrlTarget:"aut",actionSeconds:"as",bgOpacity:"bgo",bgColor:"bgc",fgColor:"fgc",textSize:"txsz",highlightId:"hid"}}deserializeAnnotation(t){const e=this.constructor.attributeMap,n=t.split(","),r={};for(const t of n){const[n,i]=t.split("="),s=this.getKeyByValue(e,n);let o="";o=["text","actionType","actionUrl","actionUrlTarget","type","style"].includes(s)?decodeURIComponent(i):parseFloat(i,10),r[s]=o}return r}serializeAnnotation(t){const e=this.constructor.attributeMap;let n="";for(const r in t){const i=e[r],s=["text","actionType","actionUrl","actionUrlTarget"];s.includes(r)&&i&&t.hasOwnProperty(r)?n+=`${i}=${encodeURIComponent(t[r])},`:!s.includes(r)&&i&&t.hasOwnProperty(r)&&(n+=`${i}=${t[r]},`)}return n.substring(0,n.length-1)}deserializeAnnotationList(t){const e=t.split(";");e.length=e.length-1;const n=[];for(const t of e)n.push(this.deserializeAnnotation(t));return n}serializeAnnotationList(t){let e="";for(const n of t)e+=this.serializeAnnotation(n)+";";return e}xmlToDom(t){return(new DOMParser).parseFromString(t,"application/xml")}getAnnotationsFromXml(t){return this.xmlToDom(t).getElementsByTagName("annotation")}parseYoutubeAnnotationList(t){const e=[];for(const n of t){const t=this.parseYoutubeAnnotation(n);t&&e.push(t)}return e}parseYoutubeAnnotation(t){const e=t,n=this.getAttributesFromBase(e);if(!n.type||"pause"===n.type)return null;const r=this.getTextFromBase(e),i=this.getActionFromBase(e),s=this.getBackgroundShapeFromBase(e);if(!s)return null;const o=s.timeRange.start,a=s.timeRange.end;if("highlightText"!==n.style&&(isNaN(o)||isNaN(a)||null===o||null===a))return null;const l=this.getAppearanceFromBase(e);let u={type:n.type,x:s.x,y:s.y,width:s.width,height:s.height,timeStart:o,timeEnd:a};if(n.style&&(u.style=n.style),r&&(u.text=r),i&&(u=Object.assign(i,u)),l&&(u=Object.assign(l,u)),s.hasOwnProperty("sx")&&(u.sx=s.sx),s.hasOwnProperty("sy")&&(u.sy=s.sy),"highlight"===u.type)u.id=n.id;else if("highlightText"===u.style){const t=this.getTriggerFromBase(e);t&&(u.highlightId=t),delete u.timeStart,delete u.timeEnd}return u}getBackgroundShapeFromBase(t){const e=t.getElementsByTagName("movingRegion")[0];if(!e)return null;const n=e.getAttribute("type"),r=e.getElementsByTagName(`${n}Region`),i=this.extractRegionTime(r),s={type:n,x:parseFloat(r[0].getAttribute("x"),10),y:parseFloat(r[0].getAttribute("y"),10),width:parseFloat(r[0].getAttribute("w"),10),height:parseFloat(r[0].getAttribute("h"),10),timeRange:i},o=r[0].getAttribute("sx"),a=r[0].getAttribute("sy");return o&&(s.sx=parseFloat(o,10)),a&&(s.sy=parseFloat(a,10)),s}getAttributesFromBase(t){const e={};return e.id=t.getAttribute("id"),e.type=t.getAttribute("type"),e.style=t.getAttribute("style"),e}getTextFromBase(t){const e=t.getElementsByTagName("TEXT")[0];if(e)return e.textContent}getActionFromBase(t){const e=t.getElementsByTagName("action")[0];if(!e)return null;e.getAttribute("type");const n=e.getElementsByTagName("url")[0];if(!n)return null;const r=n.getAttribute("target"),i=n.getAttribute("value");if(i.startsWith("https://www.youtube.com/")){const t=new URL(i),e=t.searchParams.get("src_vid"),n=t.searchParams.get("v");return this.linkOrTimestamp(t,e,n,r)}}linkOrTimestamp(t,e,n,r){if(e&&n&&e===n){let e=0;const n=t.hash;if(n&&n.startsWith("#t=")){const n=t.hash.split("#t=")[1];e=this.timeStringToSeconds(n)}return{actionType:"time",actionSeconds:e}}return{actionType:"url",actionUrl:t.href,actionUrlTarget:r}}getAppearanceFromBase(t){const e=t.getElementsByTagName("appearance")[0];if(e){const t=e.getAttribute("bgAlpha"),n=e.getAttribute("bgColor"),r=e.getAttribute("fgColor"),i=e.getAttribute("highlightFontColor"),s=e.getAttribute("textSize"),o={};return t&&(o.bgOpacity=parseFloat(t,10)),n&&(o.bgColor=parseInt(n,10)),i&&(o.fgColor=parseInt(i,10)),r&&(o.fgColor=parseInt(r,10)),s&&(o.textSize=parseFloat(s,10)),o}}getTriggerFromBase(t){return t.getElementsByTagName("trigger")[0],t.getElementsByTagName("condition")[0].getAttribute("ref")}extractRegionTime(t){let e=t[0].getAttribute("t");e=this.hmsToSeconds(e);let n=t[t.length-1].getAttribute("t");return{start:e,end:n=this.hmsToSeconds(n)}}hmsToSeconds(t){let e=t.split(":"),n=0,r=1;for(;e.length>0;)n+=r*parseFloat(e.pop(),10),r*=60;return n}timeStringToSeconds(t){let e=0;const n=t.split("h"),r=(n[1]||t).split("m"),i=(r[1]||t).split("s");return n[0]&&2===n.length&&(e+=60*parseInt(n[0],10)*60),r[0]&&2===r.length&&(e+=60*parseInt(r[0],10)),i[0]&&2===i.length&&(e+=parseInt(i[0],10)),e}getKeyByValue(t,e){for(const n in t)if(t.hasOwnProperty(n)&&t[n]===e)return n}}}()}e.baseRequire="undefined"!=typeof require?require:t=>{throw new Error(`Could not resolve module name: ${t}`)},e.modules={},e.files={},e.mains={},e.resolve=((t,e)=>{(t=t.split("/")).shift();for(const n of e.split("/"))".."===n?t.pop():"."!==n&&t.push(n);return"/"+t.join("/")}),e.Module=function(t,e){this.filename=t,this.id=t,this.loaded=!1,this.parent=e,this.children=[],this.exports={}},e.makeRequire=(t=>{const n=t=>n._module(t).exports;return n._deps={},n.main=t,n._esModule=(t=>{const e=n._module(t);return e.exports.__esModule?e.exports:{get default(){return e.exports}}}),n._module=(r=>{let i=t?n._deps[r]:e.main;if(null==i){const t={exports:e.baseRequire(r)};return n._deps[r]={module:t},t}if(i.module)return i.module;const s=new e.Module(i.filename,t);return i.module=s,s.require=e.makeRequire(s),s.require._deps=i.deps,s.require.main=t?t.require.main:s,t&&t.children.push(s),i(s,s.exports,s.require,i.filename,i.filename.split("/").slice(0,-1).join("/"),{url:"file://"+("/"===i.filename.charAt(0)?"":"/")+i.filename}),s.loaded=!0,s}),n}),e.files["/home/afrm/Desktop/annotationlib/src/parser/index.js"]=n,n.deps={},n.filename="/home/afrm/Desktop/annotationlib/src/parser/index.js",e.main=n,e.makeRequire(null)(),"undefined"!=typeof module&&(module.exports=e.main.module&&e.main.module.exports)}("undefined"!=typeof global?global:"undefined"!=typeof window&&window);

let annotationRendererCss = `.__cxt-ar-annotations-container__{--annotation-close-size:20px;position:absolute;width:100%;height:100%;top:0;left:0;pointer-events:none;overflow:hidden}.__cxt-ar-annotation__{position:absolute;box-sizing:border-box;font-family:Arial,sans-serif;color:#fff;z-index:20}.__cxt-ar-annotation__{pointer-events:auto}.__cxt-ar-annotation__ span{position:absolute;left:0;top:0;overflow:hidden;word-wrap:break-word;white-space:pre-wrap;pointer-events:none;box-sizing:border-box;padding:2%;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.__cxt-ar-annotation-close__{display:none;position:absolute;cursor:pointer;z-index:1}.__cxt-ar-annotation__[hidden]{display:none!important}.__cxt-ar-annotation__[data-ar-type=highlight]{border:1px solid rgba(255,255,255,.1);background-color:transparent}.__cxt-ar-annotation__[data-ar-type=highlight]:hover{border:1px solid rgba(255,255,255,.5);background-color:transparent}.__cxt-ar-annotation__ svg{pointer-events:all}.__cxt-ar-annotation__[data-ar-style=title] span{font-weight:700;position:relative;display:-webkit-flexbox;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-flex-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;justify-content:center}`;
let annotationRendererStyle = document.createElement("style");
annotationRendererStyle.textContent = annotationRendererCss;
document.head.appendChild(annotationRendererStyle);


const annotationParser = new AnnotationParser();
const annotationsEndpoint = "https://invidious.snopyta.org/api/v1/annotations/";
let adPlaying = false;
let currentVideoId;
let renderer;

waitForElement(".ytp-title-link").then((el) => {
    const callback = () => {
        const videoId = new URL(el.href).searchParams.get("v");
        if (currentVideoId == videoId) {
            return;
        } else {
            currentVideoId = videoId;
        }

        window.dispatchEvent(new CustomEvent("ar-status-change", { detail: "Video changing..." }));

        if (renderer) {
            renderer.stop();
            renderer.removeAnnotationElements();
            renderer.annotations = [];
        }

        const requestUrl = annotationsEndpoint + videoId;
        console.info(`Retrieving annotations for '${videoId}' from '${requestUrl}'`);

        GM_xmlhttpRequest({
            url: requestUrl,
            onload(response) {
                if (response.responseText) {
                    console.info(`Received annotations for ${videoId} from server..`);
                    handleMessage({
                        type: "annotations_received",
                        xml: response.responseText,
                    });
                } else {
                    console.info(`Annotation data is unavailable for this video (${videoId})`);
                    handleMessage({ type: "annotations_unavailable" });
                }
            },
            onerror(e) {
                console.info(`Failed to retrieve annotations for this video (${videoId})\n (${e})`);
                handleMessage({ type: "annotations_unavailable" });
            },
        });
    };

    let observer = new MutationObserver(callback);
    observer.observe(el, { attributes: true, attributeFilter: ["href"] });
});

waitForElement(".ytp-right-controls")
    .then((el) => {
        const progressButton = document.createElement("button");
        progressButton.classList.add("ytp-button", "ytp-settings-button");

        progressButton.innerHTML = `
	<svg width="100%" height="100%" viewBox="0 0 1 1" fill="white" version="1.1">
	<path d="M0.786081 0.689854H0.523479L0.356887 0.807575V0.689854H0.230654V0.30394H0.786081V0.689854Z"/>
	</svg>	
	`;

        progressButton.setAttribute("title", "Annotations aren't found");
        progressButton.setAttribute("aria-label", "Annotations aren't found");

        el.prepend(progressButton);

        progressButton.addEventListener("click", () => {
            if (renderer && renderer.annotations.length) {
                const times = renderer.annotations
                    .filter((an) => an.data && an.data.hasOwnProperty("timeStart"))
                    .sort((a, b) => a.data.timeStart - b.data.timeStart)
                    .map((an) => {
                        let type = an.data.type;
                        let style = an.data.style;

                        type = type ? type : "";
                        style = style ? ", " + style : "";

                        const sec = formatSeconds(an.data.timeStart);

                        return `${sec} ${type}${style}`;
                    })
                    .join("\n");

                alert(times);
            } else {
                alert("There are no annotations loaded.");
            }
        });

        window.addEventListener("ar-status-change", (e) => {
            progressButton.setAttribute("title", e.detail);
            progressButton.setAttribute("aria-label", e.detail);
        });
    })
    .catch(() => {
        console.warn("Unable to find controls area");
    });

function formatSeconds(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);

    const minPadding = minutes < 10 ? "0" : "";
    const secPadding = seconds < 10 ? "0" : "";

    return `${minPadding}${minutes}:${secPadding}${seconds}`;
}

function handleMessage(request) {
    if (request.type === "annotations_received") {
        const annotationData = request.xml;
        if (annotationData) {
            window.dispatchEvent(
                new CustomEvent("ar-status-change", {
                    detail: "Received annotation data from server. Annotations should now be loaded.\nClick to see annotation times.",
                })
            );

            const annotationDom = annotationParser.xmlToDom(annotationData);
            const annotationElements = annotationDom.getElementsByTagName("annotation");

            const annotations = annotationParser.parseYoutubeAnnotationList(annotationElements);
            startNewAnnotationRenderer(annotations);
        }
    } else if (request.type === "annotations_unavailable") {
        console.info("Annotation data for this video is unavailable");
        window.dispatchEvent(
            new CustomEvent("ar-status-change", {
                detail: "Annotations are not available for this video.",
            })
        );
    }
}

function startNewAnnotationRenderer(annotations) {
    const videoContainer = document.getElementById("movie_player");
    const player = document.querySelector("video.video-stream.html5-main-video");

    const playerOptions = {
        getVideoTime() {
            return player.currentTime;
        },
        seekTo(seconds) {
            player.currentTime = seconds;
        },
        getOriginalVideoWidth() {
            return player.videoWidth;
        },
        getOriginalVideoHeight() {
            return player.videoHeight;
        },
    };

    renderer = new AnnotationRenderer(annotations, videoContainer, playerOptions, 200);
    renderer.start();

    if (videoContainer.classList.contains("ad-showing")) {
        adPlaying = true;
        renderer.annotationsContainer.style.display = "none";
    } else if (!player.classList.contains("ad-showing") && adPlaying) {
        adPlaying = false;
        renderer.annotationsContainer.style.display = "block";
    }

    hideAnnotationsDuringAds(videoContainer);
}

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
function hideAnnotationsDuringAds(player) {
    // Select the node that will be observed for mutations
    const targetNode = player;

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, attributeFilter: ["class"] };

    // Callback function to execute when mutations are observed
    const callback = () => {
        // ad begins playing
        if (player.classList.contains("ad-showing") && !adPlaying) {
            adPlaying = true;
            renderer.annotationsContainer.style.display = "none";
        }
        // ad is done playing
        else if (!player.classList.contains("ad-showing") && adPlaying) {
            adPlaying = false;
            renderer.annotationsContainer.style.display = "block";
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
}

window.addEventListener("__ar_annotation_click", (e) => {
    // Open the URL in a new tab (from https://stackoverflow.com/a/28374344).
    // We can't change location.href because non-embed YouTube pages have
    // `x-frame-options: SAMEORIGIN`.
    Object.assign(document.createElement("a"), {
        target: "_blank",
        href: e.detail.url,
    }).click();
});

function updateAnnotationSizes(delay = 0) {
    setTimeout(() => {
        if (renderer) {
            renderer.updateAllAnnotationSizes();
        }
    }, delay);
}

window.addEventListener("resize", () => {
    updateAnnotationSizes(250);
    updateAnnotationSizes(1000);
});

// Adding annotation visibility switch to settings menu, just like in ye olden days
waitForElement(".ytp-panel-menu")
    .then((el) => {
        const annoSwitchPar = document.createElement("div");
        annoSwitchPar.className = "ytp-menuitem";
        annoSwitchPar.innerHTML = `
	<div class="ytp-menuitem-icon"></div>
	<div class="ytp-menuitem-label">Annotations</div>
	<div class="ytp-menuitem-content">
		<div class="ytp-menuitem-toggle-checkbox">
		<input type="checkbox" id="annotation-sneaky-switch" aria-hidden="true" style="position: absolute; left: -100vw;">
		</div>
	</div>
	`;
        annoSwitchPar.setAttribute("role", "menuitemcheckbox");
        annoSwitchPar.setAttribute("aria-checked", "true");
        annoSwitchPar.setAttribute("tabindex", "0");

        el.prepend(annoSwitchPar);

        /* 	a visually-hidden input checkbox (annoSneakySwitch) is used to store the state of annotation visibility.
	the same thing could be done with some craftier JS but checkboxes are very certain and difficult to screw up */

        const annoSneakySwitch = document.querySelector("#annotation-sneaky-switch");
        annoSneakySwitch.checked = true;
        annoSwitchPar.addEventListener("click", () => {
            annoSneakySwitch.click();
            annoSneakySwitch.checked
                ? annoSwitchPar.setAttribute(
                      "aria-checked",
                      "true",
                      (renderer.annotationsContainer.style.display = "block")
                  )
                : (annoSwitchPar.setAttribute("aria-checked", "false"),
                  (renderer.annotationsContainer.style.display = "none"));
        });
    })
    .catch(() => {
        console.warn(
            "Unable to find the video player settings menu, annotation switch not injected"
        );
    });

function waitForElement(selector, maxRetries = 10, intervalAmount = 200, intervalStep = 200) {
    return new Promise((resolve, reject) => {
        let currentRetries = 0;

        const progInt = setInterval(() => {
            currentRetries++;
            intervalAmount += intervalStep;

            if (currentRetries > maxRetries) {
                reject();
                clearInterval(progInt);
                return;
            }

            const el = document.querySelector(selector);
            if (el) {
                resolve(el);
                clearInterval(progInt);
                return;
            }
        }, intervalAmount);
    });
}
