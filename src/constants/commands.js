const commands =
  [
      {
          command: 'server_status',
      },
      {
          command: 'get_securities',
      },
      {
          command: 'get_portfolio',
      },
      {
          command: 'get_forts_positions',
      },
      {
          command: 'gethistorydata',
          fields: {
              period: 0,
              count: 0,
          },
      },
      {
          command: 'neworder',
          fields: {
              buysell: ['buy', 'sell'],
              orderPrice: 0,
              quantity: 0,
              ismarket: true,
          },
      },
      {
          command: 'newstoporder',
          fields: {
              buysell: ['buy', 'sell'],
              orderPrice: 0,
              quantity: 0,
              stoplosspercent: 0.0,
              takeprofitpercent: 0.0,
          },
      },
      {
          command: 'newcondorder',
          fields: {
              buysell: ['buy', 'sell'],
              orderPrice: 0,
              quantity: 0,
              cond_type: ['LastUp'],
              cond_value: 0,
              condorder: true,
          },
      },
      {
          command: 'cancelorder',
          fields: {
              orderId: 0,
          },
      },
      {
          command: 'cancelstoporder',
          fields: {
              orderId: 0,
          },
      },
  ];
export default commands;
