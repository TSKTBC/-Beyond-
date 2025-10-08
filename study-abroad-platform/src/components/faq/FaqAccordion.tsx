'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
}

interface FaqAccordionProps {
  items: FaqItem[]
  defaultOpenId?: string
}

export function FaqAccordion({ items, defaultOpenId }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null)

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleItem(id)
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Question Button */}
            <button
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            >
              <span className="text-lg font-semibold text-gray-900 flex-1">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Answer Content */}
            <div
              id={`faq-answer-${item.id}`}
              role="region"
              aria-labelledby={`faq-question-${item.id}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-5 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                {item.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

interface FaqCategory {
  id: string
  label: string
  icon: string
}

interface FaqSectionProps {
  categories: FaqCategory[]
  items: FaqItem[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function FaqSection({
  categories,
  items,
  activeCategory,
  onCategoryChange
}: FaqSectionProps) {
  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category.id
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg" aria-hidden="true">
                {category.icon}
              </span>
              <span>{category.label}</span>
            </button>
          )
        })}
      </div>

      {/* FAQ Items */}
      <FaqAccordion items={items} />
    </div>
  )
}
