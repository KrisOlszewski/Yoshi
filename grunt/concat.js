/**
 * Concatenate files
 * https://github.com/gruntjs/grunt-contrib-concat
 * --------------------------------------------------
 */

exports.task = {
  options: {
    separator: '\n'
  },
  scripts: {
    options: {
      banner: '<%= banner.exapanded %>'
    },
    files: {
      /* Main scripts */
      '<%= path.temp %>/<%= path.scripts %>/yoshi.js': [
        '<%= path.source %>/<%= path.scripts %>/pubsub.js',
        '<%= path.source %>/<%= path.scripts %>/yoshi.js'
      ]
    }
  }
};
