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
    get_stims();

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
        $("#not_chrome_warn").html("<br><i>The test was designed for <b>Google Chrome</b>, but your browser was detected to be " + browser_name + ".<br><br>If you want to do this test, please use Google Chrome. It is completely free to download and use: <a href='url'>https://www.google.com/chrome/</a>https://www.google.com/chrome/</i><br><br>");
        //$("#not_chrome_warn").show();
        $("#div_intro_general").show();
    } else {
        $("#div_intro_general").show(); //div_intro_general div_instructions // div_intro_consent div_outro_end div_end_screen
    }
}

// STIMULI lists

var cat_intros = {
    press: "You will now see eight very short recordings, one by one, from real life press conferences with pleas to the public in a missing person or murder case. The eight individuals speaking are relatives of the victims. Police investigations, however, have shown that some of these eight persons were lying during these press conferences, and have, in fact, been later found guilty of killing their own relatives.",
    inmates: "You will now be presented with a confession to a crime, made by a prison inmate. This is either a true confession, in which case the individual was found guilty of the crime to which he confesses in the video; or a false confession, in which case the individual is innocent of the crime and telling a false story.",
    hotels: "You will now see written hotel reviews one by one. The person who wrote the given review was either actually there and provided a truthful review or was never actually staying at said hotel, thus providing a false review.",
    weekends: "You will now see descriptions of various past weekend activities one by one. The person who wrote the description either actually spent the weekend as described, thus telling the truth, or made up the entire activity description, thus lying.",
    mocks1: "You will now see an interview between an interrogator and a suspect in a mock theft that some of the participants enacted as part of the experiment at the university. The interviewee is asked for his or her whereabouts in the last 30 minutes and is either truthful in their statements or lying to the investigator.",
    mocks2: "You will now see an interview between an interrogator and a suspect in a mock terrorist act that some of the participants enacted as part of the experiment at the university. The interviewee is asked for his or her whereabouts in the last 30-40 minutes and is either truthful in their statements or lying to the investigator."
};

function get_stims() {
    window.stimuli = {};

    stimuli.press = [];
    press = shuffle(get_data("press"));
    press.forEach(function(item) {
        stimuli.press.push({
            name: item[0],
            mode: "video",
            att_ques: item[1],
            att_valid: item[2],
            veracity: item[3]
        });
    });

    inmates = rchoice(get_data("inmates"));
    stimuli.inmates = [{
        name: inmates[0],
        mode: "video",
        att_ques: inmates[1],
        att_valid: inmates[2],
        veracity: inmates[3]
    }];

    mocks1 = rchoice(get_data("mocks1"));
    stimuli.mocks1 = [{
        name: mocks1[0],
        mode: "video",
        att_ques: mocks1[1],
        att_valid: mocks1[2],
        veracity: mocks1[3]
    }];

    mocks2 = rchoice(get_data("mocks2"));
    stimuli.mocks2 = [{
        name: mocks2[0],
        mode: "video",
        att_ques: mocks2[1],
        att_valid: mocks2[2],
        veracity: mocks2[3]
    }];

    stimuli.hotels = [];
    hotels = shuffle(get_data("hotels")).splice(0, 6);
    hotels.forEach(function(item) {
        stimuli.hotels.push({
            name: item[0],
            mode: "text",
            att_ques: item[1],
            att_valid: item[2],
            veracity: item[3]
        });
    });

    stimuli.weekends = [];
    weekends = shuffle(get_data("weekends")).splice(0, 6);
    weekends.forEach(function(item) {
        stimuli.weekends.push({
            name: item[0],
            mode: "text",
            att_ques: item[1],
            att_valid: item[2],
            veracity: item[3]
        });
    });
}

// countries list
var countrs = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Vatican City", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea ", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea ", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

var lgs = ["Abkhazian", "Afar", "Afrikaans", "Akan", "Albanian", "Amharic", "Arabic", "Aragonese", "Armenian", "Assamese", "Avaric", "Avestan", "Aymara", "Azerbaijani", "Bambara", "Bashkir", "Basque", "Belarusian", "Bengali", "Bihari", "Bislama", "Bosnian", "Breton", "Bulgarian", "Burmese", "Catalan", "Chamorro", "Chechen", "Chichewa", "Chinese", "Chuvash", "Cornish", "Corsican", "Cree", "Croatian", "Czech", "Danish", "Divehi", "Dutch/Flemish", "Dzongkha", "English", "Esperanto", "Estonian", "Ewe", "Faroese", "Fijian", "Finnish", "French", "Fulah", "Galician", "Georgian", "German", "Greek", "Guarani", "Gujarati", "Haitian", "Hausa", "Hebrew", "Herero", "Hindi", "Hiri Motu", "Hungarian", "Interlingua", "Indonesian", "Interlingue", "Irish", "Igbo", "Inupiaq", "Ido", "Icelandic", "Italian", "Inuktitut", "Japanese", "Javanese", "Kalaallisut", "Kannada", "Kanuri", "Kashmiri", "Kazakh", "Central Khmer", "Kikuyu", "Kinyarwanda", "Kirghiz", "Komi", "Kongo", "Korean", "Kurdish", "Kuanyama", "Latin", "Luxembourgish", "Ganda", "Limburgan", "Lingala", "Lao", "Lithuanian", "Luba-Katanga", "Latvian", "Manx", "Macedonian", "Malagasy", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", "Marshallese", "Mongolian", "Nauru", "Navajo", "North Ndebele", "Nepali", "Ndonga", "Norwegian", "Sichuan Yi", "South Ndebele", "Occitan", "Ojibwa", "Oromo", "Oriya", "Ossetian", "Panjabi", "Pali", "Persian", "Polish", "Pashto", "Portuguese", "Quechua", "Romansh", "Rundi", "Romanian", "Russian", "Sanskrit", "Sardinian", "Sindhi", "Northern Sami", "Samoan", "Sango", "Serbian", "Gaelic", "Shona", "Sinhala", "Slovak", "Slovenian", "Somali", "Southern Sotho", "Spanish", "Sundanese", "Swahili", "Swati", "Swedish", "Tamil", "Telugu", "Tajik", "Thai", "Tigrinya", "Tibetan", "Turkmen", "Tagalog", "Tswana", "Tonga", "Turkish", "Tsonga", "Tatar", "Twi", "Tahitian", "Uighur", "Ukrainian", "Urdu", "Uzbek", "Venda", "Vietnamese", "Walloon", "Welsh", "Wolof", "Western Frisian", "Xhosa", "Yiddish", "Yoruba", "Zhuang", "Zulu", "OTHER"];
