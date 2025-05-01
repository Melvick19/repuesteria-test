import { useState } from 'react';
import { FaPaperPlane, FaPaperclip, FaSmile, FaUser, FaCircle, FaRobot } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

const conversacionesDummy = {
  1: [
    { id: 1, texto: '¡Hola! Soy tu asesor humano. ¿En qué puedo ayudarte?', esAsesor: true, hora: '10:25', estado: 'leido' },
    { id: 2, texto: 'Necesito información sobre repuestos de frenos para un Toyota Corolla 2020', esAsesor: false, hora: '10:28', estado: 'leido' },
    { id: 3, texto: 'Claro, te puedo ayudar con eso. Los repuestos disponibles son pastillas de freno, discos y calibradores.', esAsesor: true, hora: '10:30', estado: 'leido' },
  ],
  2: [
    { id: 1, texto: '¡Buen día! ¿En qué puedo ayudarte?', esAsesor: true, hora: '09:40', estado: 'leido' },
    { id: 2, texto: 'Busco un motor para Chevrolet Cruze 2018', esAsesor: false, hora: '09:42', estado: 'leido' },
    { id: 3, texto: 'Déjame verificar la disponibilidad. ¿Es motor 1.8 o 1.4 turbo?', esAsesor: true, hora: '09:45', estado: 'leido' },
  ],
  3: [
    { id: 1, texto: '¡Hola! Bienvenido a nuestro servicio.', esAsesor: true, hora: 'Ayer', estado: 'leido' },
    { id: 2, texto: 'Necesito cotizar un kit de embrague para Ford Fiesta 2019', esAsesor: false, hora: 'Ayer', estado: 'leido' },
    { id: 3, texto: 'Por supuesto, tenemos varios kits disponibles. ¿Es transmisión manual o automática?', esAsesor: true, hora: 'Ayer', estado: 'leido' },
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
  const [showResumen, setShowResumen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mensaje.trim()) {
      const nuevoMensaje = {
        id: mensajes[chatActivo].length + 1,
        texto: mensaje,
        esAsesor: false,
        hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        estado: 'enviado'
      };
      setMensajes(prev => ({
        ...prev,
        [chatActivo]: [...prev[chatActivo], nuevoMensaje]
      }));
      setMensaje('');

      // Simulamos que el mensaje fue recibido después de 1 segundo
      setTimeout(() => {
        setMensajes(prev => ({
          ...prev,
          [chatActivo]: prev[chatActivo].map(msg => 
            msg.id === nuevoMensaje.id ? { ...msg, estado: 'recibido' } : msg
          )
        }));

        // Simulamos que el mensaje fue leído después de 2 segundos
        setTimeout(() => {
          setMensajes(prev => ({
            ...prev,
            [chatActivo]: prev[chatActivo].map(msg => 
              msg.id === nuevoMensaje.id ? { ...msg, estado: 'leido' } : msg
            )
          }));
        }, 1000);
      }, 1000);
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

  const generarResumen = () => {
    setShowResumen(true);
  };

  return (
    <div className="w-full h-[calc(100vh-90px)] flex pr-0">
      {/* Lista de chats */}
      <div className="w-[30%] min-w-[380px] bg-white border-r border-[#e9edef] flex flex-col">
        <div className="h-[60px] p-3 bg-[#f0f2f5] flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-500" />
            </div>
            <h2 className="text-[#111b21] font-medium">Chats</h2>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setChatActivo(chat.id)}
              className={`w-full p-3 flex items-start space-x-3 hover:bg-[#f5f6f6] transition-colors ${
                chatActivo === chat.id ? 'bg-[#f0f2f5]' : ''
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
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
                  <h3 className="font-medium text-[#111b21] truncate">{chat.nombre}</h3>
                  <span className="text-xs text-[#667781]">{chat.horaUltimoMensaje}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-[#667781] truncate flex-1">{chat.ultimoMensaje}</p>
                  {chat.noLeidos > 0 && (
                    <span className="ml-2 flex-shrink-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-white bg-[#25d366] rounded-full">
                      {chat.noLeidos}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Área de chat */}
      <div className="flex-1 flex flex-col bg-[#efeae2] relative">
        {/* Fondo de WhatsApp */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAD8/vz08vT09PT29vb///+Cf+6zAAAABXRSTlMA2kCAv5tF5NoAAABCSURBVDjLY2AYBaNg2AJGRkYmJiZ0YSCBzzoaEKQDhYWFhRXOxiJDBGBiYkYXoJ4JRINRMAooAaP/yyi1GqNgZAEA8xAC8eXyqVwAAAAASUVORK5CYII=")`,
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Header del chat activo */}
        <div className="h-[60px] p-3 bg-[#f0f2f5] relative z-10 flex items-center justify-between">
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
              <h2 className="text-[#111b21] font-medium">
                {chats.find(c => c.id === chatActivo)?.nombre}
              </h2>
              <p className="text-sm text-[#667781]">
                {chats.find(c => c.id === chatActivo)?.estado === 'online' 
                  ? 'En línea' 
                  : 'Desconectado'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={generarResumen}
              className="p-2 text-[#54656f] hover:bg-[#e9edef] rounded-full transition-colors"
              title="Generar resumen con IA"
            >
              <FaRobot className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
          {mensajes[chatActivo].map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.esAsesor ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[65%] rounded-lg p-3 ${
                  msg.esAsesor
                    ? 'bg-white text-[#111b21]'
                    : 'bg-[#d9fdd3] text-[#111b21]'
                }`}
              >
                <p className="text-sm">{msg.texto}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[11px] text-[#667781]">{msg.hora}</span>
                  {!msg.esAsesor && <MessageStatus estado={msg.estado} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formulario de entrada */}
        <div className="h-[62px] p-3 bg-[#f0f2f5] relative z-10">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="archivo"
            />
            <label
              htmlFor="archivo"
              className="p-2 text-[#54656f] hover:text-[#111b21] cursor-pointer"
            >
              <FaPaperclip className="w-5 h-5" />
            </label>
            
            <input
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 p-2 bg-white text-[#111b21] rounded-lg focus:outline-none focus:border-[#25d366] border border-[#e9edef]"
            />

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 text-[#54656f] hover:text-[#111b21]"
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
              className="p-2 text-[#54656f] hover:text-[#111b21]"
            >
              <FaPaperPlane className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Modal de resumen */}
      {showResumen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#111b21] text-lg font-medium">Resumen de la conversación</h3>
              <button
                onClick={() => setShowResumen(false)}
                className="text-[#54656f] hover:text-[#111b21]"
              >
                ✕
              </button>
            </div>
            <div className="bg-[#f0f2f5] p-4 rounded-lg text-[#111b21]">
              <p>Aquí iría el resumen generado por IA de la conversación...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MessageStatus = ({ estado }) => {
  if (!estado) return null;
  
  return (
    <div className="flex items-center">
      {estado === 'enviado' && (
        <svg viewBox="0 0 12 11" className="w-3 h-3 text-[#8696a0]">
          <path fill="currentColor" d="M11.1 0.900098L3.9 8.10009L0.9 5.10009L0 6.00009L3.8 9.90009L12 1.80009L11.1 0.900098Z" />
        </svg>
      )}
      {estado === 'recibido' && (
        <div className="flex">
          <svg viewBox="0 0 12 11" className="w-3 h-3 text-[#8696a0]">
            <path fill="currentColor" d="M11.1 0.900098L3.9 8.10009L0.9 5.10009L0 6.00009L3.8 9.90009L12 1.80009L11.1 0.900098Z" />
          </svg>
          <svg viewBox="0 0 12 11" className="w-3 h-3 text-[#8696a0] -ml-1">
            <path fill="currentColor" d="M11.1 0.900098L3.9 8.10009L0.9 5.10009L0 6.00009L3.8 9.90009L12 1.80009L11.1 0.900098Z" />
          </svg>
        </div>
      )}
      {estado === 'leido' && (
        <div className="flex">
          <svg viewBox="0 0 12 11" className="w-3 h-3 text-[#53bdeb]">
            <path fill="currentColor" d="M11.1 0.900098L3.9 8.10009L0.9 5.10009L0 6.00009L3.8 9.90009L12 1.80009L11.1 0.900098Z" />
          </svg>
          <svg viewBox="0 0 12 11" className="w-3 h-3 text-[#53bdeb] -ml-1">
            <path fill="currentColor" d="M11.1 0.900098L3.9 8.10009L0.9 5.10009L0 6.00009L3.8 9.90009L12 1.80009L11.1 0.900098Z" />
          </svg>
        </div>
      )}
    </div>
  );
}; 