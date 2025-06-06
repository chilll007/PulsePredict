// Mock data for recent analyses
export const mockAnalyses = [
  {
    id: "demo",
    title: "Client Meeting - Project Timeline",
    date: "Oct 15, 2025",
    outcome: "positive" as const,
    confidence: 91,
    source: "Zoom Recording",
  },
  {
    id: "a2",
    title: "Sales Call - Enterprise Solution",
    date: "Oct 12, 2025",
    outcome: "at-risk" as const,
    confidence: 65,
    source: "Phone Call Recording",
  },
  {
    id: "a3",
    title: "Customer Support - Technical Issue",
    date: "Oct 10, 2025",
    outcome: "negative" as const,
    confidence: 82,
    source: "Chat Transcript",
  },
  {
    id: "a4",
    title: "Team Meeting - Quarterly Review",
    date: "Oct 8, 2025",
    outcome: "positive" as const,
    confidence: 88,
    source: "Teams Recording",
  },
  {
    id: "a5",
    title: "HR Interview - Senior Developer",
    date: "Oct 5, 2025",
    outcome: "at-risk" as const,
    confidence: 73,
    source: "Zoom Recording",
  }
];

// Mock data for detailed analysis result
export const mockResults = {
  id: "demo",
  title: "Client Meeting - Project Timeline",
  date: "October 15, 2025 · 10:30 AM",
  outcome: "positive" as const,
  confidence: 91,
  source: "Zoom Recording",
  duration: "34:18",
  metrics: {
    duration: "34m",
    speakers: 2,
    messages: 42,
    keyTopics: 5
  },
  insights: [
    {
      title: "Initial Concern Successfully Addressed",
      description: "The client expressed timeline concerns that were effectively resolved with clear communication about resource allocation."
    },
    {
      title: "Positive Budget Discussion",
      description: "Budget implications were handled well, with the account manager providing assurances that costs would be absorbed."
    },
    {
      title: "Strong Relationship Building",
      description: "The conversation established trust and confidence, with the client expressing appreciation for the team's commitment."
    },
    {
      title: "Clear Action Items Established",
      description: "Both parties agreed on specific next steps and delivery milestones with clear ownership."
    }
  ]
};