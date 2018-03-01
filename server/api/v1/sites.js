const express = require('express');
const yup = require('yup');

const router = express.Router();
const siteStats = {};
const siteNames = {};
let counter = 0;

const schema = yup.object().shape({
  site: yup.string().required(),
  id: yup.number().positive().integer(),
  count: yup.number().positive().integer(),
});

router.get('/', (req, res) => {
  const result = Object.values(siteStats).filter(aSite => aSite !== null);
  res.status(200).json(result);
});

router.put('/', (req, res, next) => {
  schema.isValid(req.body)
    .then((valid) => {
      if (valid) return next(req, res);
      const notValiderror = new Error('Not valid request body');
      notValiderror.status = 400;
      return next(notValiderror);
    }).catch(err => next(err));
});

router.put('/', (req, res) => {
  let anID;
  if (req.body.id) {
    anID = req.body.site;
  } else {
    anID = siteNames[req.body.site];
  }
  let stat;
  if (anID) {
    stat = siteStats[anID];
  }
  if (stat && stat !== null) {
    stat.coutn = stat.count + 1;
  } else {
    anID = counter;
    counter += 1;
    siteStats[anID] = {
      site: req.body.site,
      id: anID,
      count: 1,
    };
    siteNames[req.body.site] = anID;
  }
  return res.status(200).send();
});

router.delete('/:siteid([0-9]+)', (req, res) => {
  const stat = siteStats[req.params.siteid];
  if (stat) {
    siteStats[req.params.siteid] = null;
  }
  return res.status(200).send();
});

module.exports = router;
