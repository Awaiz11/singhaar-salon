export const SALON = {
  name: "Singhaar",
  full: "Singhaar Salon",
  area: "Block J, Model Town, Lahore",
  whatsapp: "923354679492",
  phone: "+92 335 4679492",
  maps: "https://www.google.com/maps/search/?api=1&query=Model+Town+Block+J+Lahore",
};

export const PHOTOS = {
  hero: "1721324807083-e9ddaa99310e",
  makeup: "1638628064365-f08ad0ec8245",
  hair: "1582095133179-bfd08e2fc6b3",
  mehndi: "1732118400647-a81e3b37be87",
  skin: "1570172619644-dfd03ed5d881",
  nails: "1690749138086-7422f71dc159",
  barat: "1736849544435-62169987e56c",
  mehndiBride: "1634990107998-2c56c5afa573",
  nikah: "1774814304885-bb5cc796a6c3",
  salon: "1746723378067-83a345ff3160",
};

export const img = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export type Item = { name: string; note?: string; price: string };
export type Category = { key: string; label: string; photo: string; alt: string; items: Item[] };

export const MENU: Category[] = [
  {
    key: "makeup",
    label: "Makeup",
    photo: PHOTOS.makeup,
    alt: "Makeup artist doing a bride's eye makeup",
    items: [
      { name: "Party makeup", note: "Base, eyes, lashes and setting spray", price: "7,500" },
      { name: "Engagement or nikah makeup", note: "Includes hairstyle and dupatta setting", price: "18,000" },
      { name: "Eye makeup only", note: "Smokey, glam or soft", price: "3,000" },
      { name: "Dupatta or saree setting", price: "1,500" },
    ],
  },
  {
    key: "hair",
    label: "Hair",
    photo: PHOTOS.hair,
    alt: "Stylist pinning curls into a client's updo",
    items: [
      { name: "Haircut and blow-dry", price: "2,500" },
      { name: "Blow-dry", note: "Straight or soft waves", price: "1,500" },
      { name: "Party hairstyle", note: "Bun, braid or curls", price: "3,500" },
      { name: "Root colour", note: "Ammonia-free colour", price: "4,500" },
      { name: "Keratin treatment", note: "Price depends on length", price: "from 18,000" },
    ],
  },
  {
    key: "mehndi",
    label: "Mehndi",
    photo: PHOTOS.mehndi,
    alt: "Hands covered in fresh bridal mehndi",
    items: [
      { name: "Bridal mehndi", note: "Both hands and feet, full arms", price: "15,000" },
      { name: "Party mehndi", note: "Front of both hands", price: "2,500" },
      { name: "Arabic style", note: "One hand, front and back", price: "1,200" },
    ],
  },
  {
    key: "skin",
    label: "Skin",
    photo: PHOTOS.skin,
    alt: "Client relaxing with a face mask during a facial",
    items: [
      { name: "Classic facial", note: "Cleanse, scrub, massage and mask", price: "3,500" },
      { name: "Hydra facial", note: "Deep clean for wedding-season skin", price: "7,000" },
      { name: "Full-face threading", price: "600" },
      { name: "Full-arm wax", price: "1,800" },
    ],
  },
  {
    key: "nails",
    label: "Nails",
    photo: PHOTOS.nails,
    alt: "Nail technician painting a client's nails",
    items: [
      { name: "Manicure", price: "2,000" },
      { name: "Pedicure", price: "2,800" },
      { name: "Gel polish, hands", note: "Lasts two to three weeks", price: "3,500" },
      { name: "Nail extensions", note: "Acrylic or gel", price: "6,000" },
    ],
  },
];

export const PACKAGES = [
  { key: "mehndi", name: "Mehndi", price: "28,000" },
  { key: "barat", name: "Barat", price: "48,000" },
  { key: "walima", name: "Walima", price: "38,000" },
] as const;

export type PackageKey = (typeof PACKAGES)[number]["key"];

export const INCLUDES: { label: string; in: PackageKey[] | "all"; note?: string }[] = [
  { label: "Makeup by our senior artist", in: "all" },
  { label: "Hairstyle and dupatta setting", in: "all" },
  { label: "Bridal mehndi, hands and feet", in: ["mehndi"] },
  { label: "Mink lashes", in: ["barat", "walima"] },
  { label: "Trial session two weeks before", in: ["barat"] },
  { label: "Touch-up kit for the evening", in: ["barat", "walima"] },
];

export const ALL_THREE = { price: "105,000", saves: "9,000" };

// 0 = Sunday. Monday closed.
export const OPEN: Record<number, { from: number; to: number } | null> = {
  0: { from: 11, to: 20 },
  1: null,
  2: { from: 11, to: 20 },
  3: { from: 11, to: 20 },
  4: { from: 11, to: 20 },
  5: { from: 14, to: 20 },
  6: { from: 11, to: 20 },
};

export const HOURS = [
  { days: "Tuesday to Thursday", time: "11 am – 8 pm" },
  { days: "Friday", time: "2 pm – 8 pm" },
  { days: "Saturday and Sunday", time: "11 am – 8 pm" },
  { days: "Monday", time: "Closed" },
];

export const HOME_AREAS = ["Model Town", "Garden Town", "Faisal Town", "Johar Town", "Gulberg"];
