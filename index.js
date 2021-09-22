const express = require('express')
const multer  = require('multer')
const fs = require('fs')
const path = require('path')

// configs
const PORT = 4800
const UPLOAD_DIR = path.join(__dirname, 'public/uploads')

// entrypoint
const app = express()

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, UPLOAD_DIR);
  },
  filename: function (req, file, callback) {
      callback(null, file.originalname);
  }
})

const upload = multer({ storage: storage })

// use ejs for frontend
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, 'public')))

// homepage
app.get('/', (req, res) => {
  res.render('index')
})

// submit form handler
app.post('/submit-sertif', upload.fields([{name: 'vaksinfile1', maxCount: 5}, {name: 'vaksinfile2', maxCount: 5}]), (req, res, next) => {
  const { pilihan_sertifikat } = req.body
  const { vaksinfile1, vaksinfile2 } = req.files
  if ( pilihan_sertifikat == "single" ){
    let { vaksinpilihan1 } = req.body
    if ( typeof(vaksinpilihan1) === "string" ) {
      vaksinpilihan1 = [ vaksinpilihan1 ]
    }
    res.render('result-single', {vaksinpilihan1, vaksinfile1})
  }
  else {
    res.render('result-double', {banyak_baris: vaksinfile1.length, vaksinfile1, vaksinfile2})
  }
})

app.get('/cleanup', (req, res, next) => {
  // delete uploaded file
  fs.readdirSync(UPLOAD_DIR).forEach( thefile => {
    if ( thefile == '.keep' ) return
    fs.unlinkSync(path.join(UPLOAD_DIR, thefile))
  })  
  res.status(200).json({message: "OK"})
})

app.listen(PORT, () => {
  console.info(`Ayra Cetak Vaksin is running on port ${PORT}`)
})
