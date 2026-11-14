(function(){
'use strict';
var callback=null,actions=[],held={};
var keys={ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right',ArrowUp:'jump',KeyW:'jump',ArrowDown:'slide',KeyS:'slide'};
function queue(action){if(actions.length<8)actions.push(action);}
function init(fn){
 callback=fn;
 window.addEventListener('keydown',function(e){
  var action=keys[e.code];
  if(action){if(!e.repeat)queue(action);e.preventDefault();return;}
  if((e.code==='KeyE'||e.code==='Space')&&!e.repeat){e.preventDefault();if(callback)callback('interact');}
  if((e.code==='KeyP'||e.code==='Escape')&&!e.repeat){e.preventDefault();if(callback)callback('pause');}
 });
 window.addEventListener('blur',clear);
 var surface=document.getElementById('game-canvas'),start=null;
 if(surface){
  surface.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse')return;start={x:e.clientX,y:e.clientY};});
  surface.addEventListener('pointerup',function(e){
   if(!start)return;var dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;
   if(Math.max(Math.abs(dx),Math.abs(dy))<28)return;
   if(Math.abs(dx)>Math.abs(dy))queue(dx<0?'left':'right');else queue(dy<0?'jump':'slide');
   e.preventDefault();
  });
  surface.addEventListener('pointercancel',function(){start=null;});
 }
 document.addEventListener('visibilitychange',function(){if(document.hidden)clear();});
}
function clear(){actions=[];held={};}
function vector(){return{x:0,y:0,sprint:false,actions:actions.splice(0)};}
window.SSControls={init:init,vector:vector,clear:clear};
})();