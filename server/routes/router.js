const express = require('express');

const cookieController = require('../controllers/cookieController');
const userController = require('../controllers/userController');
const dogController = require('../controllers/dogController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

// routers
router.post(
  '/signup',
  userController.addUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.status(200).json(res.locals.newUser);
    if (res.locals.session) {
      console.log('Signed up successfully!');
      return res.redirect('/homepage');
    }
  }
);

router.post('/login/no-oauth', userController.noOAuthLogIn, (req, res) => {
  console.log('/login/no-oauth route hit');
  res.status(200).json(res.locals.user);
});

// router.use(
//   '/login',
//   userController.verifyUser,
//   sessionController.startSession,
//   cookieController.setSSIDCookie,
//   (req, res) => {
//     if (res.locals.session) {
//       console.log('Logged in successfully!');
//       res.status(200).json(res.locals.newUser);
//       return res.redirect('/homepage');
//     }
//   }
// );

router.get('/getAllUsers/', userController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.allUsers);
});

router.get(
  '/fetchDogs/',
  // () => {console.log('starting fetch'); return next()},
  dogController.fetchDogs,
  (req, res) => {
    console.log('dogs fetched');
    res.status(200).json(res.locals.dogs);
  }
);

router.get('/signin/:googleId', userController.verifyUser, (req, res) => {
  console.log('User Verified. User Id:', res.locals.user);
  res.status(200).json(res.locals.user);
});

router.post('/addDog', dogController.addDog, (req, res) => {
  res.status(200).json(res.locals.currentDog);
});

// app.use('/homepage', sessionController.isLoggedIn, (req, res) => {
//   // if (res.locals.session) {
//   console.log('Going to homepage');
//   return res.redirect('/homepage');
//   // }
// });

//to query dogs
// app.get('/fetchDogs', dogController.fetchDogs, (req, res) => {
//   res.status(200).json(res.locals.dogs);
// });

// //to submit to addDogs
// app.post('/addDog', dogController.createDogTable, (req, res) => {
//   console.log(
//     'finished adding dog, sending res.locals.newDog',
//     res.locals.newDog
//   );
//   res.status(200).json(res.locals.newDog);
// });

// route to add dogs page
// app.get('/addDog', (req, res) => {
//   console.log('going to add dog page');
//   return res.redirect('/homepage');
// });

module.exports = router;
