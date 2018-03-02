const gulp = require('gulp')
const util = require('gulp-util')
const sequence = require('run-sequence')

require('./gulpTasks/app')
require('./gulpTasks/deps')
require('./gulpTasks/server')

gulp.task('default', () =>
{
  if (util.env.production) {
    
    sequence('deps', 'app', () =>
    {
      const express = require('express');
      const app = express();
      app.use('/', express.static('public'));
      app.listen(3000, () => console.log('Example app listening on port 3000!'));
    })

  } else {
    sequence('deps', 'app', 'server')
  }
})
