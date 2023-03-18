const urlModel = require("../model/urlModel");
const validUrl = require("valid-url");
const shortid = require("shortid");

const CreateShortUrl = async function (req, res) {
  try {
    let body = req.body;
  //  let longUrl = body.longUrl

    if (Object.keys(body).length === 0) {
      return res.status(400).send({ status: false, message: "Please enter the data" });
    }

    if (!body.longUrl) {
      return res.status(400).send({ status: false, message: "Please enter the URL" });
    }

    if (!validUrl.isWebUri(body.longUrl)) {
     // console.log("Looks like not a valid URL");
      return res.status(400).send({ status: false, message: "Looks like not a valid URL" });
    }

    let FindUrl = await urlModel.findOne({ longUrl: body.longUrl }); //.select({ longUrl: 1, shortUrl: 1, urlCode: 1, _id: 0 })

    if (FindUrl) {
    return res.status(400).send({ status: false, message: FindUrl });
    }
    const urlCode = shortid.generate().toLowerCase();

    const baseUrl = process.env.baseUrl;
    console.log("hi there----", baseUrl)
    return
    let shortUrl = baseUrl + "/" + urlCode;

    // url = { longUrl, shortUrl, urlCode }
    body.shortUrl = shortUrl;
    body.urlCode = urlCode;

    await urlModel.create(body);

    let ShowUrl = await urlModel.findOne({ longUrl: body.longUrl }).select({ longUrl: 1, shortUrl: 1, urlCode: 1, _id: 0 });

    res.status(201).send({status: true,message: "URL create successfully",data: ShowUrl});

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const GetUrl = async function (req, res) {
  try {

      let getUrl = await urlModel.findOne({ urlCode: req.params.urlCode });
      if (!getUrl) {
        return res.status(404).send({ status: false, message: "Url-Code not found" });
      }
      return res.status(307).redirect(getUrl.longUrl);
  }catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { CreateShortUrl, GetUrl };