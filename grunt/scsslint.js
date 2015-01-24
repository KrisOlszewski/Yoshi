/**
 * Lint Sass
 * https://github.com/ahmednuaman/grunt-scss-lint
 * --------------------------------------------------
 */

exports.task = {
  allFiles: [
    '<%= path.source %>/<%= path.styles %>/**/*.scss',
  ],
  options: {
    config: '.scss-lint.yml',
    reporterOutput: '<%= path.reports %>/sass-report.xml',
    colorizeOutput: true
  }
};
