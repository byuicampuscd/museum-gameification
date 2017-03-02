/*eslint-env node*/
/*eslint no-console:0*/

//mainish
valence.run(function (err, data) {
    console.log("data:", data);

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
    }

});

/**********************************************************
 * function: makeOverallObj
 * inputs: 
 *       testCourse: object
 *       data: object from valence
 * outputs: none
 **********************************************************/
function makeOverallObj(testCourse, data) {

    //make overall variables
    var op = data.getFinalCalculatedGrade().pointsDenominator;
    console.log("Final grade:", data.getFinalCalculatedGrade());

    var oe = data.getFinalCalculatedGrade().pointsNumerator;

    var passingGradePercentage = .7;

    //set test courses overall with variables
    testCourse.overall = {
        "overallPossible": op,
        "overallEarned": oe,
        "passingValue": passingGradePercentage * op
    };
}

/**********************************************************
 * function: makeUnitsArray
 * inputs: 
 *       testCourse: object
 *       data: object from valence
 * outputs: none
 **********************************************************/
function makeUnitsArray(testCourse, data) {

    var categories = data.getCategories();
    var days = []; //categories that are days

    //need to do for all units
    //make unit array
    var unitArray = [makeUnitObj(categories[0], days)];

    //set test courses units with made unit array
    testCourse.units = unitArray;

}

/**********************************************************
 * function: makeUnitObj
 * inputs: 
 *       category: category object
 *       days: array of category objects
 * outputs: unit object
 **********************************************************/
function makeUnitObj(category, days) {

    //make days array
    var daysArray = [];

    //fill days array
    for (var i = 0; i < days.length; i++) {
        daysArray[i] = makeDayObj(days[i]);
    }

    //make unit
    return unit = {
        "title": category.catName,
        "earnedBadge": false,
        "unitPossible": category.maxPoints,
        "unitEarned": null, //not sure how to fill variable
        "days": daysArray
    };
}

/**********************************************************
 * function: makeDayObj
 * inputs: 
 *       category: category object
 * outputs: day object
 **********************************************************/
function makeDayObj(category) {

    return day = {
        "title": "Ohio",
        "prep": {
            "earned": 5,
            "possible": 19
        },
        "elective": {
            "earned": 0,
            "possible": 10
        },
        "badge": false,
        "dayPossible": 21,
        "dayEarned": 24
    }
}
