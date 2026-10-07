import React, { useState } from 'react';

export default function ChatInterface({ formData, updateFormData }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy tu Asesor de Crédito Virtual. Te guiaré paso a paso para llenar tu solicitud de crédito hipotecario. Para empezar, ¿me podrías decir tu nombre completo y tu número de identificación?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // OpenAI Integration placeholder (simplified for MVP)
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // For now we simulate an AI response that extracts data and replies
      setTimeout(() => {
        // This is where we would call OpenAI API
        const aiReply = { 
          role: 'assistant', 
          content: 'Gracias. He anotado tu información básica. Ahora cuéntame, ¿Cuál es tu programa de vivienda, banco de preferencia y caja de compensación?' 
        };
        setMessages((prev) => [...prev, aiReply]);
        
        // Mocking structured data extraction updates:
        if (!formData.personal.nombres) {
          updateFormData('personal', 'nombres', userMessage.content);
        }
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-blue-50 rounded-t-lg">
        <h3 className="font-bold text-blue-800">Asesor de Crédito IA</h3>
        <p className="text-sm text-blue-600">Te ayudo a llenar tu formulario</p>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${
              msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 rounded-lg p-3 text-sm italic">
              Escribiendo...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu respuesta aquí..." 
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
