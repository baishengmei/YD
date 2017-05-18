var express = require('express');
var router = express.Router();
// var Todo = require('../src/models/todo')

router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'React TodoList'
	});
});

// // 获取全部的todo
// router.get('/getAllItems', (req, res, next) => {
// 	Todo.find({}).sort({'date': -1}).exec((err, todoList) => {
// 		if (err) {
// 			console.log(err);
// 		}else {
// 			res.json(todoList);
// 		}
// 	})
// });

module.exports = router;
