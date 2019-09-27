import _regeneratorRuntime from "babel-runtime/regenerator";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";

var Container = function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this.host = _this.props.hostName;
    _this.id = _this.props.info.CONTAINER_ID;
    _this.state = { killed: false };

    _this.killContainer = _this.killContainer.bind(_this);
    _this.containerAttach = _this.containerAttach.bind(_this);

    _this.info = [];
    for (var i in _this.props.info) {
      if (_this.props.info.hasOwnProperty(i)) {
        _this.info.push(React.createElement(
          "li",
          { key: i },
          i,
          ": ",
          _this.props.info[i]
        ));
      }
    }
    return _this;
  }

  _createClass(Container, [{
    key: "killContainer",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var data, body;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch("/shell/containers/kill/" + this.id + "?host=" + this.host);

              case 2:
                data = _context.sent;
                _context.next = 5;
                return data.json();

              case 5:
                body = _context.sent;


                if (body.status === "OK") {
                  this.setState({ killed: true });
                }

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function killContainer() {
        return _ref.apply(this, arguments);
      }

      return killContainer;
    }()
  }, {
    key: "containerAttach",
    value: function containerAttach() {
      window.open("/shell/containers/attach/" + this.id + "?host=" + this.host);
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.killed) {
        return React.createElement(
          "li",
          null,
          React.createElement(
            "button",
            { onClick: this.containerAttach },
            "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F"
          ),
          React.createElement(
            "button",
            { onClick: this.killContainer },
            "\u0423\u0431\u0438\u0442\u044C"
          ),
          React.createElement(
            "ul",
            null,
            this.info
          )
        );
      } else {
        return null;
      }
    }
  }]);

  return Container;
}(React.Component);

export default Container;