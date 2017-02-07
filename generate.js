/*eslint-env jquery*/
/*eslint no-console:0*/
console.log(testCourse);

// pull in the templates
var overallTemplate = $('#overall').html(),
    unitTemplate = $('#unit').html(),
    dayTemplate = $('#day').html();


// compile templates
var overallScript = Handlebars.compile(overallTemplate),
    unitScript = Handlebars.compile(unitTemplate),
    dayScript = Handlebars.compile(dayTemplate);

// declare & set context objects
var overallContext = {
        overallEarned: testCourse[0].overall.overallEarned,
        overallPossible: testCourse[0].overall.overallPossible,
        passing: testCourse[0].overall.passingValue,
        barWidth: testCourse[0].overall.overallEarned / testCourse[0].overall.overallPossible * 1028,
        arrow: ((testCourse[0].overall.overallEarned / testCourse[0].overall.overallPossible * 1028) - 4)
    },
    unitContext = {},
    dayContext = [];

// not really sure what this does.... don't touch it
var overallC = overallScript(overallContext),
    unitC,
    dayC;

// append overall section to #container
$('#container').append(overallC);

// loop through the units
testCourse[0].units.forEach(function (unit, i) {
    unitContext = {
        unitNumber: i + 1,
        unitTitle: unit.title,
        unitBadge: unit.earnedBadge,
        unitEarned: unit.unitEarned,
        unitPossible: unit.unitPossible
    };
    unitC = unitScript(unitContext);
    $('#container').append(unitC);


    // loop through days
    unit.days.forEach(function (day, j) {
        dayContext = {
            unitNumber: unitContext.unitNumber,
            dayTitle: day.title.toUpperCase(),
            badge: day.badge,
            dayEarned: day.dayEarned,
            dayPossible: day.dayPossible,
            prepEarned: day.prep.earned,
            prepPossible: day.prep.possible,
            prepBarWidth: day.prep.earned / day.prep.possible * 445 - 3,
            prepArrow: day.prep.earned / day.prep.possible * 445 - 3,
            electiveEarned: day.elective.earned,
            electiveBarWidth: day.elective.earned / day.elective.possible * 331,
            electiveArrow: day.elective.earned / day.elective.possible * 331 - 3
        };
        dayC = dayScript(dayContext);
        $('#container').append(dayC);
    })

})
