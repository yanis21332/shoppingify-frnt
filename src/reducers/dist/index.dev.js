"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _ItemsReducer = require("./ItemsReducer");

var _tempListReducer = require("./tempListReducer");

var _ListsReducer = require("./ListsReducer");

var _default = (0, _redux.combineReducers)({
  ItemsReducer: _ItemsReducer.ItemsReducer,
  tempListReducer: _tempListReducer.tempListReducer,
  ListsReducer: _ListsReducer.ListsReducer
});

exports["default"] = _default;