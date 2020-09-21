export const order = {
  path: 'orders',
  description: 'Заказы',
  fields: [
    {
      value: 'number',
      text: 'Номер',
      type: 'Number',
    },
    {
      value: 'summ',
      text: 'Сумма заказа',
      type: 'String',
    },
    {
      value: 'status',
      text: 'Статус заказа',
      type: 'String',
    },
    {
      value: 'count',
      text: 'Колво позиций',
      type: 'Number',
    },
    {
      value: 'date',
      text: 'Дата заказа',
      type: 'String',
    },
    {
      value: 'customer_id',
      text: 'Покупатель',
      type: 'Number',
    },
  ],
};