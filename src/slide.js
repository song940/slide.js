function Slide(options) {
  this.options = options;
  this.el = this.options.el;
  this.ul = this.el.getElementsByTagName('ul')[0];
  this.li = this.ul.getElementsByTagName('li');

  this.currentPos = 0;
  if (this.options.vertical) {
    this.ul.style.top = 0;
    this.options.height = this.options.height || this.li[0].offsetHeight;
    this.ul.style.height = (this.li.length * this.options.height) + 'px';
  } else {
    this.ul.style.left = 0;
    this.options.width = this.options.width || this.li[0].offsetWidth;
    this.ul.style.width = (this.li.length * this.options.width) + 'px';
  }
  this.pos(this.options.position || 0);
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
  var n = this.currentPos + d;
  n = n >= this.li.length ? 0 : n;
  n = n < 0 ? this.li.length-1 : n;
  this.pos(n);
};

Slide.prototype.pos = function(pos) {
  var self = this;
  this.currentPos = pos;
  var current = this.options.vertical ? parseInt(this.ul.style.top) : parseInt(this.ul.style.left);
  var to      = this.options.vertical ? pos * this.options.height : pos * this.options.width;
  var d = to > Math.abs(current) ? 1 : -1;
  to *= -1;
  clearInterval(this.ul.si);
  this.ul.si = setInterval(function(){
    self.slide(to, d);
  }, 20);
};

Slide.prototype.slide = function(to, d) {
  var current = this.options.vertical ? parseInt(this.ul.style.top) : parseInt(this.ul.style.left);
  if (current == to) {
    clearInterval(this.ul.si);
  } else {
      var step = current - Math.ceil(Math.abs(to - current) * .15) * d ;
      this.options.vertical ? this.ul.style.top = step : this.ul.style.left = step + 'px';
  }
};
