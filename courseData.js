/*eslint-env node*/
/*eslint no-console:0*/
/*global valence*/
/*global settings*/

settings.overall = new RegExp(settings.overall);
settings.badge = new RegExp(settings.badge);
settings.preparation = new RegExp(settings.preparation);
settings.elective = new RegExp(settings.elective);

/************************ TO DO
 create JSON settings file
 use regEx to look for keys
 put it in his course! search the gradebook for his format
**************************/
valence.run(function (err, data) {

    //error check and handle
    if (err) {
        return console.log("Error: " + err);
    } else {
        //start building

        //test course object
        var testCourse = {};

        //overall object and units array
        makeOverallObj(testCourse, data);
        makeUnitsArray(testCourse, data);

        console.log("Test course:", testCourse);

        // OR Check if generateWidget is null (or generate)
        try {
            generateWidget(testCourse);
        } catch (err) {
            console.log(err);
        }
        try {
            generate(testCourse);
        } catch (err) {
            console.log(err);
        }
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

    //make overall variables
    var op = data.getFinalCalculatedGrade().pointsDenominator;

    var oe = data.getFinalCalculatedGrade().pointsNumerator;

    var passingGradePercentage = .7;

    //set test courses overall with variables
    testCourse.overall = {
        "overallPossible": op, //overallSums.overallPoss
        "overallEarned": Math.round(oe), //overallSums.overallEarned
        "passingValue": Math.round(passingGradePercentage * op) //overallSums.overallPoss * passingGradePercentage
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

    //all categories array
    var categories = data.getCategories();

    //unit arrays
    var unitCats = [],
        unitObjs = [];

    //for number of units
    var unitNum = 0;

    //finds number of units
    for (var i = 0; i < categories.length; i++) {
        if (settings.overall.test(categories[i].shortName)) {
            unitNum++;
        }
    }

    //makes array of arrays where each subarray holds the categories for a unit 
    for (i = 0; i < unitNum; i++) {
        unitCats.push(categories.filter(function (cat) {
            return cat.shortName.substr(1, 1) === ((i + 1) + "");
        }));
    }

    //fill unitObj array with unit objects
    for (i = 0; i < unitCats.length; i++) {
        unitObjs.push(makeUnitObj(data, unitCats[i]));
    }

    //set test courses units with made unit array
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

    //make grades array
    var grades = data.getGrades();

    //vars to help determine badge
    var badgeGrade = {},
        passPercent = settings.badgePassPercent;

    //make dayObjs array
    var dayObjs = [],
        unitHead = {};

    //pull out overall unit info
    for (var i = 0; i < days.length; i++) {
        if (settings.overall.test(days[i].shortName)) {
            unitHead = days[i];
        }
    }

    //sorts days in order
    days.sort(function (a, b) {
        a = getDayNum(a.shortName);
        b = getDayNum(b.shortName);
        return a - b;
    })

    //fill dayObjs array with day objects
    for (i = 0; i < days.length; i++) {
        dayObjs.push(makeDayObj(data, days[i]));
    }

    //makes the overall section name = overall
    dayObjs[0].title = "Section Assignments";

    //sums up unit points (not including overall section)
    var sumsTemplate = {
        unitEarned: 0,
        unitPoss: 0
    };
    var unitSums = dayObjs.reduce(function (totals, day) {
        totals.unitEarned += day.dayEarned;
        totals.unitPoss += day.dayPossible;
        return totals;
    }, sumsTemplate);

    //adds together unit and unit head points to make the total unit points
    var unitPoss = unitSums.unitPoss;
    var unitEarned = unitSums.unitEarned;

    //make and return unit object
    return {
        "title": unitHead.catName,
        "earnedBadge": (badgeGrade.pointsNumerator >= (badgeGrade.maxPoints * passPercent)),
        "unitPossible": unitPoss,
        "unitEarned": unitEarned,
        "days": dayObjs
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

    //make grades array
    var grades = data.getGrades();

    //vars to help determine badge
    var badgeGrade = {},
        passPercent = .7;

    //determine values for prepEarned, prepPoss, totalEarned, and totalPoss 
    var sumsTemplate = {
        prepEarned: 0,
        prepPoss: 0,
        totalEarned: 0,
        totalPoss: 0
    };
    var sums = grades.reduce(function (totals, grade) {

        //if grade is in the passed cat
        if (grade.catID === dayCat.catID) {
            totals.totalEarned += grade.pointsNumerator;
            totals.totalPoss += grade.maxPoints;

            //if that grade is a prep grade
            if (settings.preparation.test(grade.gradeShortName)) {
                totals.prepEarned += grade.pointsNumerator;
                totals.prepPoss += grade.maxPoints;
            }

            //if that grade is a pass-off/badge determining grade
            if (settings.badge.test(grade.gradeShortName)) {
                badgeGrade = grade;
            }
        }
        return totals;
    }, sumsTemplate);

    //round down
    sums.totalEarned = Math.round(sums.totalEarned);
    sums.prepEarned = Math.round(sums.prepEarned);

    //determine values for electiveEarned and electivePoss
    var electiveEarned = sums.totalEarned - sums.prepEarned;
    var electivePoss = sums.totalPoss - sums.prepPoss;

    //make and return day object
    return {
        "title": dayCat.catName,
        "prep": {
            "earned": sums.prepEarned,
            "possible": sums.prepPoss
        },
        "elective": {
            "earned": electiveEarned,
            "possible": electivePoss
        },
        "badge": (badgeGrade.pointsNumerator >= (badgeGrade.maxPoints * passPercent)),
        "dayPossible": sums.totalPoss,
        "dayEarned": sums.totalEarned
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
    // add error handling in case it doesn't find it. or it finds :o....
    var regEx = /r(\d+)/;
    try {
        var searchResults = regEx.exec(str)[1];
    } catch (err) {
        return 0;
    }
    return parseInt(searchResults, 10);
}
