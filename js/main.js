trial_num = 0;
trial_times = {};

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
    window.dems =
        subj_id +
        "\t" +
        $("#gender").val() +
        "\t" +
        $("#age").val() +
        "\t" +
        $("#education").val() +
        "\t" +
        $("#mothertongue").val() +
        "\t" +
        $("#countries").val() +
        "\t" +
        $.browser.name +
        "\t" +
        $.browser.version +
        "\n";
        // TODO via PHP save starting data

    $.post(
        "php/store_start.php", {
            filename_post: f_name,
            dems_post: dems
        },
        function(resp) {
            if (resp.startsWith("Fail")) {
                alert(resp);
            } else if (full_validity == "") {
                $("#passw_display").text("passDemo"); // (resp)
            }
        }
    );
}
function store_trial() {
    subj_data += [
        subj_id, trial_num, "category", vid_name, "decision", "confidence", trial_times.v_start, trial_times.v_end, trial_times.v_closed, "decision_time", "confidence_time", String(new Date().getTime())
    ].join("\t") + "\n";
}

// video settings
function vid_listen() {
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

vidnames = shuffle(vidnames);

function vid_start() {
    $('#watched_id').css('visibility', 'hidden');
    $('video').one('play', function() {
        trial_times.v_start = now();
    });
    trial_num++;
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
