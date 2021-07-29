const express = require('express');
const path = require('path');
const data = require('./data');
const multer = require("multer");

const router = express.Router();

router.get('/', ( req, res, next) => {
	
	res.sendFile( path.join(__dirname, '../', 'views', 'schedule.html')  );
	
});

router.get('/query', ( req, res, next) => {
	
	res.sendFile( path.join(__dirname, '../', 'views', 'query.html')  );
	
});

router.get('/upload', ( req, res, next) => {
	
	res.sendFile( path.join(__dirname, '../', 'views', 'upload.html')  );
	
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + req.body.email + "-" + file.originalname)
  },
})
const uploadStorage = multer({ storage: storage })

router.post("/upload", uploadStorage.single("cv"), (req, res) => {
  res.redirect('/')
});
router.post('/save', data.saveData);
router.post('/query', data.queryData);
router.post('/delete', data.deleteData);
router.post('/edit', data.editData);

module.exports = router;