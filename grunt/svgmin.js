/**
 * Optimize SVG images
 * https://github.com/sindresorhus/grunt-svgmin
 * --------------------------------------------------
 */

exports.task = {
  images: {
    expand: true,
    cwd: '<%= path.source %>',
    src: [ '<%= path.images %>/**/*.svg' ],
    dest: '<%= path.build %>'
  }
};
