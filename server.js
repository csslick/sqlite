const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('db/comments.db')

// 정적 문서 경로
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// route
app.get('/', (req, res) => {
  res.send("Hello express!")
})

app.get('/comments', (req, res) => {
  console.log("GET request at /comments")
  db.all('SELECT * FROM comments', (err, rows) => {
    if(err){ 
      console.log('Error: ', err)
    } else {
      res.send(rows)
    }
  })
})

// form 요청 내용을 db에 저장
app.post('/comments', (req, res) => {
  console.log("POST")
  const id = new Date().getTime()
  db.all(
    'INSERT INTO comments VALUES (?, ?, ?)', 
    [id, req.body.name, req.body.comment], (err) => {
      if(err) {
        console.log("Error: " + err)
      } else {
        res.status(200).redirect('index.html')
      }
    }
  )
})

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})