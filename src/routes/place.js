const express = require('express')
const multer = require('multer');
const router = express.Router()
const { uploadImage, addNewPlaces, getUserPlaces, getPlaceById, updatePlace, getAllPlaces } = require('../controllers/places');
const isAuthorized = require('../middleware/authorization');

const storage = multer.memoryStorage()
const upload = multer({storage});

router.post('/upload',upload.array('files',20),uploadImage)

router.post('/addPlace',isAuthorized,addNewPlaces)

router.get('/userPlaces',isAuthorized,getUserPlaces);

router.get('/getPlace/:id',getPlaceById);

router.get('/',getAllPlaces);

router.put('/:id',isAuthorized,updatePlace)

module.exports = router;