"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Calendar, ArrowRight, X } from "lucide-react"

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
}

interface VisualTimelineProps {
  events: Event[]
  onEventClick: (event: Event) => void
}

export function VisualTimeline({ events, onEventClick }: VisualTimelineProps) {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime())

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "bg-red-500 border-red-600 shadow-red-200"
      case "medium":
        return "bg-yellow-500 border-yellow-600 shadow-yellow-200"
      case "low":
        return "bg-green-500 border-green-600 shadow-green-200"
      default:
        return "bg-blue-500 border-blue-600 shadow-blue-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Character Development":
        return "👤"
      case "Discovery":
        return "🔍"
      case "Conflict":
        return "⚔️"
      case "Revelation":
        return "💡"
      case "Heroic Act":
        return "🛡️"
      default:
        return "📅"
    }
  }

  return (
    <div className="relative">
      {/* Timeline Container */}
      <div className="relative overflow-x-auto pb-8">
        <div className="flex items-center min-w-max px-8 py-12">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 rounded-full transform -translate-y-1/2" />

          {/* Timeline Events */}
          {sortedEvents.map((event, index) => {
            const isHovered = hoveredEvent === event.id
            const position = (index / (sortedEvents.length - 1)) * 100

            return (
              <div
                key={event.id}
                className="relative flex flex-col items-center"
                style={{
                  left: `${position}%`,
                  marginLeft: index === 0 ? "0" : "-24px",
                }}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Event Bubble */}
                <div
                  className={`
                    relative w-12 h-12 rounded-full border-4 cursor-pointer transition-all duration-300 z-10
                    ${getImportanceColor(event.importance)}
                    ${isHovered ? "scale-125 shadow-lg" : "scale-100"}
                    hover:scale-125 hover:shadow-lg
                  `}
                  onClick={() => {
                    setSelectedEvent(event)
                    onEventClick(event)
                  }}
                >
                  {/* Category Icon */}
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                    {getCategoryIcon(event.category || "")}
                  </div>

                  {/* Pulse Animation for High Importance */}
                  {event.importance === "high" && (
                    <div className="absolute inset-0 rounded-full bg-red-500 opacity-30 animate-ping" />
                  )}
                </div>

                {/* Date Label */}
                <div className="mt-4 text-center">
                  <div className="text-sm font-medium text-slate-700 whitespace-nowrap">{event.date}</div>
                  <div className="text-xs text-slate-500 whitespace-nowrap">
                    {event.fullDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>

                {/* Hover Tooltip */}
                {isHovered && (
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-20 animate-in fade-in-0 zoom-in-95 duration-200">
                    <Card className="w-80 shadow-xl border-2">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg text-slate-800 leading-tight">{event.title}</h3>
                          <Badge
                            variant={
                              event.importance === "high"
                                ? "destructive"
                                : event.importance === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="ml-2 flex-shrink-0"
                          >
                            {event.importance}
                          </Badge>
                        </div>

                        <p className="text-slate-600 text-sm mb-3 leading-relaxed">{event.description}</p>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-700">{event.location}</span>
                          </div>

                          {event.characters.length > 0 && (
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="w-4 h-4 text-slate-500" />
                              <div className="flex flex-wrap gap-1">
                                {event.characters.map((char) => (
                                  <Badge key={char} variant="outline" className="text-xs">
                                    {char}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {event.category && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-700">{event.category}</span>
                            </div>
                          )}
                        </div>

                        <Button
                          size="sm"
                          className="w-full mt-3 flex items-center gap-2"
                          onClick={() => {
                            setSelectedEvent(event)
                            onEventClick(event)
                          }}
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Tooltip Arrow */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-slate-200 rotate-45" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-8">
        <Card className="p-4">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-600" />
              <span>High Importance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-yellow-600" />
              <span>Medium Importance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-600" />
              <span>Low Importance</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedEvent.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedEvent.date}
                    </div>
                    <Badge
                      variant={
                        selectedEvent.importance === "high"
                          ? "destructive"
                          : selectedEvent.importance === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {selectedEvent.importance} importance
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-slate-700 leading-relaxed">{selectedEvent.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Location</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>

                  {selectedEvent.category && (
                    <div>
                      <h3 className="font-semibold mb-2">Category</h3>
                      <div className="flex items-center gap-2">
                        <span>{getCategoryIcon(selectedEvent.category)}</span>
                        <span>{selectedEvent.category}</span>
                      </div>
                    </div>
                  )}
                </div>

                {selectedEvent.characters.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Characters Involved</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.characters.map((char) => (
                        <Badge key={char} variant="outline" className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {char}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Details Section */}
                <div>
                  <h3 className="font-semibold mb-2">Additional Notes</h3>
                  <textarea
                    className="w-full p-3 border rounded-md resize-none"
                    rows={4}
                    placeholder="Add detailed notes about this event..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
