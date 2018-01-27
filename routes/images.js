const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
let Article = require('../models/article');
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

router.get('/upload', (req, res) => res.render('add_image'));
router.use('/uploads', express.static(path.join(__dirname, '/uploads')));
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
		req.flash('danger',err);
      res.render('add_image');
	  return;
    } else {
      if(req.file == undefined){
		req.flash('danger','No File Selected');
        res.render('add_image');
		return;
      } else {
		req.flash('success', 'File Uploaded');
		res.render('add_image',{
			file : `../uploads/${req.file.filename}`
		});
      }
    }
  });
});
module.exports = router;
