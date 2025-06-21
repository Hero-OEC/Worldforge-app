"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Users, MapPin, BookOpen, Scroll, Settings, Menu, X } from "lucide-react"

interface HeaderProps {
  currentPage?: string
  projectTitle?: string
  onLogoClick?: () => void
}

export function Header({ currentPage = "timeline", projectTitle = "WorldForge", onLogoClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { id: "timeline", label: "Timeline", icon: Calendar, href: "/" },
    { id: "characters", label: "Characters", icon: Users, href: "/characters" },
    { id: "locations", label: "Locations", icon: MapPin, href: "/locations" },
    { id: "lore", label: "Lore & Magic", icon: BookOpen, href: "/lore" },
    { id: "notes", label: "Notes", icon: Scroll, href: "/notes" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-parchment-100 border-b-2 border-parchment-300 shadow-sm">
      {/* Main Header */}
      <header className="h-20 py-2.5">
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            {/* Logo - clickable to go to books page */}
            <button
              onClick={onLogoClick}
              className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center hover:bg-accent-600 transition-colors"
            >
              <BookOpen className="w-6 h-6 text-parchment-50" />
            </button>
            <h1 className="text-xl font-bold text-ink-800 hidden sm:block">{projectTitle}</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`
                    flex items-center gap-2 px-4 py-2 transition-all duration-200
                    ${
                      isActive
                        ? "bg-accent-500 text-parchment-50 hover:bg-accent-600"
                        : "text-ink-700 hover:bg-parchment-200 hover:text-ink-800"
                    }
                  `}
                  onClick={() => {
                    window.location.href = item.href
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Button>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-ink-700 hover:bg-parchment-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-parchment-100 border-b-2 border-parchment-300 shadow-lg">
            <nav className="flex flex-col p-4 gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id

                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`
                      flex items-center gap-3 px-4 py-3 justify-start transition-all duration-200
                      ${
                        isActive
                          ? "bg-accent-500 text-parchment-50 hover:bg-accent-600"
                          : "text-ink-700 hover:bg-parchment-200 hover:text-ink-800"
                      }
                    `}
                    onClick={() => {
                      window.location.href = item.href
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                )
              })}
            </nav>
          </div>
        )}
      </header>
    </div>
  )
}
