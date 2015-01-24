/**
 * Combine CSS media queries
 * https://github.com/buildingblocks/grunt-combine-media-queries
 * --------------------------------------------------
 */

exports.task = {
  styles: {
    expand: true,
    cwd: '<%= path.temp %>',
    src: '<%= path.styles %>/**/*.css',
    dest: '<%= path.temp %>'
  }
};
