/**
 * @fileoverview SVG icons component.
 * @author igor.alexeenko@jetbrains.com (Igor Alekseenko)
 * @author alexander.anisimov@jetbrains.com (Alexander Anisimov)
 * @jsx React.DOM
 */

require('./icon.scss');
var ClassName = require('class-name/class-name');
var Global = require('global/global');
var React = require('react/addons');
var iconUrl = require('./icon__url');


/**
 * Commonly used icon colors.
 * @enum {string}
 */
var Color = {
  BLUE: 'blue',
  DEFAULT: '',
  GRAY: 'light-gray',
  GREEN: 'green',
  ORANGE: 'orange',
  RED: 'red',
  WHITE: 'white'
};


/**
 * @enum {number}
 */
var Size = {
  Size12: 12,
  Size14: 14,
  Size16: 16,
  Size18: 18,
  Size32: 32,
  Size48: 48,
  Size64: 64,
  Size128: 128
};


/**
 * @const
 * @type {string}
 */
var BASE_CLASS = 'ring-icon';

/**
 * @type {ClassName}
 */
var baseClass = new ClassName(BASE_CLASS);


/**
 * @type {Element}
 * @private
 */
var _templateElement = null;

/**
 * Inserts an SVG template into the document so icons could use links to those
 * elements.
 * @static
 */
var initializeTemplate = function() {
  if (_templateElement) {
    return;
  }

  var templateText = require('val!./icon__template.js');
  var domParser = new DOMParser();
  var templateDoc = domParser.parseFromString(templateText, 'image/svg+xml');
  _templateElement = templateDoc.documentElement;

  // NB! This is imperative that template element was first on the page.
  // If something else inserted before it in some browsers icons might
  // stop working.
  // todo(igor.alexeenko): Add some sort of check if something's insterted before template.
  document.body.insertBefore(_templateElement, document.body.childNodes[0]);
  _templateElement.style.display = 'none';
  _templateElement.id = baseClass.getElement('template');
};


/**
 * @name Icon
 * @constructor
 * @description Icon component
 * @extends {ReactComponent}
 * @example
   <example name="Icon">
     <file name="index.html">
        <span id="icon-container"></span>
        <span id="icon-distribution"></span>
        <span id="icon-16-pencil"></span>
        <span id="icon-14-pencil"></span>
        <h3>All available icons are listed below. Place cursor over the icon to see it's name</h3>
        <div id="all-icons" style="margin-top: 16px"></div>
     </file>

     <file name="index.js" webpack="true">
       var React = require('react');
       var Icon = require('icon/icon');

       React.renderComponent(Icon({
         className: 'additional-class',
         color: 'orange',
         glyph: 'ok',
         size: Icon.Size.Size32
       }), document.getElementById('icon-container'));

       React.renderComponent(Icon({
         glyph: 'distribution',
         size: Icon.Size.Size32
       }), document.getElementById('icon-distribution'));

       React.renderComponent(Icon({
         glyph: 'pencil',
         size: Icon.Size.Size16
       }), document.getElementById('icon-16-pencil'));

       React.renderComponent(Icon({
         glyph: 'pencil',
         size: Icon.Size.Size14
       }), document.getElementById('icon-14-pencil'));

       var getIconNames = function(){
          var symbolsContainer = document.getElementById('ring-icon__template');
          var symbols = symbolsContainer.querySelectorAll('symbol');
          return Array.prototype.map.call(symbols, function(symbolElement){
            return symbolElement.id.replace('ring-icon_', '');
          });
       }

       var icons = getIconNames();

       React.renderComponent(React.DOM.div({
         children: icons.map(function (icon) {
           return Icon({
             glyph: icon,
             style: {'padding-left': '16px'},
             title: icon
           });
         })
       }), document.getElementById('all-icons'));
     </file>
   </example>
 */
var Icon = React.createClass({
  statics: {
    Color: Color,
    initializeTemplate: initializeTemplate,
    Size: Size
  },

  propTypes: {
    color: React.PropTypes.string,
    glyph: React.PropTypes.string,
    size: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      baseClass: baseClass,
      className: '',
      color: Color.DEFAULT,
      glyph: '',
      size: Size.Size32,
      title: ''
    };
  },

  render: function () {
    var classList = React.addons.classSet(Global.createObject(
        this.props.baseClass.getModifier(this.props.size), true,
        this.props.baseClass.getModifier(this.props.color), !!this.props.color,
        this.props.baseClass.getModifier(this.props.glyph), !!this.props.glyph,
        this.props.baseClass.getClassName(), true));

    var xlinkHref = '#' + this.props.baseClass.getModifier(this.props.glyph);
    xlinkHref = iconUrl.resolve(xlinkHref);

    return (this.transferPropsTo(<span className={classList}>
      <svg className={this.props.baseClass.getElement('i')} title={this.props.title} dangerouslySetInnerHTML={{__html: '<use xlink:href="' + xlinkHref + '"></use>'}}/>
    </span>));
  },

  componentDidMount: function() {
    initializeTemplate();
  }
});

/** @type {Icon} */
module.exports = Icon;
