/**
 * Copy files and/or directories
 * https://github.com/gruntjs/grunt-contrib-copy
 * --------------------------------------------------
 */

exports.task = {
  scripts: {
    expand: true,
    cwd: '<%= path.temp %>',
    src: [ '<%= path.scripts %>/**/*.js' ],
    dest: '<%= path.build %>'
  },
  styles: {
    expand: true,
    cwd: '<%= path.temp %>',
    src: [ '<%= path.styles %>/**/*.css' ],
    dest: '<%= path.build %>'
  },
  vendors: {
    expand: true,
    cwd: '<%= path.source %>',
    src: [ '<%= path.vendors %>/**/*' ],
    dest: '<%= path.build %>',
    dot: true
  },
  views: {
    expand: true,
    cwd: '<%= path.source %>/<%= path.views %>',
    src: [ '**/*' ],
    dest: '<%= path.build %>',
    dot: true
  },
};
