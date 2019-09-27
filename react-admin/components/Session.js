import _regeneratorRuntime from "babel-runtime/regenerator";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";

var Session = function (_React$Component) {
  _inherits(Session, _React$Component);

  function Session(props) {
    _classCallCheck(this, Session);

    var _this = _possibleConstructorReturn(this, (Session.__proto__ || Object.getPrototypeOf(Session)).call(this, props));

    _this.id = _this.props.info.id;
    _this.state = { killed: false };

    _this.killSession = _this.killSession.bind(_this);
    return _this;
  }

  _createClass(Session, [{
    key: "killSession",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var data, body;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch("/shell/sessions/kill/" + this.id);

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

      function killSession() {
        return _ref.apply(this, arguments);
      }

      return killSession;
    }()
  }, {
    key: "render",
    value: function render() {
      if (!this.state.killed) {
        return React.createElement(
          "li",
          null,
          this.id,
          React.createElement(
            "button",
            { onClick: this.killSession },
            "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C"
          )
        );
      } else {
        return null;
      }
    }
  }]);

  return Session;
}(React.Component);

export default Session;