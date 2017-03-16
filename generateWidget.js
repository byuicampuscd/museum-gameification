/*eslint-env jquery*/
/*eslint no-console:0*/

url = document.getElementById('loveMuffin').href;
console.clear();
console.log("DA URL", url);

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

    //FOR SOME REASON THE URL BREAKS AFTER BEING INSERTED INTO THE PAGE

    //append pre-compiled template to i#gamificationWidget
    $('#gamificationWidget').append(Handlebars.templates.widget(overallContext));


}
