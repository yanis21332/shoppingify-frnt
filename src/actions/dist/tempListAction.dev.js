"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = exports.delItemFromTempList = exports.modifyItemInTempList = exports.addItemInTempList = exports.CLEAR_ALL = exports.DELETE_TEMP_ITEM = exports.MODIFY_TEMP_ITEM = exports.ADD_TEMP_ITEM = void 0;
var ADD_TEMP_ITEM = "ADD_TEMP_ITEM";
exports.ADD_TEMP_ITEM = ADD_TEMP_ITEM;
var MODIFY_TEMP_ITEM = "MODIFY_TEMP_ITEM";
exports.MODIFY_TEMP_ITEM = MODIFY_TEMP_ITEM;
var DELETE_TEMP_ITEM = "DELETE_TEMP_ITEM";
exports.DELETE_TEMP_ITEM = DELETE_TEMP_ITEM;
var CLEAR_ALL = "CLEAR_ALL";
exports.CLEAR_ALL = CLEAR_ALL;

var addItemInTempList = function addItemInTempList(data) {
  return function (dispatch) {
    dispatch({
      type: ADD_TEMP_ITEM,
      payload: data
    });
  };
};

exports.addItemInTempList = addItemInTempList;

var modifyItemInTempList = function modifyItemInTempList(data) {
  return function (dispatch) {
    dispatch({
      type: MODIFY_TEMP_ITEM,
      payload: data
    });
  };
};

exports.modifyItemInTempList = modifyItemInTempList;

var delItemFromTempList = function delItemFromTempList(data) {
  return function (dispatch) {
    dispatch({
      type: DELETE_TEMP_ITEM,
      payload: data
    });
  };
};

exports.delItemFromTempList = delItemFromTempList;

var clear = function clear(data) {
  return function (dispatch) {
    dispatch({
      type: CLEAR_ALL,
      payload: data
    });
  };
};

exports.clear = clear;