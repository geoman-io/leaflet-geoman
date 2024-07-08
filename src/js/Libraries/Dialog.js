/* eslint-disable */

L.Control.Dialog = L.Control.extend({
  optionsDefault: {
    size: [300, 300],
    minSize: [100, 100],
    maxSize: [350, 350],
    anchor: [250, 250],
    position: 'topleft',
    initOpen: false,
    resize: false,
    move: true,
    close: true,
    contentId: undefined,
  },
  initialize: function (options) {
    this.options = JSON.parse(JSON.stringify(this.options));
    L.setOptions(this, { ...this.optionsDefault, ...options });

    this._attributions = {};
  },

  onAdd: function (map) {
    this._initLayout();
    this._map = map;

    this.update();

    if (!this.options.initOpen) {
      this.close();
    }

    return this._container;
  },

  open: function () {
    if (!this._map) {
      return;
    }
    this._container.style.visibility = '';

    this._map.fire('dialog:opened', this);

    return this;
  },

  toggle: function () {
    if (!this._map) {
      return;
    }
    const isVisible = this._container.style.visibility === '';
    if (isVisible) {
      this._container.style.visibility = 'hidden';
      this._map.fire('dialog:closed', this);
    } else {
      this._container.style.visibility = '';
      this._map.fire('dialog:opened', this);
    }

    return this;
  },

  close: function () {
    this._container.style.visibility = 'hidden';

    this._map.fire('dialog:closed', this);
    return this;
  },

  destroy: function () {
    if (!this._map) {
      return this;
    }

    this._map?.fire('dialog:destroyed', this);
    this.remove();

    if (this.onRemove) {
      this.onRemove(this._map);
    }

    return this;
  },

  isOpen: function () {
    if (!this._map) {
      return this;
    }

    return this._container.style.visibility === '';
  },

  setLocation: function (location) {
    location = location || [250, 250];

    this.options.anchor[0] = 0;
    this.options.anchor[1] = 0;
    this._oldMousePos.x = 0;
    this._oldMousePos.y = 0;

    this._move(location[1], location[0]);

    return this;
  },

  setSize: function (size) {
    size = size || [300, 300];

    this.options.size[0] = 0;
    this.options.size[1] = 0;
    this._oldMousePos.x = 0;
    this._oldMousePos.y = 0;

    this._resize(size[0], size[1]);

    return this;
  },

  lock: function () {
    this._resizerNode.style.visibility = 'hidden';
    this._grabberNode.style.visibility = 'hidden';
    this._closeNode.style.visibility = 'hidden';

    this._map.fire('dialog:locked', this);
    return this;
  },

  unlock: function () {
    this._resizerNode.style.visibility = '';
    this._grabberNode.style.visibility = '';
    this._closeNode.style.visibility = '';

    this._map.fire('dialog:unlocked', this);
    return this;
  },

  freeze: function () {
    this._resizerNode.style.visibility = 'hidden';
    this._grabberNode.style.visibility = 'hidden';

    this._map.fire('dialog:frozen', this);
    return this;
  },

  unfreeze: function () {
    this._resizerNode.style.visibility = '';
    this._grabberNode.style.visibility = '';

    this._map.fire('dialog:unfrozen', this);
    return this;
  },

  hideClose: function () {
    this._closeNode.style.visibility = 'hidden';

    this._map.fire('dialog:closehidden', this);
    return this;
  },

  showClose: function () {
    this._closeNode.style.visibility = '';

    this._map.fire('dialog:closeshown', this);
    return this;
  },

  hideResize: function () {
    this._resizerNode.style.visibility = 'hidden';

    this._map.fire('dialog:resizehidden', this);
    return this;
  },

  showResize: function () {
    this._resizerNode.style.visibility = '';

    this._map.fire('dialog:resizeshown', this);
    return this;
  },

  setContent: function (content) {
    this._content = content;
    this.update();
    return this;
  },

  getContent: function () {
    return this._content;
  },

  getElement: function () {
    return this._container;
  },

  update: function () {
    if (!this._map) {
      return;
    }

    this._container.style.visibility = 'hidden';

    this._updateContent();
    this._updateLayout();

    this._container.style.visibility = '';
    this._map.fire('dialog:updated', this);
  },

  _initLayout: function () {
    var className = 'leaflet-control-dialog',
      container = (this._container = L.DomUtil.create('div', className));

    container.style.width = this.options.size[0] + 'px';
    container.style.height = this.options.size[1] + 'px';

    container.style.top = this.options.anchor[0] + 'px';
    container.style.left = this.options.anchor[1] + 'px';

    var stop = L.DomEvent.stopPropagation;
    L.DomEvent.on(container, 'click', stop)
      .on(container, 'mousedown', stop)
      .on(container, 'touchstart', stop)
      .on(container, 'dblclick', stop)
      .on(container, 'mousewheel', stop)
      .on(container, 'contextmenu', stop)
      .on(container, 'MozMousePixelScroll', stop);

    var innerContainer = (this._innerContainer = L.DomUtil.create(
      'div',
      className + '-inner'
    ));

    var grabberNode = (this._grabberNode = L.DomUtil.create(
      'div',
      className + '-grabber'
    ));
    if (!this.options.move) {
      this._grabberNode.style.visibility = 'hidden';
    }
    var grabberIcon = L.DomUtil.create('span', 'grabber-icon');
    grabberNode.appendChild(grabberIcon);

    L.DomEvent.on(grabberNode, 'mousedown', this._handleMoveStart, this);

    var closeNode = (this._closeNode = L.DomUtil.create(
      'div',
      className + '-close'
    ));
    if (!this.options.close) {
      this._closeNode.style.visibility = 'hidden';
    }
    var closeIcon = L.DomUtil.create('span', 'grabber-close');
    closeNode.appendChild(closeIcon);
    L.DomEvent.on(closeNode, 'click', this._handleClose, this);

    var resizerNode = (this._resizerNode = L.DomUtil.create(
      'div',
      className + '-resizer'
    ));
    if (!this.options.resize) {
      this._resizerNode.style.visibility = 'hidden';
    }
    var resizeIcon = L.DomUtil.create('span', 'grabber-resize');
    resizerNode.appendChild(resizeIcon);

    L.DomEvent.on(resizerNode, 'mousedown', this._handleResizeStart, this);

    var contentNode = (this._contentNode = L.DomUtil.create(
      'div',
      className + '-contents'
    ));
    if (this.options.contentId) contentNode.id = this.options.contentId;

    container.appendChild(innerContainer);

    innerContainer.appendChild(contentNode);
    innerContainer.appendChild(grabberNode);
    innerContainer.appendChild(closeNode);
    innerContainer.appendChild(resizerNode);

    this._oldMousePos = { x: 0, y: 0 };
  },

  _handleClose: function () {
    this.close();
  },

  _handleResizeStart: function (e) {
    this._oldMousePos.x = e.clientX;
    this._oldMousePos.y = e.clientY;

    L.DomEvent.on(this._map, 'mousemove', this._handleMouseMove, this);
    L.DomEvent.on(this._map, 'mouseup', this._handleMouseUp, this);

    this._map.fire('dialog:resizestart', this);
    this._resizing = true;
  },

  _handleMoveStart: function (e) {
    this._oldMousePos.x = e.clientX;
    this._oldMousePos.y = e.clientY;

    L.DomEvent.on(this._map, 'mousemove', this._handleMouseMove, this);
    L.DomEvent.on(this._map, 'mouseup', this._handleMouseUp, this);

    this._map.fire('dialog:movestart', this);
    this._moving = true;
  },

  _handleMouseMove: function (e) {
    var diffX = e.originalEvent.clientX - this._oldMousePos.x,
      diffY = e.originalEvent.clientY - this._oldMousePos.y;

    // this helps prevent accidental highlighting on drag:
    if (e.originalEvent.stopPropagation) {
      e.originalEvent.stopPropagation();
    }
    if (e.originalEvent.preventDefault) {
      e.originalEvent.preventDefault();
    }

    if (this._resizing) {
      this._resize(diffX, diffY);
    }

    if (this._moving) {
      this._move(diffX, diffY);
    }
  },

  _handleMouseUp: function () {
    L.DomEvent.off(this._map, 'mousemove', this._handleMouseMove, this);
    L.DomEvent.off(this._map, 'mouseup', this._handleMouseUp, this);

    if (this._resizing) {
      this._resizing = false;
      this._map.fire('dialog:resizeend', this);
    }

    if (this._moving) {
      this._moving = false;
      this._map.fire('dialog:moveend', this);
    }
  },

  _move: function (diffX, diffY) {
    var newY = this.options.anchor[0] + diffY;
    var newX = this.options.anchor[1] + diffX;

    this.options.anchor[0] = newY;
    this.options.anchor[1] = newX;

    this._container.style.top = this.options.anchor[0] + 'px';
    this._container.style.left = this.options.anchor[1] + 'px';

    this._map.fire('dialog:moving', this);

    this._oldMousePos.y += diffY;
    this._oldMousePos.x += diffX;
  },

  _resize: function (diffX, diffY) {
    var newX = this.options.size[0] + diffX;
    var newY = this.options.size[1] + diffY;

    if (newX <= this.options.maxSize[0] && newX >= this.options.minSize[0]) {
      this.options.size[0] = newX;
      this._container.style.width = this.options.size[0] + 'px';
      this._oldMousePos.x += diffX;
    }

    if (newY <= this.options.maxSize[1] && newY >= this.options.minSize[1]) {
      this.options.size[1] = newY;
      this._container.style.height = this.options.size[1] + 'px';
      this._oldMousePos.y += diffY;
    }

    this._map.fire('dialog:resizing', this);
  },

  _updateContent: function () {
    if (!this._content) {
      return;
    }

    var node = this._contentNode;
    var content =
      typeof this._content === 'function' ? this._content(this) : this._content;

    if (typeof content === 'string') {
      node.innerHTML = content;
    } else {
      while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
      }
      node.appendChild(content);
    }
  },

  _updateLayout: function () {
    this._container.style.width = this.options.size[0] + 'px';
    this._container.style.height = this.options.size[1] + 'px';

    this._container.style.top = this.options.anchor[0] + 'px';
    this._container.style.left = this.options.anchor[1] + 'px';
  },
});

L.control.dialog = function (options) {
  return new L.Control.Dialog(options);
};
