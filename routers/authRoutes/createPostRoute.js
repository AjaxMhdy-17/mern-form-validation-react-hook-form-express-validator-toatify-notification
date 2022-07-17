
const express = require('express')
const router = express.Router()

router.get('/create',(req , res) => {
    console.log('conn');
    res.send('create post') 
})

module.exports = router 
