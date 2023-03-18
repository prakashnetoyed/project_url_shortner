const express = require('express');
const router = express.Router();

const UrlController=require("../controller/urlController")


router.post("/url/shorten",UrlController.CreateShortUrl)

router.get("/:urlCode",UrlController.GetUrl)





module.exports = router;