/**
 * Create Sass documentation
 * https://github.com/SassDoc/grunt-sassdoc
 * --------------------------------------------------
 */

exports.task = {
  build: {
    src: '<%= path.source %>/<%= path.styles %>',
    dest: '<%= path.docs %>/<%= path.docsSass %>'
  }
};
