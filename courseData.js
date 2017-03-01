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
function makeUnitObj(category, days) {
    
    //make dayObjs array
    var dayObjs = [days.length];
    for (var i = 0; i < days.length; i++) {
        dayObjs[i] = makeDayObj(days[i]);
    }
    
    //sums up the possible points
    var up = dayObjs.reduce(function(sum, day) {
     
        return sum + day.daysPossible;     
    })
    
    //sums up the earned points
    var ue = dayObjs.reduce(function(sum, day) {
     
        return sum + day.daysEarned;     
    })

    //make unit object
    return unit = {
        "title": category.catName,
        "earnedBadge": false,
        "unitPossible": up,
        "unitEarned": ue, 
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
function makeDayObj(dayCat) {

    //add up all of preps points
    
    /*var po = dayCat.catGrades.reduce(function(sum, grade) {
        
        var points = {};
        
        if (grade.shortName[0] === "p") {
            points.earned = sum + grade.pointsNumerator;
            points.possible = sum + grade.pointsDenominator;
        }       
    })*/
    
     /*var pe = dayCat.catGrades.reduce(function(sum, grade) {
     
        if (grade.shortName[0] === "p") {
            return = sum + grade.pointsNumerator;
        }       
    })
    
    var pp = dayCat.catGrades.reduce(function(sum, grade) {
     
        if (grade.shortName[0] === "p") {
            return = sum + grade.pointsDenominator;
        }       
    })*/
     
    //make day object
    return day = {
        "title": dayCat.catName,
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
    };
}
