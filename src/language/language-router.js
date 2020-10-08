const express = require("express");
const LanguageService = require("./language-service");
const { requireAuth } = require("../middleware/jwt-auth");
const { getWord } = require("./language-service");
const bodyparser = express.json();

const languageRouter = express.Router();

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get("db"),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`,
      });

    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get("/", async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get("db"),
      req.language.id
    );

    res.json({
      language: req.language,
      words,
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get("/head", async (req, res, next) => {
  try {
    const headId = await LanguageService.getHeadWord(
      req.app.get("db"),
      req.language.id
    );
    const headWord = await LanguageService.getWord(
      req.app.get("db"),
      headId.head
    );

    let response = {
      nextWord: headWord.original,
      wordCorrectCount: headWord.correct_count,
      wordIncorrectCount: headWord.incorrect_count,
      totalScore: req.language.total_score,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

languageRouter.post("/guess", bodyparser, async (req, res, next) => {
  //validate request body
  const { guess } = req.body;
  if (!guess)
    return res.status(400).json({
      error: "Missing 'guess' in request body",
    });
  try {
    const ll = await LanguageService.getLinkedList(
      req.app.get("db"),
      req.language
    );
    let head = ll.head.value;
    let isCorrect = false;

    if (guess === head.translation) {
      head.memory_value *= 2;
      head.correct_count++;
      req.language.total_score++;
      isCorrect = true;
    } else {
      head.memory_value = 1;
      head.incorrect_count = 1;
    }

    ll.remove(head);
    ll.insertAt(head.memory_value, head);
    ll.updateLinks();
    req.language.head = ll.head.value.id;
    await LanguageService.serialize(req.app.get("db"), ll);
    await LanguageService.updateLanguage(req.app.get("db"), req.language);

    let nextWord = ll.head.value;
    let response = {
      nextWord: nextWord.original,
      wordCorrectCount: nextWord.correct_count,
      wordIncorrectCount: nextWord.incorrect_count,
      totalScore: req.language.total_score,
      answer: head.translation,
      isCorrect,
    };
    res.json(response);
  } catch (e) {
    next(e);
  }
});

module.exports = languageRouter;
