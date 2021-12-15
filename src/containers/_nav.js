/* eslint-disable import/no-anonymous-default-export */
export default [
  {
    _tag: "CSidebarNavItem",
    name: "Ana Sayfa",
    to: "/",
    icon: "cil-home",
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["SİPARİŞLER"],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Siparişler',
    route: '/orders',
    icon: "cil-basket",
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Yeniden Tederik',
        to: '/change-tracking',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Açık Sipariş Raporu',
        to: '/order-report',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Kargo Takip',
        to: '/order-cargo-tracking',
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Stok",
    to: "/stock",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Kabul Edilen",
    to: "/accepted",
    icon: "cil-calculator",
  },
  {
    _tag: "CSidebarNavItem",
    name: "İş Listesi",
    to: "/job-list",
    icon: "cil-file",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Sayım Listesi",
    to: "/counting",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Ürün Kontrol",
    to: "/product-control",
    icon: "cil-laptop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Kargo",
    to: "/cargo",
    icon: "cil-check",
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Kullanıcı Yönetimi",
  //   to: "/user-management",
  //   icon: "cil-people",
  // },
  {
    _tag: "CSidebarNavItem",
    name: "Ayarlar",
    to: "/settings",
    icon: "cil-settings",
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];
