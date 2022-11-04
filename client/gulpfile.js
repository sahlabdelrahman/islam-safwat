/** @format */

const gulp = require("gulp");
const gulpSass = require("gulp-sass");
const sass = gulpSass(require("sass"));
const inlinesource = require("gulp-inline-source");
const replace = require("gulp-replace");

gulp.task("watch", async function () {
  gulp.watch(
    ["src/components/**/*.scss", "src/pages/**/*.scss", "src/styles/*.scss"],
    async function () {
      gulp
        .src([
          "src/components/**/*.scss",
          "src/pages/**/*.scss",
          "src/styles/*.scss",
        ])
        .pipe(sass())
        .pipe(gulp.dest("src/css"));
    }
  );
});

gulp.task("default", () => {
  return gulp
    .src("./build/*.html")
    .pipe(replace('.js"></script>', '.js" inline></script>'))
    .pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
    .pipe(
      inlinesource({
        compress: false,
        ignore: ["png"],
      })
    )
    .pipe(gulp.dest("./build"));
});
