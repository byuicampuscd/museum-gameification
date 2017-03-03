/*eslint-env jquery*/
/*eslint no-console:0*/
console.log(testCourse);


// declare & set context objects
var overallContext = {
    overallEarned: testCourse.overall.overallEarned,
    overallPossible: testCourse.overall.overallPossible,
    passing: testCourse.overall.passingValue,
    barWidth: testCourse.overall.overallEarned / testCourse.overall.overallPossible * 1028,
    arrow: ((testCourse.overall.overallEarned / testCourse.overall.overallPossible * 1028) - 4)
};

//append pre-compiled template to i#gamificationWidget
$('#gamificationWidget').append(Handlebars.templates.overall(overallContext));
