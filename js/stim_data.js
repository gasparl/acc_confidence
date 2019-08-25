function get_data(cat) {
    base_data = {};
    base_data.press = [
        ["vid_counter2", "What was in the press video 1?", 1],
        ["vid_purple2", "What was in the press video 2?", 0]
    ];
    base_data.inmates = [
        ["vid_counter", "What was in the inmate video 1?", 1],
        ["vid_purple", "What was in the inmate video2?", 0]
    ];
    base_data.hotels = [
        ["opinion_neg_1_gu", "What was in the review text 1?", 1],
        ["opinion_neg_10_gu", "What was in the review text 2?", 0],
        ["opinion_neg_100_gu", "What was in the review text 3?", 0],
        ["opinion_neg_101_gu", "What was in the review text 4?", 1],
        ["opinion_neg_102_gu", "What was in the review text 5?", 0],
        ["opinion_neg_103_gu", "What was in the review text 6?", 1]
    ];
    base_data.weekends = [
        ["past_weekend_2400_gu", "What was in the weekend text 1?", 1],
        ["past_weekend_2401_gu", "What was in the weekend text 2?", 0],
        ["past_weekend_2402_gu", "What was in the weekend text 3?", 0],
        ["past_weekend_2403_gu", "What was in the weekend text 4?", 1],
        ["past_weekend_2404_gu", "What was in the weekend text 5?", 0],
        ["past_weekend_2405_gu", "What was in the weekend text 6?", 1]
    ];

    return (base_data[cat]);
}
