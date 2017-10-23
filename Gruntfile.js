module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-css-mqpacker');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-svgmin');

  grunt.initConfig({
    less: {
      style: {
        files: {
          "css/style.css": "less/style.less"
        }
      }
    },
    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers:
[
  "last 1 version",
  "last 2 Chrome versions",
  "last 2 Firefox versions",
  "last 2 Opera versions",
  "last 2 Edge versions"
]}),
          require("css-mqpacker")({
            sort: true
          })
        ]
      },
      style: {src: "css/*.css"}
    },
     watch: {
       style: {
         files: ["less/**/*.less"],
         tasks: ["less", "postcss", "csso"]
       }
     },
     browserSync: {
              server: {
                bsFiles: {
                    src: ["*.html", "css/*.css"]
                           },
                 options: {
                    server: ".",
                    watchTask: true
    }
  }
},
    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "css/style.min.css": ["css/style.css"]
        }
      }
    },
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["img/**/*.{png,jpg,gif}"]
        }]
      }
    },
    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
      },
      symbols: {
        files: {
          "img/symbols.svg": ["img/icons/*.svg"]
        }
      }
    },
    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ["img/icons/.svg"]
        }]
      }
    }
  });
  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("symbols", ["svgmin", "svgstore"]);
  grunt.registerTask("build", [
    "less",
    "postcss",
    "csso",
    "imagemin"
  ]);
};
