/**
 * Optimize images
 * https://github.com/gruntjs/grunt-contrib-imagemin
 * --------------------------------------------------
 */

exports.task = {
  options: {
    optimizationLevel: 4
  },
  images: {
    expand: true,
    cwd: '<%= path.source %>',
    src: [ '<%= path.images %>/**/*.{png,jpg,jpeg,gif,ico}' ],
    dest: '<%= path.build %>'
  }
};
