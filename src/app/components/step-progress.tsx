import { motion } from "motion/react";
import { Check } from "lucide-react";

interface Step {
  label: string;
  description?: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
}

export function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-start">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <>
              {/* Step item — each step gets equal flex-1 and is truly centered */}
              <div key={index} className="flex flex-col items-center flex-1">
                <motion.div
                  className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center
                    transition-all duration-300
                    ${isCompleted
                      ? "bg-[#4ADE80] border-[#4ADE80] shadow-[0_0_20px_rgba(74,222,128,0.4)]"
                      : isCurrent
                        ? "bg-[#F5B942] border-[#F5B942] shadow-[0_0_20px_rgba(245,185,66,0.4)]"
                        : "bg-white/5 border-white/20"
                    }
                  `}
                  initial={false}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span className={`text-sm font-medium ${isCurrent ? "text-[#0B1220]" : "text-white/50"}`}>
                      {index + 1}
                    </span>
                  )}
                </motion.div>

                {/* Step label */}
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${isCurrent ? "text-[#F5B942]" : "text-white/70"}`}>
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-center text-white/50 mt-1 max-w-[120px]">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector line — separate sibling, NOT inside the step div */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mt-5 relative">
                  <div className="absolute inset-0 bg-white/10" />
                  <motion.div
                    className="absolute inset-0 bg-[#4ADE80]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
