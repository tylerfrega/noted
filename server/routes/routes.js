const express = require('express')
const router = express.Router()
const Notebook = require('../models/models')

router.get('/getNotebooks', (req, res) => {
    Notebook.find((err, data) => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true, data: data })
    })
})

router.post('/saveNotebook', (req, res) => {
    const { title, notes, tasks } = req.body

    notebook = new Notebook()
    notebook.title = title
    notebook.notes = notes
    notebook.tasks = tasks
    notebook.save(err => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true })
    })
})

router.post('/updateNotebook', (req, res) => {
    const { _id } = req.body

    Notebook.findByIdAndUpdate(_id, req.body, err => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true })
    })
})

router.delete('/deleteNotebook', (req, res) => {
    const { _id } = req.body

    Notebook.findByIdAndRemove(_id, err => {
        if (err) return res.send(err)
        return res.json({ success: true })
    })
})

module.exports = router