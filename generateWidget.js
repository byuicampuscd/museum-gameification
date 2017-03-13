/*eslint-env jquery*/
/*eslint no-console:0*/

// Convert Love Muffin to orgUnit
var muffinTest = /enforced\/(\d+)/;
loveMuffin = muffinTest.exec(loveMuffin)[1];

var url = 'https://byui.brightspace.com/d2l/le/content/' + loveMuffin + '/viewContent/3507567/View'; // how to make file id dynamic?

//console.log("DA URL", url);

// declare & set context objects
function generateWidget(course) {
    var overallContext = {
        studentProgressURL: url,
        overallEarned: course.overall.overallEarned,
        overallPossible: course.overall.overallPossible,
        passing: course.overall.passingValue,
        barWidth: course.overall.overallEarned / course.overall.overallPossible * 1028,
        arrow: ((course.overall.overallEarned / course.overall.overallPossible * 1028) - 4)
    };

    //append pre-compiled template to i#gamificationWidget
    $('#gamificationWidget').append(Handlebars.templates.widget(overallContext));


}
