"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Plus, X, Sparkles, Scroll, Zap, Shield, Wand2 } from "lucide-react"

interface MagicSystem {
  id: string
  name: string
  type: string
  description: string
  source: string
  limitations: string
  practitioners: string
  rituals: string
  components: string
  schools?: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Master"
}

interface LoreEntry {
  id: string
  title: string
  category: string
  content: string
  relatedTopics: string[]
  importance: "Low" | "Medium" | "High"
}

export default function LorePage() {
  const [magicSystems, setMagicSystems] = useState<MagicSystem[]>([
    {
      id: "1",
      name: "Elemental Magic",
      type: "Elemental",
      description: "The manipulation of the four classical elements: fire, water, earth, and air.",
      source: "Drawing power from the elemental planes and natural forces.",
      limitations: "Requires physical components from the corresponding element. Weakened in opposing environments.",
      practitioners: "Elemental mages, druids, and some sorcerers with elemental bloodlines.",
      rituals: "Meditation at elemental shrines, seasonal ceremonies, elemental binding rituals.",
      components: "Elemental crystals, natural materials (water, soil, flames, air currents).",
      schools: ["Pyromancy", "Hydromancy", "Geomancy", "Aeromancy"],
      difficulty: "Intermediate",
    },
    {
      id: "2",
      name: "Arcane Magic",
      type: "Scholarly",
      description: "The study and manipulation of raw magical energy through complex formulas and incantations.",
      source: "Tapping into the Weave, the underlying magical field that permeates reality.",
      limitations: "Requires extensive study and precise execution. Mental fatigue from complex spells.",
      practitioners: "Wizards, scholars, and academy-trained mages.",
      rituals: "Spell preparation, magical research, creation of spell scrolls and magical items.",
      components: "Spell components, focus items, written spellbooks, magical inks and papers.",
      schools: ["Evocation", "Illusion", "Transmutation", "Divination", "Enchantment"],
      difficulty: "Advanced",
    },
  ])

  const [loreEntries, setLoreEntries] = useState<LoreEntry[]>([
    {
      id: "1",
      title: "The Great Sundering",
      category: "Historical Events",
      content:
        "A cataclysmic event that occurred 1,000 years ago when the ancient empire of Valdris attempted to harness the power of a fallen star. The resulting magical explosion tore reality itself, creating the Shattered Lands and fundamentally changing how magic works in the world.",
      relatedTopics: ["Valdris Empire", "Shattered Lands", "Fallen Star", "Magic Corruption"],
      importance: "High",
    },
    {
      id: "2",
      title: "The Weave",
      category: "Magical Concepts",
      content:
        "The invisible network of magical energy that flows through all things. Mages learn to perceive and manipulate the Weave to cast spells. Damage to the Weave in certain areas can create dead magic zones or wild magic surges.",
      relatedTopics: ["Magic Systems", "Dead Magic Zones", "Wild Magic", "Arcane Theory"],
      importance: "High",
    },
  ])

  const [selectedMagicSystem, setSelectedMagicSystem] = useState<MagicSystem | null>(null)
  const [selectedLoreEntry, setSelectedLoreEntry] = useState<LoreEntry | null>(null)
  const [isMagicModalOpen, setIsMagicModalOpen] = useState(false)
  const [isLoreModalOpen, setIsLoreModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("magic")

  const [newMagicSystem, setNewMagicSystem] = useState<Partial<MagicSystem>>({
    name: "",
    type: "",
    description: "",
    source: "",
    limitations: "",
    practitioners: "",
    rituals: "",
    components: "",
    schools: [],
    difficulty: "Beginner",
  })

  const [newLoreEntry, setNewLoreEntry] = useState<Partial<LoreEntry>>({
    title: "",
    category: "",
    content: "",
    relatedTopics: [],
    importance: "Medium",
  })

  const magicTypes = ["Elemental", "Divine", "Arcane", "Nature", "Blood", "Shadow", "Celestial", "Necromantic"]
  const loreCategories = [
    "Historical Events",
    "Magical Concepts",
    "Religions & Deities",
    "Cultures & Societies",
    "Legends & Myths",
    "Natural Phenomena",
    "Artifacts & Relics",
    "Languages & Scripts",
  ]

  const handleCreateMagicSystem = () => {
    if (!newMagicSystem.name?.trim()) return

    const magicSystem: MagicSystem = {
      id: `magic-${Date.now()}`,
      ...(newMagicSystem as MagicSystem),
      schools: newMagicSystem.schools || [],
    }

    setMagicSystems((prev) => [...prev, magicSystem])
    setNewMagicSystem({
      name: "",
      type: "",
      description: "",
      source: "",
      limitations: "",
      practitioners: "",
      rituals: "",
      components: "",
      schools: [],
      difficulty: "Beginner",
    })
    setIsMagicModalOpen(false)
  }

  const handleCreateLoreEntry = () => {
    if (!newLoreEntry.title?.trim()) return

    const loreEntry: LoreEntry = {
      id: `lore-${Date.now()}`,
      ...(newLoreEntry as LoreEntry),
      relatedTopics: newLoreEntry.relatedTopics || [],
    }

    setLoreEntries((prev) => [...prev, loreEntry])
    setNewLoreEntry({
      title: "",
      category: "",
      content: "",
      relatedTopics: [],
      importance: "Medium",
    })
    setIsLoreModalOpen(false)
  }

  const getMagicIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "elemental":
        return <Zap className="w-5 h-5" />
      case "divine":
        return <Shield className="w-5 h-5" />
      case "arcane":
      case "scholarly":
        return <Wand2 className="w-5 h-5" />
      default:
        return <Sparkles className="w-5 h-5" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Advanced":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "Master":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "High":
        return "bg-red-100 text-red-800 border-red-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Low":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-parchment-200">
      <Header currentPage="lore" projectTitle="The Chronicles of Elena" />

      <main className="pt-24 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-ink-700 mb-2">Lore & Magic</h1>
              <p className="text-ink-600">Document your world's magic systems, history, and lore</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-parchment-100 mb-6">
              <TabsTrigger value="magic">Magic Systems</TabsTrigger>
              <TabsTrigger value="lore">Lore Entries</TabsTrigger>
            </TabsList>

            <TabsContent value="magic" className="space-y-6">
              {!selectedMagicSystem ? (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-ink-700">Magic Systems</h2>
                    <Button
                      onClick={() => setIsMagicModalOpen(true)}
                      className="bg-accent-500 hover:bg-accent-600 text-parchment-50 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Magic System
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {magicSystems.map((system) => (
                      <Card
                        key={system.id}
                        className="bg-parchment-50 border-parchment-300 hover:shadow-lg transition-shadow cursor-pointer group"
                        onClick={() => setSelectedMagicSystem(system)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-parchment-300 rounded-lg flex items-center justify-center flex-shrink-0">
                              {getMagicIcon(system.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-ink-800 text-lg mb-1 truncate">{system.name}</CardTitle>
                              <div className="flex flex-wrap gap-1 mb-2">
                                <Badge variant="outline" className="border-parchment-400 text-ink-600 text-xs">
                                  {system.type}
                                </Badge>
                                <Badge className={`text-xs ${getDifficultyColor(system.difficulty)}`}>
                                  {system.difficulty}
                                </Badge>
                              </div>
                              <p className="text-ink-600 text-sm line-clamp-2">{system.description}</p>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}

                    {magicSystems.length === 0 && (
                      <div className="col-span-full flex flex-col items-center justify-center py-12">
                        <Sparkles className="w-16 h-16 text-ink-400 mb-4" />
                        <h3 className="text-xl font-semibold text-ink-700 mb-2">No magic systems yet</h3>
                        <p className="text-ink-500 mb-4">Create your first magic system to define how magic works</p>
                        <Button
                          onClick={() => setIsMagicModalOpen(true)}
                          className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Magic System
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Magic System Detail View */
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedMagicSystem(null)}
                      className="border-parchment-400 text-ink-700 hover:bg-parchment-100"
                    >
                      ← Back to Magic Systems
                    </Button>
                    <h1 className="text-3xl font-bold text-ink-700">{selectedMagicSystem.name}</h1>
                    <Badge variant="outline" className="border-parchment-400 text-ink-600">
                      {selectedMagicSystem.type}
                    </Badge>
                    <Badge className={getDifficultyColor(selectedMagicSystem.difficulty)}>
                      {selectedMagicSystem.difficulty}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-parchment-50 border-parchment-300">
                      <CardHeader>
                        <CardTitle className="text-ink-800">Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-ink-800 mb-2">Description</h3>
                          <p className="text-ink-700">{selectedMagicSystem.description}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-ink-800 mb-2">Source of Power</h3>
                          <p className="text-ink-700">{selectedMagicSystem.source}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-ink-800 mb-2">Limitations</h3>
                          <p className="text-ink-700">{selectedMagicSystem.limitations}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-parchment-50 border-parchment-300">
                      <CardHeader>
                        <CardTitle className="text-ink-800">Practice & Application</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-ink-800 mb-2">Practitioners</h3>
                          <p className="text-ink-700">{selectedMagicSystem.practitioners}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-ink-800 mb-2">Rituals & Ceremonies</h3>
                          <p className="text-ink-700">{selectedMagicSystem.rituals}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-ink-800 mb-2">Components & Materials</h3>
                          <p className="text-ink-700">{selectedMagicSystem.components}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {selectedMagicSystem.schools && selectedMagicSystem.schools.length > 0 && (
                      <Card className="bg-parchment-50 border-parchment-300 lg:col-span-2">
                        <CardHeader>
                          <CardTitle className="text-ink-800">Schools & Disciplines</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {selectedMagicSystem.schools.map((school, index) => (
                              <Badge key={index} variant="outline" className="border-parchment-400 text-ink-600">
                                {school}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="lore" className="space-y-6">
              {!selectedLoreEntry ? (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-ink-700">Lore Entries</h2>
                    <Button
                      onClick={() => setIsLoreModalOpen(true)}
                      className="bg-accent-500 hover:bg-accent-600 text-parchment-50 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Lore Entry
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loreEntries.map((entry) => (
                      <Card
                        key={entry.id}
                        className="bg-parchment-50 border-parchment-300 hover:shadow-lg transition-shadow cursor-pointer group"
                        onClick={() => setSelectedLoreEntry(entry)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-parchment-300 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Scroll className="w-6 h-6 text-ink-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-ink-800 text-lg mb-1 truncate">{entry.title}</CardTitle>
                              <div className="flex flex-wrap gap-1 mb-2">
                                <Badge variant="outline" className="border-parchment-400 text-ink-600 text-xs">
                                  {entry.category}
                                </Badge>
                                <Badge className={`text-xs ${getImportanceColor(entry.importance)}`}>
                                  {entry.importance}
                                </Badge>
                              </div>
                              <p className="text-ink-600 text-sm line-clamp-2">{entry.content}</p>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}

                    {loreEntries.length === 0 && (
                      <div className="col-span-full flex flex-col items-center justify-center py-12">
                        <Scroll className="w-16 h-16 text-ink-400 mb-4" />
                        <h3 className="text-xl font-semibold text-ink-700 mb-2">No lore entries yet</h3>
                        <p className="text-ink-500 mb-4">
                          Create your first lore entry to document your world's history
                        </p>
                        <Button
                          onClick={() => setIsLoreModalOpen(true)}
                          className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Lore Entry
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Lore Entry Detail View */
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedLoreEntry(null)}
                      className="border-parchment-400 text-ink-700 hover:bg-parchment-100"
                    >
                      ← Back to Lore Entries
                    </Button>
                    <h1 className="text-3xl font-bold text-ink-700">{selectedLoreEntry.title}</h1>
                    <Badge variant="outline" className="border-parchment-400 text-ink-600">
                      {selectedLoreEntry.category}
                    </Badge>
                    <Badge className={getImportanceColor(selectedLoreEntry.importance)}>
                      {selectedLoreEntry.importance}
                    </Badge>
                  </div>

                  <Card className="bg-parchment-50 border-parchment-300">
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="font-semibold text-ink-800 mb-3">Content</h3>
                        <p className="text-ink-700 leading-relaxed">{selectedLoreEntry.content}</p>
                      </div>

                      {selectedLoreEntry.relatedTopics.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-ink-800 mb-3">Related Topics</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedLoreEntry.relatedTopics.map((topic, index) => (
                              <Badge key={index} variant="outline" className="border-parchment-400 text-ink-600">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Create Magic System Modal */}
      {isMagicModalOpen && (
        <div className="fixed inset-0 bg-ink-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-parchment-50 border-parchment-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-bold text-ink-800">Create Magic System</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMagicModalOpen(false)}
                className="text-ink-600 hover:text-ink-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="magicName" className="text-ink-800 font-medium">
                    Magic System Name *
                  </Label>
                  <Input
                    id="magicName"
                    value={newMagicSystem.name || ""}
                    onChange={(e) => setNewMagicSystem((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="System name..."
                    className="bg-parchment-50 border-parchment-300 text-ink-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="magicType" className="text-ink-800 font-medium">
                    Type
                  </Label>
                  <select
                    id="magicType"
                    value={newMagicSystem.type || ""}
                    onChange={(e) => setNewMagicSystem((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 bg-parchment-50 border border-parchment-300 rounded-md text-ink-700"
                  >
                    <option value="">Select type...</option>
                    {magicTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="magicDescription" className="text-ink-800 font-medium">
                  Description
                </Label>
                <Textarea
                  id="magicDescription"
                  value={newMagicSystem.description || ""}
                  onChange={(e) => setNewMagicSystem((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="How does this magic system work..."
                  rows={3}
                  className="bg-parchment-50 border-parchment-300 text-ink-700 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="magicSource" className="text-ink-800 font-medium">
                  Source of Power
                </Label>
                <Textarea
                  id="magicSource"
                  value={newMagicSystem.source || ""}
                  onChange={(e) => setNewMagicSystem((prev) => ({ ...prev, source: e.target.value }))}
                  placeholder="Where does the magical power come from..."
                  rows={2}
                  className="bg-parchment-50 border-parchment-300 text-ink-700 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsMagicModalOpen(false)}
                  className="border-parchment-400 text-ink-700 hover:bg-parchment-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateMagicSystem}
                  disabled={!newMagicSystem.name?.trim()}
                  className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                >
                  Create Magic System
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create Lore Entry Modal */}
      {isLoreModalOpen && (
        <div className="fixed inset-0 bg-ink-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-parchment-50 border-parchment-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-bold text-ink-800">Create Lore Entry</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLoreModalOpen(false)}
                className="text-ink-600 hover:text-ink-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loreTitle" className="text-ink-800 font-medium">
                    Title *
                  </Label>
                  <Input
                    id="loreTitle"
                    value={newLoreEntry.title || ""}
                    onChange={(e) => setNewLoreEntry((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Lore entry title..."
                    className="bg-parchment-50 border-parchment-300 text-ink-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loreCategory" className="text-ink-800 font-medium">
                    Category
                  </Label>
                  <select
                    id="loreCategory"
                    value={newLoreEntry.category || ""}
                    onChange={(e) => setNewLoreEntry((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-parchment-50 border border-parchment-300 rounded-md text-ink-700"
                  >
                    <option value="">Select category...</option>
                    {loreCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loreContent" className="text-ink-800 font-medium">
                  Content
                </Label>
                <Textarea
                  id="loreContent"
                  value={newLoreEntry.content || ""}
                  onChange={(e) => setNewLoreEntry((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your lore entry content..."
                  rows={6}
                  className="bg-parchment-50 border-parchment-300 text-ink-700 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loreImportance" className="text-ink-800 font-medium">
                  Importance
                </Label>
                <select
                  id="loreImportance"
                  value={newLoreEntry.importance || "Medium"}
                  onChange={(e) =>
                    setNewLoreEntry((prev) => ({ ...prev, importance: e.target.value as "Low" | "Medium" | "High" }))
                  }
                  className="w-full px-3 py-2 bg-parchment-50 border border-parchment-300 rounded-md text-ink-700"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsLoreModalOpen(false)}
                  className="border-parchment-400 text-ink-700 hover:bg-parchment-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateLoreEntry}
                  disabled={!newLoreEntry.title?.trim()}
                  className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                >
                  Create Lore Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
