import { SiTypescript } from "react-icons/si";
import { IoLogoNodejs } from "react-icons/io";
import { HiOutlineHashtag } from "react-icons/hi";
import { TBlogTopicData, TDesignPatternData } from "@type/types";

const topicsData: { [key: string]: TBlogTopicData } = {
  pattern: { icon: <HiOutlineHashtag size={15} color="#acbcc7"/>, title: "Design Pattern" },
  ts: { icon: <SiTypescript size={26} color="#2F74C0"/>, title: "TypeScript" },
  node: { icon: <IoLogoNodejs size={26} color="#63975E"/>, title: "NodeJS" }
}

export const designPaternsData: {
  creational: TDesignPatternData[],
  structural: TDesignPatternData[],
  behavioral: TDesignPatternData[]
} = {
  creational: [
    { 
      name: "Factory Method Design Pattern",
      emoji: "🏭",
      author: "Mai Tue",
      publish: new Date(2023, 4, 20),
      url: "#/factory-method",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Abstract Factory Design Pattern",
      emoji: "🏗️",
      author: "Kien Trung",
      publish: new Date(2023, 4, 20),
      url: "#/abstract-factory",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Builder Design Pattern",
      emoji: "⚒️",
      author: "Mai Tue",
      publish: new Date(2023, 4, 20),
      url: "#/builder",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Prototype Design Pattern",
      emoji: "🪲",
      author: "Kien Trung",
      publish: new Date(2023, 4, 20),
      url: "#/prototype",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Singleton Design Pattern",
      emoji: "1️⃣",
      author: "Mai Tue",
      publish: new Date(2023, 4, 20),
      url: "#/singleton",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    }
  ],
  structural: [
    { 
      name: "Adapter Design Pattern",
      emoji: "🪝",
      author: "Kien Trung",
      publish: new Date(2023, 4, 20),
      url: "#/adapter",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Bridge Design Pattern",
      emoji: "🌉",
      author: "Mai Tue",
      publish: new Date(2023, 4, 20),
      url: "#/bridge",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Composite Design Pattern",
      emoji: "🥪",
      author: "Kien Trung",
      publish: new Date(2023, 4, 20),
      url: "#/composite",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Decorator Design Pattern",
      emoji: "🪄",
      author: "Mai Tue",
      publish: new Date(2023, 4, 20),
      url: "#/decorator",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Facade Design Pattern",
      emoji: "🏛️",
      author: "Kien Trung",
      publish: new Date(2023, 4, 20),
      url: "#/facade",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Flyweight Design Pattern",
      emoji: "🎢",
      author: "Mai Tue",
      publish: new Date(2023, 4, 20),
      url: "#/flyweight",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Proxy Design Pattern",
      emoji: "⚗️",
      author: "Kien Trung",
      publish: new Date(2023, 4, 20),
      url: "#/proxy",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    }
  ],
  behavioral: [
    { 
      name: "Chain of Responsibility Design Pattern",
      emoji: "⛓️",
      author: "Kien Trung",
      publish: new Date(2023, 4, 20),
      url: "#/chain-of-responsibility",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Command Design Pattern",
      emoji: "🖇️",
      author: "Mai Tue",
      publish: new Date(2023, 4, 20),
      url: "#/command",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Iterator Design Pattern",
      emoji: "🎞️",
      author: "Mai Tue",
      publish: new Date(2023, 4, 20),
      url: "#/iterator",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Mediator Design Pattern",
      emoji: "🧩",
      author: "Mai Tue",
      publish: new Date(2023, 4, 20),
      url: "#/mediator",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Memento Design Pattern",
      emoji: "💾",
      author: "Mai Tue",
      publish: new Date(2023, 4, 20),
      url: "#/memento",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Observer Design Pattern",
      emoji: "👀",
      author: "Kien Trung",
      publish: new Date(2023, 4, 20),
      url: "#/observer",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "State Design Pattern",
      emoji: "📟",
      author: "Mai Tue",
      publish: new Date(2023, 4, 20),
      url: "#/state",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Strategy Design Pattern",
      emoji: "🐣",
      author: "Kien Trung",
      publish: new Date(2023, 4, 20),
      url: "#/strategy",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Template Method Design Pattern",
      emoji: "🚠",
      author: "Kien Trung",
      publish: new Date(2023, 4, 20),
      url: "#/template-method",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    },
    { 
      name: "Visitor Design Pattern",
      emoji: "🪬",
      author: "Kien Trung",
      publish: new Date(2023, 4, 20),
      url: "#/visitor",
      topics: [topicsData["pattern"], topicsData["ts"], topicsData["node"]]
    }
  ]
}