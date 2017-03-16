/*eslint-env jquery*/
/*eslint no-console:0*/
/*global settings*/
/*global Handlebars*/

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
        }; // set badge
        if (unit.earnedBadge == false)
            unitContext.achieved = 'hidden';


        $('#gamificationMuseum').append(Handlebars.templates.unit(unitContext));


        // LOOP THROUGH DAYS
        unit.days.forEach(function (day, j) {
            var electiveArrow = day.elective.earned / day.elective.possible * 331 - 3,
                prepBar = day.prep.earned / day.prep.possible * 445 - 3;

            //Ensure width will not be a negative value
            if (electiveArrow < 0)
                electiveArrow = 0;
            if (prepBar < 0)
                prepBar = 0;

            dayContext = {
                preparation: settings.greenBarDefaultTitle.toUpperCase(),
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
                electiveArrow: electiveArrow,
                electiveBarHeader: settings.blueBarHeader.toUpperCase()
            };

            //set prep header to participation
            if (day.title.toUpperCase() === settings.unitAssignmentHeader.toUpperCase()) {
                dayContext.preparation = settings.greenBarUnitTitle.toUpperCase();
            }

            // set badge hidden or visible
            if (j == 0) {
                dayContext.achieved = 'hidden';
                dayContext.notAchieved = 'hidden';
            } else if (day.badge == false)
                dayContext.achieved = 'hidden';

            $('#gamificationMuseum').append(Handlebars.templates.day(dayContext));
        });

    });
}
