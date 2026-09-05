// Official course handouts for VU BSCS Semester 1 subjects.
// Curated static entries (direct Google Drive download links) — these are
// merged with community-submitted handouts from the database on subject
// pages. Add more here as official handouts are collected.

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
  MTH202: [
    {
      title: "Discrete Mathematics — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=10DIqnmqAAk4YsTuZ2EBBEzzaVg7wZxbT&export=download",
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
  ENG101: [
    {
      title: "English Comprehension — Complete Handouts (PDF)",
      url: "https://drive.usercontent.google.com/u/0/uc?id=1kFCRkg_nz5qK_01RfaxMWlb_ppD-1H0Y&export=download",
      description: "Full official VU handout book, all lectures.",
    },
  ],
};

export const HANDOUT_SUBJECT_COUNT = Object.keys(HANDOUTS_BY_CODE).length;
