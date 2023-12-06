const socket = io()

socket.emit('recibirMensajeCliente', 'estoy usando socket y soy el cliente')