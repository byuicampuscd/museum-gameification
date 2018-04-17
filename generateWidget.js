/*eslint-env jquery*/
/*eslint no-console:0, no-undef:1*/

url = document.getElementById('loveMuffin').href;

// declare & set context objects
function generateWidget(course) {
    var overallContext = {
        courseTitle: settings.courseTitle,
        courseCode: settings.courseCode.toUpperCase(),
        studentProgressURL: url,
        overallEarned: course.overall.overallEarned,
        overallPossible: course.overall.overallPossible,
        barWidth: course.overall.overallEarned / course.overall.overallPossible * 1028,
        arrow: ((course.overall.overallEarned / course.overall.overallPossible * 1028) - 4)
    };

    //append pre-compiled template to i#gamificationWidget
    $('#gamificationWidget').append(Handlebars.templates.widget(overallContext));
}
