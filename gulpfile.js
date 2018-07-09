const {exec} = require("child_process")
    , gulp = require('gulp'),
    notify = require('gulp-notify');

gulp.task('default',()=>{   
    console.log("Init watch");
});
    
gulp.watch('./src/**',()=>{
    console.log("Changes:");
    exec('git diff --name-only',(error, stdout, stderr)=>{
        if(stdout.split("\n").length){
            gulp.src('index.js').pipe(notify("Init commit"));
            exec(`git add . && git commit -m 'UPDATE: ${stdout}' && git push`);
            console.log(stdout);

        }
    });

});
