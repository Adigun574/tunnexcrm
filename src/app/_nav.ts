import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'TUNNEX LAB'
  },
  {
    name: 'Dashboard',
    url: '/main/salesreport',
    icon: 'icon-speedometer',
    // badge: {
    //       variant: 'info',
    //       text: 'NEW'
    //     }
  },
  {
    name: 'POS',
    url: '/main/pos',
    icon: 'icon-speedometer'
  },  
  {
    name: 'Products',
    url: '/main/products',
    icon: 'icon-speedometer'
  },
  {
    name: 'CRM',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Customers',
        url: '/main/customers',
        icon: 'icon-speedometer'
      },
      {
        name: 'Leads',
        url: '/main/leads',
        icon: 'icon-speedometer'
      },
    ]
  },
  {
    name: 'Admin',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Users',
        url: '/main/user',
        icon: 'icon-speedometer'
      },
      {
        name: 'Employees',
        url: '/main/employees',
        icon: 'icon-speedometer'
      },
      {
        name: 'Roles',
        url: '/main/role',
        icon: 'icon-speedometer'
      }
    ]
  },
  {
    name: 'Reports',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      // {
      //   name: 'Sales History',
      //   url: '/main/sales-history',
      //   icon: 'icon-speedometer'
      // },
      {
        name: 'Sales History',
        url: '/main/sales-history2',
        icon: 'icon-speedometer'
      },
      // {
      //   name: 'Inventory',
      //   url: '/main/inventory',
      //   icon: 'icon-speedometer'
      // },
      {
        name: 'Products Report',
        url: '/main/requested-items',
        icon: 'icon-puzzle'
      },
      {
        name: 'Customers Report',
        url: '/main/customers-report',
        icon: 'icon-puzzle'
      },
      {
        name: 'Debtors Report',
        url: '/main/debtors-report',
        icon: 'icon-puzzle'
      },
      {
        name: 'Free Sales',
        url: '/main/free-sales',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Quotation',
    url: '/main/quotation',
    icon: 'icon-speedometer'
  },
  // {
  //   name: 'Generate Waybill',
  //   url: '/main/waybill',
  //   icon: 'icon-speedometer'
  // },
  {
    name: 'Waybills',
    url: '/main/showwaybills',
    icon: 'icon-speedometer'
  },
  {
    name: 'Suppliers',
    url: '/main/suppliers',
    icon: 'icon-speedometer'
  },
  // {
  //   name: 'HR',
  //   url: '/main/training-programs',
  //   icon: 'icon-speedometer'
  // },
  //
  {
    name: 'HR',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Skills',
        url: '/main/training-programs',
        icon: 'icon-speedometer'
      },
      {
        name: 'KPI',
        url: '/main/kpi',
        icon: 'icon-speedometer'
      },
    ]
  },
  // {
  //   name: 'Skill Monitoring',
  //   url: '/main/skill-monitoring',
  //   icon: 'icon-speedometer'
  // },
  // {
  //   name: 'Messages',
  //   url: '/main/messaging',
  //   icon: 'icon-speedometer'
  // }
];
