/*eslint-env jquery*/
/*eslint no-console:0*/

console.log("IN SCOPE", loveMuffin);


// declare & set context objects
function generateWidget(course) {
    var overallContext = {
        studentProgressURL: loveMuffin,
        overallEarned: course.overall.overallEarned,
        overallPossible: course.overall.overallPossible,
        passing: course.overall.passingValue,
        barWidth: course.overall.overallEarned / course.overall.overallPossible * 1028,
        arrow: ((course.overall.overallEarned / course.overall.overallPossible * 1028) - 4)
    };

    //append pre-compiled template to i#gamificationWidget
    $('#gamificationWidget').append(Handlebars.templates.widget(overallContext));
}
