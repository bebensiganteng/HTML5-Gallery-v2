// Generated by CoffeeScript 1.4.0
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'libs/backbone', 'libs/underscore'], function($, Backbone, _) {
  var AbstractView;
  return AbstractView = (function(_super) {

    __extends(AbstractView, _super);

    function AbstractView() {
      return AbstractView.__super__.constructor.apply(this, arguments);
    }

    AbstractView.prototype.initialize = function() {};

    AbstractView.prototype.show = function() {};

    AbstractView.prototype.hide = function() {};

    return AbstractView;

  })(Backbone.View);
});
