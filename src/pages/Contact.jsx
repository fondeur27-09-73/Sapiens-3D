import React from 'react'
import { XRayText } from '../components/XRayText'
import { Section } from '../components/Section'

export default function Contact() {
    return (
        <main className="relative z-[40] bg-slate-50 min-h-screen">
            <div className="h-[30vh] md:h-[40vh] flex items-center justify-center pt-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,#f8fafc,rgba(248,250,252,0.6))] z-0" />
                <XRayText
                    text="SOLICITAR<br />PROPUESTA"
                    className="font-['Orbitron'] text-[2.5rem] md:text-[4.5rem] lg:text-[6rem] font-black text-center text-slate-900 z-10 leading-[1.1]"
                    light={true}
                />
            </div>

            <Section id="contact-form" className="flex flex-col items-center pb-32">
                <div className="max-w-4xl w-full bg-white border border-slate-200 p-8 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden gs-fade-up">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl -ml-32 -mb-32 opacity-60" />

                    <div className="relative z-10">
                        <div className="inline-block bg-blue-50 border border-blue-100 text-blue-600 font-['Orbitron'] px-4 py-1.5 text-[10px] font-bold rounded-full uppercase mb-6 tracking-widest">
                            Contacto Directo
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <a href="mailto:ulisesrf@sapiensbots.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-3xl hover:bg-white hover:border-blue-500 hover:shadow-2xl transition-all duration-300">
                                <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-6 overflow-hidden group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-['Orbitron'] font-bold text-slate-400 text-xs tracking-[0.2em] mb-2">EMAIL</h3>
                                <p className="text-slate-900 font-medium text-lg">ulisesrf@sapiensbots.com</p>
                            </a>

                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/in/ulises-r-fondeur-a2571355/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-3xl hover:bg-white hover:border-[#0077b5] hover:shadow-2xl transition-all duration-300">
                                <div className="w-16 h-16 bg-blue-50 text-[#0077b5] rounded-full flex items-center justify-center mb-6 overflow-hidden group-hover:scale-110 group-hover:bg-[#0077b5] group-hover:text-white transition-all duration-300">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </div>
                                <h3 className="font-['Orbitron'] font-bold text-slate-400 text-xs tracking-[0.2em] mb-2">LINKEDIN</h3>
                                <p className="text-slate-900 font-medium text-lg">Ulises R. Fondeur</p>
                            </a>

                            {/* X (Twitter) */}
                            <a href="https://x.com/fondeur27" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-3xl hover:bg-white hover:border-black hover:shadow-2xl transition-all duration-300">
                                <div className="w-16 h-16 bg-slate-200 text-black rounded-full flex items-center justify-center mb-6 overflow-hidden group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-300">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </div>
                                <h3 className="font-['Orbitron'] font-bold text-slate-400 text-xs tracking-[0.2em] mb-2">X</h3>
                                <p className="text-slate-900 font-medium text-lg">@fondeur27</p>
                            </a>

                            {/* Instagram */}
                            <a href="https://instagram.com/promodisplayrd" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-3xl hover:bg-white hover:border-pink-500 hover:shadow-2xl transition-all duration-300">
                                <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mb-6 overflow-hidden group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-pink-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-300">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </div>
                                <h3 className="font-['Orbitron'] font-bold text-slate-400 text-xs tracking-[0.2em] mb-2">INSTAGRAM</h3>
                                <p className="text-slate-900 font-medium text-lg">@promodisplayrd</p>
                            </a>
                        </div>
                    </div>
                </div>
            </Section>

            {/* SEC: ORIGINAL CONTACT FORM RESTORED BELOW */}
            <Section id="form-section" className="flex flex-col items-center pb-32">
                <div className="max-w-4xl w-full bg-white border border-slate-200 p-8 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden gs-fade-up">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -ml-32 -mt-32 opacity-60" />

                    <div className="relative z-10">
                        <div className="inline-block bg-blue-50 border border-blue-100 text-blue-600 font-['Orbitron'] px-4 py-1.5 text-[10px] font-bold rounded-full uppercase mb-6 tracking-widest">
                            Propuesta Comercial
                        </div>
                        <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-black mb-10 text-slate-900 tracking-tighter">DATOS DEL CLIENTE</h2>

                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <FormField label="Nombre" placeholder="Tu nombre..." required />
                                <FormField label="Apellido" placeholder="Tu apellido..." required />
                                <FormField label="Actividad Comercial" placeholder="Ej: Supermercado, Retail, etc." required />
                                <FormField label="Nombre de la Empresa" placeholder="Opcional" />
                                <FormField label="Email Corporativo" placeholder="tu@empresa.com" type="email" required />
                                <FormField label="WhatsApp" placeholder="+1 (000) 000-0000" type="tel" required />
                                <FormField label="Teléfono" placeholder="Número de oficina" type="tel" required />
                            </div>

                            <div className="pt-6">
                                <button className="w-full bg-slate-900 hover:bg-blue-600 text-white font-['Orbitron'] font-bold py-6 rounded-2xl transition-all duration-500 transform hover:scale-[1.01] shadow-xl hover:shadow-blue-500/20 text-sm tracking-widest uppercase">
                                    Enviar solicitud de propuesta
                                </button>
                                <p className="mt-6 text-[0.7rem] text-slate-400 text-center font-medium tracking-wide">
                                    Nuestros asesores procesarán su solicitud y se contactarán en menos de 24 horas hábiles.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </Section>
        </main>
    )
}

function FormField({ label, placeholder, type = "text", required = false }) {
    return (
        <div className="flex flex-col gap-2.5">
            <label className="text-[10px] font-['Orbitron'] text-slate-500 font-bold uppercase tracking-[0.2em] ml-1">
                {label} {required && <span className="text-blue-500">*</span>}
            </label>
            <input
                type={type}
                required={required}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium placeholder:text-slate-300 placeholder:font-normal text-sm"
                placeholder={placeholder}
            />
        </div>
    )
}
