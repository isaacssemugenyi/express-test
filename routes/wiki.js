let express = require('express')
let router = express.Router()

//home page route
router.get('/', (req, res)=>{
	res.send('Wiki home page');
})

//About page route
router.get('/about', (req, res)=>{
	res.send('About this wiki');
})

module.exports = router;