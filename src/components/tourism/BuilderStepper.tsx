import type { LucideIcon } from 'lucide-react';

interface StepperStep {
  label: string;
  icon: LucideIcon;
}

interface BuilderStepperProps {
  activeStep: number;
  steps: StepperStep[];
}

export function BuilderStepper({ activeStep, steps }: BuilderStepperProps) {
  return (
    <div className="w-full relative mb-8">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 z-0"></div>
      <div className="relative z-10 flex justify-between items-center px-4">
        {steps.map((step, idx) => {
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;
          const IconComponent = step.icon;

          return (
            <div key={idx} className="flex flex-col items-center gap-2 bg-[#F8FAFC]">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-[#F8FAFC] shadow-sm transition-all duration-300 ${
                isActive 
                  ? 'bg-[#BC2C2C] text-white scale-110' 
                  : isCompleted 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white text-gray-400'
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                isActive 
                  ? 'text-[#BC2C2C]' 
                  : isCompleted 
                    ? 'text-emerald-500' 
                    : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
