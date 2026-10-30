// Every figure here is copied exactly from the linked source. Do not round, combine or
// extrapolate. When a source publishes a new edition, replace the whole entry and update
// `checked`.

export const checked = '30 October 2026';

export const sources = [
  {
    id: 'open-doors',
    org: 'Open Doors',
    report: 'World Watch List 2026',
    published: 'January 2026',
    period: '1 October 2024 – 30 September 2025',
    url: 'https://www.opendoors.org/persecution/countries',
    methodUrl: 'https://www.opendoorsuk.org/methodology/',
    scope: 'Christians only',
    method:
      'Open Doors researchers and in-country networks document incidents and score 50 countries from 0 to 100 on pressure across five areas of life plus violence. A score of 41 or more counts as "high". The method and results are audited by the International Institute for Religious Freedom.',
    figures: [
      {
        value: '4,849',
        label: 'Christians killed for faith-related reasons',
        note: 'Based on incidents documented by Open Doors researchers and networks. Open Doors labels this figure "Christians murdered".',
      },
      {
        value: '3,490',
        label: 'of those killings were recorded in Nigeria',
        note: 'Part of the 4,849 above, not in addition to it.',
      },
      {
        value: 'More than 388 million',
        label: 'Christians facing high levels of persecution and discrimination for their faith',
        note: 'Open Doors describes this as 1 in 7 Christians worldwide. It is the Christian population of countries scoring "high" or above, not a count of individual incidents.',
      },
      {
        value: '4,712',
        label: 'Christians detained',
        note: 'As counted by Open Doors for the reporting period.',
      },
      {
        value: '3,632',
        label: 'churches and Christian properties attacked',
        note: 'As counted by Open Doors for the reporting period.',
      },
    ],
  },
  {
    id: 'acn',
    org: 'Aid to the Church in Need (ACN)',
    report: 'Religious Freedom in the World Report 2025',
    published: '21 October 2025',
    period: 'January 2023 – December 2024',
    url: 'https://acninternational.org/religiousfreedomreport/',
    methodUrl: 'https://acninternational.org/religious-freedom-a-global-victim-of-authoritarianism-extremism-and-war/',
    scope: 'People of all religions, not only Christians',
    method:
      'Country-by-country review of 196 countries by ACN researchers and contributors. Each country is classed as "persecution", "discrimination", "under observation" or no category. Population figures are the total population of the countries in each class.',
    figures: [
      {
        value: '62',
        label: 'countries with serious violations of religious freedom',
        note: '24 classed as "persecution" and 38 as "discrimination", out of 196 countries reviewed.',
      },
      {
        value: 'More than 5.4 billion',
        label: 'people live in those 62 countries',
        note: 'The total population of the countries, not the number of people personally affected. Covers all faiths.',
      },
    ],
  },
  {
    id: 'pew',
    org: 'Pew Research Center',
    report: 'More Countries Had Elevated Levels of Social Hostilities Involving Religion in 2023',
    published: '15 June 2026',
    period: 'Calendar year 2023',
    url: 'https://www.pewresearch.org/religion/2026/06/15/harassment-of-religious-groups-around-the-world-in-2023/',
    methodUrl: 'https://www.pewresearch.org/religion/2026/06/15/religious-restrictions-2023-methodology/',
    scope: 'All religious groups, counted separately',
    method:
      'Pew codes publicly reported incidents (mainly from the US State Department and UN sources) for 198 countries and territories. A country counts if at least one incident of harassment against the group was reported that year.',
    figures: [
      {
        value: '165',
        label: 'countries and territories where Christians were harassed by governments or social groups',
        note: 'Out of 198. Down from 166 in 2022. Pew says this does not measure how severe or frequent harassment was, so it cannot show which group faces the most persecution.',
      },
      {
        value: '48',
        label: 'countries where religion-related killings were reported',
        note: 'For people of any religion, not Christians only. 24% of the 198 countries and territories studied.',
      },
    ],
  },
  {
    id: 'uscirf',
    org: 'US Commission on International Religious Freedom (USCIRF)',
    report: '2026 Annual Report',
    published: 'March 2026',
    period: 'Calendar year 2025',
    url: 'https://www.uscirf.gov/countries/2026-recommendations',
    methodUrl: 'https://www.uscirf.gov/annual-reports',
    scope: 'All religions',
    method:
      'USCIRF is an independent, bipartisan US federal commission. It recommends countries to the US State Department; these are recommendations, not official designations. The State Department makes its own designations separately.',
    figures: [
      {
        value: '18',
        label: 'countries recommended as "Countries of Particular Concern"',
        note: 'The most severe US category, for "systematic, ongoing, egregious" violations. Includes Nigeria, North Korea, China, Iran and Eritrea, among others. Covers violations against any religious group.',
      },
      {
        value: '11',
        label: 'countries recommended for the "Special Watch List"',
        note: 'The second tier, for severe violations that meet two of the three criteria above.',
      },
    ],
  },
];

export const differences = [
  {
    title: 'Different questions',
    body: 'Open Doors counts Christians only. ACN, Pew and USCIRF cover every religion, so their figures include Muslims, Jews, Hindus, Buddhists, non-believers and others.',
  },
  {
    title: 'Different units',
    body: 'Some figures count people (4,849 killed), some count countries (165 countries), and some add up whole national populations (5.4 billion). A population total is not the number of people personally affected.',
  },
  {
    title: 'Different time periods',
    body: "Open Doors' year runs October to September. ACN covers two calendar years. Pew's latest data is for 2023, and USCIRF's annual report covers the previous calendar year.",
  },
  {
    title: 'Different definitions',
    body: 'Open Doors includes killings it judges to be faith-related, including in conflicts with several causes, such as in Nigeria. Other researchers can attribute the same deaths to land disputes, banditry or ethnic conflict. Pew counts any reported incident but doesn\'t weigh how severe it was.',
  },
];
