/**
 * Create JavaScript documentation
 * --------------------------------------------------
 */

exports.task = {
  build: {
    src: '<%= path.source %>/<%= path.scripts %>',
    dest: '<%= path.docs %>/<%= path.docsJS %>'
  }
};
