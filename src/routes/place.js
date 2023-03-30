const express = require('express')
const multer = require('multer');
const router = express.Router()
const { uploadImage, addNewPlaces, getUserPlaces, getPlaceById, updatePlace, getAllPlaces } = require('../controllers/places')

// const storage = multer.diskStorage({
//     destination: "./src/uploads",
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
// });
const storage = multer.memoryStorage()
const upload = multer({storage});

// router.post('/addImage',addImagesViaLink)

router.post('/upload',upload.array('files',20),uploadImage)

router.post('/addPlace',addNewPlaces)

router.get('/userPlaces',getUserPlaces);

router.get('/getPlace/:id',getPlaceById);

router.get('/',getAllPlaces);

router.put('/:id',updatePlace)

module.exports = router;