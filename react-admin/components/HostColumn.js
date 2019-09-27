var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import SessionList from "./SessionList.js";
import ContainersList from "./ContainersList.js";
import ImageList from "./ImageList.js";
import DockerfileList from "./DockerfileList.js";

var HostColumn = function (_React$Component) {
  _inherits(HostColumn, _React$Component);

  function HostColumn(props) {
    _classCallCheck(this, HostColumn);

    var _this = _possibleConstructorReturn(this, (HostColumn.__proto__ || Object.getPrototypeOf(HostColumn)).call(this, props));

    _this.host = _this.props.host.hostName;
    _this.style = {
      minWidth: "300px",
      padding: "30px",
      border: "1px solid"
    };
    return _this;
  }

  _createClass(HostColumn, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { style: this.style },
        React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            null,
            this.props.host.host
          ),
          React.createElement(
            "p",
            null,
            this.props.host.url
          )
        ),
        React.createElement(SessionList, { hostName: this.host }),
        React.createElement(ContainersList, { hostName: this.host }),
        React.createElement(ImageList, { hostName: this.host }),
        React.createElement(DockerfileList, { hostName: this.host })
      );
    }
  }]);

  return HostColumn;
}(React.Component);

export default HostColumn;