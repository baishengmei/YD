var express = require('express');
var router = express.Router();
// var Todo = require('../src/models/todo')


router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'React TodoList'
	});
});

// 获取全部的todo
router.get('/getAllItems', (req, res, next) => {
	console.log("展示所有项");
});

// 添加todo
router.post('/addItem', (req, res, next) => {
	console.log("新增一项");
})

// 删除todo
router.post('/deleteItem', (req, res, next) => {
	console.log(req.body);
});

module.exports = router;
