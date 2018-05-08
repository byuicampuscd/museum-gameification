/*eslint-env browser*/
/*global valence, settings, generateWidget, generate*/
'use strict';


settings.overall = new RegExp(settings.overall, 'i');
settings.badge = new RegExp(settings.badge, 'i');
settings.preparation = new RegExp(settings.preparation, 'i');
settings.elective = new RegExp(settings.elective, 'i');

/************************ TO DO
 create JSON settings file
 use regEx to look for keys
 put it in his course! search the gradebook for his format
**************************/
valence.run(function (err, data) {
    if (err) {
        console.error('Error: ' + err);
        return;
    } else {
        /* start building */

        /* course object */
        var course = {};

        /* overall object and units array */
        makeOverallObj(course, data);
        makeUnitsArray(course, data);

        console.log('Test course:', course);

        /* OR Check if generateWidget is null (or generate) */
        try {
            generateWidget(course);
        } catch (err) {console.log('Funciton GenerateWidget not found');}

        try {
            generate(course);
        } catch (err) {console.log('Funciton Generate not found');}
    }
});

/**********************************************************
 * function: makeOverallObj
 * desc: Makes overall object using values from the final 
 *       grade object.
 * inputs: 
 *       testCourse: object
 *       data: object from valence
 * outputs: none
 **********************************************************/
function makeOverallObj(testCourse, data) {

    // make overall variables
    var op = data.getFinalCalculatedGrade().pointsDenominator,
        oe = data.getFinalCalculatedGrade().pointsNumerator;

    // set test courses overall with variables
    testCourse.overall = {
        'overallPossible': op, // overallSums.overallPoss
        'overallEarned': Math.round(oe), // overallSums.overallEarned
    };
}

/**********************************************************
 * function: makeUnitsArray
 * desc: Makes an array of arrays where each subarray holds 
 *       unit info and makes ar array of unit objects.
 * inputs: 
 *       testCourse: object
 *       data: object from valence
 * outputs: none
 **********************************************************/
function makeUnitsArray(testCourse, data) {

    // all categories array
    var categories = data.getCategories();

    var unitObjs = [];

    var units = categories.reduce((accum, category) => {
        if (settings.overall.test(category.shortName)) {
            accum.push([category]);
        }
        return accum;
    }, []);


    // TODO sort by shortName number?

    // fill unitObj array with unit objects
    unitObjs = units.map(unit => {
        // WARNING this should return an Obj with all assignments, but it's not
        return makeUnitObj(data, unit); 
    });

    // set test courses units with made unit array
    testCourse.units = unitObjs;
}

/**********************************************************
 * function: makeUnitObj
 * desc: Sums up the possible points and the earned points 
 *       then makes an array of day objects.
 * inputs: 
 *       category: category object
 *       days: array of category objects last one is section 
 * outputs: unit object
 **********************************************************/
function makeUnitObj(data, days) {

    // WARNING POSSIBLE BUG LOCATION
    
    //  make grades array
    var grades = data.getGrades();

    // vars to help determine badge
    var badgeGrade = {},
        passPercent = settings.exhibitPassPercent;

    // make dayObjs array
    var dayObjs = [],
        unitHead = {};

    // pull out overall unit info
    for (var i = 0; i < days.length; i++) {
        if (settings.overall.test(days[i].shortName)) {
            unitHead = days[i];
        }
    }

    // sorts days in order
    days.sort(function (a, b) {
        a = getDayNum(a.shortName);
        b = getDayNum(b.shortName);
        return a - b;
    });

    // fill dayObjs array with day objects
    for (i = 0; i < days.length; i++) {
        dayObjs.push(makeDayObj(data, days[i]));
    }

    if (dayObjs.length > 0) {
        dayObjs[0].title = settings.unitAssignmentHeader;
    }

    // sums up unit points (not including overall section)
    var sumsTemplate = {
        unitEarned: 0,
        unitPoss: 0
    };
    var unitSums = dayObjs.reduce(function (totals, day) {
        totals.unitEarned += day.dayEarned;
        totals.unitPoss += day.dayPossible;
        return totals;
    }, sumsTemplate);

    // adds together unit and unit head points to make the total unit points
    var unitPoss = unitSums.unitPoss,
        unitEarned = unitSums.unitEarned;

    // set badgeGrade
    grades.forEach(function (grade) {
        if (grade.catID === unitHead.catID) {
            // if that grade is a pass-off/badge determining grade 
            if (settings.badge.test(grade.gradeShortName)) {
                badgeGrade = grade;
            }
        }
    });

    // make and return unit object
    return {
        'title': unitHead.catName,
        'earnedBadge': badgeGrade.pointsNumerator >= badgeGrade.maxPoints * passPercent, //  NOT WORKING! BadgeGrade is empty!!
        'unitPossible': unitPoss,
        'unitEarned': unitEarned,
        'days': dayObjs
    };
}

/**********************************************************
 * function: makedayObj
 * desc: Sums up preperations possible points and preperations 
 *       earned points then uses subtraction to find electives 
 *       points.
 * inputs: 
 *       dayCat: category object
 * outputs: day object
 **********************************************************/
function makeDayObj(data, dayCat) {

    // WARNING POSSIBLE BUG LOCATION
    
    // make grades array
    var grades = data.getGrades();

    // vars to help determine badge
    var badgeGrade = {},
        passPercent = settings.roomPassPercent;

    // determine values for prepEarned, prepPoss, totalEarned, and totalPoss 
    var sumsTemplate = {
        prepEarned: 0,
        prepPoss: 0,
        totalEarned: 0,
        totalPoss: 0
    };
    var sums = grades.reduce(function (totals, grade) {

        // if grade is in the passed cat
        if (grade.catID === dayCat.catID) {
            totals.totalEarned += grade.pointsNumerator;
            totals.totalPoss += grade.maxPoints;

            // if that grade is a prep grade
            if (settings.preparation.test(grade.gradeShortName)) {
                totals.prepEarned += grade.pointsNumerator;
                totals.prepPoss += grade.maxPoints;
            }

            // if that grade is a pass-off/badge determining grade
            if (settings.badge.test(grade.gradeShortName)) {
                badgeGrade = grade;
            }
        }
        return totals;
    }, sumsTemplate);

    // round down
    sums.totalEarned = Math.round(sums.totalEarned);
    sums.prepEarned = Math.round(sums.prepEarned);

    // determine values for electiveEarned and electivePoss
    var electiveEarned = sums.totalEarned - sums.prepEarned;
    var electivePoss = sums.totalPoss - sums.prepPoss;

    // make and return day object
    return {
        'title': dayCat.catName,
        'prep': {
            'earned': sums.prepEarned,
            'possible': sums.prepPoss
        },
        'elective': {
            'earned': electiveEarned,
            'possible': electivePoss
        },
        'badge': badgeGrade.pointsNumerator >= badgeGrade.maxPoints * passPercent,
        'dayPossible': sums.totalPoss,
        'dayEarned': sums.totalEarned
    };
}

/**********************************************************
 * function: getDayNum
 * desc: Pulls day number from the day short name and returns
 *       it as an int.
 * inputs: 
 *       str: a day short name
 * outputs: day number
 **********************************************************/
function getDayNum(str) {
    //  add error handling in case it doesn't find it. or it finds :o....
    var regEx = /r(\d+)/i;
    try {
        var searchResults = regEx.exec(str)[1];
    } catch (err) {
        return 0;
    }
    return parseInt(searchResults, 10);
}