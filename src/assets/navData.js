// const headData = [
//     {
//         name: "Home",
//         to: "/"
//     },
//     {
//         name: "Blog",
//         to: "/blog"
//     },
//     {
//         name: "The poetry",
//         to: "/the-poetry"
//     },
//     {
//         name: "Faqs",
//         to: "/faqs"
//     },
//     {
//         name: "Baby Vaccination Chart",
//         to: "/baby-vaccination-chart"
//     },
//     {
//         name: "Pregnancy Due Date Calculator",
//         to: "/pregnancy-due-date-calculator"
//     },
//         {
//         name: "Pregnancy Weight Gain Calculator",
//         to: "/pregnancy-weight-gain-calculator"
//     }
// ]

// export default headData;

  const menuItems = [
    {
      title: 'Dashboard',
      icon: '📊',
      link: '/dashboard',
    },
    {
      title: 'Products',
      icon: '🛍️',
      submenu: [
        { title: 'All Products', link: '/products' },
        { title: 'Categories', link: '/categories' },
        { title: 'Inventory', link: '/inventory' },
      ],
    },
    {
      title: 'Orders',
      icon: '📦',
      submenu: [
        { title: 'All Orders', link: '/orders' },
        { title: 'Pending', link: '/orders/pending' },
        { title: 'Completed', link: '/orders/completed' },
      ],
    },
    {
      title: 'Customers',
      icon: '👥',
      link: '/customers',
    },
    {
      title: 'Analytics',
      icon: '📈',
      submenu: [
        { title: 'Sales', link: '/analytics/sales' },
        { title: 'Traffic', link: '/analytics/traffic' },
        { title: 'Reports', link: '/analytics/reports' },
      ],
    },
    {
      title: 'Settings',
      icon: '⚙️',
      submenu: [
        { title: 'Account', link: '/settings/account' },
        { title: 'Preferences', link: '/settings/preferences' },
        { title: 'Billing', link: '/settings/billing' },
      ],
    },
  ];

  export default menuItems;