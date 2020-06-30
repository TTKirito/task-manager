const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/tasks',auth, async (req, res) => {
    try {
        const task = await new Task({
            ...req.body,
            owner: req.user.id,
        })
        await task.save()
        res.status(201).send(task)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks',auth, async (req,res) => {
    const match = {}
    const sort = {}

    if(req.query.complete) {
        match.complete = req.query.complete === 'true'
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate(
            {
                path: 'tasks',
                match,
                options:{
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
                
            }
        ).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id',auth, async (req, res) => {
    
    try {
        const task = await Task.findOne({_id:req.params.id, owner: req.user.id})
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'complete']
    const validOperation = updates.every(update => allowedUpdates.includes(update))
    if(!validOperation){
        return res.status(400).send({error: 'Invalid Updates'})
    }
    try {
        const task = await Task.findOne({_id:req.params.id,owner: req.user.id})
        if(!task) {
           return res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.send(task)

    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id',auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id,owner: req.user.id})
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})






module.exports = router
