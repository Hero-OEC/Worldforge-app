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
import { User, Plus, X, Upload, Sword, Eye, Ruler } from "lucide-react"

interface Weapon {
  id: string
  name: string
  type: string
  description: string
  damage?: string
  properties?: string[]
  image?: string
}

interface Character {
  id: string
  name: string
  age: number
  race: string
  class: string
  background: string
  description: string
  appearance: string
  personality: string
  backstory: string
  goals: string
  fears: string
  relationships: string
  image?: string
  weapons: Weapon[]
  // Stats
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
  // Physical
  height: string
  weight: string
  eyeColor: string
  hairColor: string
  location: string
}

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: "1",
      name: "Elena Brightblade",
      age: 22,
      race: "Human",
      class: "Mage",
      background: "Noble",
      description: "A young mage with incredible potential and a mysterious past.",
      appearance: "Tall and graceful with flowing auburn hair and piercing green eyes.",
      personality: "Determined, compassionate, but sometimes impulsive.",
      backstory: "Born into nobility but discovered her magical abilities late in life.",
      goals: "To master her magical abilities and protect her kingdom.",
      fears: "Losing control of her powers and hurting those she loves.",
      relationships: "Close friend of Marcus, mentored by Archmage Theron.",
      strength: 12,
      dexterity: 16,
      constitution: 14,
      intelligence: 18,
      wisdom: 15,
      charisma: 17,
      height: "5'7\"",
      weight: "130 lbs",
      eyeColor: "Green",
      hairColor: "Auburn",
      location: "Arcanum City",
      weapons: [
        {
          id: "w1",
          name: "Staff of Elements",
          type: "Staff",
          description: "A powerful magical staff that channels elemental magic.",
          damage: "1d6 + spell modifier",
          properties: ["Magical", "Two-handed", "Focus"],
        },
      ],
    },
  ])

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isWeaponModalOpen, setIsWeaponModalOpen] = useState(false)
  const [editingWeapon, setEditingWeapon] = useState<Weapon | null>(null)

  const [newCharacter, setNewCharacter] = useState<Partial<Character>>({
    name: "",
    age: 20,
    race: "",
    class: "",
    background: "",
    description: "",
    appearance: "",
    personality: "",
    backstory: "",
    goals: "",
    fears: "",
    relationships: "",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    height: "",
    weight: "",
    eyeColor: "",
    hairColor: "",
    location: "",
    weapons: [],
  })

  const [newWeapon, setNewWeapon] = useState<Partial<Weapon>>({
    name: "",
    type: "",
    description: "",
    damage: "",
    properties: [],
  })

  const handleCreateCharacter = () => {
    if (!newCharacter.name?.trim()) return

    const character: Character = {
      id: `char-${Date.now()}`,
      ...(newCharacter as Character),
      weapons: [],
    }

    setCharacters((prev) => [...prev, character])
    setNewCharacter({
      name: "",
      age: 20,
      race: "",
      class: "",
      background: "",
      description: "",
      appearance: "",
      personality: "",
      backstory: "",
      goals: "",
      fears: "",
      relationships: "",
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      height: "",
      weight: "",
      eyeColor: "",
      hairColor: "",
      location: "",
      weapons: [],
    })
    setIsCreateModalOpen(false)
  }

  const handleAddWeapon = () => {
    if (!newWeapon.name?.trim() || !selectedCharacter) return

    const weapon: Weapon = {
      id: `weapon-${Date.now()}`,
      ...(newWeapon as Weapon),
      properties: newWeapon.properties || [],
    }

    setCharacters((prev) =>
      prev.map((char) => (char.id === selectedCharacter.id ? { ...char, weapons: [...char.weapons, weapon] } : char)),
    )

    setSelectedCharacter((prev) => (prev ? { ...prev, weapons: [...prev.weapons, weapon] } : null))
    setNewWeapon({ name: "", type: "", description: "", damage: "", properties: [] })
    setIsWeaponModalOpen(false)
  }

  const handleImageUpload = (type: "character" | "weapon") => {
    // Placeholder for image upload functionality
    console.log(`Upload ${type} image`)
  }

  return (
    <div className="min-h-screen bg-parchment-200">
      <Header currentPage="characters" projectTitle="The Chronicles of Elena" />

      <main className="pt-24 p-6">
        <div className="max-w-7xl mx-auto">
          {!selectedCharacter ? (
            <>
              {/* Characters List */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-ink-700 mb-2">Characters</h1>
                  <p className="text-ink-600">Manage your story's characters and their details</p>
                </div>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-accent-500 hover:bg-accent-600 text-parchment-50 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Character
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {characters.map((character) => (
                  <Card
                    key={character.id}
                    className="bg-parchment-50 border-parchment-300 hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => setSelectedCharacter(character)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-parchment-300 rounded-lg flex items-center justify-center flex-shrink-0">
                          {character.image ? (
                            <img
                              src={character.image || "/placeholder.svg"}
                              alt={character.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <User className="w-8 h-8 text-ink-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-ink-800 text-lg mb-1 truncate">{character.name}</CardTitle>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <Badge variant="outline" className="border-parchment-400 text-ink-600 text-xs">
                              {character.race}
                            </Badge>
                            <Badge variant="outline" className="border-parchment-400 text-ink-600 text-xs">
                              {character.class}
                            </Badge>
                          </div>
                          <p className="text-ink-600 text-sm line-clamp-2">{character.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}

                {characters.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <User className="w-16 h-16 text-ink-400 mb-4" />
                    <h3 className="text-xl font-semibold text-ink-700 mb-2">No characters yet</h3>
                    <p className="text-ink-500 mb-4">Create your first character to get started</p>
                    <Button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Character
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Character Detail View */
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCharacter(null)}
                  className="border-parchment-400 text-ink-700 hover:bg-parchment-100"
                >
                  ← Back to Characters
                </Button>
                <h1 className="text-3xl font-bold text-ink-700">{selectedCharacter.name}</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Character Portrait */}
                <div className="lg:col-span-1">
                  <Card className="bg-parchment-50 border-parchment-300">
                    <CardHeader>
                      <CardTitle className="text-ink-800 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Portrait
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-square bg-parchment-300 rounded-lg flex items-center justify-center mb-4 relative group">
                        {selectedCharacter.image ? (
                          <img
                            src={selectedCharacter.image || "/placeholder.svg"}
                            alt={selectedCharacter.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <User className="w-16 h-16 text-ink-500" />
                        )}
                        <Button
                          size="sm"
                          onClick={() => handleImageUpload("character")}
                          className="absolute inset-0 bg-ink-900 bg-opacity-50 text-parchment-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Image
                        </Button>
                      </div>

                      {/* Quick Stats */}
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-ink-600">Age:</span>
                          <span className="text-ink-800 font-medium">{selectedCharacter.age}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-ink-600">Race:</span>
                          <span className="text-ink-800 font-medium">{selectedCharacter.race}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-ink-600">Class:</span>
                          <span className="text-ink-800 font-medium">{selectedCharacter.class}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-ink-600">Location:</span>
                          <span className="text-ink-800 font-medium">{selectedCharacter.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Character Details */}
                <div className="lg:col-span-2">
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid grid-cols-4 bg-parchment-100 text-center mx-[0] px-[0] w-fit">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      
                      
                      <TabsTrigger className="mx-[0] px-2.5" value="weapons">Weapons</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4">
                      <Card className="bg-parchment-50 border-parchment-300">
                        <CardContent className="p-6 space-y-4">
                          <div>
                            <h3 className="font-semibold text-ink-800 mb-2">Description</h3>
                            <p className="text-ink-700">{selectedCharacter.description}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-ink-800 mb-2">Personality</h3>
                            <p className="text-ink-700">{selectedCharacter.personality}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-ink-800 mb-2">Backstory</h3>
                            <p className="text-ink-700">{selectedCharacter.backstory}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-ink-800 mb-2">Goals</h3>
                            <p className="text-ink-700">{selectedCharacter.goals}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-ink-800 mb-2">Fears</h3>
                            <p className="text-ink-700">{selectedCharacter.fears}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-ink-800 mb-2">Relationships</h3>
                            <p className="text-ink-700">{selectedCharacter.relationships}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="stats" className="space-y-4">
                      <Card className="bg-parchment-50 border-parchment-300">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                              { name: "Strength", value: selectedCharacter.strength, icon: "💪" },
                              { name: "Dexterity", value: selectedCharacter.dexterity, icon: "🏃" },
                              { name: "Constitution", value: selectedCharacter.constitution, icon: "❤️" },
                              { name: "Intelligence", value: selectedCharacter.intelligence, icon: "🧠" },
                              { name: "Wisdom", value: selectedCharacter.wisdom, icon: "👁️" },
                              { name: "Charisma", value: selectedCharacter.charisma, icon: "✨" },
                            ].map((stat) => (
                              <div key={stat.name} className="text-center p-4 bg-parchment-100 rounded-lg">
                                <div className="text-2xl mb-2">{stat.icon}</div>
                                <div className="font-semibold text-ink-800">{stat.name}</div>
                                <div className="text-2xl font-bold text-accent-600">{stat.value}</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="physical" className="space-y-4">
                      <Card className="bg-parchment-50 border-parchment-300">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="font-semibold text-ink-800 mb-4">Physical Attributes</h3>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <Ruler className="w-4 h-4 text-ink-500" />
                                  <span className="text-ink-600">Height:</span>
                                  <span className="text-ink-800 font-medium">{selectedCharacter.height}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="w-4 h-4 text-ink-500">⚖️</span>
                                  <span className="text-ink-600">Weight:</span>
                                  <span className="text-ink-800 font-medium">{selectedCharacter.weight}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Eye className="w-4 h-4 text-ink-500" />
                                  <span className="text-ink-600">Eye Color:</span>
                                  <span className="text-ink-800 font-medium">{selectedCharacter.eyeColor}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="w-4 h-4 text-ink-500">💇</span>
                                  <span className="text-ink-600">Hair Color:</span>
                                  <span className="text-ink-800 font-medium">{selectedCharacter.hairColor}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-ink-800 mb-4">Appearance</h3>
                              <p className="text-ink-700 leading-relaxed">{selectedCharacter.appearance}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="weapons" className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-ink-800">Weapons & Equipment</h3>
                        <Button
                          onClick={() => setIsWeaponModalOpen(true)}
                          size="sm"
                          className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Weapon
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedCharacter.weapons.map((weapon) => (
                          <Card key={weapon.id} className="bg-parchment-50 border-parchment-300">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-parchment-300 rounded-lg flex items-center justify-center flex-shrink-0 relative group">
                                  {weapon.image ? (
                                    <img
                                      src={weapon.image || "/placeholder.svg"}
                                      alt={weapon.name}
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  ) : (
                                    <Sword className="w-8 h-8 text-ink-500" />
                                  )}
                                  <Button
                                    size="sm"
                                    onClick={() => handleImageUpload("weapon")}
                                    className="absolute inset-0 bg-ink-900 bg-opacity-50 text-parchment-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg text-xs"
                                  >
                                    <Upload className="w-3 h-3" />
                                  </Button>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-ink-800 mb-1">{weapon.name}</h4>
                                  <Badge variant="outline" className="border-parchment-400 text-ink-600 text-xs mb-2">
                                    {weapon.type}
                                  </Badge>
                                  <p className="text-ink-600 text-sm mb-2">{weapon.description}</p>
                                  {weapon.damage && (
                                    <div className="text-xs text-ink-500">
                                      <strong>Damage:</strong> {weapon.damage}
                                    </div>
                                  )}
                                  {weapon.properties && weapon.properties.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {weapon.properties.map((prop, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                          {prop}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {selectedCharacter.weapons.length === 0 && (
                          <div className="col-span-full flex flex-col items-center justify-center py-8 text-center">
                            <Sword className="w-12 h-12 text-ink-400 mb-3" />
                            <p className="text-ink-500 mb-3">No weapons added yet</p>
                            <Button
                              onClick={() => setIsWeaponModalOpen(true)}
                              size="sm"
                              className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add First Weapon
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Create Character Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-ink-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-parchment-50 border-parchment-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-bold text-ink-800">Create New Character</CardTitle>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-ink-800 font-medium">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    value={newCharacter.name || ""}
                    onChange={(e) => setNewCharacter((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Character name..."
                    className="bg-parchment-50 border-parchment-300 text-ink-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-ink-800 font-medium">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={newCharacter.age || 20}
                    onChange={(e) => setNewCharacter((prev) => ({ ...prev, age: Number.parseInt(e.target.value) }))}
                    className="bg-parchment-50 border-parchment-300 text-ink-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="race" className="text-ink-800 font-medium">
                    Race
                  </Label>
                  <Input
                    id="race"
                    value={newCharacter.race || ""}
                    onChange={(e) => setNewCharacter((prev) => ({ ...prev, race: e.target.value }))}
                    placeholder="Human, Elf, Dwarf..."
                    className="bg-parchment-50 border-parchment-300 text-ink-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class" className="text-ink-800 font-medium">
                    Class
                  </Label>
                  <Input
                    id="class"
                    value={newCharacter.class || ""}
                    onChange={(e) => setNewCharacter((prev) => ({ ...prev, class: e.target.value }))}
                    placeholder="Warrior, Mage, Rogue..."
                    className="bg-parchment-50 border-parchment-300 text-ink-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-ink-800 font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newCharacter.description || ""}
                  onChange={(e) => setNewCharacter((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief character description..."
                  rows={3}
                  className="bg-parchment-50 border-parchment-300 text-ink-700 resize-none"
                />
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
                  onClick={handleCreateCharacter}
                  disabled={!newCharacter.name?.trim()}
                  className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                >
                  Create Character
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Weapon Modal */}
      {isWeaponModalOpen && (
        <div className="fixed inset-0 bg-ink-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-parchment-50 border-parchment-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-bold text-ink-800">Add Weapon</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsWeaponModalOpen(false)}
                className="text-ink-600 hover:text-ink-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weaponName" className="text-ink-800 font-medium">
                  Weapon Name *
                </Label>
                <Input
                  id="weaponName"
                  value={newWeapon.name || ""}
                  onChange={(e) => setNewWeapon((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Weapon name..."
                  className="bg-parchment-50 border-parchment-300 text-ink-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weaponType" className="text-ink-800 font-medium">
                  Type
                </Label>
                <Input
                  id="weaponType"
                  value={newWeapon.type || ""}
                  onChange={(e) => setNewWeapon((prev) => ({ ...prev, type: e.target.value }))}
                  placeholder="Sword, Bow, Staff..."
                  className="bg-parchment-50 border-parchment-300 text-ink-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weaponDescription" className="text-ink-800 font-medium">
                  Description
                </Label>
                <Textarea
                  id="weaponDescription"
                  value={newWeapon.description || ""}
                  onChange={(e) => setNewWeapon((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Weapon description..."
                  rows={3}
                  className="bg-parchment-50 border-parchment-300 text-ink-700 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weaponDamage" className="text-ink-800 font-medium">
                  Damage
                </Label>
                <Input
                  id="weaponDamage"
                  value={newWeapon.damage || ""}
                  onChange={(e) => setNewWeapon((prev) => ({ ...prev, damage: e.target.value }))}
                  placeholder="1d8, 2d6+2..."
                  className="bg-parchment-50 border-parchment-300 text-ink-700"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsWeaponModalOpen(false)}
                  className="border-parchment-400 text-ink-700 hover:bg-parchment-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddWeapon}
                  disabled={!newWeapon.name?.trim()}
                  className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                >
                  Add Weapon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
