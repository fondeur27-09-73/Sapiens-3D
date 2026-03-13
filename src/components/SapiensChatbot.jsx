import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SAPIENS CHATBOT COMPONENT
 * 
 * To connect to n8n:
 * 1. Create a "Webhook" node in n8n (POST method).
 * 2. Copy the Webhook URL.
 * 3. Paste it in the VITE_N8N_WEBHOOK_URL environment variable or directly in the 'N8N_WEBHOOK_URL' constant below.
 */

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

export const SapiensChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "¡Hola! Soy el asistente virtual de Sapiens. ¿En qué puedo ayudarte hoy?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // --- ENVIAR A n8n (Trigger) ---
        // Aquí es donde el chatbot actúa como trigger para tu workflow de n8n
        if (N8N_WEBHOOK_URL) {
            try {
                fetch(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event: 'chatbot_message',
                        message: userMessage.text,
                        timestamp: new Date().toISOString(),
                        source: window.location.href
                    })
                });
            } catch (err) {
                console.error('Error al enviar a n8n:', err);
            }
        }

        // Simulación de respuesta del bot
        setTimeout(() => {
            setIsTyping(false);
            const botResponse = { 
                id: Date.now() + 1, 
                text: "Entendido. He recibido tu mensaje. Si necesitas una propuesta comercial formal, puedo guiarte a nuestro formulario especializado.", 
                sender: 'bot' 
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1500);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[1000] font-['Inter']">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col overflow-hidden"
                    >
                        {/* Chat Header */}
                        <div className="bg-slate-900 p-6 flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                <BotIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-white font-['Orbitron'] text-xs font-bold tracking-wider">ASISTENTE SAPIENS</h4>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] text-white/50 font-medium">En línea ahora</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="ml-auto text-white/30 hover:text-white transition-colors"
                            >
                                <CloseIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div 
                            ref={scrollRef}
                            className="flex-grow p-5 overflow-y-auto space-y-4 custom-scrollbar bg-slate-50/50"
                        >
                            {messages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                                        msg.sender === 'user' 
                                            ? 'bg-blue-600 text-white rounded-tr-none' 
                                            : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 border-t border-slate-100 bg-white">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Escribe tu duda aquí..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-xs text-slate-900 focus:outline-none focus:border-blue-500 transition-all font-medium"
                                />
                                <button 
                                    type="submit"
                                    className="absolute right-2 top-1.5 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                                >
                                    <SendIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-blue-600 rounded-full shadow-[0_8px_30px_rgba(37,99,235,0.4)] flex items-center justify-center text-white border-2 border-white relative z-10"
            >
                {isOpen ? <CloseIcon className="w-6 h-6" /> : <BotIcon className="w-8 h-8" />}
                
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">1</span>
                )}
            </motion.button>
        </div>
    );
};

// --- SVG Icons ---

const BotIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
    </svg>
);

const SendIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
    </svg>
);

const CloseIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);
