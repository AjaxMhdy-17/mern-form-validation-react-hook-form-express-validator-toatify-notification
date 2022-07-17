
const express = require('express')
const router = express.Router()

router.post('/create_post', async (req , res) => {
    console.log('conn');
    console.log(req.body);
    res.send('create post') 
})

module.exports = router 
