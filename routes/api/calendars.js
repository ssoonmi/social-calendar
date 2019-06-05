const express = require('express');
const router = express.Router();
const passport = require('passport');

const Calendar = require('../../models/Calendar');
const validateCalendarInput = require('../../validation/calendar');

router.get('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Calendar.find({ user: req.user.id })
      .then(calendars => res.json(calendars))
      .catch(() => 
        res.status(404).json({ 
          noCalendarsFound: 'No calendars found for that user' 
        })
      );
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Calendar.findOne({ user: req.user.id, _id: req.params.id })
      .then(calendar => {
        if (calendar) return res.json(calendar);
        res.status(404).json({
          noCalendarFound: 'No calendar found with that id'
        });
      })
      .catch(() =>
        res.status(404).json({
          noCalendarFound: 'No calendar found with that id'
        })
      );
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Calendar.findOne({ user: req.user.id, _id: req.params.id })
      .then(calendar => {
        if (calendar) {
          const { name, description } = req.body;

          calendar.name = name;
          calendar.description = description;

          calendar.save()
            .then((calendar) => res.json(calendar))
            .catch(err => console.log(err));
        } else {
          res.status(404).json({
            noCalendarFound: 'No calendar found with that id'
          })
        }
      })
      .catch(() =>
        res.status(404).json({
          noCalendarFound: 'No calendar found with that id'
        })
      );
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Calendar.findOne({ user: req.user.id, _id: req.params.id })
      .then(calendar => {
        if (calendar) {
          calendar.remove();
          res.json({ msg: 'Success' });
        } else {
          res.status(404).json({
            noCalendarFound: 'No calendar found with that id'
          })
        }
      })
      .catch(() =>
        res.status(404).json({
          noCalendarFound: 'No calendar found with that id'
        })
      );
  }
)

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCalendarInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { name, description } = req.body;

    Calendar.findOne({ user: req.user.id, name })
      .then((calendar) => {
        if (!calendar) {
          const newCalendar = new Calendar({
            name,
            description,
            user: req.user.id
          });
      
          newCalendar.save()
            .then((calendar) => res.json(calendar))
            .catch(err => console.log(err));
        } else {
          return res.status(400).json({ 
            name: 'Cannot have two calendars with the same name' 
          });
        }
      })

  }
)

module.exports = router;