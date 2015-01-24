/**
 * Watch files and/or directories
 * https://github.com/gruntjs/grunt-contrib-watch
 * --------------------------------------------------
 */

exports.task = {
  options: {
    livereload: true
  },
  images: {
    files: [ '<%= path.source %>/<%= path.images %>/**/*' ],
    tasks: [ 'images' ]
  },
  styles: {
    files: [ '<%= path.source %>/<%= path.styles %>/**/*' ],
    tasks: [ 'styles' ]
  },
  scripts: {
    files: [ '<%= path.source %>/<%= path.scripts %>/**/*' ],
    tasks: [ 'scripts' ]
  },
  vendors: {
    files: [ '<%= path.source %>/<%= path.vendors %>/**/*' ],
    tasks: [ 'vendors' ]
  },
  views: {
    files: [ '<%= path.source %>/<%= path.views %>/**/*' ],
    tasks: [ 'views' ]
  }
};
