"use client"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Users,
  Calendar,
  ArrowRight,
  X,
  Clock,
  User,
  Search,
  Swords,
  Lightbulb,
  Shield,
  Crown,
  Heart,
  HelpCircle,
  Sparkles,
  Zap,
  Navigation,
} from "lucide-react"

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

interface SerpentineTimelineProps {
  events: Event[]
  onEventClick: (event: Event) => void
  highlightedGroupIndex?: number | null
}

export const SerpentineTimeline = forwardRef<{ scrollToGroup: (groupIndex: number) => void }, SerpentineTimelineProps>(
  ({ events, onEventClick, highlightedGroupIndex }, ref) => {
    const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const scrollToGroup = (groupIndex: number) => {
      const element = document.querySelector(`[data-group-index="${groupIndex}"]`)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        })
      }
    }

    useImperativeHandle(ref, () => ({
      scrollToGroup,
    }))

    // Sort events by date, then by hour if available
    const sortedEvents = [...events].sort((a, b) => {
      const dateComparison = a.fullDate.getTime() - b.fullDate.getTime()
      if (dateComparison !== 0) return dateComparison

      // If same date, sort by hour
      if (a.hour && b.hour) {
        // Extract hour numbers for comparison
        const aHour = Number.parseInt(a.hour.match(/\d+/)?.[0] || "0")
        const bHour = Number.parseInt(b.hour.match(/\d+/)?.[0] || "0")
        return aHour - bHour
      }

      return 0
    })

    // Group events by date to handle multiple events per date
    const groupedEvents = sortedEvents.reduce(
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

    // Create timeline positions for event groups
    const eventGroups = Object.values(groupedEvents)
    const eventsPerRow = Math.floor(containerWidth / 180) || 6
    const totalRows = Math.ceil(eventGroups.length / eventsPerRow)

    useEffect(() => {
      const updateWidth = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth)
        }
      }

      updateWidth()
      window.addEventListener("resize", updateWidth)
      return () => window.removeEventListener("resize", updateWidth)
    }, [])

    const getImportanceColor = (importance: string) => {
      switch (importance) {
        case "high":
          return "bg-accent-600 border-accent-700 shadow-accent-200"
        case "medium":
          return "bg-accent-400 border-accent-500 shadow-accent-100"
        case "low":
          return "bg-parchment-500 border-parchment-600 shadow-parchment-200"
        default:
          return "bg-ink-400 border-ink-500 shadow-ink-200"
      }
    }

    const getCategoryIcon = (category: string) => {
      switch (category) {
        case "Character Development":
          return <User className="w-5 h-5" />
        case "Discovery":
          return <Search className="w-5 h-5" />
        case "Conflict":
          return <Swords className="w-5 h-5" />
        case "Revelation":
          return <Lightbulb className="w-5 h-5" />
        case "Heroic Act":
          return <Shield className="w-5 h-5" />
        case "Political Event":
          return <Crown className="w-5 h-5" />
        case "Romance":
          return <Heart className="w-5 h-5" />
        case "Mystery":
          return <HelpCircle className="w-5 h-5" />
        case "Magic":
          return <Sparkles className="w-5 h-5" />
        case "Battle":
          return <Zap className="w-5 h-5" />
        case "Traveling":
          return <Navigation className="w-5 h-5" />
        default:
          return <Calendar className="w-5 h-5" />
      }
    }

    const getGroupPosition = (groupIndex: number) => {
      const row = Math.floor(groupIndex / eventsPerRow)
      const col = groupIndex % eventsPerRow

      // For odd rows, reverse the column order (right to left)
      const adjustedCol = row % 2 === 0 ? col : eventsPerRow - 1 - col

      const x = adjustedCol * (containerWidth / eventsPerRow) + containerWidth / eventsPerRow / 2
      const y = row * 180 + 60

      return { x, y, row, col: adjustedCol }
    }

    // Determine if text should be above or below based on position
    const getTextPosition = (groupIndex: number) => {
      const position = getGroupPosition(groupIndex)
      const { row, col } = position

      // At curves (end of rows), put text above to avoid line collision
      const isAtCurve = (row % 2 === 0 && col === eventsPerRow - 1) || (row % 2 === 1 && col === 0)

      // For the last row, also consider if it's at the end
      const isLastRow = row === totalRows - 1
      const groupsInLastRow = eventGroups.length % eventsPerRow || eventsPerRow
      const isAtEndOfLastRow =
        isLastRow && ((row % 2 === 0 && col === groupsInLastRow - 1) || (row % 2 === 1 && col === 0))

      return isAtCurve || isAtEndOfLastRow ? "above" : "below"
    }

    const generatePath = () => {
      if (eventGroups.length === 0) return ""

      let path = ""
      const rowHeight = 180
      const eventSpacing = containerWidth / eventsPerRow

      for (let row = 0; row < totalRows; row++) {
        const y = row * rowHeight + 60
        const startX = row % 2 === 0 ? eventSpacing / 2 : containerWidth - eventSpacing / 2

        if (row === 0) {
          path += `M ${startX} ${y}`
        }

        // Draw horizontal line for this row
        const groupsInRow = Math.min(eventsPerRow, eventGroups.length - row * eventsPerRow)
        for (let i = 0; i < groupsInRow - 1; i++) {
          const currentX = row % 2 === 0 ? startX + (i + 1) * eventSpacing : startX - (i + 1) * eventSpacing
          path += ` L ${currentX} ${y}`
        }

        // Add curve to next row if not the last row
        if (row < totalRows - 1) {
          const nextY = (row + 1) * rowHeight + 60
          const curveEndX = row % 2 === 0 ? containerWidth - eventSpacing / 2 : eventSpacing / 2
          const nextStartX = (row + 1) % 2 === 0 ? eventSpacing / 2 : containerWidth - eventSpacing / 2

          // Create smooth curve with increased border radius (80)
          const controlX = curveEndX
          const controlY = y + 80 // Increased curve radius
          path += ` Q ${controlX} ${controlY} ${nextStartX} ${nextY}`
        }
      }

      return path
    }

    // Get the primary event for display (highest importance)
    const getPrimaryEvent = (eventGroup: Event[]) => {
      return eventGroup.reduce((prev, current) => {
        if (prev.importance === "high" && current.importance !== "high") return prev
        if (current.importance === "high" && prev.importance !== "high") return current
        if (prev.importance === "medium" && current.importance === "low") return prev
        if (current.importance === "medium" && prev.importance === "low") return current
        return prev
      })
    }

    return (
      <div className="relative" ref={containerRef}>
        {/* Custom CSS for gentler pulse animation */}
        <style jsx>{`
          @keyframes gentlePulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(1.05);
            }
          }
          
          .gentle-pulse {
            animation: gentlePulse 2s ease-in-out infinite;
          }
          
          @keyframes gentleGlow {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.4);
            }
            50% {
              box-shadow: 0 0 0 8px rgba(250, 204, 21, 0.1);
            }
          }
          
          .gentle-glow {
            animation: gentleGlow 2.5s ease-in-out infinite;
          }
        `}</style>

        {/* Legend positioned above timeline, centered */}
        <div className="flex justify-center mb-8 relative z-30">
          <Card className="p-4 bg-parchment-100 border-parchment-300 shadow-lg">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-accent-600 border-2 border-accent-700" />
                <span className="text-ink-700">High Importance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-accent-400 border-2 border-accent-500" />
                <span className="text-ink-700">Medium Importance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-parchment-500 border-2 border-parchment-600" />
                <span className="text-ink-700">Low Importance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-ink-600 text-parchment-50 rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <span className="text-ink-700">Multiple Events</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline Container */}
        <div className="relative" style={{ height: totalRows * 180 + 100 }}>
          {/* SVG Path for the serpentine line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <path
              d={generatePath()}
              stroke="#9d7a47"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Event Groups */}
          {eventGroups.map((eventGroup, groupIndex) => {
            const position = getGroupPosition(groupIndex)
            const primaryEvent = getPrimaryEvent(eventGroup)
            const hasMultipleEvents = eventGroup.length > 1
            const isHovered = hoveredEvent === `group-${groupIndex}`
            const textPosition = getTextPosition(groupIndex)
            const isHighlighted = highlightedGroupIndex === groupIndex

            return (
              <div
                key={`group-${groupIndex}`}
                data-group-index={groupIndex}
                className="absolute"
                style={{
                  left: position.x,
                  top: position.y,
                  transform: "translate(-50%, -50%)",
                  zIndex: isHovered ? 20 : isHighlighted ? 15 : 10,
                }}
                onMouseEnter={() => setHoveredEvent(`group-${groupIndex}`)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Single Event Bubble - Centered on the line */}
                <div
                  className={`
                    relative w-16 h-16 rounded-full border-4 cursor-pointer transition-all duration-300
                    ${getImportanceColor(primaryEvent.importance)}
                    ${isHovered ? "scale-125 shadow-xl" : "scale-100 shadow-lg"}
                    ${
                      isHighlighted
                        ? "ring-4 ring-yellow-400 ring-opacity-60 scale-110 shadow-2xl gentle-pulse gentle-glow"
                        : ""
                    }
                    hover:scale-125 hover:shadow-xl
                  `}
                  onClick={() => {
                    if (hasMultipleEvents) {
                      setSelectedEvent(primaryEvent)
                      onEventClick(primaryEvent)
                    } else {
                      setSelectedEvent(primaryEvent)
                      onEventClick(primaryEvent)
                    }
                  }}
                >
                  {/* Category Icon */}
                  <div className="absolute inset-0 flex items-center justify-center text-parchment-50">
                    {getCategoryIcon(primaryEvent.category || "")}
                  </div>

                  {/* Multiple Event Indicator */}
                  {hasMultipleEvents && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-ink-600 text-parchment-50 rounded-full flex items-center justify-center text-xs font-bold border-2 border-parchment-200">
                      {eventGroup.length}
                    </div>
                  )}
                </div>

                {/* Event Label - Positioned to avoid line collision */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 text-center max-w-32 ${
                    textPosition === "above" ? "bottom-full mb-2" : "top-full mt-2"
                  }`}
                >
                  <div className="text-sm font-medium text-ink-700 truncate">
                    {hasMultipleEvents ? `${primaryEvent.date} (${eventGroup.length})` : primaryEvent.title}
                  </div>
                  <div className="text-xs text-ink-500">{primaryEvent.date}</div>
                </div>

                {/* Hover Tooltip */}
                {isHovered && (
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 z-30 animate-in fade-in-0 zoom-in-95 duration-200"
                    style={{
                      top: textPosition === "above" ? "-450px" : "100px",
                    }}
                  >
                    <Card
                      className={`${hasMultipleEvents ? "w-96" : "w-80"} shadow-2xl border-2 bg-parchment-50 border-parchment-300`}
                    >
                      <CardContent className="p-4">
                        {hasMultipleEvents ? (
                          /* Multiple Events Tooltip */
                          <>
                            <div className="mb-3">
                              <h3 className="font-semibold text-lg text-ink-800 mb-1">
                                {eventGroup[0].date} - {eventGroup.length} Events
                              </h3>
                            </div>

                            <div className="space-y-3 max-h-64 overflow-y-auto">
                              {eventGroup.map((event, index) => (
                                <div
                                  key={event.id}
                                  className="border-l-4 border-accent-400 pl-3 py-2 hover:bg-parchment-100 rounded-r cursor-pointer transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedEvent(event)
                                    onEventClick(event)
                                  }}
                                >
                                  <div className="flex items-start justify-between mb-1">
                                    <h4 className="font-medium text-ink-800 text-sm">{event.title}</h4>
                                    <Badge
                                      variant={
                                        event.importance === "high"
                                          ? "destructive"
                                          : event.importance === "medium"
                                            ? "default"
                                            : "secondary"
                                      }
                                      className="text-xs ml-2"
                                    >
                                      {event.importance}
                                    </Badge>
                                  </div>

                                  {event.hour && (
                                    <div className="flex items-center gap-1 text-xs text-ink-600 mb-1">
                                      <Clock className="w-3 h-3" />
                                      {event.hour}
                                    </div>
                                  )}

                                  <p className="text-ink-600 text-xs leading-relaxed mb-2">{event.description}</p>

                                  <div className="flex items-center gap-2 text-xs">
                                    <MapPin className="w-3 h-3 text-ink-500" />
                                    <span className="text-ink-600">{event.location}</span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="mt-3 text-xs text-ink-500 text-center">
                              Click on any event above to view details
                            </div>
                          </>
                        ) : (
                          /* Single Event Tooltip */
                          <>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg text-ink-800 leading-tight">{primaryEvent.title}</h3>
                              <Badge
                                variant={
                                  primaryEvent.importance === "high"
                                    ? "destructive"
                                    : primaryEvent.importance === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                                className="ml-2 flex-shrink-0"
                              >
                                {primaryEvent.importance}
                              </Badge>
                            </div>

                            {primaryEvent.hour && (
                              <div className="flex items-center gap-2 text-sm text-ink-600 mb-2">
                                <Clock className="w-4 h-4" />
                                <span>{primaryEvent.hour}</span>
                              </div>
                            )}

                            <p className="text-ink-600 text-sm mb-3 leading-relaxed">{primaryEvent.description}</p>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-ink-500" />
                                <span className="text-ink-700">{primaryEvent.location}</span>
                              </div>

                              {primaryEvent.characters.length > 0 && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Users className="w-4 h-4 text-ink-500" />
                                  <div className="flex flex-wrap gap-1">
                                    {primaryEvent.characters.map((char) => (
                                      <Badge
                                        key={char}
                                        variant="outline"
                                        className="text-xs border-parchment-400 text-ink-600"
                                      >
                                        {char}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {primaryEvent.category && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="w-4 h-4 text-ink-500" />
                                  <span className="text-ink-700">{primaryEvent.category}</span>
                                </div>
                              )}
                            </div>

                            <Button
                              size="sm"
                              className="w-full mt-3 flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-parchment-50"
                              onClick={() => {
                                setSelectedEvent(primaryEvent)
                                onEventClick(primaryEvent)
                              }}
                            >
                              View Details
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>

                    {/* Tooltip Arrow */}
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-parchment-50 border-l-2 border-t-2 border-parchment-300 rotate-45 ${
                        textPosition === "above" ? "-bottom-2" : "-top-2"
                      }`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div
            className="fixed inset-0 bg-ink-900 bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <Card
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-parchment-50 border-parchment-300"
              onClick={(e) => e.stopPropagation()}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-ink-800 mb-2">{selectedEvent.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-ink-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {selectedEvent.date}
                      </div>
                      {selectedEvent.hour && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedEvent.hour}
                        </div>
                      )}
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedEvent(null)}
                    className="text-ink-600 hover:text-ink-800"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-ink-800">Description</h3>
                    <p className="text-ink-700 leading-relaxed">{selectedEvent.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2 text-ink-800">Location</h3>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-ink-500" />
                        <span className="text-ink-700">{selectedEvent.location}</span>
                      </div>
                    </div>

                    {selectedEvent.category && (
                      <div>
                        <h3 className="font-semibold mb-2 text-ink-800">Category</h3>
                        <div className="flex items-center gap-2">
                          <div className="text-ink-600">{getCategoryIcon(selectedEvent.category)}</div>
                          <span className="text-ink-700">{selectedEvent.category}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedEvent.characters.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 text-ink-800">Characters Involved</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.characters.map((char) => (
                          <Badge
                            key={char}
                            variant="outline"
                            className="flex items-center gap-1 border-parchment-400 text-ink-600"
                          >
                            <Users className="w-3 h-3" />
                            {char}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold mb-2 text-ink-800">Additional Notes</h3>
                    <textarea
                      className="w-full p-3 border border-parchment-300 rounded-md resize-none bg-parchment-50 text-ink-700 placeholder-ink-400"
                      rows={4}
                      placeholder="Add detailed notes about this event..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedEvent(null)}
                    className="border-parchment-400 text-ink-700 hover:bg-parchment-100"
                  >
                    Close
                  </Button>
                  <Button className="bg-accent-500 hover:bg-accent-600 text-parchment-50">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  },
)

SerpentineTimeline.displayName = "SerpentineTimeline"
