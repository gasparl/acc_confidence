var trial_num = 0;
var trial_times = {};
var subj_data = [
    "subject_id", "trial_number", "category", "video", "decision", "confidence", "v_start", "v_end", "v_closed", "decision_time", "confidence_time", "date_in_ms\n"
].join("\t");

function store_start() {
    subj_id =
        rchoice("CDFGHJKLMNPQRSTVWXYZ") +
        rchoice("AEIOU") +
        rchoice("CDFGHJKLMNPQRSTVWXYZ") +
        "_" +
        $("#mturk_id").val();
    start_data = [subj_id,
        $("#gender").val(),
        $("#age").val(),
        $("#education").val(),
        $("#countries").val(),
        $("#mothertongue").val(),
        $.browser.name,
        $.browser.version
    ];
    window.dems = "dems\t" + ["id", "gender", "age", "edu", "country", "lg", "browser", "bversion", "load", "consent", "finish", "duration", "ip"].join("/") + "\t" + start_data.join("/");
    to_write = start_data.join("\t");
    headers = ["id", "gender", "age", "edu", "country", "lg", "browser", "bversion", "ip\n"].join("\t");
    $.post(
            "php/store_start.php", {
                filename_post: "astart_" + experiment_title + ".txt",
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
        responses.conf_first = $('input[name=conf_rate]:checked').val();
        responses.conf_rt_first = rt;
    }
        responses.conf_last = $('input[name=conf_rate]:checked').val();
        responses.conf_rt_last = rt;
}

function store_trial() {
    var main_resp = $('input[name=main_decision]:checked').val();
    subj_data += [
        subj_id, trial_num, "category", vid_name, main_resp, "confidence", trial_times.v_start, trial_times.v_end, trial_times.v_closed, "decision_time", "confidence_time", neat_date()
    ].join("\t") + "\n";
}

// video settings
function vid_listen() {
    vidnames = shuffle(vidnames);
    var video = document.getElementById('vid_id');
    video.addEventListener('timeupdate', function() {
        if (!video.seeking) {
            if (video.currentTime > timeTracking.watchedTime) {
                timeTracking.watchedTime = video.currentTime;
                lastUpdated = 'watchedTime';
            } else {
                //tracking time updated  after user rewinds
                timeTracking.currentTime = video.currentTime;
                lastUpdated = 'currentTime';
            }
        }
        if (!document.hasFocus()) {
            video.pause();
        }
    });
    // prevent user from seeking
    video.addEventListener('seeking', function() {
        // guard against infinite recursion:
        // user seeks, seeking is fired, currentTime is modified, seeking is fired, current time is modified, ....
        var delta = video.currentTime - timeTracking.watchedTime;
        if (delta > 0) {
            //play back from where the user started seeking after rewind or without rewind
            video.currentTime = timeTracking[lastUpdated];
        }
    });
    video.addEventListener("ended", function() {
        $('#watched_id').css('visibility', 'visible');
        trial_times.v_end = now();
    });
}

function vid_start() {
    $('#watched_id').css('visibility', 'hidden');
    $('video').one('play', function() {
        trial_times.v_start = now();
    });
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
    window.timeTracking = {
        watchedTime: 0,
        currentTime: 0
    };
    window.lastUpdated = 'currentTime';
    if (vidnames.length > 0) {
        window.vid_name = vidnames.shift();
        document.getElementById("vid_id").src = "vids/" + vid_name + ".mp4";
        $('#div_questions').hide();
        $('#div_video').show();
    } else {
        $('#div_questions').hide();
        $('#div_outro_rating').show();
    }
}

function vid_pause() {
    document.getElementById('vid_id').pause();
}

function vid_close_time() {
    trial_times.v_closed = now();
}
