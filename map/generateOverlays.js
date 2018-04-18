/* global $ */

var links = [{
    selector: 'map',
    description: 'Civilizations Map',
    image: 'civilizationsMap.jpg',
    filePath: 'Civilizations%20Map.html'
}, {
    selector: 'bookcase',
    description: 'Bookcase',
    image: 'books.jpg',
    filePath: 'Bookcase.html'
}, {
    selector: 'divineComedy',
    description: 'Dante\'s Divine Comedy',
    image: 'dantesDivineComedy.jpg',
    filePath: 'Divine%20Comedy.html'
}, {
    selector: 'inferno',
    description: 'Inferno',
    image: 'inferno.jpg',
    filePath: 'inferno.html'
}, {
    selector: 'purgatorio',
    description: 'Purgatorio',
    image: 'purgatorio.jpg',
    filePath: 'Purgatorio.html'
}, {
    selector: 'paradiso',
    description: 'paradiso',
    image: 'paradiso.jpg',
    filePath: 'Paradiso.html'
}, {
    selector: 'visitorsCenter',
    description: 'Visitor\'s Center',
    image: 'visitorCenter.jpg',
    filePath: 'visitorsCenter.html'
}, {
    selector: 'courseThemes',
    description: 'Rooms 1-3',
    image: 'courseThemes.jpg',
    filePath: 'Course%20Themes.html'
}, {
    selector: 'courseSkills',
    description: 'Rooms 4-6',
    image: 'courseSkills.jpg',
    filePath: 'Course%20Skills.html'
}, {
    selector: 'room1',
    description: 'Room 1',
    image: 'room1internal.jpg',
    filePath: 'room1.html'
}, {
    selector: 'room2',
    description: 'Room 2',
    image: 'room2internal.jpg',
    filePath: 'room2.html'
}, {
    selector: 'room3',
    description: 'Room 3',
    image: 'room3internal.jpg',
    filePath: 'Room%203%20Internal.html'
}, {
    selector: 'room4',
    description: 'Room 4',
    image: 'room4internal.jpg',
    filePath: 'Room%204%20Internal.HTML'
}, {
    selector: 'room5',
    description: 'Room 5',
    image: 'room5internal.jpg',
    filePath: 'Room%205%20Internal.html'
}, {
    selector: 'room6',
    description: 'Room 6',
    image: 'room6internal.jpg',
    filePath: 'Room%206%20Internal.html'
}, {
    selector: 'africa',
    description: 'Africa',
    image: '', //no img
    filePath: 'Africa.html'
}, {
    selector: 'medievalEurope',
    description: 'Medieval Europe',
    image: 'medievalEurope.jpg',
    filePath: 'Medieval%20Europe.html'
}, {
    selector: 'rome',
    description: 'Rome',
    image: 'rome.jpg',
    filePath: 'Rome.html'
}, {
    selector: 'greece',
    description: 'Greece',
    image: 'greece.jpg',
    filePath: 'Greece.html'
}, {
    selector: 'egypt',
    description: 'Egypt',
    image: 'egyptGeo.jpg',
    filePath: 'Egypt%20Geo.html'
}, {
    selector: 'israel',
    description: 'Israel',
    image: 'israel.jpg',
    filePath: 'Post-exilic%20Israel.html'
}, {
    selector: 'mesopotamia',
    description: 'Mesopotamia',
    image: 'mesopotamia.jpg',
    filePath: 'Mesopotamia.html'
}, {
    selector: 'islam',
    description: 'Islam',
    image: 'islam.jpg',
    filePath: 'Islam.html'
}, {
    selector: 'india',
    description: 'India',
    image: 'indiaOverview.jpg',
    filePath: 'India%20History.html'
}, {
    selector: 'china',
    description: 'China',
    image: 'china.jpg',
    filePath: 'Ancient%20China.html'
}, {
    selector: 'japan',
    description: 'Japan',
    image: '', //no ing
    filePath: 'Japan.html'
}, {
    selector: 'mesoamerica',
    description: 'Central and South America',
    image: 'mesoamerica.jpg',
    filePath: 'Central%20and%20South%20America.html'
}, {
    selector: 'mississippian',
    description: 'Mississippian',
    image: '', // no img
    filePath: 'Mississippian.html'
}, {
    selector: 'medievalEuropeanHistory',
    description: 'Medieval European History I',
    image: 'medievalEuropeanHistory.jpg',
    filePath: 'Medieval%20European%20History%20I.html'
}, {
    selector: 'medievalEuropeanHistory2',
    description: 'Medieval European History II',
    image: 'medievalEuropeanHistory2.jpg',
    filePath: 'Medieval%20European%20History%20II.html'
}, {
    selector: 'catholicism',
    description: 'Catholicism',
    image: 'catholicism.jpg',
    filePath: 'Catholicism.html'
}, {
    selector: 'gothicArchitecture',
    description: 'Gothic Architecture',
    image: 'gothicArchitecture.jpg',
    filePath: 'Gothic%20Architecture.html'
}, {
    selector: 'foundingOfRome',
    description: 'Founding Of Rome',
    image: 'foundingOfRome.jpg',
    filePath: 'Founding%20of%20Rome.html'
}, {
    selector: 'romanRepublic',
    description: 'Roman Republic',
    image: 'romanRepublic.png',
    filePath: 'Roman%20Republic.html'
}, {
    selector: 'romanEmpire',
    description: 'Roman Empire',
    image: 'romanEmpire.jpg',
    filePath: 'Roman%20Empire.html'
}, {
    selector: 'christianRome',
    description: 'Christian Rome',
    image: 'christianRome.jpg',
    filePath: 'Christian%20Rome.html'
}, {
    selector: 'greekHistory',
    description: 'Greek History',
    image: 'greekHistory.jpg',
    filePath: 'Greek%20History.html'
}, {
    selector: 'greekReligion',
    description: 'Greek Religion',
    image: 'greekReligion.jpg',
    filePath: 'Greek%20Religion.html'
}, {
    selector: 'greekMusicAndArt',
    description: 'Greek Music and Art',
    image: 'greekMusicAndArt.jpg',
    filePath: 'Greek%20Music%20and%20Art.html'
}, {
    selector: 'greekPhilosophy',
    description: 'Greek Philosophy',
    image: 'greekPhilosophy.jpg',
    filePath: 'Greek%20Philosophy.html'
}, {
    selector: 'oedipus',
    description: 'Oedipus',
    image: 'oedipus.jpg',
    filePath: 'Oedipus.html'
}, {
    selector: 'egyptMap',
    description: 'Map of Egypt',
    image: 'egyptMap.jpg',
    filePath: 'Egypt%20Map.html'
}, {
    selector: 'gilgamesh',
    description: 'Explore the Epic of Gilgamesh',
    image: 'epicOfGilgamesh.jpg',
    filePath: 'Mesopotamia%20and%20Gilgamesh.html'
}, {
    selector: 'islamI',
    description: 'Founding of Islam',
    image: 'foundingOfIslam.jpg',
    filePath: 'Islam%20II.html'
}, {
    selector: 'islamII',
    description: 'Umyyads',
    image: 'umyyads.jpg',
    filePath: 'Islam%20I.html'
}, {
    selector: 'islamIII',
    description: 'Abbasids',
    image: 'abbasids.jpg',
    filePath: 'Islam%20III.html'
}, {
    selector: 'indianHistory',
    description: 'Indian History',
    image: 'indiaHistory.jpg',
    filePath: 'Hinduism.html'
}, {
    selector: 'hinduism',
    description: 'Hinduism',
    image: 'hinduism.jpg',
    filePath: 'Hinduism1.html'
}, {
    selector: 'buddhism',
    description: 'Buddhism',
    image: 'buddhism.jpg',
    filePath: 'Buddhism.html'
}, {
    selector: 'incas',
    description: 'Incas',
    image: 'incas.jpg',
    filePath: 'Incas.html'
}, {
    selector: 'aztecs',
    description: 'Aztecs',
    image: 'aztecs.jpg',
    filePath: 'Aztecs.html'
}, {
    selector: 'mayans',
    description: 'Mayans',
    image: 'mayans.jpg',
    filePath: 'Mayan.html'
}, {
    selector: 'iLearn',
    description: 'Return to Course Home Page',
    image: 'visitorCenter.jpg',
    homePage: true,
    filePath: ''
}];

// ERROR a single bad filePath will stop the background image from loading
// ERROR a missing IMAGE property will do the same.... poop.


/* adds an event listener that makes all custom icons appear on hover
and vanish off hover */
function toggleVisibility() {
    $('.wrapper, .button').hover(function () {
        document.querySelectorAll('g#buttons>a>g').forEach(ele => {
            ele.style.opacity = 1;
        });
    }, function () {
        document.querySelectorAll('g#buttons>a>g').forEach(ele => {
            ele.style.opacity = 0;
        });
    });
}

$(document).ready(function () {
    toggleVisibility();

    /* START HERE */
    links.forEach(function (link) {

        // ERROR this is too unreliable
        /* if the current link in the loop is the page we're currently on... */

        if (window.location.href.split('/')[window.location.href.split('/').length - 1].includes(link.filePath.replace('./', '')) && link.filePath !== '') {
            /* set location of background image */
            // TESTING the href will have to change for production code
            document.querySelector('#background image').href.baseVal = `./popupImages/${link.image}`;
        }

        /* Make the icons links */
        // wrapping the buttons with links using jQuery broke so now we're assuming the link is already there and we're setting the href property
        if (document.querySelector(`#${link.selector}`) !== null) {
            
            var linkElement = document.querySelector(`#${link.selector}`).parentElement;
            linkElement.href.baseVal = link.filePath;
            linkElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:title', link.description);
        }
    });
});