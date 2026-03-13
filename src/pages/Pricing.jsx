import React from 'react'
import { XRayText } from '../components/XRayText'
import { Section } from '../components/Section'
import { EndlessButton } from '../components/EndlessButton'
import skuImg from "../assets/robots/sku-rbx-white.png"

export default function Pricing() {
    return (
        <main className="relative z-[40] bg-transparent text-slate-900 min-h-screen">
            {/* Cinematic Header with White Background Grid */}
            <div className="h-[25vh] md:h-[35vh] flex items-center justify-center pt-24 relative overflow-hidden bg-transparent">
                <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,#f2f2f2,rgba(242,242,242,0.6))] z-0" />
                <XRayText
                    text="NUESTROS<br />PLANES"
                    className="font-['Orbitron'] text-[3rem] md:text-[5rem] lg:text-[7rem] font-black text-center text-slate-900 z-10 leading-[1.1] pb-2"
                    light={true}
                />
            </div>

            <Section id="pricing-intro" className="flex flex-col items-center w-full pt-16 bg-transparent">

                {/* 1. SECCIÓN DE IMAGEN PRINCIPAL GIGANTE CON INTEGRACIÓN PROFESIONAL */}
                <div className="w-full max-w-5xl mx-auto px-4 gs-fade-up flex flex-col items-center mb-16">
                    <div className="relative w-[70%] aspect-[3/5] md:aspect-[8/10] flex items-center justify-center -mt-10 overflow-hidden mb-8 rounded-[3rem]">
                        {/* 
                            Recorte de Ancho (Cropping): 
                            Hemos reducido el ancho del contenedor al 70% para eliminar los márgenes 
                            laterales de la foto, manteniendo el 100% de la altura del robot.
                        */}
                        <div className="relative w-full h-full flex items-center justify-center"
                            style={{
                                maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
                                maskComposite: 'intersect',
                                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
                                WebkitMaskComposite: 'source-in'
                            }}>
                            <img
                                src={skuImg}
                                alt="SKU: RBX-010 Robot Promotor"
                                className="w-auto h-full max-w-none scale-[1.1] object-contain z-10 hover:scale-[1.15] transition-transform duration-1000"
                            />
                        </div>
                    </div>

                    <div className="text-center max-w-2xl px-4">
                        <div className="inline-block bg-blue-50 border border-blue-200 text-blue-700 font-['Orbitron'] px-4 py-1.5 text-xs font-bold rounded-full uppercase mb-4">
                            Vendedor-Promotor
                        </div>
                        <h2 className="font-['Orbitron'] text-3xl md:text-5xl font-black uppercase text-slate-900 mb-4 tracking-tighter">SKU: RBX-010</h2>
                        <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                            Ideal para integrarse al punto de venta y generar mayor dinamismo y atracción de público con una presencia tecnológica de vanguardia.
                        </p>
                    </div>
                </div>

                {/* 2. SECCIÓN DE TABLA DE PRECIOS DETALLADA DEBAJO DE LA IMAGEN */}
                <div className="w-full max-w-6xl mx-auto px-4 z-10 gs-fade-up mb-24">
                    <div className="relative bg-white/70 backdrop-blur-sm border border-slate-200 p-6 md:p-10 rounded-2xl flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.04)] ring-1 ring-slate-900/5 overflow-hidden">

                        {/* Cabecera de la Tabla */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-100 pb-6">
                            <div>
                                <h3 className="font-['Orbitron'] text-2xl md:text-3xl font-bold uppercase tracking-tight text-slate-900">Tarifas de Alquiler</h3>
                                <p className="text-slate-500 text-sm mt-2 font-medium">
                                    Valores en Pesos Dominicanos (RD$)<br />
                                    <span className="text-blue-500/80 italic text-xs">Los montos son equivalentes a precios por mes</span>
                                </p>
                            </div>
                            <div className="text-sm text-slate-600 bg-white/50 px-5 py-4 rounded-xl border border-slate-200 whitespace-nowrap shadow-sm">
                                Moneda: <strong className="text-slate-900">RD$</strong><br />
                                Tiempo mínimo: <strong className="text-blue-600">1 mes</strong>
                            </div>
                        </div>

                        {/* Contenedor escrolleable para 5 columnas */}
                        <div className="overflow-x-auto custom-scrollbar pb-6 w-full">
                            <table className="w-full text-left border-collapse min-w-[700px] md:min-w-[760px]">
                                <thead>
                                    <tr className="border-b-2 border-slate-100">
                                        <th className="py-4 px-4 font-['Orbitron'] text-slate-800 font-bold uppercase text-xs md:text-sm whitespace-nowrap bg-white/30 rounded-tl-lg">Días / Cant.</th>
                                        <th className="py-4 px-4 font-['Orbitron'] text-blue-600 font-bold text-center text-xs md:text-sm bg-white/30 whitespace-nowrap">180 días</th>
                                        <th className="py-4 px-4 font-['Orbitron'] text-blue-600 font-bold text-center text-xs md:text-sm bg-white/30 whitespace-nowrap">120 días</th>
                                        <th className="py-4 px-4 font-['Orbitron'] text-blue-600 font-bold text-center text-xs md:text-sm bg-white/30 whitespace-nowrap">90 días</th>
                                        <th className="py-4 px-4 font-['Orbitron'] text-blue-600 font-bold text-center text-xs md:text-sm bg-white/30 whitespace-nowrap">60 días</th>
                                        <th className="py-4 px-4 md:pr-8 font-['Orbitron'] text-blue-600 font-bold text-center text-xs md:text-sm bg-white/30 rounded-tr-lg whitespace-nowrap">30 días</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[
                                        { qty: "1 robot", p180: "87,840", p120: "96,000", p90: "144,000", p60: "168,000", p30: "192,000" },
                                        { qty: "2 robots", p180: "87,840", p120: "96,000", p90: "144,000", p60: "168,000", p30: "192,000" },
                                        { qty: "3 robots", p180: "85,205", p120: "93,120", p90: "139,680", p60: "162,960", p30: "186,240" },
                                        { qty: "4 robots", p180: "85,205", p120: "93,120", p90: "139,680", p60: "162,960", p30: "186,240" },
                                        { qty: "5 robots", p180: "85,205", p120: "93,120", p90: "139,680", p60: "162,960", p30: "186,240" },
                                        { qty: "6 robots", p180: "84,326", p120: "92,160", p90: "138,240", p60: "161,280", p30: "184,320" },
                                        { qty: "7 robots", p180: "84,326", p120: "92,160", p90: "138,240", p60: "161,280", p30: "184,320" },
                                        { qty: "8 robots", p180: "84,326", p120: "92,160", p90: "138,240", p60: "161,280", p30: "184,320" },
                                        { qty: "9 robots", p180: "83,448", p120: "91,200", p90: "136,800", p60: "159,600", p30: "182,400" },
                                        { qty: "10 robots", p180: "83,448", p120: "91,200", p90: "136,800", p60: "159,600", p30: "182,400" },
                                        { qty: "11 robots", p180: "81,691", p120: "89,280", p90: "133,920", p60: "156,240", p30: "178,560" },
                                    ].map((row, idx) => (
                                        <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                                            <td className="py-4 px-4 font-['Orbitron'] whitespace-nowrap">
                                                <span className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                                                    {row.qty}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-slate-600 font-medium text-center whitespace-nowrap">${row.p180}</td>
                                            <td className="py-4 px-4 text-slate-600 font-medium text-center whitespace-nowrap">${row.p120}</td>
                                            <td className="py-4 px-4 text-slate-600 font-medium text-center whitespace-nowrap">${row.p90}</td>
                                            <td className="py-4 px-4 text-slate-600 font-medium text-center whitespace-nowrap">${row.p60}</td>
                                            <td className="py-4 px-4 md:pr-8 text-slate-600 font-medium text-center whitespace-nowrap">${row.p30}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Section>

            {/* SECCIÓN DE BENEFICIOS COMERCIALES */}
            <Section id="benefits" className="flex flex-col items-center pb-20 w-full bg-transparent pt-16">
                <XRayText
                    text="BENEFICIOS<br />COMERCIALES"
                    className="gs-fade-up font-['Orbitron'] text-[2.5rem] md:text-[3.5rem] font-black text-center mb-16 text-slate-900 leading-[1.1]"
                    light={true}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-4 z-10 gs-fade-up">
                    <BenefitCard
                        title="Soporte local + implementación ágil"
                        description="Realizamos diagnóstico del negocio, despliegue en sitio, capacitación del equipo y soporte continuo para generar resultados desde el primer día."
                    />
                    <BenefitCard
                        title="Ahorro comprobable y medible"
                        description="El costo laboral total de un colaborador o empleado fijo en el area de promocion es de RD495,508.43 entre sueldos y pasivo laboral, sin incluir ausencias, entre otros. No obstante, el costo anual de Robot Sapiens es de RD$360,000 ."
                        kpi="Ahorro estimado: RD$ 135,508.43 (27%)"
                    />
                    <BenefitCard
                        title="Cobertura operativa extendida"
                        description="Un robot promotor puede operar hasta 14 horas diarias y cubrir una operación equivalente a hasta 3 personas en jornada extendida."
                        kpi="Más horas efectivas por día"
                    />
                    <BenefitCard
                        title="Impacto de marca y mayor rotación"
                        description="Integrar robots proyecta una marca alineada con tendencias de vanguardia. En retail se reportan casos con incrementos de rotación promedio de 30% a 40%. Mejor visibilidad en góndola."
                        kpi="Más atracción de tráfico y mayor dinamismo"
                    />
                </div>
            </Section>

            {/* CALL TO ACTION */}
            <Section id="pricing-cta" className="items-center text-center pb-32 pt-20 bg-white">
                <div className="gs-fade-up max-w-2xl mx-auto mb-10 text-center px-4 mb-12">
                    <h3 className="font-['Orbitron'] text-3xl md:text-4xl font-black mb-6 text-slate-900 tracking-tighter">El IMPACTO visual de un CABEZAL de góndola nunca estará al nivel del Impacto visual que ofrece un ROBOT interactivo dentro de un supermercado.</h3>
                    <p className="text-slate-600 text-lg">Valida el impacto con un piloto y escala de 1 a 11 robots con precios claros por volumen.</p>
                </div>
                <div className="gs-fade-up">
                    <EndlessButton text={<>Solicitar Propuesta<br />Comercial</>} link="/contacto" />
                </div>
            </Section>
        </main>
    )
}

function BenefitCard({ title, description, kpi }) {
    return (
        <div className="relative bg-white border border-slate-200 p-8 rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group overflow-hidden shadow-sm h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl group-hover:bg-blue-100 transition-colors"></div>
            <h3 className="font-['Orbitron'] text-xl font-bold mb-4 uppercase tracking-tight text-slate-900 pr-4">{title}</h3>
            <p className="text-base text-slate-600 mb-8 leading-relaxed flex-grow">{description}</p>
            {kpi && (
                <div className="bg-blue-50/50 border border-blue-100 text-blue-700 px-4 py-3 rounded-xl text-sm font-bold mt-auto self-start shadow-sm">
                    ✓ {kpi}
                </div>
            )}
        </div>
    )
}
