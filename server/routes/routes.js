const express = require('express')
const router = express.Router()
const Task = require('../models/models')

router.get('/getTasks', (req, res) => {
  Task.find((err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true, data: data })
  })
})

router.post('/updateData', (req, res) => {
  const { id, update } = req.body
  Data.findByIdAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
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

router.delete('/deleteTask', (req, res) => {
  const { id } = req.body
  Data.findByIdAndRemove(id, err => {
    if (err) return res.send(err)
    return res.json({ success: true })
  })
})

router.post('/addTask', (req, res) => {
  let data = new Data()

  const { id, message } = req.body

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS'
    })
  }
  data.message = message
  data.id = id
  data.save(err => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
  })
})

module.exports = router
