"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tempListReducer = void 0;

var _tempListAction = require("../actions/tempListAction");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var tempListReducer = function tempListReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _tempListAction.ADD_TEMP_ITEM:
      if (state.length > 0) {
        var wecan = true;
        var previousName = [];
        state.forEach(function (itm) {
          if (itm.name === action.payload.item.name) {
            //console("c'est le meme nom")
            wecan = false;
          }

          previousName.forEach(function (pnm) {
            if (pnm === action.payload.item.name) {
              //console("c'est le meme nom")
              wecan = false;
            }
          });
          previousName.push(itm.name);
        });

        if (wecan) {
          return [].concat(_toConsumableArray(state), [action.payload.item]);
        } else {
          return state;
        }
      } else {
        return [].concat(_toConsumableArray(state), [action.payload.item]);
      }

    case _tempListAction.MODIFY_TEMP_ITEM:
      return state.map(function (el) {
        if (el._id === action.payload._id) {
          //console("corelation tkt meme pas")
          if (action.payload.type === "more") {
            //console("l'un des deux")
            return {
              categories: el.categories,
              date: el.date,
              image: el.image,
              isChecked: el.isChecked,
              name: el.name,
              note: el.note,
              numberOfElements: el.numberOfElements + 1,
              _id: el._id
            };
          } else if (action.payload.type === "less") {
            if (el.numberOfElements > 1) {
              return {
                categories: el.categories,
                date: el.date,
                image: el.image,
                isChecked: el.isChecked,
                name: el.name,
                note: el.note,
                numberOfElements: el.numberOfElements - 1,
                _id: el._id
              };
            } else {
              return null;
            }
          } else {
            return null;
          }
        } else {
          return el;
        }
      });

    case _tempListAction.DELETE_TEMP_ITEM:
      console.log("temp is:");
      console.log(action.payload);
      return state.filter(function (element) {
        return element.specialId !== action.payload.specialId;
      });

    case _tempListAction.CLEAR_ALL:
      return state.filter(function (el) {
        return el._id === "fucjnecjecnaicjnazujincianldczcnajklcn";
      });

    default:
      return state;
  }
};

exports.tempListReducer = tempListReducer;