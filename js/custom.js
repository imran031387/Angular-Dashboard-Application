
//Make sure jQuery has been loaded before custom.js
if (typeof jQuery === "undefined") {
  throw new Error("CustomJS requires jQuery");
}

$.AdminVIZ = {};

/* --------------------
 * - AdminVIZ Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.AdminVIZ.options = {
  //General animation speed for JS animated elements such as box collapse/expand and
  //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
  //'fast', 'normal', or 'slow'
  animationSpeed: 10,
  //Box Widget Plugin. Enable this plugin
  //to allow boxes to be collapsed and/or removed
  enableBoxWidget: true,
  //Box Widget plugin options
  boxWidgetOptions: {
    boxWidgetIcons: {
      //Collapse icon
      collapse: 'fa-minus',
      //Open icon
      open: 'fa-plus',
      //Remove icon
      remove: 'fa-times'
    },
    boxWidgetSelectors: {
      //Remove button selector
      remove: '[data-widget="remove"]'
    }
  }
};

/* ------------------
 * - Implementation -
 * ------------------
 * of the plugins and widgets based on above params
 */
$(function () {
  "use strict";

  //Easy access to options
  var o = $.AdminVIZ.options;

  //Set up the object
  _init();

  //Activate box widget
  if (o.enableBoxWidget) {
    $.AdminVIZ.boxWidget.activate();
  }
});

/* ----------------------------------
 * - Initialize the AdminVIZ Object -
 * ----------------------------------
 */
function _init() {
  'use strict';

  /* BoxWidget
   * =========
   */
  $.AdminVIZ.boxWidget = {
    selectors: $.AdminVIZ.options.boxWidgetOptions.boxWidgetSelectors,
    icons: $.AdminVIZ.options.boxWidgetOptions.boxWidgetIcons,
    animationSpeed: $.AdminVIZ.options.animationSpeed,
    activate: function (_box) {
      var _this = this;
      if (!_box) {
        _box = document; // activate all boxes per default
      }

      //Listen for remove event triggers
      $(_box).on('click', _this.selectors.remove, function (e) {
        e.preventDefault();
        _this.remove($(this));
      });
    },
    remove: function (element) {
      //Find the box parent
      var box = element.parents(".box");
      box.slideUp(this.animationSpeed);
      box.parent().remove();
    }
  };
}

