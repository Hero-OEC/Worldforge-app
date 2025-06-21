"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, Trash2 } from "lucide-react"

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

interface AddEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (event: Omit<Event, "id" | "fullDate">) => void
}

export function AddEventModal({ isOpen, onClose, onSave }: AddEventModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    year: "",
    day: "",
    description: "",
    characters: [] as string[],
    location: "",
    importance: "medium" as "low" | "medium" | "high",
    category: "",
    hour: "",
  })
  const [newCharacter, setNewCharacter] = useState("")

  const categories = [
    "Character Development",
    "Discovery",
    "Conflict",
    "Revelation",
    "Heroic Act",
    "Political Event",
    "Romance",
    "Mystery",
    "Magic",
    "Battle",
    "Traveling",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.year.trim() || !formData.day.trim() || !formData.description.trim()) {
      alert("Please fill in all required fields (Title, Year, Day, Description)")
      return
    }

    onSave(formData)

    // Reset form
    setFormData({
      title: "",
      date: "",
      year: "",
      day: "",
      description: "",
      characters: [],
      location: "",
      importance: "medium",
      category: "",
      hour: "",
    })
    setNewCharacter("")
    onClose()
  }

  const addCharacter = () => {
    if (newCharacter.trim() && !formData.characters.includes(newCharacter.trim())) {
      setFormData((prev) => ({
        ...prev,
        characters: [...prev.characters, newCharacter.trim()],
      }))
      setNewCharacter("")
    }
  }

  const removeCharacter = (character: string) => {
    setFormData((prev) => ({
      ...prev,
      characters: prev.characters.filter((c) => c !== character),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addCharacter()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-ink-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-parchment-50 border-parchment-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold text-ink-800">Add New Event</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-ink-600 hover:text-ink-800">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-ink-800 font-medium">
                Event Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter event title..."
                className="bg-parchment-50 border-parchment-300 text-ink-700 placeholder-ink-400 focus:border-accent-500 focus:ring-accent-500"
                required
              />
            </div>

            {/* Date - Year and Day */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-ink-800 font-medium">
                  Year *
                </Label>
                <Input
                  id="year"
                  type="number"
                  min="1"
                  value={formData.year}
                  onChange={(e) => {
                    const year = e.target.value
                    setFormData((prev) => ({
                      ...prev,
                      year,
                      date: year && prev.day ? `Year ${year}, Day ${prev.day}` : "",
                    }))
                  }}
                  placeholder="1"
                  className="bg-parchment-50 border-parchment-300 text-ink-700 placeholder-ink-400 focus:border-accent-500 focus:ring-accent-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="day" className="text-ink-800 font-medium">
                  Day *
                </Label>
                <Input
                  id="day"
                  type="number"
                  min="1"
                  max="365"
                  value={formData.day}
                  onChange={(e) => {
                    const day = e.target.value
                    setFormData((prev) => ({
                      ...prev,
                      day,
                      date: prev.year && day ? `Year ${prev.year}, Day ${day}` : "",
                    }))
                  }}
                  placeholder="1"
                  className="bg-parchment-50 border-parchment-300 text-ink-700 placeholder-ink-400 focus:border-accent-500 focus:ring-accent-500"
                  required
                />
              </div>
            </div>

            {/* Generated Date Display */}
            {formData.date && (
              <div className="text-sm text-ink-600 bg-parchment-100 p-2 rounded border border-parchment-300">
                <strong>Generated Date:</strong> {formData.date}
              </div>
            )}

            {/* Hour */}
            <div className="space-y-2">
              <Label htmlFor="hour" className="text-ink-800 font-medium">
                Time (Optional)
              </Label>
              <Input
                id="hour"
                value={formData.hour}
                onChange={(e) => setFormData((prev) => ({ ...prev, hour: e.target.value }))}
                placeholder="e.g., Morning (8:00)"
                className="bg-parchment-50 border-parchment-300 text-ink-700 placeholder-ink-400 focus:border-accent-500 focus:ring-accent-500"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-ink-800 font-medium">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what happens in this event..."
                rows={4}
                className="bg-parchment-50 border-parchment-300 text-ink-700 placeholder-ink-400 focus:border-accent-500 focus:ring-accent-500 resize-none"
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-ink-800 font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Where does this event take place?"
                className="bg-parchment-50 border-parchment-300 text-ink-700 placeholder-ink-400 focus:border-accent-500 focus:ring-accent-500"
              />
            </div>

            {/* Category and Importance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-ink-800 font-medium">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="bg-parchment-50 border-parchment-300 text-ink-700 focus:border-accent-500 focus:ring-accent-500">
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent className="bg-parchment-50 border-parchment-300">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-ink-700 hover:bg-parchment-100">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-ink-800 font-medium">Importance</Label>
                <Select
                  value={formData.importance}
                  onValueChange={(value: "low" | "medium" | "high") =>
                    setFormData((prev) => ({ ...prev, importance: value }))
                  }
                >
                  <SelectTrigger className="bg-parchment-50 border-parchment-300 text-ink-700 focus:border-accent-500 focus:ring-accent-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-parchment-50 border-parchment-300">
                    <SelectItem value="low" className="text-ink-700 hover:bg-parchment-100">
                      Low
                    </SelectItem>
                    <SelectItem value="medium" className="text-ink-700 hover:bg-parchment-100">
                      Medium
                    </SelectItem>
                    <SelectItem value="high" className="text-ink-700 hover:bg-parchment-100">
                      High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Characters */}
            <div className="space-y-2">
              <Label className="text-ink-800 font-medium">Characters Involved</Label>

              {/* Add Character Input */}
              <div className="flex gap-2">
                <Input
                  value={newCharacter}
                  onChange={(e) => setNewCharacter(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add character name..."
                  className="flex-1 bg-parchment-50 border-parchment-300 text-ink-700 placeholder-ink-400 focus:border-accent-500 focus:ring-accent-500"
                />
                <Button
                  type="button"
                  onClick={addCharacter}
                  size="sm"
                  className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Character List */}
              {formData.characters.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.characters.map((character) => (
                    <Badge
                      key={character}
                      variant="outline"
                      className="flex items-center gap-1 border-parchment-400 text-ink-600 pr-1"
                    >
                      {character}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCharacter(character)}
                        className="h-4 w-4 p-0 text-ink-500 hover:text-ink-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-parchment-300">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-parchment-400 text-ink-700 hover:bg-parchment-100"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-accent-500 hover:bg-accent-600 text-parchment-50">
                Add Event
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
