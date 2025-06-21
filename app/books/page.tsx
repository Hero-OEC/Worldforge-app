"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Plus, Calendar, Users, MapPin, Edit, Trash2, X } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  genre: string
  createdAt: Date
  lastModified: Date
  charactersCount: number
  locationsCount: number
  eventsCount: number
  coverImage?: string
}

export default function BooksPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "The Chronicles of Elena",
      description:
        "A fantasy epic about a young mage discovering her true potential in a world of magic and political intrigue.",
      genre: "Fantasy",
      createdAt: new Date(2024, 0, 15),
      lastModified: new Date(2024, 5, 20),
      charactersCount: 12,
      locationsCount: 8,
      eventsCount: 25,
    },
    {
      id: "2",
      title: "Neon Shadows",
      description: "A cyberpunk thriller set in Neo-Tokyo where hackers fight against corporate overlords.",
      genre: "Cyberpunk",
      createdAt: new Date(2024, 2, 10),
      lastModified: new Date(2024, 5, 18),
      charactersCount: 7,
      locationsCount: 5,
      eventsCount: 18,
    },
  ])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    genre: "",
  })

  const handleCreateProject = () => {
    if (!newProject.title.trim()) return

    const project: Project = {
      id: `project-${Date.now()}`,
      title: newProject.title,
      description: newProject.description,
      genre: newProject.genre || "General",
      createdAt: new Date(),
      lastModified: new Date(),
      charactersCount: 0,
      locationsCount: 0,
      eventsCount: 0,
    }

    setProjects((prev) => [...prev, project])
    setNewProject({ title: "", description: "", genre: "" })
    setIsCreateModalOpen(false)
  }

  const handleOpenProject = (projectId: string) => {
    // Navigate to the project's timeline page
    window.location.href = "/"
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId))
  }

  return (
    <div className="min-h-screen bg-parchment-200">
      {/* Header */}
      <header className="bg-parchment-100 border-b-2 border-parchment-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-parchment-50" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-ink-800">WorldForge</h1>
                <p className="text-ink-600">Your Creative Writing Companion</p>
              </div>
            </div>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-accent-500 hover:bg-accent-600 text-parchment-50 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-ink-800 mb-2">Your Projects</h2>
          <p className="text-ink-600">Manage and organize your creative writing projects</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-parchment-50 border-parchment-300 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-ink-800 text-lg mb-2 group-hover:text-accent-600 transition-colors">
                      {project.title}
                    </CardTitle>
                    <Badge variant="outline" className="border-parchment-400 text-ink-600 text-xs">
                      {project.genre}
                    </Badge>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-ink-500 hover:text-ink-700">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-ink-500 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteProject(project.id)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent onClick={() => handleOpenProject(project.id)}>
                <p className="text-ink-600 text-sm mb-4 line-clamp-3 leading-relaxed">{project.description}</p>

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-ink-500 mb-1">
                      <Users className="w-3 h-3" />
                    </div>
                    <div className="text-sm font-medium text-ink-700">{project.charactersCount}</div>
                    <div className="text-xs text-ink-500">Characters</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-ink-500 mb-1">
                      <MapPin className="w-3 h-3" />
                    </div>
                    <div className="text-sm font-medium text-ink-700">{project.locationsCount}</div>
                    <div className="text-xs text-ink-500">Locations</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-ink-500 mb-1">
                      <Calendar className="w-3 h-3" />
                    </div>
                    <div className="text-sm font-medium text-ink-700">{project.eventsCount}</div>
                    <div className="text-xs text-ink-500">Events</div>
                  </div>
                </div>

                {/* Last Modified */}
                <div className="text-xs text-ink-500 border-t border-parchment-300 pt-3">
                  Last modified: {project.lastModified.toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <BookOpen className="w-16 h-16 text-ink-400 mb-4" />
              <h3 className="text-xl font-semibold text-ink-700 mb-2">No projects yet</h3>
              <p className="text-ink-500 mb-4">Create your first worldbuilding project to get started</p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-ink-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-parchment-50 border-parchment-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-bold text-ink-800">Create New Project</CardTitle>
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
                <Label htmlFor="title" className="text-ink-800 font-medium">
                  Project Title *
                </Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter your project title..."
                  className="bg-parchment-50 border-parchment-300 text-ink-700 placeholder-ink-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre" className="text-ink-800 font-medium">
                  Genre
                </Label>
                <Input
                  id="genre"
                  value={newProject.genre}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, genre: e.target.value }))}
                  placeholder="Fantasy, Sci-Fi, Mystery..."
                  className="bg-parchment-50 border-parchment-300 text-ink-700 placeholder-ink-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-ink-800 font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your project..."
                  rows={3}
                  className="bg-parchment-50 border-parchment-300 text-ink-700 placeholder-ink-400 resize-none"
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
                  onClick={handleCreateProject}
                  disabled={!newProject.title.trim()}
                  className="bg-accent-500 hover:bg-accent-600 text-parchment-50"
                >
                  Create Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
