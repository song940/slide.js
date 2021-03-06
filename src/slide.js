'use strict';
/**
 * [Slide description]
 * @param {[type]} options [description]
 */
function Slide(options) {
  var self = this;
  this.el = options.el;
  this.ul = this.el.getElementsByTagName('ul')[0];
  this.li = this.ul.getElementsByTagName('li');
  var style = window.getComputedStyle(this.el, null);
  this.options = {
    position: 0,
    vertical: 0,
    interval: 3000,
    width : parseInt(style.width),
    height: parseInt(style.height)
  };
  for(var key in options){
    this.options[ key ] = options[ key ];
  }
  this.currentIndex = 0;
  this.el.style.width  = this.options.width  + 'px';
  this.el.style.height = this.options.height + 'px';
  if (this.options.vertical){
    this.ul.style.top = 0;
    this.ul.style.height = (this.li.length * this.options.height) + 'px';
  } else {
    this.ul.style.left = 0;
    this.ul.style.width  = (this.li.length * this.options.width ) + 'px';
  }
  this.slide(this.options.position);
  if (this.options.interval) {
    this.play();
  }

  this.el.addEventListener('touchstart' , function(ev){
    self.touchStartPos = ev.changedTouches[0].clientX;
    self.stop();
  });

  this.el.addEventListener('touchend' , function(ev){
    self.touchStopPos = ev.changedTouches[0].clientX;
    self.move((self.touchStartPos > self.touchStopPos) ? 1:-1)
    self.play();
  });

}
/**
 * [function description]
 * @return {[type]} [description]
 */
Slide.prototype.play = function() {
  var self = this;
  this.interval = setInterval(function(){
    self.move(1);
  }, this.options.interval);
};
/**
 * [stop description]
 * @return {[type]} [description]
 */
Slide.prototype.stop = function () {
  clearInterval(this.interval);
};
/**
 * [function description]
 * @param  {[type]} direction [description]
 * @return {[type]}           [description]
 */
Slide.prototype.move = function(direction) {
  var n = this.currentIndex + direction;
  n = n >= this.li.length ? 0   : n;
  n = n < 0 ? this.li.length-1  : n;
  this.slide(n);
};
/**
 * [function description]
 * @param  {[type]} pos [description]
 * @return {[type]}     [description]
 */
Slide.prototype.slide = function(pos) {
  var self = this;
  this.currentIndex = pos;
  var from = this.options.vertical ? parseInt(this.ul.style.top)
                                   : parseInt(this.ul.style.left);
  var to   = this.options.vertical ? pos * this.options.height
                                   : pos * this.options.width;
  //
  var d = to > Math.abs(from) ? 1 : -1;
  to *= -1;
  clearInterval(this.animateInterval);
  this.animateInterval = setInterval(function(){
    var current = self.options.vertical ? parseInt(self.ul.style.top)
                                        : parseInt(self.ul.style.left);
    if(current == to){
      clearInterval(self.animateInterval);
    }else{
      var step = current - Math.ceil(Math.abs(to - current) * .15) * d + 'px';
      self.options.vertical ? self.ul.style.top  = step
                            : self.ul.style.left = step;
    }
  }, 20);
};
