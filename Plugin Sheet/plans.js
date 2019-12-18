var plans = {
  free: {
    name: "Free",
    description:
      "Use the free plan to achieve simple projects and test the mecanisme of Simple Templating.",
    price: 0,
    specifications: {
      texts: 4,
      images: 1,
      colors: 1,
      cardsPerRow: 25,
      cardsPerMonth: 250,
      multiCards: false
    }
  },
  essentials: {
    name: "Essentials",
    description:
      "Start playing for real and develop more complexe project with the Essentials Plan!",
    price: 4.99,
    specifications: {
      texts: "infinite",
      images: 2,
      colors: 2,
      cardsPerRow: 50,
      cardsPerMonth: 1000,
      multiCards: true
    }
  },
  premium: {
    name: "Premium",
    description: "Premium plan for pros whith rich graphical needs!",
    price: 14.99,
    specifications: {
      texts: "infinite",
      images: "infinite",
      colors: "infinite",
      cardsPerRow: "infinite",
      cardsPerMonth: "infinite",
      multiCards: true,
      qrcodeGenerator: true
    }
  }
};
