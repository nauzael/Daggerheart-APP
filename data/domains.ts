export interface Domain {
  name: string;
  description: string;
  icon: string;
}

export const DOMAINS: Domain[] = [
  {
    name: "Arcana",
    description: "The domain of innate and instinctual magic. Tap into raw, enigmatic forces to manipulate energy and the elements.",
    icon: "M12 3L2 12l10 9 10-9L12 3zm0 2.83L17.17 12 12 17.17 6.83 12 12 5.83z"
  },
  {
    name: "Blade",
    description: "The domain of weapon mastery. Whether by steel, bow, or a more specialized arm, achieve inexorable power over death.",
    icon: "M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.22-1.05-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"
  },
  {
    name: "Bone",
    description: "The domain of tactics and the body. Gain an uncanny control over physical abilities and predict behaviors in combat.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15H11v-2h2v2zm0-4H11V7h2v6z"
  },
  {
    name: "Codex",
    description: "The domain of intensive magical study. Seek knowledge from books, scrolls, and ancient markings for a versatile understanding of magic.",
    icon: "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"
  },
  {
    name: "Grace",
    description: "The domain of charisma. Through rapturous storytelling, charming spells, or a shroud of lies, bend perception to your will.",
    icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  },
  {
    name: "Midnight",
    description: "The domain of shadows and secrecy. Practice the art of obscurity and uncover sequestered treasures through tricks, magic, or the cloak of night.",
    icon: "M21.64 13.5A8.96 8.96 0 0112 21a8.96 8.96 0 01-9.64-7.5 1 1 0 01.98-1.15 1 1 0 011.15.98A6.98 6.98 0 0012 19a6.98 6.98 0 006.5-5.63 1 1 0 011.14-1.01 1 1 0 011 1.14z"
  },
  {
    name: "Sage",
    description: "The domain of the natural world. Tap into the unfettered power of the earth and its creatures to unleash raw magic.",
    icon: "M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z"
  },
  {
    name: "Splendor",
    description: "The domain of life. Through this magic, gain the ability to heal and, to an extent, control death.",
    icon: "M12 2c-5.33 0-10 4.3-10 9.6 0 5.52 4.16 10.16 9.4 10.38.35.01.6-.26.6-.61V2.4c0-.34-.25-.6-.6-.61C11.75 2.01 11.38 2 11 2c-.34 0-.67.01-1 .03zM13 2.4v19.2c.35-.01.6.26.6.61 5.24-.22 9.4-4.86 9.4-10.38C23 6.3 18.33 2 13 2z"
  },
  {
    name: "Valor",
    description: "The domain of protection. Channel formidable strength to protect allies in battle, whether through attack or defense.",
    icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
  }
];
