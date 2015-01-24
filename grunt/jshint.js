/**
 * Validate JavaScript
 * https://github.com/gruntjs/grunt-contrib-jshint
 * --------------------------------------------------
 */

exports.task = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  scripts: {
    src: [ '<%= path.source %>/<%= path.scripts %>/**/*.js' ]
  }
};
