import { Socket, io } from 'socket.io-client'
const socket: Socket = io('ws://localhost:8000', {
  transports: ['websocket', 'pulling', 'flashsocket']
})

export const ClientSocket = {
  getAllOrder: (setAllOrder: React.Dispatch<React.SetStateAction<undefined>>) => {
    socket.emit('client:requestAllOrder', '')
    socket.on('server:loadAllOrder', (data) => {
      setAllOrder(data)
    })
    return () => {
      socket.disconnect()
    }
  },

  getPendingOrder: (
    setPendingOrder: React.Dispatch<React.SetStateAction<undefined>>,
    options: {
      page: number
      limit: number
      startDate: string
      endDate: string
    }
  ) => {
    socket.emit('client:requestPendingOrder', options)
    socket.on('server:loadPendingOrder', (data) => {
      setPendingOrder(data)
    })
    return () => {
      socket.disconnect()
    }
  },

  getCancelOrder: (
    setCancelOrder: React.Dispatch<React.SetStateAction<undefined>>,
    options: {
      page: number
      limit: number
      startDate: string
      endDate: string
    }
  ) => {
    socket.emit('client:requestCancelOrder', options)
    socket.on('server:loadCancelOrder', (data) => {
      setCancelOrder(data)
    })
    return () => {
      socket.disconnect()
    }
  },

  cancelOrder: (id: string) => {
    socket.emit('client:cancelOrder', id)
  },

  confirmOrder: (id: string) => {
    socket.emit('client:confirmedOrder', id)
  },

  doneOrder: (id: string) => {
    socket.emit('client:doneOrder', id)
  },

  getDeliveredOrder: (setDeliveredOrder: React.Dispatch<React.SetStateAction<undefined>>) => {
    socket.emit('client:requestDeliveredOrder', '')
    socket.on('server:loadDeliveredOrder', (data) => {
      setDeliveredOrder(data)
    })
    return () => {
      socket.disconnect()
    }
  },

  getConfirmedOrder: (
    setConfirmedOrder: React.Dispatch<any>,
    options: {
      page: number
      limit: number
      startDate: string
      endDate: string
    }
  ) => {
    socket.emit('client:requestConfirmedOrder', options)
    socket.on('server:loadConfirmedOrder', (data) => {
      setConfirmedOrder(data)
    })
    return () => {
      socket.disconnect()
    }
  },

  getDoneOrder: (
    setDoneOrder: React.Dispatch<any>,
    options: {
      page: number
      limit: number
      startDate: string
      endDate: string
    }
  ) => {
    socket.emit('client:requestDoneOrder', options)
    socket.on('server:loadDoneOrder', (data) => {
      console.log(data)
      setDoneOrder(data)
    })
    return () => {
      socket.disconnect()
    }
  }
}