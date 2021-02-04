export default {
  /*
  ** Activate components - https://nuxtjs.org/guides/directory-structure/components#components-module
  */
  components: true,

	/*
	** Global CSS - https://nuxtjs.org/guides/features/configuration#pre-processors
	*/
	css: [],
  styleResources: {
    scss: ['~/assets/scss/style.scss']
  },

  /*
  ** Head Property - https://nuxtjs.org/guides/features/meta-tags-seo
  */
  head: {
    title: 'News',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: process.env.npm_package_description || ''
        }
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
    // proxyHeaders: false
    
  },
  proxy: [
    ['/rss/', { target: 'https://lenta.ru' }],
    ['/rss2/', { target: 'https://meduza.io' }]
  ],
  plugins: ['~plugins/global'],
  
  router: {
    middleware: ['myMiddleware'],
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 300 + 'px' }
    }
  }
}