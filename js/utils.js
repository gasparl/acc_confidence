// translation
var tranlate_count = 0;

function detect_transl() {
    setInterval(function() {
        if (
            $("html").hasClass("translated-ltr") ||
            $("html").hasClass("translated-rtl")
        ) {
            if (tranlate_count == 0) {
                alert(
                    "First warning: as written in the instructions, translation in this experiment is detected and will result in the invalidation of your test. Please turn it off immediately."
                );
            } else if (tranlate_count == 1) {
                alert(
                    "Second and last warning: translation of this site was detected for the second time. If it is detected one more time, the test will end and your data will be erased. Please turn it off immediately or (if you don't know how to turn it off) begin the experiment in a new window of your browser."
                );
                tranlate_count++;
            } else if (tranlate_count > 1) {
                alert(
                    "Due to continual or repeated use of automatic translation function, the experiment ends here."
                );
                window.location = end_url;
            }
            if ($("html").hasClass("notranslate") === false) {
                $("html").addClass("notranslate");
            }
            tranlate_count++;
        }
    }, 10000);
}

//only allow number in input field
function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

// detect mobile device
function detectmob() {
    var is_valid = true;
    if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    ) {
        alert(
            "You are using a smartphone or tablet. In this phase there is no mobile version of the test available. \nUnfortunately you cannot do this experiment on your mobile device. \nStart the experiment again with a normal webbrowser on your computer."
        );
        is_valid = false;
        window.location = end_url;
    }
    return is_valid;
}

//do nothing
function noop() {
    $.noop();
}

// change div - if good to go. Two optional function to include in execution (default does nothing)
function change_div(
    current,
    next,
    good_to_go = true,
    onchange_function1 = noop,
    onchange_function2 = noop
) {
    if (good_to_go === true) {
        onchange_function1();
        onchange_function2();
        var toHide = "#" + current.parentNode.id;
        $(toHide).hide();
        $(next).show();
    }
}

//after forms, check if all filled in
function validate_form(form_class) {
    var is_valid = true;
    $(form_class).each(function() {
        if ($(this).val() === "") is_valid = false;
    });
    if (is_valid === false) {
        alert("Please provide your MTurk ID! Otherwise we cannot reimburse you.");
    }
    return is_valid;
}

//after forms, check if all filled in
function validate_responses() {
    var is_valid = true;
    if (once_asked === false) {
        if (responses.conf_first === "-" | responses.main_first === "-") {
            is_valid = false;
            alert("Note: you did not answer all questions. Please reconsider.");
        }
        window.once_asked = true;
    }
    return is_valid;
}

// timing
var now = function() {
    var performance = window.performance || {};
    performance.now = (function() {
        return (
            performance.now ||
            performance.webkitNow ||
            performance.msNow ||
            performance.oNow ||
            performance.mozNow ||
            function() {
                return new Date().getTime();
            }
        );
    })();
    return Math.round(performance.now());
};
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

//shuffle
function shuffle(array) {
    var newarr = [];
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        newarr[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return newarr;
}

// random choice from array
function rchoice(array) {
    return array[Math.floor(array.length * Math.random())];
}

function dl_as_file() {
    filename_to_dl = f_name;
    data_to_dl = subj_data;
    var blobx = new Blob([data_to_dl], {
        type: 'text/plain'
    });
    var elemx = window.document.createElement('a');
    elemx.href = window.URL.createObjectURL(blobx);
    elemx.download = filename_to_dl;
    document.body.appendChild(elemx);
    elemx.click();
    document.body.removeChild(elemx);
}

function copy_to_clip() {
    element = $('<textarea>').appendTo('body').val(subj_data).select();
    document.execCommand("Copy");
    element.remove();
}

function neat_date() {
    var m = new Date();
    return m.getFullYear() + "" +
        ("0" + (m.getMonth() + 1)).slice(-2) + "" +
        ("0" + m.getDate()).slice(-2) + "" +
        ("0" + m.getHours()).slice(-2) + "" +
        ("0" + m.getMinutes()).slice(-2) + "" +
        ("0" + m.getSeconds()).slice(-2);
}

function consent_agreed() {
    basic_times.consented = neat_date();
    basic_times.consent_now = now();
}

function end_task() {
    window.f_name =
        experiment_title +
        "_" +
        subj_id +
        ".txt";
    basic_times.finished = neat_date();
    var duration_full = Math.round((now() - basic_times.consent_now) / 600) / 100;
    subj_data += [dems, basic_times.loaded,
        basic_times.consented,
        basic_times.finished,
        duration_full
    ].join("/");
    $.post(
            "php/store_finish.php", {
                filename_post: f_name,
                results_post: subj_data,
                date_post: "\ndate\t" + Date()
            },
            function(resp) {
                $("#passw_display").text(resp);
            }
        )
        .fail(function(xhr, status, error) {
            console.log(error);
            $('#div_end_error').show();
            $("#passw_display").html("<i>(server connection failed)</i>");
        });
}


function sum(array_to_sum) {
    var sum = 0;
    array_to_sum.forEach(function(item) {
        sum += item;
    });
    return sum;
}

function select_cats() {
    var plus_div = 1.6;
    var weights = {
        press: -Math.log(Math.random()) / (1/8/plus_div),
        inmates: -Math.log(Math.random()),
        hotels: -Math.log(Math.random()) / (1/6/plus_div),
        weekends: -Math.log(Math.random()) / (1/6/plus_div),
        mocks1: -Math.log(Math.random()),
        mocks2: -Math.log(Math.random())
    };
    var final_cats = [];
    for (var i = 0; i < 3; i++) {
        let key = Object.keys(weights).reduce((key, v) => weights[v] < weights[key] ? v : key);
        final_cats.push(key);
        delete weights[key];
    }
    return (final_cats);
}

function testx(its = 1000, multi = 1) {
    var test = [];
    for (var i = 0; i < its; i++) {
        var news = select_cats();
        test = test.concat(news);
        console.log(news.length);
    }
    window.counts = {};
    for (var i2 = 0; i2 < test.length; i2++) {
        var num = test[i2];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    Object.keys(counts).forEach(key => {
        counts[key] = counts[key] * multi;
    });
    console.log(counts);
    console.log(counts.weekends / counts.inmates);
    console.log(counts.weekends / counts.mocks1);
    console.log(counts.press / counts.inmates);
    console.log(counts.press / counts.mocks1);
    console.log(counts.hotels / counts.inmates);
    console.log(counts.hotels / counts.mocks1);
}
