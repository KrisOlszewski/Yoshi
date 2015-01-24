/**
 * Lint CSS
 * https://github.com/gruntjs/grunt-contrib-csslint
 * --------------------------------------------------
 */

exports.task = {
  options: {
    csslintrc: '.csslintrc',
    formatters: [
      {
        id: 'csslint-xml',
        dest: '<%= path.reports %>/css-report.xml'
      }
    ]
  },
  styles: {
    src: '<%= path.temp %>/<%= path.styles %>/**/*.css'
  }
};
