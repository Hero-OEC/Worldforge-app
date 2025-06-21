"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { MapPin, Plus, X, Upload, Compass, Mountain, Building, Trees } from "lucide-react"

interface Location {
  id: string
  name: string
  type: string
  description: string
  geography: string
  climate: string
  population: string
  government: string
  economy: string
  culture: string
  history: string
  notableFeatures: string
  connectedLocations: string[]
  image?: string
  mapImage?: string
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: "1",
      name: "Arcanum City",
      type: "Capital City",
      description: "The grand capital city and center of magical learning in the realm.",
      geography: "Built on a series of floating islands connected by magical bridges, overlooking a vast valley.",
      climate: "Temperate with mild winters and warm summers, magically regulated weather.",
      population: "500,000 inhabitants, mostly humans with significant populations of elves and other magical races.",
      government: "Ruled by the Arcane Council, a group of powerful mages elected by the magical guilds.",
      economy:
        "Center of magical trade, enchanted item crafting, and arcane research. Major exports include spell components and magical artifacts.",
      culture: "Highly values magical knowledge and learning. Home to the Grand Academy of Arcane Arts.",
      history: "Founded 800 years ago by the first Archmage, built using ancient levitation magic.",
      notableFeatures: "The Floating Spires, Crystal Gardens, Grand Academy, Mage Quarter, Enchanted Markets",
      connectedLocations: ["The Whispering Woods", "Royal Palace", "Elemental Sanctum"],
    },
    {
      id: "2",
      name: "The Whispering Woods",
      type: "Enchanted Forest",
      description: "A mysterious forest where the trees themselves seem to whisper ancient secrets.",
      geography:
        "Dense woodland covering several hundred square miles, with ancient trees reaching impossible heights.",
      climate: "Cool and misty year-round, with frequent magical phenomena affecting weather patterns.",
      population: "Sparsely populated by druids, forest spirits, and various magical creatures.",
      government: "No formal government, protected by the Circle of Druids and ancient forest spirits.",
      economy: "Source of rare herbs, magical components, and enchanted wood. Limited trade with outside world.",
      culture: "Deep connection to nature and ancient magic. Oral traditions passed down through generations.",
      history: "One of the oldest locations in the realm, predating human civilization by millennia.",
      notableFeatures: "The Heart Tree, Moonlit Clearings, Spirit Groves, Ancient Stone Circles",
      connectedLocations: ["Arcanum City", "Millbrook Village"],
    },
  ])

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    name: "",
    type: "",
    description: "",
    geography: "",
    climate: "",
    population: "",
    government: "",
    economy: "",
    culture: "",
    history: "",
    notableFeatures: "",
    connectedLocations: [],
  })

  const locationTypes = [
    "City",
    "Town",
    "Village",
    "Capital City",
    "Fortress",
    "Castle",
    "Forest",
    "Mountain",
    "Desert",
    "Ocean",
    "Island",
    "Dungeon",
    "Temple",
    "Ruins",
    "Magical Realm",
  ]

  const handleCreateLocation = () => {
    if (!newLocation.name?.trim()) return

    const location: Location = {
      id: `loc-${Date.now()}`,
      ...(newLocation as Location),
      connectedLocations: [],
    }

    setLocations((prev) => [...prev, location])
    setNewLocation({
      name: "",
      type: "",
      description: "",
      geography: "",
      climate: "",
      population: "",
      government: "",
      economy: "",
      culture: "",
      history: "",
      notableFeatures: "",
      connectedLocations: [],
    })
    setIsCreateModalOpen(false)
  }

  const getLocationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "city":
      case "capital city":
        return <Building className="w-5 h-5" />
      case "forest":
      case "enchanted forest":
        return <Trees className="w-5 h-5" />
      case "mountain":
        return <Mountain className="w-5 h-5" />
      case "fortress":
      case "castle":
        return <Building className="w-5 h-5" />
      default:
        return <MapPin className="w-5 h-5" />
    }
  }

  const handleImageUpload = (type: "location" | "map") => {
    // Placeholder for image upload functionality
    console.log(`Upload ${type} image`)
  }

  return (
    <div className="min-h-screen bg-parchment-200">
      <Header currentPage="locations" projectTitle="The Chronicles of Elena" />

      <main className="pt-24 p-6">
        <div className="max-w-7xl mx-auto">
          {!selectedLocation ? (
            <>
              {/* Locations List */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-ink-700 mb-2">Locations</h1>
                  <p className="text-ink-600">Explore and manage the places in your world</p>
                </div>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-accent-500 hover:bg-accent-600 text-parchment-50 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Location
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((location) => (
                  <Card
                    key={location.id}
                    className="bg-parchment-50 border-parchment-300 hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => setSelectedLocation(location)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-parchment-300 rounded-lg flex items-center justify-center flex-shrink-0">
                          {location.image ? (
                            <img
                              src={location.image || "/placeholder.svg"}
                              alt={location.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            getLocationIcon(location.type)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-ink-800 text-lg mb-1 truncate">{location.name}</CardTitle>
                          <Badge variant="outline" className="border-parchment-400 text-ink-600 text-xs mb-2">
                            {location.type}
                          </Badge>
                          <p className="text-ink-600 text-sm line-clamp-2">{location.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}

                {locations.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <MapPin className="w-16 h-16 text-ink-400 mb-4" />
                    <h3 className="text-xl font-semibold text-ink-700 mb-2">No locations yet</h3>
                    <p className="text-ink-500 mb-4">Create your first location to start building your world</p>
                    <Button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Location
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Location Detail View */
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="outline"
                  onClick={() => setSelectedLocation(null)}
                  className="border-parchment-400 text-ink-700 hover:bg-parchment-100"
                >
                  ← Back to Locations
                </Button>
                <h1 className="text-3xl font-bold text-ink-700">{selectedLocation.name}</h1>
                <Badge variant="outline" className="border-parchment-400 text-ink-600">
                  {selectedLocation.type}
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Location Images */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Main Image */}
                  <Card className="bg-parchment-50 border-parchment-300">
                    <CardHeader>
                      <CardTitle className="text-ink-800 flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Location Image
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-square bg-parchment-300 rounded-lg flex items-center justify-center mb-4 relative group">
                        {selectedLocation.image ? (
                          <img
                            src={selectedLocation.image || "/placeholder.svg"}
                            alt={selectedLocation.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          getLocationIcon(selectedLocation.type)
                        )}
                        <Button
                          size="sm"
                          onClick={() => handleImageUpload("location")}
                          className="absolute inset-0 bg-ink-900 bg-opacity-50 text-parchment-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Image
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Map */}
                  <Card className="bg-parchment-50 border-parchment-300">
                    <CardHeader>
                      <CardTitle className="text-ink-800 flex items-center gap-2">
                        <Compass className="w-5 h-5" />
                        Map
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-square bg-parchment-300 rounded-lg flex items-center justify-center mb-4 relative group">
                        {selectedLocation.mapImage ? (
                          <img
                            src={selectedLocation.mapImage || "/placeholder.svg"}
                            alt={`${selectedLocation.name} map`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Compass className="w-16 h-16 text-ink-500" />
                        )}
                        <Button
                          size="sm"
                          onClick={() => handleImageUpload("map")}
                          className="absolute inset-0 bg-ink-900 bg-opacity-50 text-parchment-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Map
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Location Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Information */}
                  <Card className="bg-parchment-50 border-parchment-300">
                    <CardHeader>
                      <CardTitle className="text-ink-800">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-ink-800 mb-2">Description</h3>
                        <p className="text-ink-700">{selectedLocation.description}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-ink-800 mb-2">Geography</h3>
                        <p className="text-ink-700">{selectedLocation.geography}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-ink-800 mb-2">Climate</h3>
                        <p className="text-ink-700">{selectedLocation.climate}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Society & Culture */}
                  <Card className="bg-parchment-50 border-parchment-300">
                    <CardHeader>
                      <CardTitle className="text-ink-800">Society & Culture</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-ink-800 mb-2">Population</h3>
                        <p className="text-ink-700">{selectedLocation.population}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-ink-800 mb-2">Government</h3>
                        <p className="text-ink-700">{selectedLocation.government}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-ink-800 mb-2">Economy</h3>
                        <p className="text-ink-700">{selectedLocation.economy}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-ink-800 mb-2">Culture</h3>
                        <p className="text-ink-700">{selectedLocation.culture}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* History & Features */}
                  <Card className="bg-parchment-50 border-parchment-300">
                    <CardHeader>
                      <CardTitle className="text-ink-800">History & Features</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-ink-800 mb-2">History</h3>
                        <p className="text-ink-700">{selectedLocation.history}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-ink-800 mb-2">Notable Features</h3>
                        <p className="text-ink-700">{selectedLocation.notableFeatures}</p>
                      </div>
                      {selectedLocation.connectedLocations.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-ink-800 mb-2">Connected Locations</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedLocation.connectedLocations.map((loc, index) => (
                              <Badge key={index} variant="outline" className="border-parchment-400 text-ink-600">
                                {loc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Create Location Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-ink-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-parchment-50 border-parchment-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-bold text-ink-800">Create New Location</CardTitle>
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
                    Location Name *
                  </Label>
                  <Input
                    id="name"
                    value={newLocation.name || ""}
                    onChange={(e) => setNewLocation((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Location name..."
                    className="bg-parchment-50 border-parchment-300 text-ink-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-ink-800 font-medium">
                    Type
                  </Label>
                  <select
                    id="type"
                    value={newLocation.type || ""}
                    onChange={(e) => setNewLocation((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 bg-parchment-50 border border-parchment-300 rounded-md text-ink-700"
                  >
                    <option value="">Select type...</option>
                    {locationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-ink-800 font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newLocation.description || ""}
                  onChange={(e) => setNewLocation((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief location description..."
                  rows={3}
                  className="bg-parchment-50 border-parchment-300 text-ink-700 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="geography" className="text-ink-800 font-medium">
                  Geography
                </Label>
                <Textarea
                  id="geography"
                  value={newLocation.geography || ""}
                  onChange={(e) => setNewLocation((prev) => ({ ...prev, geography: e.target.value }))}
                  placeholder="Physical features, terrain, layout..."
                  rows={2}
                  className="bg-parchment-50 border-parchment-300 text-ink-700 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="climate" className="text-ink-800 font-medium">
                    Climate
                  </Label>
                  <Input
                    id="climate"
                    value={newLocation.climate || ""}
                    onChange={(e) => setNewLocation((prev) => ({ ...prev, climate: e.target.value }))}
                    placeholder="Weather patterns..."
                    className="bg-parchment-50 border-parchment-300 text-ink-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="population" className="text-ink-800 font-medium">
                    Population
                  </Label>
                  <Input
                    id="population"
                    value={newLocation.population || ""}
                    onChange={(e) => setNewLocation((prev) => ({ ...prev, population: e.target.value }))}
                    placeholder="Who lives here..."
                    className="bg-parchment-50 border-parchment-300 text-ink-700"
                  />
                </div>
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
                  onClick={handleCreateLocation}
                  disabled={!newLocation.name?.trim()}
                  className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                >
                  Create Location
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
