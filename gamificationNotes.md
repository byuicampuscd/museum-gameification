## Museum Gamification Notes – Greer Galloway

'''javascript
var testCourse = {
    "overall": {
        "overallPossible":  data.getfinalCalculatedGrade().pointsDenominator//(add maxPoints?),
        "overallEarned": data.getfinalCalculatedGrade().pointsNumerator,
        "passingValue": percentage * overallPossible
    },
    "units": [
        {
            "title": data.getCategories[i].catName,
            "earnedBadge": (if requirements met set to true),
            "unitPossible": (all cat maxPoints until next unit),
            "unitEarned": (all cat earnedPoints until next unit),
            "days": [
                {
                    "title": data.getCategories[i].catName – ex: “unit 1 day1”
                    "prep": { //if grade name is prep
                        "earned": data.getGrades[i].pointsNumerator,
                        "possible": data.getGrades[i].maxPoints
                    },
                    "elective": {//if grade name elective
                        "earned": data.getGrades[i].pointsNumerator,
                        "possible": data.getGrades[i].maxPoints
                    },
                    "badge": (if requirements met set to true),
                    "dayPossible": (maxPoints from elective and prep),
                    "dayEarned": (pointsNumerator from elective and prep)
      }, . . .   
'''