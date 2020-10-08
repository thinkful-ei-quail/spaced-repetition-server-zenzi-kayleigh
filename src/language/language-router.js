const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const { getWord } = require('./language-service')

const languageRouter = express.Router()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      const headId = await LanguageService.getHeadWord(
        req.app.get("db"),
        req.language.id
      );
      const headWord = await LanguageService.getWord(
        req.app.get("db"),
        headId
      )
      res.json({
        headWord
      });
    } catch (error) {
      next(error);
    }
  })

languageRouter
  .post('/guess', async (req, res, next) => {
    //validate request body
   const {guess} = req.body;
   let M = 1;
    const newGuess = { word }
    if (!newGuess)
    return res.status(400).json({
      error: `A guess must be submitted. Try your best!`,
    });
     try {
      const headWord = await LanguageService.getWord(
        req.app.get("db"),
        headId
      );
      if (headWord == newGuess){
    res.sendStatus(201);
    res.send('You are correct')
    M *=2;
    headWord.LanguageService.alterList()
      } else {
    res.sendStatus(201);
    res.send(`You are incorrect. The correct answer is ${headword}`)
    M = 1;
      }
  })
}
module.exports = languageRouter
