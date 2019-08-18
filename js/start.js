var experiment_title = "gu_confidence_rating";
var end_url = "https://www.mturk.com/";
var subj_id;
var basic_times = {};
var bg_color = "#031116";

$(document).ready(function() {
    basic_times.loaded = neat_date();
    chrome_check();
    detect_transl();
    vid_listen();

    // dropdowns
    var countr_choices = "";
    countrs.forEach(function(word) {
        countr_choices += '<option value="' + word + '">' + word + "</option>";
    });
    $("#countries").append(countr_choices);
    var lang_choices = "";
    lgs.forEach(function(word) {
        lang_choices += '<option value="' + word + '">' + word + "</option>";
    });
    $("#mothertongue").append(lang_choices);
});

function chrome_check() {
    var browser_name = $.browser.name;
    if (browser_name != "Chrome") {
        console.log("Detected browser: " + browser_name + ". This application should be run in Google Chrome.");
        alert("Your browser was detected to be " + browser_name + "! This test was optimized for and should be run in Google Chrome. Please make sure you use the appropriate browser.");
        $("#not_chrome_warn").html("<br><i>The test was designed for <b>Google Chrome</b>, but your browser was detected to be " + browser_name + ".<br><br>If you want to do this test, please use Google Chrome.</i><br><br>");
        $("#not_chrome_warn").show();
    } else {
        $("#div_intro_general").show(); //div_intro_general div_instructions // div_intro_consent div_outro_end div_end_screen
    }
}

// STIMULI lists

var cat_intros = {
    press: "some press intro",
    inmates: "some inmate intro",
    hotels: "some hotel intro",
    weekends: "some weekend intro"
};

function get_stims() {
    window.stimuli = {};

    stimuli.press = [];
    press = ["vid_counter2", "vid_purple2"];
    press = shuffle(press);
    press.forEach(function(namee) {
        stim_press.push({
            name: namee,
            mode: "video"
        });
    });

    stimuli.inmates = [];
    inmates = ["vid_counter", "vid_purple"];
    inmates = rchoice(inmates);
    inmates.forEach(function(namee) {
        stimuli.inmates.push({
            name: namee,
            mode: "video"
        });
    });

    stimuli.hotels = [];
    hotels = ['opinion_neg_1_gu.txt', 'opinion_neg_10_gu.txt', 'opinion_neg_100_gu.txt', 'opinion_neg_101_gu.txt', 'opinion_neg_102_gu.txt', 'opinion_neg_103_gu.txt'];
    hotels = shuffle(hotels).splice(0, 3);
    hotels.forEach(function(namee) {
        stimuli.hotels.push({
            name: namee,
            mode: "text"
        });
    });

    stimuli.weekends = [];
    weekends = ['past_weekend_2400_gu.txt', 'past_weekend_2401_gu.txt', 'past_weekend_2402_gu.txt', 'past_weekend_2403_gu.txt', 'past_weekend_2404_gu.txt', 'past_weekend_2405_gu.txt'];
    weekends = shuffle(weekends).splice(0, 3);
    weekends.forEach(function(namee) {
        stimuli.weekends.push({
            name: namee,
            mode: "text"
        });
    });
}

// countries list
var countrs = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Vatican City", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea ", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea ", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

var lgs = ["Abkhazian", "Afar", "Afrikaans", "Akan", "Albanian", "Amharic", "Arabic", "Aragonese", "Armenian", "Assamese", "Avaric", "Avestan", "Aymara", "Azerbaijani", "Bambara", "Bashkir", "Basque", "Belarusian", "Bengali", "Bihari", "Bislama", "Bosnian", "Breton", "Bulgarian", "Burmese", "Catalan", "Chamorro", "Chechen", "Chichewa", "Chinese", "Chuvash", "Cornish", "Corsican", "Cree", "Croatian", "Czech", "Danish", "Divehi", "Dutch/Flemish", "Dzongkha", "English", "Esperanto", "Estonian", "Ewe", "Faroese", "Fijian", "Finnish", "French", "Fulah", "Galician", "Georgian", "German", "Greek", "Guarani", "Gujarati", "Haitian", "Hausa", "Hebrew", "Herero", "Hindi", "Hiri Motu", "Hungarian", "Interlingua", "Indonesian", "Interlingue", "Irish", "Igbo", "Inupiaq", "Ido", "Icelandic", "Italian", "Inuktitut", "Japanese", "Javanese", "Kalaallisut", "Kannada", "Kanuri", "Kashmiri", "Kazakh", "Central Khmer", "Kikuyu", "Kinyarwanda", "Kirghiz", "Komi", "Kongo", "Korean", "Kurdish", "Kuanyama", "Latin", "Luxembourgish", "Ganda", "Limburgan", "Lingala", "Lao", "Lithuanian", "Luba-Katanga", "Latvian", "Manx", "Macedonian", "Malagasy", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", "Marshallese", "Mongolian", "Nauru", "Navajo", "North Ndebele", "Nepali", "Ndonga", "Norwegian", "Sichuan Yi", "South Ndebele", "Occitan", "Ojibwa", "Oromo", "Oriya", "Ossetian", "Panjabi", "Pali", "Persian", "Polish", "Pashto", "Portuguese", "Quechua", "Romansh", "Rundi", "Romanian", "Russian", "Sanskrit", "Sardinian", "Sindhi", "Northern Sami", "Samoan", "Sango", "Serbian", "Gaelic", "Shona", "Sinhala", "Slovak", "Slovenian", "Somali", "Southern Sotho", "Spanish", "Sundanese", "Swahili", "Swati", "Swedish", "Tamil", "Telugu", "Tajik", "Thai", "Tigrinya", "Tibetan", "Turkmen", "Tagalog", "Tswana", "Tonga", "Turkish", "Tsonga", "Tatar", "Twi", "Tahitian", "Uighur", "Ukrainian", "Urdu", "Uzbek", "Venda", "Vietnamese", "Walloon", "Welsh", "Wolof", "Western Frisian", "Xhosa", "Yiddish", "Yoruba", "Zhuang", "Zulu", "OTHER"];
