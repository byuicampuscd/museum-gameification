/*eslint-env jquery*/
/*eslint no-console:0*/
//console.log(course);

function generate(course) {
    // declare & set context objects
    var overallContext = {
            overallEarned: course.overall.overallEarned,
            overallPossible: course.overall.overallPossible,
            barWidth: course.overall.overallEarned / course.overall.overallPossible * 1028,
            arrow: ((course.overall.overallEarned / course.overall.overallPossible * 1028) - 4)
        },
        unitContext = {},
        dayContext = [];


    // append overall section to #gamificationMuseum
    $('#gamificationMuseum').append(Handlebars.templates.overall(overallContext));


    // LOOP THROUGH UNITS
    course.units.forEach(function (unit, i) {
        unitContext = {
            unitNumber: i + 1,
            unitTitle: unit.title,
            unitEarned: unit.unitEarned,
            unitPossible: unit.unitPossible
        };
        if (unit.earnedBadge == false)
            unitContext.achieved = 'hidden';


        $('#gamificationMuseum').append(Handlebars.templates.unit(unitContext));


        // LOOP THROUGH DAYS
        unit.days.forEach(function (day, j) {
            var electiveArrow = day.elective.earned / day.elective.possible * 331 - 3,
                prepBar = day.prep.earned / day.prep.possible * 445 - 3;

            if (electiveArrow < 0)
                electiveArrow = 0;
            if (prepBar < 0)
                prepBar = 0;

            dayContext = {
                unitNumber: unitContext.unitNumber,
                dayTitle: day.title.toUpperCase(),
                dayEarned: day.dayEarned,
                dayPossible: day.dayPossible,
                prepEarned: day.prep.earned,
                prepPossible: day.prep.possible,
                prepBarWidth: prepBar,
                prepArrow: day.prep.earned / day.prep.possible * 445 - 3,
                electiveEarned: day.elective.earned,
                electiveBarWidth: day.elective.earned / day.elective.possible * 331,
                electiveArrow: electiveArrow
            };
            if (j == 0) {
                dayContext.achieved = 'hidden';
                dayContext.notAchieved = 'hidden';
            } else if (day.badge == false)
                dayContext.achieved = 'hidden';

            $('#gamificationMuseum').append(Handlebars.templates.day(dayContext));
        });

    });
}
