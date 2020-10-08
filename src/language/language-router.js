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
   const {stuff, from, lcient} = req.body;
    const newGuess = {
      stuff,
      from,
      client
    }
    if (!newGuess)
    return res.status(400).json({
      error: `A guess must be submitted. Try your best!`,
    });
  psuedocode word.compare(word);
  res.sendStatus(201);
    res.send('conditional right or wrong statement here')
  })

module.exports = languageRouter
