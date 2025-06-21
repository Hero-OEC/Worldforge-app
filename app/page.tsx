"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { SearchCorner } from "@/components/search-corner"
import { SerpentineTimeline } from "@/components/serpentine-timeline"
import { AddEventModal } from "@/components/add-event-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Event {
  id: string
  title: string
  date: string
  fullDate: Date
  description: string
  characters: string[]
  location: string
  importance: "low" | "medium" | "high"
  category?: string
  hour?: string
}

interface SearchResult {
  eventId: string
  groupIndex: number
  matchType: "title" | "character" | "location" | "description" | "category"
  matchText: string
}

// Sample data showcasing all category icons with varied times and importance
const initialEvents: Event[] = [
  {
    id: "1",
    title: "Elena's Awakening",
    date: "Year 1, Day 5",
    fullDate: new Date(2024, 0, 5),
    description: "Elena discovers her true magical potential during a routine training session.",
    characters: ["Elena", "Marcus"],
    location: "Arcanum City",
    importance: "high",
    category: "Character Development",
    hour: "Morning (8:00)",
  },
  {
    id: "2",
    title: "The Forbidden Library",
    date: "Year 1, Day 12",
    fullDate: new Date(2024, 0, 12),
    description: "Elena and Marcus uncover ancient texts in the hidden library.",
    characters: ["Elena", "Marcus"],
    location: "Arcanum City",
    importance: "medium",
    category: "Discovery",
    hour: "Evening (19:00)",
  },
  {
    id: "3",
    title: "First Encounter",
    date: "Year 1, Day 18",
    fullDate: new Date(2024, 0, 18),
    description: "Elena faces her first real enemy in the Whispering Woods.",
    characters: ["Elena"],
    location: "The Whispering Woods",
    importance: "high",
    category: "Conflict",
    hour: "Afternoon (14:00)",
  },
  {
    id: "4",
    title: "The Mentor's Secret",
    date: "Year 1, Day 25",
    fullDate: new Date(2024, 0, 25),
    description: "Marcus reveals his connection to Elena's past.",
    characters: ["Elena", "Marcus"],
    location: "Travelling",
    importance: "high",
    category: "Revelation",
    hour: "Midnight (0:00)",
  },
  {
    id: "5",
    title: "Village Rescue",
    date: "Year 1, Day 33",
    fullDate: new Date(2024, 1, 2),
    description: "Elena saves a village from magical creatures.",
    characters: ["Elena"],
    location: "Millbrook Village",
    importance: "medium",
    category: "Heroic Act",
    hour: "Dawn (6:00)",
  },
  {
    id: "6",
    title: "The Crown's Decree",
    date: "Year 1, Day 41",
    fullDate: new Date(2024, 1, 10),
    description: "The king issues a decree that changes the political landscape of the realm.",
    characters: ["King Aldric", "Elena", "Marcus"],
    location: "Royal Palace",
    importance: "high",
    category: "Political Event",
    hour: "Noon (12:00)",
  },
  {
    id: "7",
    title: "Hearts Entwined",
    date: "Year 1, Day 48",
    fullDate: new Date(2024, 1, 17),
    description: "Elena and Marcus share their first romantic moment under the starlit sky.",
    characters: ["Elena", "Marcus"],
    location: "Moonlit Garden",
    importance: "medium",
    category: "Romance",
    hour: "Late Night (23:30)",
  },
  {
    id: "8",
    title: "The Vanishing Merchant",
    date: "Year 1, Day 56",
    fullDate: new Date(2024, 1, 25),
    description: "A mysterious merchant disappears, leaving behind only cryptic clues.",
    characters: ["Elena", "Mysterious Merchant"],
    location: "Market Square",
    importance: "medium",
    category: "Mystery",
    hour: "Evening (18:45)",
  },
  {
    id: "9",
    title: "Elemental Convergence",
    date: "Year 1, Day 63",
    fullDate: new Date(2024, 2, 4),
    description: "Elena learns to harness the power of all four elements simultaneously.",
    characters: ["Elena", "Archmage Theron"],
    location: "Elemental Sanctum",
    importance: "high",
    category: "Magic",
    hour: "Sunrise (6:15)",
  },
  {
    id: "10",
    title: "The Great Battle of Thornfield",
    date: "Year 1, Day 71",
    fullDate: new Date(2024, 2, 12),
    description: "Epic battle against the Shadow Lord's army on the plains of Thornfield.",
    characters: ["Elena", "Marcus", "Zara", "Shadow Lord"],
    location: "Thornfield Plains",
    importance: "high",
    category: "Battle",
    hour: "Dawn (5:30)",
  },
  {
    id: "11",
    title: "Journey to the Northern Wastes",
    date: "Year 1, Day 78",
    fullDate: new Date(2024, 2, 19),
    description: "Elena and her companions embark on a perilous journey across the frozen wasteland.",
    characters: ["Elena", "Marcus", "Zara"],
    location: "Northern Wastes",
    importance: "medium",
    category: "Traveling",
    hour: "Morning (7:30)",
  },
  {
    id: "12",
    title: "The Lost Artifact",
    date: "Year 1, Day 85",
    fullDate: new Date(2024, 2, 26),
    description: "Discovery of an ancient artifact that holds the key to defeating darkness.",
    characters: ["Elena", "Marcus"],
    location: "Crystal Caves",
    importance: "high",
    category: "Discovery",
    hour: "Deep Night (3:00)",
  },
  {
    id: "13",
    title: "Betrayal in the Ranks",
    date: "Year 1, Day 92",
    fullDate: new Date(2024, 3, 3),
    description: "A trusted ally reveals their true allegiance to the enemy.",
    characters: ["Elena", "Marcus", "Captain Darius"],
    location: "War Camp",
    importance: "high",
    category: "Conflict",
    hour: "Night (22:15)",
  },
  {
    id: "14",
    title: "The Oracle's Vision",
    date: "Year 1, Day 99",
    fullDate: new Date(2024, 3, 10),
    description: "The Oracle reveals a shocking truth about Elena's destiny.",
    characters: ["Elena", "Oracle Seraphina"],
    location: "Temple of Visions",
    importance: "high",
    category: "Revelation",
    hour: "Twilight (19:45)",
  },
  {
    id: "15",
    title: "Saving the Children",
    date: "Year 1, Day 106",
    fullDate: new Date(2024, 3, 17),
    description: "Elena risks everything to rescue kidnapped children from dark cultists.",
    characters: ["Elena", "Village Children"],
    location: "Dark Fortress",
    importance: "medium",
    category: "Heroic Act",
    hour: "Afternoon (15:20)",
  },
  {
    id: "16",
    title: "The Peace Treaty",
    date: "Year 1, Day 113",
    fullDate: new Date(2024, 3, 24),
    description: "Negotiations for a crucial peace treaty between warring kingdoms.",
    characters: ["Elena", "King Aldric", "Queen Morwyn"],
    location: "Neutral Grounds",
    importance: "high",
    category: "Political Event",
    hour: "Midday (11:30)",
  },
  {
    id: "17",
    title: "A Promise of Forever",
    date: "Year 1, Day 120",
    fullDate: new Date(2024, 4, 1),
    description: "Marcus proposes to Elena in a moment of quiet between battles.",
    characters: ["Elena", "Marcus"],
    location: "Enchanted Grove",
    importance: "medium",
    category: "Romance",
    hour: "Sunset (20:10)",
  },
  {
    id: "18",
    title: "The Cipher's Secret",
    date: "Year 1, Day 127",
    fullDate: new Date(2024, 4, 8),
    description: "Elena decodes a mysterious cipher that reveals enemy plans.",
    characters: ["Elena", "Scholar Aldwin"],
    location: "Ancient Library",
    importance: "medium",
    category: "Mystery",
    hour: "Late Evening (21:40)",
  },
  {
    id: "19",
    title: "Forbidden Spell Unleashed",
    date: "Year 1, Day 134",
    fullDate: new Date(2024, 4, 15),
    description: "Elena accidentally unleashes a forbidden spell with devastating consequences.",
    characters: ["Elena"],
    location: "Shadow Valley",
    importance: "high",
    category: "Magic",
    hour: "Noon (12:30)",
  },
  {
    id: "20",
    title: "Siege of the Capital",
    date: "Year 1, Day 141",
    fullDate: new Date(2024, 4, 22),
    description: "The final battle as enemy forces lay siege to the capital city.",
    characters: ["Elena", "Marcus", "Zara", "King Aldric"],
    location: "Capital City",
    importance: "high",
    category: "Battle",
    hour: "Pre-Dawn (4:45)",
  },
]

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [highlightedGroupIndex, setHighlightedGroupIndex] = useState<number | null>(null)
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  const timelineRef = useRef<{ scrollToGroup: (groupIndex: number) => void }>(null)

  // This would come from your project settings/context in the future
  const projectTitle = "The Chronicles of Elena"

  const handleLogoClick = () => {
    // Navigate to books page
    window.location.href = "/books"
  }

  const handleSearch = (query: string, results: SearchResult[]) => {
    if (results.length === 0) {
      setHighlightedGroupIndex(null)
    }
  }

  const handleNavigateResult = (result: SearchResult, currentIndex: number, totalResults: number) => {
    setHighlightedGroupIndex(result.groupIndex)

    // Scroll to the highlighted group
    if (timelineRef.current) {
      timelineRef.current.scrollToGroup(result.groupIndex)
    }
  }

  const handleAddEvent = (newEventData: Omit<Event, "id" | "fullDate">) => {
    // Parse the date to create a proper Date object
    // This is a simple parser - you might want to make this more sophisticated
    const dateMatch = newEventData.date.match(/Year (\d+), Day (\d+)/)
    let fullDate = new Date()

    if (dateMatch) {
      const year = Number.parseInt(dateMatch[1])
      const day = Number.parseInt(dateMatch[2])
      // Create a date based on year and day (simplified)
      fullDate = new Date(2024 + year - 1, 0, day)
    }

    const newEvent: Event = {
      ...newEventData,
      id: `event-${Date.now()}`, // Simple ID generation
      fullDate,
    }

    setEvents((prev) => [...prev, newEvent])
  }

  return (
    <div className="min-h-screen bg-parchment-200">
      {/* Header */}
      <Header currentPage="timeline" projectTitle={projectTitle} onLogoClick={handleLogoClick} />

      {/* Search Corner - positioned under header */}
      <SearchCorner events={events} onSearch={handleSearch} onNavigateResult={handleNavigateResult} />

      {/* Main Content - increased top padding to account for search corner */}
      <main className="pt-[145px] p-[50px]">
        <section className="max-w-6xl mx-auto">
          {/* Page Title with Add Event Button */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-ink-700">{projectTitle} – Timeline</h1>
            <Button
              onClick={() => setIsAddEventModalOpen(true)}
              size="sm"
              className="bg-accent-500 hover:bg-accent-600 text-parchment-50 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </Button>
          </div>

          {/* Serpentine timeline */}
          <SerpentineTimeline
            ref={timelineRef}
            events={events}
            highlightedGroupIndex={highlightedGroupIndex}
            onEventClick={(event) => {
              //  you can handle navigation to a dedicated event page here
              console.log("Clicked event:", event.title)
            }}
          />
        </section>
      </main>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onSave={handleAddEvent}
      />
    </div>
  )
}
