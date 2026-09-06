// Official course handouts for VU BSCS subjects, all semesters.
// Curated static entries (direct Google Drive download links) — these are
// merged with community-submitted handouts from the database on subject
// pages. Add more here as official handouts are collected.
//
// Sources: official VU handouts shared by students + handout directory
// listings. Subjects not yet listed here (CS306, CS314, CS515, CSI619,
// CS619) have no published handout PDF yet — add them when available.

export type CuratedHandout = {
  title: string;
  url: string;
  description?: string;
};

export const HANDOUTS_BY_CODE: Record<string, CuratedHandout[]> = {
  CS101: [
    {
      title: "Introduction to Computing — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1H1CZEIzushamtQaayCX-kA9wa7hGGvcl&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS201: [
    {
      title: "Introduction to Programming — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1D5_5XULFnbkThMrNpUNfFXnQ9wKc-B9_&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS202: [
    {
      title: "Fundamentals of Front End Development — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1dIXlrRme314nAy8-1HcfaYI3Enli2CLL&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS205: [
    {
      title: "Information Security — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1809XW_WPMZDSVwdxcyeCTOKPcJCkpDeh&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS301: [
    {
      title: "Data Structures — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1KzQHO8lbcPmXjJFzZM3n1XtYzAM2IebS&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS302: [
    {
      title: "Digital Logic Design — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1Awo59zXcp7Sa2M769lxU0X92tKaELA2x&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS304: [
    {
      title: "Object Oriented Programming — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1jH1mKuIe0qwep0khMCWzAJJBA2GcpC3C&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS311: [
    {
      title: "Introduction to Web Services Development — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1EPPkPjsVUJQLEOtu0FC-mH5rNGJss7IA&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS402: [
    {
      title: "Theory of Automata — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1hqagRLUrUHJYaUX_OzJXhsiFCb-Qaxjp&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS405: [
    {
      title: "Database Programming using Oracle 11g — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1B-78nIIBH-8BgOhI4ymFqzp0l_8HKouB&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS407: [
    {
      title: "Routing and Switching — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1DL5ViulJvffPxFUt_Acd8d2WVeqY49_R&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS408: [
    {
      title: "Human Computer Interaction — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1HKSeqYd5lU9Io5HFT9BtNorFyyD4QVFL&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS411: [
    {
      title: "Visual Programming — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1QW6V6aJ-TLp2VzYD9UYts82bSoPzUZWB&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS435: [
    {
      title: "Cloud Computing — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1WuB-6-Q8X4Q6jgCUFwyLxMO1qI7DWxVi&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS501: [
    {
      title: "Advanced Computer Architecture — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1wc6pq43p0Udcvj3L7AYZhDRBBV8QKXF8&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS502: [
    {
      title: "Fundamentals of Algorithms — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=15icjXqR5apGYZABm5Gne77tCqcoRxjWP&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS506: [
    {
      title: "Web Design and Development — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1ARN70eMpPidliF-Cb-n551o9_boMFepG&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS601: [
    {
      title: "Data Communication — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1ZYn0y3pZoUhs2S-Wu6KHvW2wC7dkGjyZ&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS602: [
    {
      title: "Computer Graphics — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1_0EQzboFToUud4OsgziuDNf7NKvI0gvG&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS603: [
    {
      title: "Software Architecture and Design — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1AbGObse5nsugTzydwx0RNlm4uxnz2msL&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS604: [
    {
      title: "Operating Systems — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1hUhgOws0AgywVpd6sppEeaKmhFpMKZ6L&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS605: [
    {
      title: "Software Engineering-II — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1bU8EM7VUPqj3ZXxH8jnO3FPaitZ6xNN9&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS606: [
    {
      title: "Compiler Construction — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1Lifo5rB5-s0WRy3RhUWol1-QzZtpjznw&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS607: [
    {
      title: "Artificial Intelligence — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1LfQl75bRusjyjQlxE8YS1GHSPVz4NwlS&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS609: [
    {
      title: "System Programming — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1tFdJLvCPeTgKSLpozsdSV90QCO7ekjdX&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS610: [
    {
      title: "Computer Networks — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1WqvQl-Il5hlqeihulKnbglzEUHIcZ5Mo&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS611: [
    {
      title: "Software Quality Engineering — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1F3T02Pd1IyKldYutIPM7hrti6bTgLiMS&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS614: [
    {
      title: "Data Warehousing — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1LGXWuTSWruTLrSnCBXrbcZ33OjK2aten&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  CS621: [
    {
      title: "Parallel and Distributed Computing — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1sutWoB7SBMYeIou1yi8lxJqF5u67m1r9&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  ENG101: [
    {
      title: "English Comprehension — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1kFCRkg_nz5qK_01RfaxMWlb_ppD-1H0Y&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  ENG201: [
    {
      title: "Business and Technical English Writing — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1x_sJ4g2YrsaXUt6YTNsSJp8gvZTqiOVR&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  ETH202: [
    {
      title: "Ethics (for Non-Muslims) — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1JQZrU_8R0cr1Fj1t6KL84Q4HM4voU4T1&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  ISL202: [
    {
      title: "Islamic Studies — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1_IvcBexUIbVxJJOE5bSnk_NxMC7unKG_&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  MCM301: [
    {
      title: "Communication Skills — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1p0eyLeXORWhbIWI-uJ6oI0c-f0npi7F1&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  MGT502: [
    {
      title: "Organizational Behaviour — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1wn-dTzTWo7O-BrjtQuZC5931k3DeJcji&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  MGT610: [
    {
      title: "Business Ethics — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=15EX1o1GUeQz31MzNJwoQYfZWFFhe_gFw&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  MTH104: [
    {
      title: "Sets and Logic — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1Of61-siBhPKwQ0ra-2wdcrigDFRHSl4i&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  MTH202: [
    {
      title: "Discrete Mathematics — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=10DIqnmqAAk4YsTuZ2EBBEzzaVg7wZxbT&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  MTH401: [
    {
      title: "Differential Equations — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=16b9AXx1JVZ2m43ylEJ6OyTkP7fTzvsYV&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  MTH5101: [
    {
      title: "Calculus & Analytical Geometry — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1ULb7_xldYQm-j37SSxwjXHWOw-jRVCKe&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  MTH603: [
    {
      title: "Numerical Analysis — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1v04muu6Nrh2GHOckUMnYiqAzSXEhHZRG&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  PAK302: [
    {
      title: "Pakistan Studies — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1DCo4SOAqiR269hVRFaoaeBXRZ4pgeJ4p&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
  STA301: [
    {
      title: "Statistics and Probability — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1KbDKdo9CjL-JiS13O_lbb0LGY9QLB99i&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
};

export const HANDOUT_SUBJECT_COUNT = Object.keys(HANDOUTS_BY_CODE).length;
