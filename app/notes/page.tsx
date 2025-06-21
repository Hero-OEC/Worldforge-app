"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Scroll, Plus, X, Search, Tag, Calendar, Star } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  category: string
  isPinned: boolean
  createdAt: Date
  updatedAt: Date
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Character Relationship Ideas",
      content:
        "Elena and Marcus have a complex relationship that evolves throughout the story. Initially mentor-student, but develops into romantic partnership. Key moments:\n\n- First meeting at the Academy\n- Training sessions in the Whispering Woods\n- The revelation of Marcus's past\n- Their first kiss under the starlit sky\n\nConsider adding tension through:\n- Conflicting magical philosophies\n- Elena's growing power making Marcus feel inadequate\n- External pressures from the Arcane Council",
      tags: ["characters", "relationships", "romance"],
      category: "Character Development",
      isPinned: true,
      createdAt: new Date(2024, 4, 15),
      updatedAt: new Date(2024, 5, 20),
    },
    {
      id: "2",
      title: "Magic System Limitations",
      content:
        "Important constraints to remember:\n\n1. Elemental magic requires physical components\n2. Overuse leads to magical exhaustion\n3. Opposing elements cancel each other out\n4. Dead magic zones from the Great Sundering\n5. Wild magic surges in unstable areas\n\nThese limitations create natural conflict and prevent magic from solving every problem too easily.",
      tags: ["magic", "worldbuilding", "rules"],
      category: "Magic System",
      isPinned: false,
      createdAt: new Date(2024, 4, 10),
      updatedAt: new Date(2024, 5, 18),
    },
    {
      id: "3",
      title: "Plot Holes to Fix",
      content:
        "Issues that need addressing:\n\n- How did Elena's parents really die? Current explanation feels weak\n- Why hasn't the Shadow Lord attacked Arcanum City directly?\n- Timeline inconsistency with the Great Sundering (mentioned as both 800 and 1000 years ago)\n- Elena's power growth seems too rapid - need more training scenes\n- Missing explanation for how Marcus survived the Valdris expedition",
      tags: ["plot", "editing", "continuity"],
      category: "Story Issues",
      isPinned: true,
      createdAt: new Date(2024, 5, 1),
      updatedAt: new Date(2024, 5, 22),
    },
  ])

  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const [newNote, setNewNote] = useState<Partial<Note>>({
    title: "",
    content: "",
    tags: [],
    category: "",
    isPinned: false,
  })

  const categories = [
    "All",
    "Character Development",
    "Magic System",
    "Story Issues",
    "World Building",
    "Plot Ideas",
    "Research",
  ]

  const handleCreateNote = () => {
    if (!newNote.title?.trim()) return

    const note: Note = {
      id: `note-${Date.now()}`,
      title: newNote.title,
      content: newNote.content || "",
      tags: newNote.tags || [],
      category: newNote.category || "General",
      isPinned: newNote.isPinned || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setNotes((prev) => [...prev, note])
    setNewNote({
      title: "",
      content: "",
      tags: [],
      category: "",
      isPinned: false,
    })
    setIsCreateModalOpen(false)
  }

  const handleTogglePin = (noteId: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === noteId ? { ...note, isPinned: !note.isPinned, updatedAt: new Date() } : note)),
    )
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId))
    if (selectedNote?.id === noteId) {
      setSelectedNote(null)
    }
  }

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || note.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    // Pinned notes first
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    // Then by updated date (most recent first)
    return b.updatedAt.getTime() - a.updatedAt.getTime()
  })

  const addTag = (tag: string) => {
    if (tag.trim() && !newNote.tags?.includes(tag.trim())) {
      setNewNote((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tag.trim()],
      }))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewNote((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }))
  }

  return (
    <div className="min-h-screen bg-parchment-200">
      <Header currentPage="notes" projectTitle="The Chronicles of Elena" />

      <main className="pt-24 p-6">
        <div className="max-w-7xl mx-auto">
          {!selectedNote ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-ink-700 mb-2">Notes</h1>
                  <p className="text-ink-600">Capture ideas, plot points, and random thoughts</p>
                </div>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-accent-500 hover:bg-accent-600 text-parchment-50 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Note
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink-500" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notes..."
                    className="pl-10 bg-parchment-50 border-parchment-300 text-ink-700 placeholder-ink-400"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-parchment-50 border border-parchment-300 rounded-md text-ink-700"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedNotes.map((note) => (
                  <Card
                    key={note.id}
                    className="bg-parchment-50 border-parchment-300 hover:shadow-lg transition-shadow cursor-pointer group relative"
                    onClick={() => setSelectedNote(note)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-ink-800 text-lg truncate">{note.title}</CardTitle>
                            {note.isPinned && <Star className="w-4 h-4 text-accent-500 fill-current flex-shrink-0" />}
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <Badge variant="outline" className="border-parchment-400 text-ink-600 text-xs">
                              {note.category}
                            </Badge>
                            {note.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {note.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{note.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-ink-500 hover:text-accent-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleTogglePin(note.id)
                            }}
                          >
                            <Star className={`w-4 h-4 ${note.isPinned ? "fill-current text-accent-500" : ""}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-ink-500 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteNote(note.id)
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-ink-600 text-sm line-clamp-4 leading-relaxed mb-3">{note.content}</p>
                      <div className="text-xs text-ink-500">Updated: {note.updatedAt.toLocaleDateString()}</div>
                    </CardContent>
                  </Card>
                ))}

                {sortedNotes.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <Scroll className="w-16 h-16 text-ink-400 mb-4" />
                    <h3 className="text-xl font-semibold text-ink-700 mb-2">
                      {searchQuery || selectedCategory !== "All" ? "No matching notes" : "No notes yet"}
                    </h3>
                    <p className="text-ink-500 mb-4">
                      {searchQuery || selectedCategory !== "All"
                        ? "Try adjusting your search or filter"
                        : "Create your first note to capture your ideas"}
                    </p>
                    {!searchQuery && selectedCategory === "All" && (
                      <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Note
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Note Detail View */
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="outline"
                  onClick={() => setSelectedNote(null)}
                  className="border-parchment-400 text-ink-700 hover:bg-parchment-100"
                >
                  ← Back to Notes
                </Button>
                <h1 className="text-3xl font-bold text-ink-700 flex-1">{selectedNote.title}</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTogglePin(selectedNote.id)}
                  className="text-ink-500 hover:text-accent-600"
                >
                  <Star className={`w-5 h-5 ${selectedNote.isPinned ? "fill-current text-accent-500" : ""}`} />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Note Content */}
                <div className="lg:col-span-3">
                  <Card className="bg-parchment-50 border-parchment-300">
                    <CardContent className="p-6">
                      <div className="prose prose-ink max-w-none">
                        <div className="whitespace-pre-wrap text-ink-700 leading-relaxed">{selectedNote.content}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Note Metadata */}
                <div className="lg:col-span-1 space-y-4">
                  <Card className="bg-parchment-50 border-parchment-300">
                    <CardHeader>
                      <CardTitle className="text-ink-800 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-ink-800 mb-2">Category</h4>
                        <Badge variant="outline" className="border-parchment-400 text-ink-600">
                          {selectedNote.category}
                        </Badge>
                      </div>

                      {selectedNote.tags.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-ink-800 mb-2">Tags</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedNote.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold text-ink-800 mb-2">Dates</h4>
                        <div className="space-y-2 text-sm text-ink-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>Created: {selectedNote.createdAt.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>Updated: {selectedNote.updatedAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Create Note Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-ink-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-parchment-50 border-parchment-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-bold text-ink-800">Create New Note</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-ink-600 hover:text-ink-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="noteTitle" className="text-ink-800 font-medium">
                  Title *
                </Label>
                <Input
                  id="noteTitle"
                  value={newNote.title || ""}
                  onChange={(e) => setNewNote((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Note title..."
                  className="bg-parchment-50 border-parchment-300 text-ink-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="noteCategory" className="text-ink-800 font-medium">
                  Category
                </Label>
                <select
                  id="noteCategory"
                  value={newNote.category || ""}
                  onChange={(e) => setNewNote((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-parchment-50 border border-parchment-300 rounded-md text-ink-700"
                >
                  <option value="">Select category...</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="noteContent" className="text-ink-800 font-medium">
                  Content
                </Label>
                <Textarea
                  id="noteContent"
                  value={newNote.content || ""}
                  onChange={(e) => setNewNote((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your note content..."
                  rows={8}
                  className="bg-parchment-50 border-parchment-300 text-ink-700 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-ink-800 font-medium">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newNote.tags?.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1 text-xs cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                      <X className="w-3 h-3" />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag..."
                    className="bg-parchment-50 border-parchment-300 text-ink-700"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      if (input.value) {
                        addTag(input.value)
                        input.value = ""
                      }
                    }}
                    className="border-parchment-400 text-ink-700"
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinNote"
                  checked={newNote.isPinned || false}
                  onChange={(e) => setNewNote((prev) => ({ ...prev, isPinned: e.target.checked }))}
                  className="rounded border-parchment-300"
                />
                <Label htmlFor="pinNote" className="text-ink-800 font-medium">
                  Pin this note
                </Label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="border-parchment-400 text-ink-700 hover:bg-parchment-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateNote}
                  disabled={!newNote.title?.trim()}
                  className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                >
                  Create Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
