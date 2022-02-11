"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListsReducer = void 0;

var _ListsAction = require("../actions/ListsAction");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var ListsReducer = function ListsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ListsAction.ADD_LIST_ACTION:
      return [].concat(_toConsumableArray(state), [action.payload]);

    case _ListsAction.MODIFY_LIST_ACTION:
      return state.map(function (list) {
        //console(list)
        //console(list.date + "      " +action.payload.date)
        if (list.date === action.payload.date) {
          var newItems = [];
          list.items.forEach(function (itm) {
            if (itm._id === action.payload.theId) {
              //console("le vrai est lu donc le prblm est ici")
              newItems.push(_objectSpread({}, itm, {
                isChecked: itm.isChecked ? false : true
              }));
            } else {
              //console("pas le meme id")
              newItems.push(itm);
            }
          });
          return _objectSpread({}, list, {
            items: newItems
          });
        } else {
          //console("pas la meme date")
          return list;
        }
      });

    case _ListsAction.MODIFY_STATUS_OF_LIST_ACTION:
      return state.map(function (list) {
        if (list.statusOfList === "current") {
          return _objectSpread({}, list, {
            statusOfList: action.payload.newStatusOfList
          });
        } else {
          return list;
        }
      });

    case _ListsAction.GET_ALL_LISTS:
      return [].concat(_toConsumableArray(action.payload), _toConsumableArray(state));

    default:
      return state;
  }
};

exports.ListsReducer = ListsReducer;