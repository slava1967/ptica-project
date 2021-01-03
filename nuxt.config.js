const axios = require('axios')
const baseUrl = 'https://wordpress.gintonic.cf/wp-json/wp/v2/' // demo: http://demo.wp-api.org/wp-json/wp/v2/

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'ptica-project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

   /*
  ** Customize the progress-bar color
  */
 loading: { color: '#6f42c1' },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/time-locale' },
    { src: '~/plugins/relative-path' },
    { src: '~/plugins/strip-html' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/sitemap'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: baseUrl,
    https: true,
    progress: true
  },

    /**
   * Sitemap
   */
  sitemap: {
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 120,
    hostname: 'https://example.com',
    gzip: true,
    exclude: [
      '/category',
      '/page',
      '/tag'
    ],
    async routes () {
      let sitemapItems = []

      // All Categories
      const categories = await axios.get(
        `${baseUrl}categories`
      );
      let categoriesItems = categories.data.map(category => ({
        url: '/category/' + category.slug,
        changefreq: 'monthly',
        priority: 0.7,
      }) )
      // sitemapItems = [...sitemapItems, categoriesItems]
      sitemapItems.push(...categoriesItems);

      // Get Total Pages
      const getTotalPages = await axios.get(
        `${baseUrl}posts`
      )
      const totalPagesCount = getTotalPages.headers['x-wp-totalpages']

      // All Posts
      for (let page = 1; page <= totalPagesCount; page++) {
        const postsOnPage = await axios.get(
          `${baseUrl}posts?page=${page}`
        );

        let postsItems = postsOnPage.data.map(post => ({
          url: `/${post.slug}`,
          changefreq: 'daily',
          priority: 1,
          lastmod: new Date(post.date)
        }) )
        // sitemapItems = [...sitemapItems, postsItems]
        sitemapItems.push(...postsItems);
      }

      return sitemapItems
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
