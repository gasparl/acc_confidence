function get_data(cat) {
    base_data = {};
    base_data.press = [
        ["2001", "The speaker pleads for the missing person to come home. ", "TRUE", "d"],
        ["2002", "The speaker pleads for the missing person to come home. ", "FALSE", "d"],
        ["2003", "The speaker described the traits of her boyfriend.", "TRUE", "d"],
        ["2004", "The speaker gave a detailed description of his wife.", "FALSE", "d"],
        ["2005", "The speaker held up a photograph of two children.", "TRUE", "d"],
        ["2006", "The speaker held up a photograph of the missing person.", "FALSE", "t"],
        ["2007", "The woman abruptly left the stage.", "FALSE", "t"],
        ["2008", "The woman abruptly left the stage.", "TRUE", "t"]
    ];
    base_data.inmates = [
        ["5001", "The interviewee mentioned that he had committed armed robbery.", "FALSE", "d"],
        ["5002", "The interviewee mentioned that he had committed armed robbery.", "TRUE", "t"],
        ["5003", "The interviewee mentioned that he had committed armed robbery.", "TRUE", "d"],
        ["5004", "The interviewee mentioned that he had been arrested for stealing drugs.", "FALSE", "t"],
        ["5005", "The interviewee mentioned that he had committed armed robbery.", "TRUE", "t"],
        ["5006", "The interviewee mentioned that he had been in a high-speed pursuit in stolen motor vehicle.", "FALSE", "d"],
        ["5007", "The interviewee mentioned that he had committed armed robbery.", "FALSE", "t"],
        ["5008", "The interviewee mentioned that he had been in a high-speed pursuit in stolen motor vehicle.", "TRUE", "t"],
        ["5009", "The interviewee mentioned that he had been in a high-speed pursuit in stolen motor vehicle.", "FALSE", "d"],
        ["5010", "The interviewee mentioned that he had been in a high-speed pursuit in stolen motor vehicle.", "TRUE", "d"]
    ];
    base_data.hotels = [
        ["opinion_neg_10_gu", "The reviewer had a pleasant stay, and recommends the hotel.", "FALSE", "d"],
        ["opinion_neg_102_gu", "The reviewer was dissatisfied with the hotel.", "TRUE", "d"],
        ["opinion_neg_108_gu", "The staff was very helpful.", "FALSE", "d"],
        ["opinion_neg_117_gu", "The reviewer moved to another hotel after just one night.", "TRUE", "d"],
        ["opinion_neg_123_gu", "The AC was not working, but the rooms were very clean.", "FALSE", "d"],
        ["opinion_neg_130_gu", "The hotel room was spacious and pleasant.", "FALSE", "d"],
        ["opinion_neg_132_gu", "This hotel turned out to be expensive and not very clean.", "TRUE", "d"],
        ["opinion_neg_14_gu", "The reviewer did not like the hotel.", "TRUE", "d"],
        ["opinion_neg_405_gu", "The hotel was fine, but there was too much noise.", "TRUE", "t"],
        ["opinion_neg_413_gu", "The hotel offered everything free of charge.", "FALSE", "t"],
        ["opinion_neg_416_gu", "The review mentions long elevator waiting time and overpriced drinks.", "TRUE", "t"],
        ["opinion_neg_417_gu", "The hotel is very flexible regarding cancellation.", "FALSE", "t"],
        ["opinion_neg_427_gu", "The reviewer would rather stay elsewhere.", "TRUE", "t"],
        ["opinion_neg_430_gu", "The hotel was very modern and in perfect condition.", "FALSE", "t"],
        ["opinion_neg_444_gu", "The customer service was bad, but the room was fine.", "TRUE", "t"],
        ["opinion_neg_445_gu", "Despite many previous bad reviews, the hotel was actually absolutely great.", "FALSE", "t"],
        ["opinion_pos_1003_gu", "The view from the room and the food were both great.", "TRUE", "d"],
        ["opinion_pos_1007_gu", "The described hotel offers little, but it is always easy to book.", "FALSE", "d"],
        ["opinion_pos_1009_gu", "The reviewer was very satisfied with the hotel.", "TRUE", "d"],
        ["opinion_pos_1013_gu", "There is a swimming pool available.", "TRUE", "d"],
        ["opinion_pos_1020_gu", "The reviewer was impressed with the location.", "TRUE", "d"],
        ["opinion_pos_1022_gu", "The hotel room and the bed sheets were unclean.", "FALSE", "d"],
        ["opinion_pos_1024_gu", "The hotel room was old-fashioned and neglected.", "FALSE", "d"],
        ["opinion_pos_1025_gu", "The reviewer did not like the hotel at all.", "FALSE", "d"],
        ["opinion_pos_1201_gu", "The reviewer was very satisfied with the hotel.", "TRUE", "t"],
        ["opinion_pos_1203_gu", "There was no food available anywhere nearby.", "FALSE", "t"],
        ["opinion_pos_1204_gu", "The hotel was clean and the service was great.", "TRUE", "t"],
        ["opinion_pos_1206_gu", "The rooms were very small, and the breakfast tasted bad.", "FALSE", "t"],
        ["opinion_pos_1208_gu", "There was some noise, but overall the reviewer really enjoyed the stay.", "TRUE", "t"],
        ["opinion_pos_1210_gu", "The hotel had a very bad location.", "FALSE", "t"],
        ["opinion_pos_1213_gu", "The reviewer was happy with the hotel and highly recommends it.", "TRUE", "t"],
        ["opinion_pos_1215_gu", "The reviewer did not like anything about the hotel.", "FALSE", "t"]
    ];
    base_data.weekends = [
        ["past_weekend_2402_gu", "There were very few people and no food at the party.", "FALSE", "d"],
        ["past_weekend_2403_gu", "The narrator had some drinks with some friends.", "TRUE", "d"],
        ["past_weekend_2409_gu", "The narrator had never before done any babysitting.", "FALSE", "d"],
        ["past_weekend_2419_gu", "Overall, the narrator had a good time at the sea.", "TRUE", "d"],
        ["past_weekend_2428_gu", "The narrator took a solitary trip to the forest for the first time.", "FALSE", "d"],
        ["past_weekend_2429_gu", "The narrator went to a party to meet with an old friend from elementary school.", "TRUE", "d"],
        ["past_weekend_2430_gu", "The narrator went for a silent retreat to relax.", "FALSE", "d"],
        ["past_weekend_2436_gu", "The narrator was glad to babysit Jessica.", "TRUE", "d"],
        ["past_weekend_2440_gu", "The narrator watched a horror movie that was not enjoyable.", "FALSE", "d"],
        ["past_weekend_2444_gu", "The narrator saw various animals at the zoo in London.", "TRUE", "d"],
        ["past_weekend_2446_gu", "The narrator won a lot of money gambling in a casino.", "FALSE", "d"],
        ["past_weekend_2452_gu", "The narrator had a great time at the pub.", "TRUE", "d"],
        ["past_weekend_2453_gu", "The narrator went to a large international science fair.", "FALSE", "d"],
        ["past_weekend_2454_gu", "The narrator went to a classical art exhibition.", "TRUE", "d"],
        ["past_weekend_2461_gu", "The narrator has just been expelled from university.", "FALSE", "d"],
        ["past_weekend_2465_gu", "The narrator spent some some in the library with a friend.", "TRUE", "d"],
        ["past_weekend_2488_gu", "The narrator was ill and spent time reading a book.", "TRUE", "t"],
        ["past_weekend_2490_gu", "The narrator cleans the house every day.", "FALSE", "t"],
        ["past_weekend_2494_gu", "The narrator went to dinner with some friends.", "TRUE", "t"],
        ["past_weekend_2496_gu", "The narrator's weekend included watching television and playing games.", "TRUE", "t"],
        ["past_weekend_2498_gu", "The narrator went shopping.", "FALSE", "t"],
        ["past_weekend_2501_gu", "The narrator talks about dinner preparations.", "TRUE", "t"],
        ["past_weekend_2502_gu", "The family went on a long trip in the mountains.", "FALSE", "t"],
        ["past_weekend_2507_gu", "The family went to the movies.", "TRUE", "t"],
        ["past_weekend_2516_gu", "The narrator prepared for a mechanical engineering exam.", "FALSE", "t"],
        ["past_weekend_2520_gu", "The narrator helped a friend.", "TRUE", "t"],
        ["past_weekend_2521_gu", "This was the first time the narrator went to a gym.", "FALSE", "t"],
        ["past_weekend_2529_gu", "The narrator was on a family visit.", "TRUE", "t"],
        ["past_weekend_2531_gu", "The narrator was watching movies all weekend.", "FALSE", "t"],
        ["past_weekend_2534_gu", "The narrator had a large dinner at a restaurant.", "FALSE", "t"],
        ["past_weekend_2535_gu", "The narrator read books, watched television, and played a video game.", "TRUE", "t"],
        ["past_weekend_2539_gu", "The narrator went to the birthday party of a friend.", "FALSE", "t"]
    ];
    base_data.mocks1 = [
        ["4002", "The interviewee mentioned stapling papers.", "TRUE", "d"]

    ];
    base_data.mocks2 = [
        ["91", "The interviewee mentioned having helped the art professor to prepare for his class.", "FALSE", "d"]
    ];
    return (base_data[cat]);
}
