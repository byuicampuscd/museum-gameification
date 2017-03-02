/*eslint-env node*/
/*eslint no-console:0*/

//mainish
valence.run(function (err, data) {
    console.log("data:", data);
    console.log("categories:", data.getCategories());
    console.log("grades:", data.getGrades());

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
 * desc: Makes an array of arrays where each subarray holds 
 *       unit info and makes ar array of unit objects.
 * inputs: 
 *       testCourse: object
 *       data: object from valence
 * outputs: none
 **********************************************************/
function makeUnitsArray(testCourse, data) {

    var categories = data.getCategories();
    var days = []; //need to break up into array of arrays

    //need to do for all units
    //make unit array
    var unitArray = [makeUnitObj(categories[0], days)];

    //set test courses units with made unit array
    testCourse.units = unitArray;

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
    
    //make dayObjs array
    var dayObjs = [days.length];
    for (var i = 0; i < days.length; i++) {
        dayObjs[i] = makeDayObj(data, days[i]);
    }
    
    //make counter object
    var counter = {};
    
    //sums up total unit points
    var totalUnitPoints = dayObjs.reduce(function(sum, day) {             
        counter.earned = sum + day.daysEarned; 
        counter.possible = sum + day.daysPossible;
        return counter;
    })

    //make unit object
    return unit = {
        "title": days[days.length - 1].catName,
        "earnedBadge": false,
        "unitPossible": totalUnitPoints.possible,
        "unitEarned": totalUnitPoints.earned, 
        "days": dayObjs
    };
}

/**********************************************************
 * function: makeDayObj
 * desc: Sums up preperations possible points and preperations 
 *       earned points then uses subtraction to find electives 
 *       points.
 * inputs: 
 *       dayCat: category object
 * outputs: day object
 **********************************************************/
function makeDayObj(data, dayCat) {

    //add up all of preps points
    var grades = data.getGrades();
    
    //make counter object
    var counter = {};
    
    //determine total day points
    var totalDayPoints = grades.reduce(function(sum, grade) {
        
        if (grade.catID === dayCat.catID) {
            counter.earned = sum.earned + grade.pointsNumerator;
            counter.possible = sum.possible + grade.pointsDenominator;
        }    
        return counter;
    });
    
    //reset counter
    counter.earned = 0;
    counter.possible = 0;
    
    //determine preps points
    var prep = grades.reduce(function(sum, grade) {
        
        if (grade.catID === dayCat.catID && grade.shortName[0] === "p") {
            counter.earned = sum.earned + grade.pointsNumerator;
            counter.possible = sum.possible + grade.pointsDenominator;
        }    
        return counter;
    });
    
    //determine electives points
    var elective = {};
    elective.earned = totalDayPoints.earned - prep.earned;
    elective.possible = totalDayPoints.possible - prep.possible;
     
    //make day object
    return day = {
        "title": dayCat.catName,
        "prep": {
            "earned": prep.earned,
            "possible": prep.possible
        },
        "elective": {
            "earned": elective.earned,
            "possible": elective.possible
        },
        "badge": false,
        "dayPossible": totalDayPoints.possible,
        "dayEarned": totalDayPoints.earned
    };
}
