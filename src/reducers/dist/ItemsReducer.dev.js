"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemsReducer = void 0;

var _ItemsAction = require("../actions/ItemsAction");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var ItemsReducer = function ItemsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ItemsAction.GET_ITEMS_ACTION:
      return action.payload;

    case _ItemsAction.ADD_ITEM_ACTION:
      var newLists = _toConsumableArray(new Set(state));

      return [action.payload].concat(_toConsumableArray(newLists));

    case _ItemsAction.DELETE_ITEM_ACTION:
      return state.filter(function (el) {
        //console(el.specialItemId + "     " + action.payload.item.itemId)
        console.log("the element");
        console.log(el.specialId + "   et   " + action.payload.item.specialId);

        if (el.specialId + "" !== action.payload.item.specialId + "") {
          return el;
        } else {
          return null;
        }
      });

    default:
      return state;
  }
};

exports.ItemsReducer = ItemsReducer;