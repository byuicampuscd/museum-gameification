# Museum Gamefication Notes #

This was developed for Devan Barker (campus). It has been used in FDWLD & FDHUM courses taught by him. It includes a widget displaying a students overall grade and a student progress page which is essentially a custom UI for the gradebook. It also includes an interactive map, which was also used in these courses (hence the 'map' folder).


##

This course object is created by courseData.js (who uses valence.js to pull information from the course) and handed to generate.js OR generateWidget.js in order to create the widget or student progress page as appropriate.

``` js
var testCourse = {
    "overall": {
        "overallPossible": null, // data.getfinalCalculatedGrade().pointsDenominator
        "overallEarned": null, // data.getfinalCalculatedGrade().pointsNumerator
        "passingValue": null // percentage * overallPossible
    },
    "units": [{
        "title": "", // data.getCategories[i].catName
        "earnedBadge": null, // if requirements met set to true
        "unitPossible": null, // all cat maxPoints until next unit
        "unitEarned": null, // all cat earnedPoints until next unit
        "days": [{
            "title": "", // data.getCategories[i].catName – ex: “unit 1 day1”
            "prep": { // if grade name is prep
                "earned": null, // data.getGrades[i].pointsNumerator
                "possible": null // data.getGrades[i].maxPoints
            },
            "elective": { // if grade name elective
                "earned": null, // data.getGrades[i].pointsNumerator
                "possible": null, // data.getGrades[i].maxPoints
            },
            "badge": null, // (if requirements met set to true),
            "dayPossible": null, // (maxPoints from elective and prep),
            "dayEarned": null // (pointsNumerator from elective and prep)
        }]
    }]
}
```
