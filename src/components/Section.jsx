import React from 'react'

export function Section({ id, children, className, contentClassName = "max-w-4xl" }) {
    return (
        <section id={id} className={`w-screen min-h-[150vh] flex flex-col justify-start px-6 md:px-32 relative z-10 ${className}`}>
            <div className={`sticky top-[2vh] pt-10 pb-20 w-full ${contentClassName}`}>
                {children}
            </div>
        </section>
    )
}
