require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { handleResponse } = require('./helpers/responseHandler')
const routes = require('./routes/index.js')
const PORT = process.env.PORT || 8000
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api', routes)

app.all('*', (req, res) => {
  return handleResponse(res, 404, { message: 'API Not Found' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
