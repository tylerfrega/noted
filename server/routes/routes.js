const express = require('express')
const router = express.Router()
const Task = require('../models/models')

router.get('/getTasks', (req, res) => {
  Task.find((err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true, data: data })
  })
})

router.post('/addTask', (req, res) => {
  const { title, completed } = req.body

  task = new Task()
  task.title = title
  task.completed = completed
  task.save(err => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
  })
})

router.post('/updateTask', (req, res) => {
  const { _id } = req.body

  Task.findByIdAndUpdate(_id, req.body, err => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
  })
})

router.delete('/deleteTask', (req, res) => {
  const { _id } = req.body
  
  Data.findByIdAndRemove(_id, err => {
    if (err) return res.send(err)
    return res.json({ success: true })
  })
})

module.exports = router
