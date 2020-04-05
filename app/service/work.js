/*
 * @Description: server层
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-19 07:46:24
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-05 09:20:47
 */
const workDao = require('../dao/workDao.js')
const common = require('./common.js')
const exec = require('child_process').exec
const { nodeModules } = require('../utils/gitDown.js')
var UUID = require('uuid')
const url = require('url')
const result = {
  resultCode: 200,
  resultEntity: {},
  resultMes: 'success'
}
const resultBad = {
  resultCode: 500,
  resultEntity: {},
  resultMes: '服务异常'
}
// 获取首页计数明显
async function getIndexCount(req, res) {
  const callBack = function(data) {
    let resultEntity = data
    res.send({ ...result, resultEntity })
  }
  workDao.queryIndexCount(callBack)
}

// 获取项目分类字典项
async function getProjectType(req, res) {
  const callBack = function(data) {
    let resultEntity = data
    res.send({ ...result, resultEntity })
  }
  workDao.queryProjectType(callBack)
}
// 新增项目
async function newProject(req, res) {
  let body = req.body
  const callBack = function() {
    res.send(result)
  }
  workDao.newProject(body, callBack)
}
// 初始新增项目
async function initNewProject(req, res) {
  const callBackFun = function() {
    res.send(result)
  }
  workDao.newProject(req.body, callBackFun)
}
// 获取项目列表
async function getProjectList(req, res) {
  common.queryCommonList(req, res, 'project')
}
// 获取项目汇总列表
async function getProjectSum(req, res) {
  common.querySum('project', res)
}
// 新增模板
async function newTemplate(req, res) {
  let body = req.body
  const callBack = function() {
    res.send(result)
  }
  workDao.insertTemplate(body, callBack)
}
// 获取项目列表
async function queryTemplateList(req, res) {
  common.queryCommonList(req, res, 'template')
}
// 获取模板汇总
async function queryTemplateSum(req, res) {
  common.querySum('template', res)
}
// 获取组件列表
async function queryComponentList(req, res) {
  common.queryCommonList(req, res, 'component')
}
// 获取组件汇总
async function queryComponentSum(req, res) {
  common.querySum('component', res)
}
// 获取项目汇总
async function queryProjectById(req, res) {
  const callBack = function(data) {
    let resultEntity = {
      total: data[0] ? data[0]['total'] : 0,
      list: data
    }
    res.send({ ...result, resultEntity })
  }
  workDao.queryTemplateSum(callBack)
}

// 新增组件
async function insertComponent(req, res) {
  const callBackFun = function() {
    res.send(result)
  }
  workDao.insertComponent(req.body, callBackFun)
}
module.exports = {
  getIndexCount,
  getProjectType,
  newProject,
  getProjectList,
  getProjectSum,
  initNewProject,
  newTemplate,
  queryTemplateList,
  queryTemplateSum,
  queryProjectById,
  queryComponentSum,
  queryComponentList,
  insertComponent
}