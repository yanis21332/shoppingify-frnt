"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = exports.modifyStatusOfListAction = exports.modifyListAction = exports.addListAction = exports.getLists = exports.CLEAR_ALL = exports.GET_ALL_LISTS = exports.MODIFY_STATUS_OF_LIST_ACTION = exports.MODIFY_LIST_ACTION = exports.ADD_LIST_ACTION = void 0;

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

var ADD_LIST_ACTION = "ADD_LIST_ACTION";
exports.ADD_LIST_ACTION = ADD_LIST_ACTION;
var MODIFY_LIST_ACTION = "MODIFY_LIST_ACTION";
exports.MODIFY_LIST_ACTION = MODIFY_LIST_ACTION;
var MODIFY_STATUS_OF_LIST_ACTION = "MODIFY_STATUS_OF_LIST_ACTION";
exports.MODIFY_STATUS_OF_LIST_ACTION = MODIFY_STATUS_OF_LIST_ACTION;
var GET_ALL_LISTS = "GET_ALL_LISTS";
exports.GET_ALL_LISTS = GET_ALL_LISTS;
var CLEAR_ALL = "CLEAR_ALL";
exports.CLEAR_ALL = CLEAR_ALL;

var getLists = function getLists() {
  return function (dispatch) {
    _axios["default"].get("https://shoppingify-back.onrender.com/web/getAllLists/".concat(userId)).then(function (res) {
      if (!res.data.error) {
        dispatch({
          type: GET_ALL_LISTS,
          payload: res.data.data
        });
      } else {
        console.error(res.data.error);
      }
    })["catch"](function (err) {
      console.error(err);
    });
  };
};

exports.getLists = getLists;

var addListAction = function addListAction(data) {
  return function (dispatch) {
    //console("nous fesont nos requêtes")
    _axios["default"].post("https://shoppingify-back.onrender.com/web/createonelist", _objectSpread({}, data, {
      userId: userId
    })).then(function (res) {
      if (!res.data.error) {
        //console("y'a pas d'erreur tout se passe a merveille")
        //console(res.data)
        dispatch({
          type: ADD_LIST_ACTION,
          payload: data
        });
      } else {
        console.error(res.data.error);
      }
    })["catch"](function (err) {
      console.error(err);
    });
  };
};

exports.addListAction = addListAction;

var modifyListAction = function modifyListAction(data) {
  return function (dispatch) {
    var additionelData = {
      userId: userId,
      specialIdOfList: data.specialId,
      itemImported: data.theItem
    };
    console.log(data.theItem);

    _axios["default"].put("https://shoppingify-back.onrender.com/web/modifyIsCheckedOfItemsInList", _objectSpread({}, data, {}, additionelData)).then(function (res) {
      if (!res.data.error) {
        console.log("normalement tout s'est bien passé !");
        dispatch({
          type: MODIFY_LIST_ACTION,
          payload: data
        });
      } else {
        console.error(res.data.error);
      }
    })["catch"](function (err) {
      console.error(err);
    });
  };
};

exports.modifyListAction = modifyListAction;

var modifyStatusOfListAction = function modifyStatusOfListAction(data, setTypeOfShoppingList) {
  return function (dispatch) {
    _axios["default"].post("https://shoppingify-back.onrender.com/web/modifyOneList", data).then(function (res) {
      if (!res.data.error) {
        dispatch({
          type: MODIFY_STATUS_OF_LIST_ACTION,
          payload: data
        });
        setTypeOfShoppingList("TypeOneOfShoppingList");
        return true;
      } else {
        console.error(res.data.error);
        return false;
      }
    })["catch"](function (err) {
      console.error(err);
      return false;
    });
  };
};

exports.modifyStatusOfListAction = modifyStatusOfListAction;

var clear = function clear() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_ALL,
      payload: {}
    });
  };
};

exports.clear = clear;