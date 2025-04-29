import { useState } from 'react';
import { FaPaperPlane, FaPaperclip, FaSmile, FaUser, FaCircle } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

const conversacionesDummy = {
  1: [
    { id: 1, texto: '¡Hola! Soy tu asesor humano. ¿En qué puedo ayudarte?', esAsesor: true },
    { id: 2, texto: 'Necesito información sobre repuestos de frenos para un Toyota Corolla 2020', esAsesor: false },
    { id: 3, texto: 'Claro, te puedo ayudar con eso. Los repuestos disponibles son pastillas de freno, discos y calibradores.', esAsesor: true },
  ],
  2: [
    { id: 1, texto: '¡Buen día! ¿En qué puedo ayudarte?', esAsesor: true },
    { id: 2, texto: 'Busco un motor para Chevrolet Cruze 2018', esAsesor: false },
    { id: 3, texto: 'Déjame verificar la disponibilidad. ¿Es motor 1.8 o 1.4 turbo?', esAsesor: true },
  ],
  3: [
    { id: 1, texto: '¡Hola! Bienvenido a nuestro servicio.', esAsesor: true },
    { id: 2, texto: 'Necesito cotizar un kit de embrague para Ford Fiesta 2019', esAsesor: false },
    { id: 3, texto: 'Por supuesto, tenemos varios kits disponibles. ¿Es transmisión manual o automática?', esAsesor: true },
  ],
};

const chatsDummy = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    ultimoMensaje: 'Necesito información sobre repuestos de frenos para un Toyota Corolla 2020',
    horaUltimoMensaje: '10:30',
    noLeidos: 2,
    estado: 'online'
  },
  {
    id: 2,
    nombre: 'María González',
    ultimoMensaje: 'Busco un motor para Chevrolet Cruze 2018',
    horaUltimoMensaje: '09:45',
    noLeidos: 0,
    estado: 'offline'
  },
  {
    id: 3,
    nombre: 'Carlos Rodríguez',
    ultimoMensaje: 'Necesito cotizar un kit de embrague para Ford Fiesta 2019',
    horaUltimoMensaje: 'Ayer',
    noLeidos: 1,
    estado: 'online'
  }
];

export const AsesorHumano = () => {
  const [mensaje, setMensaje] = useState('');
  const [chatActivo, setChatActivo] = useState(1);
  const [mensajes, setMensajes] = useState(conversacionesDummy);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chats] = useState(chatsDummy);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mensaje.trim()) {
      const nuevoMensaje = {
        id: mensajes[chatActivo].length + 1,
        texto: mensaje,
        esAsesor: false
      };
      setMensajes(prev => ({
        ...prev,
        [chatActivo]: [...prev[chatActivo], nuevoMensaje]
      }));
      setMensaje('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file.name);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setMensaje(prevInput => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="w-full max-w-[1920px] aspect-[16/9] p-6">
      <div className="bg-white rounded-lg shadow-xl h-full flex">
        {/* Lista de chats */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setChatActivo(chat.id)}
                className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 transition-colors ${
                  chatActivo === chat.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaUser className="text-gray-500" />
                  </div>
                  <FaCircle 
                    className={`absolute bottom-0 right-0 text-xs ${
                      chat.estado === 'online' ? 'text-green-500' : 'text-gray-400'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 truncate">{chat.nombre}</h3>
                    <span className="text-xs text-gray-500">{chat.horaUltimoMensaje}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{chat.ultimoMensaje}</p>
                  {chat.noLeidos > 0 && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full mt-1">
                      {chat.noLeidos}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Área de chat */}
        <div className="flex-1 flex flex-col">
          {/* Header del chat activo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500" />
                </div>
                <FaCircle 
                  className={`absolute bottom-0 right-0 text-xs ${
                    chats.find(c => c.id === chatActivo)?.estado === 'online' 
                      ? 'text-green-500' 
                      : 'text-gray-400'
                  }`}
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {chats.find(c => c.id === chatActivo)?.nombre}
                </h2>
                <p className="text-sm text-gray-500">
                  {chats.find(c => c.id === chatActivo)?.estado === 'online' 
                    ? 'En línea' 
                    : 'Desconectado'}
                </p>
              </div>
            </div>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mensajes[chatActivo].map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.esAsesor ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-3xl rounded-lg p-3 ${
                    msg.esAsesor
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p className="text-sm">{msg.texto}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Formulario de entrada */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="archivo"
              />
              <label
                htmlFor="archivo"
                className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <FaPaperclip className="w-5 h-5" />
              </label>
              
              <input
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <FaSmile className="w-5 h-5" />
                </button>
                
                {showEmojiPicker && (
                  <div className="absolute bottom-full right-0 mb-2 z-50">
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      width={300}
                      height={400}
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaPaperPlane className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}; 