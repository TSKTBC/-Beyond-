'use client'

import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
}

interface StepsProps {
  steps: Step[]
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Steps({
  steps,
  currentStep,
  orientation = 'horizontal',
  className
}: StepsProps) {
  return (
    <div className={cn(
      "w-full",
      orientation === 'vertical' ? 'space-y-4' : '',
      className
    )}>
      <div className={cn(
        "flex",
        orientation === 'horizontal' ? 'items-center justify-between' : 'flex-col space-y-4'
      )}>
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center",
                orientation === 'horizontal' && index < steps.length - 1 ? 'flex-1' : ''
              )}
            >
              <div className="flex items-center">
                {/* Step Circle */}
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                  isCompleted && "bg-green-500 border-green-500 text-white",
                  isActive && "bg-primary border-primary text-primary-foreground",
                  isUpcoming && "bg-gray-100 border-gray-300 text-gray-400"
                )}>
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>

                {/* Step Content */}
                <div className={cn(
                  "ml-4",
                  orientation === 'vertical' ? 'flex-1' : 'hidden sm:block'
                )}>
                  <div className={cn(
                    "text-sm font-medium transition-colors",
                    isCompleted && "text-green-600",
                    isActive && "text-primary",
                    isUpcoming && "text-gray-500"
                  )}>
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {orientation === 'horizontal' && index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-4 transition-all duration-300",
                  stepNumber < currentStep ? "bg-green-500" : "bg-gray-200"
                )} />
              )}

              {orientation === 'vertical' && index < steps.length - 1 && (
                <div className={cn(
                  "w-0.5 h-8 ml-5 transition-all duration-300",
                  stepNumber < currentStep ? "bg-green-500" : "bg-gray-200"
                )} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}