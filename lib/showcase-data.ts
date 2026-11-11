// Real numbers behind the interactive charts. Each block notes the file it was copied from.
// Target Brazil: github.com/dot-hpg/target-brazil-sql-case-study/tree/main/outputs/results

// 2_2_monthly_trend.csv (Jan 2017 - Aug 2018, the complete months)
export const targetMonthlyOrders = [
  {
    month: "2017-01",
    orders: 800
  },
  {
    month: "2017-02",
    orders: 1780
  },
  {
    month: "2017-03",
    orders: 2682
  },
  {
    month: "2017-04",
    orders: 2404
  },
  {
    month: "2017-05",
    orders: 3700
  },
  {
    month: "2017-06",
    orders: 3245
  },
  {
    month: "2017-07",
    orders: 4026
  },
  {
    month: "2017-08",
    orders: 4331
  },
  {
    month: "2017-09",
    orders: 4285
  },
  {
    month: "2017-10",
    orders: 4631
  },
  {
    month: "2017-11",
    orders: 7544
  },
  {
    month: "2017-12",
    orders: 5673
  },
  {
    month: "2018-01",
    orders: 7269
  },
  {
    month: "2018-02",
    orders: 6728
  },
  {
    month: "2018-03",
    orders: 7211
  },
  {
    month: "2018-04",
    orders: 6939
  },
  {
    month: "2018-05",
    orders: 6873
  },
  {
    month: "2018-06",
    orders: 6167
  },
  {
    month: "2018-07",
    orders: 6292
  },
  {
    month: "2018-08",
    orders: 6512
  }
];

// 7_6_monthly_late_delivery_rate.csv
export const targetLateRate = [
  {
    month: "2017-01",
    pctLate: 2.93,
    days: 12.09
  },
  {
    month: "2017-02",
    pctLate: 2.96,
    days: 12.61
  },
  {
    month: "2017-03",
    pctLate: 4.56,
    days: 12.4
  },
  {
    month: "2017-04",
    pctLate: 6.56,
    days: 14.35
  },
  {
    month: "2017-05",
    pctLate: 2.99,
    days: 10.76
  },
  {
    month: "2017-06",
    pctLate: 3.03,
    days: 11.51
  },
  {
    month: "2017-07",
    pctLate: 2.79,
    days: 11.13
  },
  {
    month: "2017-08",
    pctLate: 2.91,
    days: 10.7
  },
  {
    month: "2017-09",
    pctLate: 4.39,
    days: 11.4
  },
  {
    month: "2017-10",
    pctLate: 4.18,
    days: 11.42
  },
  {
    month: "2017-11",
    pctLate: 12.4,
    days: 14.7
  },
  {
    month: "2017-12",
    pctLate: 7.46,
    days: 14.94
  },
  {
    month: "2018-01",
    pctLate: 5.7,
    days: 13.64
  },
  {
    month: "2018-02",
    pctLate: 14.13,
    days: 16.51
  },
  {
    month: "2018-03",
    pctLate: 18.96,
    days: 15.87
  },
  {
    month: "2018-04",
    pctLate: 4.5,
    days: 11.05
  },
  {
    month: "2018-05",
    pctLate: 6.56,
    days: 10.96
  },
  {
    month: "2018-06",
    pctLate: 1.16,
    days: 8.77
  },
  {
    month: "2018-07",
    pctLate: 3.38,
    days: 8.5
  },
  {
    month: "2018-08",
    pctLate: 6.19,
    days: 7.29
  }
];

// 7_1_late_delivery_vs_review_score.csv
export const targetReviewByDelivery = [
  {
    bucket: "15+ days early",
    orders: 29453,
    score: 4.32,
    oneStar: 6.66,
    fiveStar: 64.15
  },
  {
    bucket: "8-14 days early",
    orders: 36676,
    score: 4.32,
    oneStar: 6.18,
    fiveStar: 63.49
  },
  {
    bucket: "0-7 days early",
    orders: 23314,
    score: 4.2,
    oneStar: 7.11,
    fiveStar: 57.75
  },
  {
    bucket: "1-3 days late",
    orders: 1852,
    score: 3.29,
    oneStar: 25.11,
    fiveStar: 33.15
  },
  {
    bucket: "4-7 days late",
    orders: 1748,
    score: 2.11,
    oneStar: 58.47,
    fiveStar: 14.07
  },
  {
    bucket: "8+ days late",
    orders: 2781,
    score: 1.7,
    oneStar: 69.72,
    fiveStar: 7.01
  }
];

// 6_2_payment_type_share.csv
export const targetPaymentShare = [
  {
    type: "Credit card",
    orders: 76505,
    pct: 76.94
  },
  {
    type: "UPI",
    orders: 19784,
    pct: 19.9
  },
  {
    type: "Voucher",
    orders: 3866,
    pct: 3.89
  },
  {
    type: "Debit card",
    orders: 1528,
    pct: 1.54
  }
];

// 5_6_delivery_scorecard_by_state.csv
export const targetStateScorecard = [
  {
    state: "RR",
    orders: 41,
    days: 28.98,
    pctLate: 12.2,
    freight: 42.98
  },
  {
    state: "AP",
    orders: 67,
    days: 26.73,
    pctLate: 2.99,
    freight: 34.01
  },
  {
    state: "AM",
    orders: 145,
    days: 25.99,
    pctLate: 2.76,
    freight: 33.21
  },
  {
    state: "AL",
    orders: 397,
    days: 24.04,
    pctLate: 21.41,
    freight: 35.84
  },
  {
    state: "PA",
    orders: 946,
    days: 23.32,
    pctLate: 11.21,
    freight: 35.83
  },
  {
    state: "MA",
    orders: 717,
    days: 21.12,
    pctLate: 17.43,
    freight: 38.26
  },
  {
    state: "SE",
    orders: 335,
    days: 21.03,
    pctLate: 15.22,
    freight: 36.65
  },
  {
    state: "CE",
    orders: 1279,
    days: 20.82,
    pctLate: 13.76,
    freight: 32.71
  },
  {
    state: "AC",
    orders: 80,
    days: 20.64,
    pctLate: 3.75,
    freight: 40.07
  },
  {
    state: "PB",
    orders: 517,
    days: 19.95,
    pctLate: 10.44,
    freight: 42.72
  },
  {
    state: "PI",
    orders: 476,
    days: 18.99,
    pctLate: 13.87,
    freight: 39.15
  },
  {
    state: "RO",
    orders: 243,
    days: 18.91,
    pctLate: 2.88,
    freight: 41.07
  },
  {
    state: "BA",
    orders: 3256,
    days: 18.87,
    pctLate: 12.16,
    freight: 26.36
  },
  {
    state: "RN",
    orders: 474,
    days: 18.82,
    pctLate: 9.28,
    freight: 35.65
  },
  {
    state: "PE",
    orders: 1593,
    days: 17.97,
    pctLate: 9.6,
    freight: 32.92
  },
  {
    state: "MT",
    orders: 886,
    days: 17.59,
    pctLate: 5.98,
    freight: 28.17
  },
  {
    state: "TO",
    orders: 274,
    days: 17.23,
    pctLate: 9.85,
    freight: 37.25
  },
  {
    state: "ES",
    orders: 1995,
    days: 15.33,
    pctLate: 10.73,
    freight: 22.06
  },
  {
    state: "MS",
    orders: 701,
    days: 15.19,
    pctLate: 9.7,
    freight: 23.37
  },
  {
    state: "GO",
    orders: 1957,
    days: 15.15,
    pctLate: 6.54,
    freight: 22.77
  },
  {
    state: "RJ",
    orders: 12350,
    days: 14.85,
    pctLate: 12.11,
    freight: 20.96
  },
  {
    state: "RS",
    orders: 5344,
    days: 14.82,
    pctLate: 6.08,
    freight: 21.74
  },
  {
    state: "SC",
    orders: 3546,
    days: 14.48,
    pctLate: 8.21,
    freight: 21.47
  },
  {
    state: "DF",
    orders: 2080,
    days: 12.51,
    pctLate: 5.67,
    freight: 21.04
  },
  {
    state: "MG",
    orders: 11354,
    days: 11.54,
    pctLate: 4.57,
    freight: 20.63
  },
  {
    state: "PR",
    orders: 4923,
    days: 11.53,
    pctLate: 4.04,
    freight: 20.53
  },
  {
    state: "SP",
    orders: 40494,
    days: 8.3,
    pctLate: 4.49,
    freight: 15.15
  }
];

// 7_4_top_categories.csv (top 8 by revenue)
export const targetTopCategories = [
  {
    category: "HEALTH BEAUTY",
    revenue: 1258681.34,
    pct: 9.26,
    score: 4.14
  },
  {
    category: "Watches present",
    revenue: 1205005.68,
    pct: 8.87,
    score: 4.02
  },
  {
    category: "bed table bath",
    revenue: 1036988.68,
    pct: 7.63,
    score: 3.9
  },
  {
    category: "sport leisure",
    revenue: 988048.97,
    pct: 7.27,
    score: 4.11
  },
  {
    category: "computer accessories",
    revenue: 911954.32,
    pct: 6.71,
    score: 3.93
  },
  {
    category: "Furniture Decoration",
    revenue: 729762.49,
    pct: 5.37,
    score: 3.91
  },
  {
    category: "Cool Stuff",
    revenue: 635290.85,
    pct: 4.67,
    score: 4.15
  },
  {
    category: "housewares",
    revenue: 632248.66,
    pct: 4.65,
    score: 4.05
  }
];

// 2_4_time_of_day.csv
export const targetTimeOfDay = [
  {
    label: "Afternoon",
    pct: 38.35
  },
  {
    label: "Night",
    pct: 28.49
  },
  {
    label: "Morning",
    pct: 27.89
  },
  {
    label: "Dawn",
    pct: 5.27
  }
];

// Mean rentals per hour, from data/yulu_bike_sharing.csv in dot-hpg/yulu-hypothesis-testing (10,886 rows)
export const yuluHourly = [
  {
    hour: 0,
    workingDay: 37,
    nonWorkingDay: 94
  },
  {
    hour: 1,
    workingDay: 16,
    nonWorkingDay: 72
  },
  {
    hour: 2,
    workingDay: 8,
    nonWorkingDay: 54
  },
  {
    hour: 3,
    workingDay: 5,
    nonWorkingDay: 26
  },
  {
    hour: 4,
    workingDay: 5,
    nonWorkingDay: 9
  },
  {
    hour: 5,
    workingDay: 25,
    nonWorkingDay: 9
  },
  {
    hour: 6,
    workingDay: 103,
    nonWorkingDay: 20
  },
  {
    hour: 7,
    workingDay: 291,
    nonWorkingDay: 47
  },
  {
    hour: 8,
    workingDay: 480,
    nonWorkingDay: 112
  },
  {
    hour: 9,
    workingDay: 242,
    nonWorkingDay: 178
  },
  {
    hour: 10,
    workingDay: 134,
    nonWorkingDay: 264
  },
  {
    hour: 11,
    workingDay: 157,
    nonWorkingDay: 325
  },
  {
    hour: 12,
    workingDay: 199,
    nonWorkingDay: 379
  },
  {
    hour: 13,
    workingDay: 197,
    nonWorkingDay: 388
  },
  {
    hour: 14,
    workingDay: 180,
    nonWorkingDay: 379
  },
  {
    hour: 15,
    workingDay: 199,
    nonWorkingDay: 374
  },
  {
    hour: 16,
    workingDay: 292,
    nonWorkingDay: 368
  },
  {
    hour: 17,
    workingDay: 529,
    nonWorkingDay: 339
  },
  {
    hour: 18,
    workingDay: 495,
    nonWorkingDay: 292
  },
  {
    hour: 19,
    workingDay: 349,
    nonWorkingDay: 242
  },
  {
    hour: 20,
    workingDay: 249,
    nonWorkingDay: 184
  },
  {
    hour: 21,
    workingDay: 185,
    nonWorkingDay: 149
  },
  {
    hour: 22,
    workingDay: 138,
    nonWorkingDay: 123
  },
  {
    hour: 23,
    workingDay: 89,
    nonWorkingDay: 91
  }
];

// TV shows as a % of titles added each year, from data/processed/netflix_cleaned.csv in dot-hpg/netflix-content-insights
export const netflixTvShare = [
  {
    year: 2015,
    tv: 31.7
  },
  {
    year: 2016,
    tv: 41.0
  },
  {
    year: 2017,
    tv: 29.4
  },
  {
    year: 2018,
    tv: 25.0
  },
  {
    year: 2019,
    tv: 29.4
  },
  {
    year: 2020,
    tv: 31.7
  },
  {
    year: 2021,
    tv: 33.7
  }
];

