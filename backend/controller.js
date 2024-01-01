const controller = {
  success : (res, resObj) => {
    res.status(200).json(resObj);
  },
  error : (res, resObj) => {
    res.status(500).json(resObj);
  },
  unauthorised : (res, resObj) => {
    res.status(401).json(resObj);
  },
  invalid : (res, resObj) => {
    res.status(400).json(resObj);
  }
}


module.exports = controller;