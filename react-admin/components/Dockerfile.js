var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";

var Dockerfile = function (_React$Component) {
  _inherits(Dockerfile, _React$Component);

  function Dockerfile(props) {
    _classCallCheck(this, Dockerfile);

    var _this = _possibleConstructorReturn(this, (Dockerfile.__proto__ || Object.getPrototypeOf(Dockerfile)).call(this, props));

    _this.host = _this.props.hostName;
    _this.name = _this.props.info;

    _this.buildImage = _this.buildImage.bind(_this);
    return _this;
  }

  _createClass(Dockerfile, [{
    key: "buildImage",
    value: function buildImage() {
      window.open("/shell/images/build/" + this.name + "?host=" + this.host);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "li",
        null,
        this.name,
        React.createElement(
          "button",
          { onClick: this.buildImage },
          "\u0421\u043E\u0431\u0440\u0430\u0442\u044C"
        )
      );
    }
  }]);

  return Dockerfile;
}(React.Component);

export default Dockerfile;