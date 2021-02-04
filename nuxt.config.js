export default {
  components: true,

  css: [],
  
  styleResources: {
    scss: ['~/assets/scss/style.scss']
  },

  head: {
    title: 'News',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources'
  ],

	axios: {
    proxy: true,
    credentials: true
  },

  proxy: [
    ['/rss/', { target: 'https://lenta.ru' }],
    ['/rss2/', { target: 'https://meduza.io' }]
  ],

  plugins: ['~plugins/global']
  
}