;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Slide = factory();
  }
}(this, function() {
function Slide(options) {

  this.el = options.el;
  this.ul = this.el.getElementsByTagName('ul')[0];
  this.li = this.ul.getElementsByTagName('li');
  var style = window.getComputedStyle(this.el, null);
  this.options = {
    position: 0,
    vertical: false,
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
}

Slide.prototype.play = function() {
  var self = this;
  this.interval = setInterval(function(){
    self.move(1);
  }, this.options.interval);
};

Slide.prototype.stop = function () {
  clearInterval(this.interval);
};

Slide.prototype.move = function(d) {
  var n = this.currentIndex + d;
  n = n >= this.li.length ? 0   : n;
  n = n < 0 ? this.li.length-1  : n;
  this.slide(n);
};

Slide.prototype.slide = function(pos) {
  var self = this;
  this.currentIndex = pos;
  var from = this.options.vertical ? parseInt(this.ul.style.top)
                                   : parseInt(this.ul.style.left);
  var to   = this.options.vertical ? pos * this.options.height
                                   : pos * this.options.width;

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

return Slide;
}));
