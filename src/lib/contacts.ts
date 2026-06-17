/**
 * Централизованные контактные данные компании.
 * Обновляйте reviewCount при появлении новых отзывов.
 */
export const contacts = {
  phone: '+79189913632',
  phoneFormatted: '+7 (918) 991-36-32',
  whatsapp: 'https://wa.me/79189913632',
  whatsappWithMessage:
    'https://api.whatsapp.com/send/?phone=79189913632&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%0A%0A%D0%9F%D0%B8%D1%88%D1%83+%D0%B8%D0%B7+%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F+2%D0%93%D0%98%D0%A1.%0A%0A&type=phone_number&app_absent=0',
  vk: 'https://vk.com/ultra23ru',
  telegram: 'https://t.me/ultracleaninfo',
  email: 'commerce@uclea.ru',
  address: 'г. Краснодар, ул. Северная, 320',
  companyName: 'Ультра Клининг',
  siteUrl: 'https://www.cleankrd23.ru',
  ratingValue: '5.0',
  reviewCount: 93,
} as const;
