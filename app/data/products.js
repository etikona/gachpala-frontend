const products = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 29.99,
    category: "Tropical",
    rating: 4.5,
    tags: ["Popular", "Low Maintenance"],
    description:
      "The iconic Swiss Cheese Plant with beautiful fenestrated leaves. This tropical beauty is perfect for adding a jungle vibe to your space.",
    care: "Prefers bright, indirect light. Water when top 2 inches of soil are dry.",
    reviews: [
      {
        id: 1,
        user: "Alex J.",
        rating: 5,
        comment:
          "Arrived in perfect condition! Already putting out new leaves.",
        date: "2023-10-15",
      },
      {
        id: 2,
        user: "Sam R.",
        rating: 4,
        comment: "Beautiful plant but took a while to adjust to my space.",
        date: "2023-09-28",
      },
    ],
  },
  {
    id: 2,
    name: "Snake Plant Laurentii",
    price: 24.99,
    category: "Air Purifying",
    rating: 4.8,
    tags: ["Pet Friendly"],
    description:
      "A hardy, air-purifying plant with striking vertical leaves featuring golden-yellow edges. Perfect for beginners.",
    care: "Thrives in low to bright indirect light. Water sparingly.",
    reviews: [
      {
        id: 1,
        user: "Taylor M.",
        rating: 5,
        comment: "Impossible to kill! Survived my vacation neglect.",
        date: "2023-11-02",
      },
    ],
  },
  {
    id: 3,
    name: "Golden Pothos",
    price: 18.99,
    category: "Pet Friendly",
    rating: 4.3,
    tags: ["Fast Growing"],
    description:
      "A versatile trailing vine with heart-shaped leaves marbled in golden yellow. Great for hanging baskets.",
    care: "Adapts to various light conditions. Water when soil is dry.",
    reviews: [
      {
        id: 1,
        user: "Jordan K.",
        rating: 4,
        comment: "Grows like crazy! Perfect for my bookshelf.",
        date: "2023-10-22",
      },
    ],
  },
  {
    id: 4,
    name: "ZZ Plant",
    price: 34.99,
    category: "Low Light",
    rating: 4.6,
    tags: ["Low Light"],
    description:
      "An ultra-tough plant with glossy, oval-shaped leaves that thrive in low-light conditions.",
    care: "Water infrequently. Tolerates neglect well.",
    reviews: [
      {
        id: 1,
        user: "Casey L.",
        rating: 5,
        comment: "Thriving in my dark apartment corner!",
        date: "2023-09-15",
      },
    ],
  },
  {
    id: 5,
    name: "Fiddle Leaf Fig",
    price: 49.99,
    category: "Tropical",
    rating: 4.2,
    tags: ["Statement Piece"],
    description:
      "A popular statement plant with large, violin-shaped leaves that add dramatic flair to any room.",
    care: "Needs bright, indirect light. Avoid overwatering.",
    reviews: [
      {
        id: 1,
        user: "Riley T.",
        rating: 4,
        comment: "Beautiful but a bit finicky. Worth the effort!",
        date: "2023-11-10",
      },
    ],
  },
  {
    id: 6,
    name: "String of Pearls",
    price: 15.99,
    category: "Succulents",
    rating: 4.7,
    tags: ["Hanging", "Unique"],
    description:
      "A unique succulent with trailing stems adorned with small, bead-like leaves. Perfect for hanging planters.",
    care: "Prefers bright light. Water when soil is completely dry.",
    reviews: [
      {
        id: 1,
        user: "Morgan P.",
        rating: 5,
        comment: "So cute! Growing beautifully in my sunny window.",
        date: "2023-10-05",
      },
    ],
  },
  {
    id: 7,
    name: "Rubber Plant",
    price: 32.99,
    category: "Air Purifying",
    rating: 4.4,
    tags: ["Low Maintenance"],
    description:
      "A bold plant with large, glossy leaves that range from deep green to burgundy.",
    care: "Prefers bright, indirect light. Water moderately.",
    reviews: [
      {
        id: 1,
        user: "Avery S.",
        rating: 4,
        comment: "Gorgeous deep green leaves. Easy to care for.",
        date: "2023-11-15",
      },
    ],
  },
  {
    id: 8,
    name: "Peace Lily",
    price: 22.99,
    category: "Flowering",
    rating: 4.1,
    tags: ["Air Purifying", "Blooms"],
    description:
      "An elegant plant with dark green leaves and white flowers that bloom periodically.",
    care: "Thrives in low to medium light. Keep soil moist.",
    reviews: [
      {
        id: 1,
        user: "Quinn V.",
        rating: 4,
        comment: "Bloomed twice already! Very happy with it.",
        date: "2023-09-30",
      },
    ],
  },
  {
    id: 9,
    name: "Bird of Paradise",
    price: 54.99,
    category: "Tropical",
    rating: 4.9,
    tags: ["Large", "Statement"],
    description:
      "A stunning tropical plant with large, banana-like leaves that evoke a jungle paradise.",
    care: "Needs bright light. Water regularly during growing season.",
    reviews: [
      {
        id: 1,
        user: "Jamie K.",
        rating: 5,
        comment: "Absolutely stunning centerpiece for my living room!",
        date: "2023-10-18",
      },
    ],
  },
];

export default products;
