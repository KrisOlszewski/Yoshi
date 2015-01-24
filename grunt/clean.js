/**
 * Clean file and/or directories
 * https://github.com/gruntjs/grunt-contrib-clean
 * --------------------------------------------------
 */

exports.task = {
  build    : [ '<%= path.build %>' ],
  docsSass : [ '<%= path.docs %>/<%= path.docsSass %>' ],
  docsJS   : [ '<%= path.docs %>/<%= path.docsJS %>' ],
  temp     : [ '<%= path.temp %>' ]
};
