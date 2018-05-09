# Museum Gamefication Notes #

This was developed for Devan Barker (campus) and is specific to the D2L LMS. It has been used in FDWLD & FDHUM courses taught by him. It includes a widget displaying a students overall grade and a student progress page which is essentially a custom UI for the gradebook. It also includes an interactive map, which was also used in these courses (hence the 'map' folder).

## Widget & Student Progress ##

These pages are generated dynamically using handlebars.js. The object listed below is an example of  the object that needs to be created in order to correctly generate these views. Setting.js contains options to change the UI (Ex: Change the name of the course on the UI).

This tool requires a specific setup in the gradebook. The D2L short names must end with falgs set in the settings file so that courseData knows how to categorize & sort the grade items. Each item that is to show up in the student progress ui must be created as a category in Brightspace. Also, the final grade must be a formula adding all of the points in the gradebook. The final grade must be published for these pages to work.

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

## Interactive Map ##

Originally we created a div containing links to other pages in D2L, which was placed over the map. The map was an external tool that was hard coded to one section of a course, which made moving it from one semester to another was a nightmare. This overlay pulled out all the D2L links so they would update automatically. This version used generateOverlays.js to make buttons and tooltips (generated with tooltipster library) interactive.

This repo also contains the proof-of-concept for the Canvas LMS. This version was designed with Online in mind, and uses SVG instead of an external tool. It is less interactive than the original D2L version, but more responsive, accessible, and stable. generateOverlays has been removed from this version along with the tooltipster library.