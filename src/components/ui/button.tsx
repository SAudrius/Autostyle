import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/config/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
    {
        variants: {
            variant: {
                default:
          "uppercase bg-primary text-neutral-900 hover:bg-neutral-800 hover:text-neutral-100 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
                loading:
          "uppercase text-neutral-900 dark:bg-slate-50 dark:text-slate-900 animate-loading from-8% to-33% bg-gradient-to-l from-primary-dark  via-[#f0f0f0] via-15% to-primary-dark bg-[length:200%_100%]",
                outline:
          "border text-neutral-600 border-neutral-500 bg-transparent hover:border-black hover:font-medium hover:text-black dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
                secondary:
          "bg-neutral-900 text-neutral-000 hover:bg-neutral-100 uppercase tracking-wide-6 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80 border-neutral-900 border hover:text-neutral-900 hover:font-medium",
                ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
                link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
            },
            size: {
                icon: "h-10 w-10",
                small: "h-8 px-4",
                default: "h-9 px-4 py-2",
                lg: "h-12 px-8 text-base",
                full: "h-9 w-full py-2",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ( { className, variant, size, asChild = false, ...props }, ref ) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn( buttonVariants( { variant, size, className } ) )}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
