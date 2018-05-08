### Museum Gamefication Notes

Guesses for the possible values in the course object:

```javascript
var testCourse = {

        "overall": {
            "overallPossible": null, //data.getfinalCalculatedGrade().pointsDenominator
            "overallEarned": null, //data.getfinalCalculatedGrade().pointsNumerator
            "passingValue": null //percentage * overallPossible
        },
        "units": [
            {
                "title": "", //data.getCategories[i].catName
                "earnedBadge": null, //if requirements met set to true
                "unitPossible": null, //all cat maxPoints until next unit
                "unitEarned": null, //all cat earnedPoints until next unit
                "days": [
                    {
                        "title": "", //data.getCategories[i].catName – ex: “unit 1 day1”
                        "prep": { //if grade name is prep
                            "earned": null, //data.getGrades[i].pointsNumerator
                            "possible": null //data.getGrades[i].maxPoints
                        },
                        "elective": {//if grade name elective
                            "earned": null, //data.getGrades[i].pointsNumerator
                            "possible": null, //data.getGrades[i].maxPoints
                        },
                        "badge": null, //(if requirements met set to true),
                        "dayPossible": null, //(maxPoints from elective and prep),
                        "dayEarned": null //(pointsNumerator from elective and prep)
                    }, . . .   
                    
            }, . . .
            
}
```
