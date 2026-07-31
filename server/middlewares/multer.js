//package for multer: npm i multer we made a public folder for uploading files
//setting up multer
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    const fileName = Data.now() + "-" + file.originalname
    cb(null, fileName)
  }
})

export const upload = multer({
  storage,
  limits: {
    fileSize: 6 * 1024 * 1024
  }, //5MB Limit
  
})