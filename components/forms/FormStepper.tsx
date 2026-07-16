import { Circle, CircleCheckBig } from "lucide-react"
import { useState } from "react"
import React from "react"
import { studentSteps } from "@/lib/formSteps"

type FormStepperProps = {
  currentStep: number
}

const FormStepper = ({ currentStep }: FormStepperProps) => {
  return (
    <div className='indicator flex justify-around relative'>
      {studentSteps.map((stepName, index) => (
        <div key={stepName} className='flex flex-col items-center gap-4'>
          <h3
            className={`font-semibold text-base ${
              index === currentStep
                ? "text-brand"
                : index < currentStep
                  ? "text-green-600"
                  : "text-gray-400"
            }`}>
            {stepName}
          </h3>

          {index < currentStep ? (
            <CircleCheckBig className='text-center size-4 text-green-600 fill-white bg-white z-10' />
          ) : index === currentStep ? (
            <Circle
              size={16}
              strokeWidth={3}
              absoluteStrokeWidth
              className='text-brand fill-white bg-white z-10'
            />
          ) : (
            <Circle className='text-center size-4 text-gray-400 fill-white bg-white z-10' />
          )}
        </div>
      ))}

      {/* <Circle size={16} strokeWidth={3} absoluteStrokeWidth />  */}

      <div className='border-b border-brand  border-dashed pb-2 size-1 absolute w-[80%] bottom-2'></div>
    </div>
  )
}

export default FormStepper
