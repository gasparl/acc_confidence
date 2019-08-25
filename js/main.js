var trial_num = 0;
var trial_times = {};
var subj_data = ["subject_id", "trial_number", "category", "stimulus", "decision_first", "confidence_first", "decision_last", "confidence_last", "stim_start", "stim_end", "stim_closed", "decision_time_first", "confidence_time_first", "decision_time_last", "confidence_time_last", "attention", "incorrect", "cues", "date_in_ms\n"].join("\t");

function store_start() {
    window.subj_id =
        rchoice("CDFGHJKLMNPQRSTVWXYZ") +
        rchoice("AEIOU") +
        rchoice("CDFGHJKLMNPQRSTVWXYZ") +
        "_" +
        $("#mturk_id").val();
    var start_data = [subj_id,
        $("#gender").val(),
        $("#age").val(),
        $("#education").val(),
        $("#countries").val(),
        $("#mothertongue").val(),
        $.browser.name,
        $.browser.version
    ];
    window.dems = "dems\t" + ["id", "gender", "age", "edu", "country", "lg", "browser", "bversion", "load", "consent", "finish", "duration", "ip"].join("/") + "\t" + start_data.join("/");
    var to_write = start_data.join("\t");
    var headers = ["id", "gender", "age", "edu", "country", "lg", "browser", "bversion", "ip\n"].join("\t");
    $.post(
            "php/store_start.php", {
                filename_post: "a_demographics_" + experiment_title + ".txt",
                heads_post: headers,
                dems_post: to_write
            },
            function(resp) {
                if (resp.startsWith("Fail")) {
                    alert(resp);
                }
            }
        )
        .fail(function(xhr, status, error) {
            console.log(error);
            $('#div_start_error').show();
        });
}

function store_trial() {
    var incorr, attention_resp;
    attention_resp = $('input[name=attention_check]:checked').val();
    if (attention_resp == undefined) {
        attention_resp = "";
        incorr = 9;
    } else {
        if (attention_resp == current_stim.att_valid) {
            incorr = 0;
        } else {
            incorr = 1;
        }
    }
    subj_data += [
        subj_id, trial_num, current_cat, current_stim.name, responses.main_first, responses.conf_first, responses.main_last, responses.conf_last, trial_times.stim_start, trial_times.stim_end, trial_times.stim_closed, responses.main_rt_first, responses.conf_rt_first, responses.main_rt_last, responses.conf_rt_last, attention_resp, incorr, clarity_resp, $('#cues_id').val().replace(/[\t\n\r]/gm, '; '), neat_date()
    ].join("\t") + "\n";
}

function save_main() {
    var rt = now();
    if (responses.main_first === "-") {
        responses.main_first = $('input[name=main_decision]:checked').val();
        responses.main_rt_first = rt;
    }
    responses.main_last = $('input[name=main_decision]:checked').val();
    responses.main_rt_last = rt;
}

function save_conf() {
    var rt = now();
    if (responses.conf_first === "-") {
        responses.conf_first = $("#conf_rate_id").val();
        responses.conf_rt_first = rt;
        $("#conf_rate_id").removeClass("slider_hide_thumb");
    }
    responses.conf_last = $("#conf_rate_id").val();
    responses.conf_rt_last = rt;
}

// video settings
function vid_listen() {
    var video = document.getElementById('vid_id');
    video.addEventListener('timeupdate', function() {
        if (!video.seeking) {
            tracked_time = video.currentTime;
        }
        if (!document.hasFocus()) {
            video.pause();
        }
    });
    // prevent user from seeking
    video.addEventListener('seeking', function() {
        var delta = video.currentTime - tracked_time;
        if (Math.abs(delta) > 0.01) {
            //play back from where the user started seeking after rewind or without rewind
            video.currentTime = tracked_time;
        }
    });
    video.addEventListener("ended", function() {
        $('#watched_id').css('visibility', 'visible');
        trial_times.stim_end = now();
    });
}

function first_start() {
    if (trial_num === 0) {
        window.task_categories = shuffle(select_cats());
        categ_start();
    } else {
        $('#div_stim').show();
    }
}

function categ_start() {
    window.current_cat = task_categories.shift();
    $('#cat_text_id').text(cat_intros[current_cat]);
    $('#div_cat_intro').show();
}

function allow_pass() {
    if (allow_move == false) {
        alert("Please invest some more time into reading the text.");
    }
    return allow_move;
}

function load_text() {
    $('#text_id').load("./stims/" + current_cat + "/" + current_stim.name,
        function(responseTxt, statusTxt, xhr) {
            if (statusTxt == "error" && load_error < 10) {
                load_error++;
                var msg = "Something went wrong. Please make sure your internet connection is working.";
                alert(msg);
                console.log(msg);
                load_text();
            } else {
                $('#div_stim').show();
                trial_times.stim_start = now();
                setTimeout(function() {
                    allow_move = true;
                }, 2000);
            }
        });
}

function trial_start() {
    if (stimuli[current_cat].length > 0) {
        window.current_stim = stimuli[current_cat].shift();
        trial_times = {
            stim_start: "-",
            stim_end: "-",
            stim_closed: "-"
        };
        $('#truth_id').prop('checked', false);
        $('#lie_id').prop('checked', false);
        $("#conf_rate_id").addClass("slider_hide_thumb");
        once_asked = false;
        trial_num++;
        window.responses = {
            main_first: "-",
            main_rt_first: 0,
            main_last: "-",
            main_rt_last: 0,
            conf_first: "-",
            conf_rt_first: 0,
            conf_last: "-",
            conf_rt_last: 0,
        };
        $('#yes_id').prop('checked', false);
        $('#no_id').prop('checked', false);
        $("#clarity_rate_id").addClass("slider_hide_thumb");
        $('#attention_id').text(current_stim.att_ques);
        if (current_stim.mode === "video") {
            $('#text_container').hide();
            document.getElementById("vid_id").src = "./stims/" + current_cat + "/" + current_stim.name + ".mp4";
            $('#vid_container').show();
            $('#watched_id').css('visibility', 'hidden');
            $('video').one('play', function() {
                trial_times.stim_start = now();
            });
            window.tracked_time = 0;
            window.allow_move = true;
            $('#div_stim').show();
        } else {
            document.getElementById("vid_id").src = "";
            $('#vid_container').hide();
            $('#text_container').show();
            window.allow_move = false;
            window.load_error = 0;
            load_text();
        }
    } else if (task_categories.length > 0) {
        $('#div_questions').hide();
        categ_start();
    } else {
        $('#div_questions').hide();
        $('#div_outro_rating').show();
    }
}

function vid_pause() {
    document.getElementById('vid_id').pause();
}

function vid_close_time() {
    trial_times.stim_closed = now();
}
