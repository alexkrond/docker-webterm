import _regeneratorRuntime from "babel-runtime/regenerator";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import Image from "./Image.js";
import Cap from "./Cap.js";

var ImageList = function (_React$Component) {
  _inherits(ImageList, _React$Component);

  function ImageList(props) {
    _classCallCheck(this, ImageList);

    var _this = _possibleConstructorReturn(this, (ImageList.__proto__ || Object.getPrototypeOf(ImageList)).call(this, props));

    _this.host = _this.props.hostName;
    _this.state = { images: [] };

    _this.updateImages = _this.updateImages.bind(_this);
    return _this;
  }

  _createClass(ImageList, [{
    key: "componentDidMount",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.updateImages();

              case 2:
                this.interval = setInterval(this.updateImages, 2000);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _ref.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "updateImages",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var data, body;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch("/shell/images?host=" + this.host).catch(function (err) {
                  return console.error(err);
                });

              case 2:
                data = _context2.sent;
                _context2.next = 5;
                return data.json();

              case 5:
                body = _context2.sent;


                this.setState({ images: body });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateImages() {
        return _ref2.apply(this, arguments);
      }

      return updateImages;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "images" },
        React.createElement(
          "h3",
          null,
          "Image List"
        ),
        React.createElement(
          "ul",
          { className: "image-list" },
          this.state.images.length ? this.state.images.map(function (image) {
            return React.createElement(Image, { key: image.REPOSITORY + image.TAG, info: image, hostName: _this2.host });
          }) : React.createElement(Cap, { text: "Тут будут образы" })
        )
      );
    }
  }]);

  return ImageList;
}(React.Component);

export default ImageList;