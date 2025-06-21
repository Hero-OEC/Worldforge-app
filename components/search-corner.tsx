"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, ChevronUp, ChevronDown } from "lucide-react"

interface SearchResult {
  eventId: string
  groupIndex: number
  matchType: "title" | "character" | "location" | "description" | "category"
  matchText: string
}

interface SearchCornerProps {
  onSearch?: (query: string, results: SearchResult[]) => void
  onNavigateResult?: (result: SearchResult, currentIndex: number, totalResults: number) => void
  placeholder?: string
  events: any[]
}

export function SearchCorner({
  onSearch,
  onNavigateResult,
  placeholder = "Search events...",
  events,
}: SearchCornerProps) {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [currentResultIndex, setCurrentResultIndex] = useState(0)

  // Group events by date to match the timeline structure
  const groupedEvents = events.reduce(
    (groups, event) => {
      const dateKey = event.date
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(event)
      return groups
    },
    {} as Record<string, any[]>,
  )

  const eventGroups = Object.values(groupedEvents)

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setCurrentResultIndex(0)
      if (onSearch) {
        onSearch("", [])
      }
      return
    }

    const results: SearchResult[] = []
    const lowerQuery = searchQuery.toLowerCase()

    eventGroups.forEach((eventGroup, groupIndex) => {
      eventGroup.forEach((event) => {
        // Search in title
        if (event.title.toLowerCase().includes(lowerQuery)) {
          results.push({
            eventId: event.id,
            groupIndex,
            matchType: "title",
            matchText: event.title,
          })
        }

        // Search in characters
        event.characters.forEach((character: string) => {
          if (character.toLowerCase().includes(lowerQuery)) {
            results.push({
              eventId: event.id,
              groupIndex,
              matchType: "character",
              matchText: character,
            })
          }
        })

        // Search in location
        if (event.location.toLowerCase().includes(lowerQuery)) {
          results.push({
            eventId: event.id,
            groupIndex,
            matchType: "location",
            matchText: event.location,
          })
        }

        // Search in description
        if (event.description.toLowerCase().includes(lowerQuery)) {
          results.push({
            eventId: event.id,
            groupIndex,
            matchType: "description",
            matchText: event.description,
          })
        }

        // Search in category
        if (event.category && event.category.toLowerCase().includes(lowerQuery)) {
          results.push({
            eventId: event.id,
            groupIndex,
            matchType: "category",
            matchText: event.category,
          })
        }
      })
    })

    // Remove duplicates (same event might match multiple criteria)
    const uniqueResults = results.filter(
      (result, index, self) =>
        index === self.findIndex((r) => r.eventId === result.eventId && r.groupIndex === result.groupIndex),
    )

    setSearchResults(uniqueResults)
    setCurrentResultIndex(0)

    if (onSearch) {
      onSearch(searchQuery, uniqueResults)
    }

    // Navigate to first result if available
    if (uniqueResults.length > 0 && onNavigateResult) {
      onNavigateResult(uniqueResults[0], 0, uniqueResults.length)
    }
  }

  const handleSearch = () => {
    performSearch(query)
  }

  const handleClear = () => {
    setQuery("")
    setSearchResults([])
    setCurrentResultIndex(0)
    if (onSearch) {
      onSearch("", [])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      performSearch(query)
    }
  }

  const navigateToNext = () => {
    if (searchResults.length === 0) return

    const nextIndex = (currentResultIndex + 1) % searchResults.length
    setCurrentResultIndex(nextIndex)

    if (onNavigateResult) {
      onNavigateResult(searchResults[nextIndex], nextIndex, searchResults.length)
    }
  }

  const navigateToPrevious = () => {
    if (searchResults.length === 0) return

    const prevIndex = currentResultIndex === 0 ? searchResults.length - 1 : currentResultIndex - 1
    setCurrentResultIndex(prevIndex)

    if (onNavigateResult) {
      onNavigateResult(searchResults[prevIndex], prevIndex, searchResults.length)
    }
  }

  return (
    <div className="fixed top-20 right-4 z-40">
      <div className="bg-parchment-50 border border-parchment-300 rounded-lg shadow-lg p-2">
        <div className="flex items-center gap-2 max-w-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink-500" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="pl-10 pr-10 bg-parchment-50 border-parchment-300 text-ink-700 placeholder-ink-400 focus:border-accent-500 focus:ring-accent-500 text-sm"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-ink-500 hover:text-ink-700"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Search Results Navigation */}
          {searchResults.length > 0 && (
            <div className="flex items-center gap-1 bg-parchment-100 rounded px-2 py-1 border border-parchment-300">
              <span className="text-xs text-ink-600 whitespace-nowrap font-medium">
                {currentResultIndex + 1} of {searchResults.length}
              </span>
              <div className="flex flex-col">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={navigateToPrevious}
                  className="h-4 w-6 p-0 text-ink-500 hover:text-ink-700 hover:bg-parchment-200"
                >
                  <ChevronUp className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={navigateToNext}
                  className="h-4 w-6 p-0 text-ink-500 hover:text-ink-700 hover:bg-parchment-200"
                >
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}

          <Button onClick={handleSearch} size="sm" className="bg-accent-500 hover:bg-accent-600 text-parchment-50">
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
