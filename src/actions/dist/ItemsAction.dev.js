"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteItem = exports.addItem = exports.getItems = exports.DELETE_ITEM_ACTION = exports.ADD_ITEM_ACTION = exports.GET_ITEMS_ACTION = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userId = "";
var cooks = document.cookie.split(";");

for (var index = 0; index < cooks.length; index++) {
  try {
    var a = (0, _jwtDecode["default"])(cooks[index]);

    if (a) {
      userId = a.id;
    }
  } catch (err) {//console.error("this cookie are not valide")
  }
}

var GET_ITEMS_ACTION = "GET_ITEMS_ACTION";
exports.GET_ITEMS_ACTION = GET_ITEMS_ACTION;
var ADD_ITEM_ACTION = "ADD_ITEM_ACTION";
exports.ADD_ITEM_ACTION = ADD_ITEM_ACTION;
var DELETE_ITEM_ACTION = "DELETE_ITEM_ACTION";
exports.DELETE_ITEM_ACTION = DELETE_ITEM_ACTION;

var getItems = function getItems() {
  return function (dispatch) {
    return _axios["default"].get("http://localhost:4000/web/getAllItems/".concat(userId)).then(function (res) {
      dispatch({
        type: GET_ITEMS_ACTION,
        payload: res.data.data
      });
    })["catch"](function (err) {
      console.error(err);
      return err;
    });
  };
};

exports.getItems = getItems;

var addItem = function addItem(data, setSubError) {
  return function (dispatch) {
    return _axios["default"].put("http://localhost:4000/web/additem", _objectSpread({}, data, {
      userId: userId
    })).then(function (res) {
      if (!res.data.error) {
        setSubError("");
        dispatch({
          type: ADD_ITEM_ACTION,
          payload: data
        });
      } else {
        setSubError(res.data.error);
        console.error(res.data.error);
        return res.data.error;
      }
    })["catch"](function (err) {
      return err;
    });
  };
};

exports.addItem = addItem;

var deleteItem = function deleteItem(data) {
  return function (dispatch) {
    return _axios["default"].put("http://localhost:4000/web/deleteOneItem", _objectSpread({}, data)).then(function (res) {
      if (!res.data.error) {
        console.log(res.data);
        dispatch({
          type: DELETE_ITEM_ACTION,
          payload: res.data
        });
      } else {
        console.error(res.data.error);
        return res.data.error;
      }
    })["catch"](function (err) {
      return err;
    });
  };
};

exports.deleteItem = deleteItem;