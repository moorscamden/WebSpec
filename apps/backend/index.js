require('dotenv').config()

const express = require('express')
const { exec } = require('child_process')
const uuid = require('uuid')
const fs = require('fs')

// Current tasks
const tasks = {}

// Database
const Sequelize = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
})

const Profile = sequelize.define('profile', { filename: Sequelize.TEXT, repo: Sequelize.STRING, path: Sequelize.STRING })

sequelize.sync().then(() => {
  console.log('Database & tables created!')
})

// Web handling
const app = express()
const port = 3000

// Profiles
app.get('/profiles', function (req, res) {
  Profile.findAll().then(profiles => res.json(profiles))
})

app.get('/profiles/add', (req, res) => {
  const repo = req.query.repo
  const name = req.query.repo.split('/').splice(-1)[0]
  exec(`git clone ${repo} ${process.env.INSPEC_DATA_PATH}/profiles/${name}`, (err, stdout, stderr) => {
    if (err) {
      res.json(err)
    } else {
      Profile.create({ name: name, repo: repo, path: `${process.env.INSPEC_DATA_PATH}/profiles/${name}` })
      res.status(200)
      res.json({ ok: true })
    }
  })
})

// Run profile
app.get('/run/:profile', function (req, res) {
  Profile.findAll({ where: { id: req.params.profile } }).then(profiles => {
    const profile = profiles[0]
    const target = req.query.target
    const user = req.query.user
    const password = req.query.password
    const task = uuid.v4()
    tasks[task] = {
      completed: false
    }
    res.status(201)
    res.json({ started: true, taskID: task })
    res.end()
    exec(`inspec exec --target ${target} --user ${user} --password ${password} ${profile.path} --reporter json > ${process.env.INSPEC_DATA_PATH}/results/${task}.json`, (err, stdout, _stderr) => {
      console.log(err)
      console.log(stdout)
      if (err) {
        if (err.code !== 100) {
          tasks[task] = {
            completed: false,
            status: 'failed'
          }
        } else {
          tasks[task] = {
            completed: true,
            url: `${process.env.EXTERNAL_URL}/results/${task}`
          }
        }
      }
      tasks[task] = {
        completed: true,
        url: `${process.env.EXTERNAL_URL}/results/${task}`
      }
    })
  })
})

// Task status
app.get('/tasks/:task', function (req, res) {
  res.json(tasks[req.params.task])
})

// Run result
app.get('/results/:task', function (req, res) {
  if (req.params.task in tasks){
    const data = fs.readFileSync(`${process.env.INSPEC_DATA_PATH}/results/${req.params.task}.json`)
    res.json(JSON.parse(data))
  } else {
    res.json({error: true, errorDescription: 'Unknown Task'})
  }
  
})

// Start the app
app.listen(port, () => {
  console.log(`Storing InSpec Data in ${process.env.INSPEC_DATA_PATH}`)
  console.log(`WebSpec backend listening at http://localhost:${port}`)
})
