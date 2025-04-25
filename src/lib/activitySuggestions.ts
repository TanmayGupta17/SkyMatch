import type { ActivitySuggestion } from "@/types";

export function getActivitiesByWeather(
  weatherCondition: string
): ActivitySuggestion[] {
  const condition = weatherCondition.toLowerCase();

  if (condition.includes("clear") || condition.includes("sun")) {
    return [
      {
        title: "Go Stargazing",
        description:
          "The clear skies are perfect for observing stars and constellations tonight.",
        icon: "moon-stars",
      },
      {
        title: "Plan a Picnic",
        description:
          "Enjoy the beautiful weather with a picnic in the park or by the lake.",
        icon: "utensils",
      },
      {
        title: "Outdoor Photography",
        description:
          "Capture stunning photos with the perfect natural lighting.",
        icon: "camera",
      },
      {
        title: "Go Hiking",
        description:
          "Explore nature trails and enjoy the sunshine and fresh air.",
        icon: "mountain",
      },
    ];
  }

  if (condition.includes("rain") || condition.includes("drizzle")) {
    return [
      {
        title: "Movie Marathon",
        description:
          "Stay cozy indoors with a movie marathon of your favorite films.",
        icon: "film",
      },
      {
        title: "Baking Adventure",
        description:
          "Try a new baking recipe while enjoying the soothing sound of rain.",
        icon: "cake",
      },
      {
        title: "Read a Book",
        description: "Curl up with a good book and a warm drink.",
        icon: "book",
      },
      {
        title: "Indoor Plant Care",
        description:
          "Give some attention to your indoor plants or start a new terrarium.",
        icon: "seedling",
      },
    ];
  }

  if (condition.includes("snow")) {
    return [
      {
        title: "Build a Snow Fort",
        description:
          "Channel your inner architect and build an epic snow fort or snowman.",
        icon: "snowflake",
      },
      {
        title: "Hot Cocoa Tasting",
        description: "Try different hot cocoa recipes with various toppings.",
        icon: "mug-hot",
      },
      {
        title: "Winter Photography",
        description: "Capture the serene beauty of the snow-covered landscape.",
        icon: "camera",
      },
      {
        title: "Bake Comfort Food",
        description: "Warm up with homemade comfort food like soups or stews.",
        icon: "utensils",
      },
    ];
  }

  if (condition.includes("cloud")) {
    return [
      {
        title: "Visit a Museum",
        description:
          "Explore local museums or art galleries on this cloudy day.",
        icon: "landmark",
      },
      {
        title: "Coffee Shop Hopping",
        description:
          "Discover new coffee shops and try their specialty drinks.",
        icon: "coffee",
      },
      {
        title: "Moody Photography",
        description:
          "Take advantage of the diffused light for dramatic photos.",
        icon: "camera",
      },
      {
        title: "Indoor Exercise",
        description: "Try a new workout routine or yoga session at home.",
        icon: "dumbbell",
      },
    ];
  }

  if (condition.includes("thunder") || condition.includes("storm")) {
    return [
      {
        title: "Board Game Night",
        description:
          "Gather friends or family for a fun board game competition.",
        icon: "dice",
      },
      {
        title: "Storm Watching",
        description:
          "Observe the powerful beauty of the storm from a safe location.",
        icon: "cloud-bolt",
      },
      {
        title: "Creative Writing",
        description: "Let the dramatic weather inspire your creative writing.",
        icon: "pen",
      },
      {
        title: "DIY Craft Project",
        description: "Start a new craft project you've been meaning to try.",
        icon: "scissors",
      },
    ];
  }

  if (condition.includes("mist") || condition.includes("fog")) {
    return [
      {
        title: "Atmospheric Photography",
        description: "Capture the mysterious beauty of the foggy landscape.",
        icon: "camera",
      },
      {
        title: "Mystery Novel Reading",
        description:
          "The perfect weather to dive into a thrilling mystery novel.",
        icon: "book",
      },
      {
        title: "Meditation Session",
        description:
          "Use the calm, misty atmosphere for a peaceful meditation.",
        icon: "spa",
      },
      {
        title: "Plan a Future Trip",
        description: "Research and plan your next vacation or adventure.",
        icon: "plane",
      },
    ];
  }

  // Default activities for any other weather condition
  return [
    {
      title: "Try a New Recipe",
      description: "Experiment with a new recipe you've been wanting to try.",
      icon: "utensils",
    },
    {
      title: "Call a Friend",
      description:
        "Catch up with a friend or family member you haven't spoken to in a while.",
      icon: "phone",
    },
    {
      title: "Learn Something New",
      description: "Take an online course or tutorial to learn a new skill.",
      icon: "graduation-cap",
    },
    {
      title: "Declutter Space",
      description: "Organize and declutter a small area of your home.",
      icon: "broom",
    },
  ];
}
