export default [
  {
    id: 1,
    dateTime: '2016-03-09T00:07:56.495Z',
    orderItemIds: [1, 2, 3, 4],
    customerId: { id: 1, type: 'customer/take-away'},
    notes: 'This is a note',
    paymentMethod: null,
    estimatedTime: 20
  },
  {
    id: 2,
    dateTime: '2016-03-09T00:11:10.679Z',
    orderItemIds:[5, 6, 7, 8],
    customerId: { id: 2, type: 'customer/take-away'},
    notes: '',
    paymentMethod: 'CASH',
    estimatedTime: 45
  },
  {
    id: 3,
    dateTime: '2016-03-09T00:15:11.679Z',
    orderItemIds:[9],
    customerId: { id: 3, type: 'customer/take-away'},
    notes: '',
    paymentMethod: 'CARD',
    estimatedTime: 45
  },
  {
    id: 4,
    dateTime: '2016-03-09T00:21:20.679Z',
    orderItemIds:[10, 11, 12],
    customerId: { id: 4, type: 'customer/delivery'},
    notes: '',
    paymentMethod: 'CASH',
    estimatedTime: 45
  },
  {
    id: 5,
    dateTime: '2016-03-09T00:27:25.679Z',
    orderItemIds:[13, 14, 15],
    customerId: { id: 5, type: 'customer/delivery'},
    notes: '',
    paymentMethod: 'CARD',
    estimatedTime: 45
  },
  {
    id: 6,
    dateTime: '2016-03-09T00:36:29.679Z',
    orderItemIds:[16, 17, 18],
    customerId: { id: 6, type: 'customer/delivery'},
    notes: '',
    paymentMethod: null,
    estimatedTime: 45
  },
  {
    id: 7,
    dateTime: '2016-03-09T00:39:40.000Z',
    orderItemIds:[19, 20, 21, 22, 23, 24, 25, 26],
    customerId: { id: 7, type: 'customer/online'},
    notes: '',
    paymentMethod: 'ONLINE',
    estimatedTime: 30
  },
  {
    id: 8,
    dateTime: '2016-03-09T00:45:47.000Z',
    orderItemIds:[27, 28],
    customerId: { id: 8, type: 'customer/online'},
    notes: '',
    paymentMethod: 'ONLINE',
    estimatedTime: 30
  }
];
