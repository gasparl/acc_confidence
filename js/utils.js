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
        alert("Please fill in all fields.");
    }
    return is_valid;
}

function seconds_between_dates(startDate, endDate) {
    return Math.abs(new Date(startDate) - new Date(endDate)) / 1000;
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
    return performance.now();
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

function end_task() {
    f_name =
        experiment_title +
        "_" +
        subj_id +
        ".txt";
    basic_times.finished = Date();
    duration_full = seconds_between_dates(
        basic_times.consented,
        basic_times.finished
    );
    subj_data += dems + [basic_times.loaded,
            basic_times.consented,
            basic_times.finished,
            duration_full
        ].join("/");
    $.post(
        "php/store_finish.php", {
            filename_post: f_name,
            results_post: subj_data
        },
        function(resp) {
            if (resp.startsWith("Fail")) {
                alert(resp);
            } else if (full_validity == "") {
                $("#passw_display").text("passDemo"); // (resp)
            }
        }
    )
    .fail(function(xhr, status, error) {
        console.log(error);
        $('#div_end_error').show();
    });
}
