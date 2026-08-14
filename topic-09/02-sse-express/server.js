import express from 'express'

const app = express()

app.use(express.static('public'))

const steps = [
  'Analyzing request',
  'Searching for a match',
  'Composing the answer',
]

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()

  console.log('Клієнт підключився')

  let index = 0

  const timer = setInterval(() => {
    if (index < steps.length) {
      res.write(`event: reasoning\n`)
      res.write(`data: ${steps[index]}\n\n`)
      index += 1
      return
    }

    res.write(`event: answer\n`)
    res.write(`data: The answer is 42\n\n`)

    res.write(`event: done\n`)
    res.write(`data: \n\n`)

    clearInterval(timer)
    res.end()
  }, 1000)

  res.on('close', () => {
    clearInterval(timer)
    console.log("З'єднання закрите, таймер зупинено")
  })
})

app.listen(3000, () => console.log('http://localhost:3000'))
