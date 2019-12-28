const fs = require('fs')
require('dotenv').config()
const NetlifyAPI = require('netlify')
const client = new NetlifyAPI(process.env.NETLIFY_TOKEN)

module.exports = {
  env: {
    NETLIFY_TOKEN: process.env.NETLIFY_TOKEN
  },
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' },
      '/add-blog-post': { page: '/add-blog-post' }
    }
    const homeTime = new Date().toISOString()
    const xml = {
      '/': {
        page: '/',
        publishedSitemap: homeTime,
        publishedRSS: 'Fri, 03 Mar 2006 03:36:28 GMT',
        title: 'Stupid Simple Blog | Homepage',
        description:
          'A stupid simple free Next.js photo blog with a Netlify form database, infinite scroll, metatags and more.'
      },
      '/add-blog-post': {
        page: '/add-blog-post',
        publishedSitemap: '2019-12-27T03:36:27.377Z',
        publishedRSS: 'Fri, 27 Dec 2019 03:36:28 GMT',
        title: 'Add a blog post',
        description: 'Stupid Simple Blog | Add a blog post'
      }
    }

    // Create paths based on the form submission/s id
    // Example https://example.com/blog-post/5e06b1cd5972af9de018008d

    const result = await client.listFormSubmissions({
      // Enter YOUR netlify form id here. This one is mine.
      form_id: '5e06f33ec7aac100099c313a'
    })
    const fetchData = () => {
      result.map(car => {
        const { id, created_at, name, data } = car

        const time = created_at.toString()
        const timeSitemap = new Date(time).toISOString()
        const timeRSS = new Date(time).toUTCString()

        xml[`/blog-post/${id}`] = {
          page: `/blog-post/${id}`,
          publishedSitemap: timeSitemap,
          publishedRSS: timeRSS,
          title: `${name} just made a test post at the super simple blog.`,
          description: `${data.location}`
        }

        paths[`/blog-post/${id}`] = {
          page: '/blog-post/[id]',
          query: { id: `${id}` }
        }

        // create sitemap
        let siteData = JSON.stringify(xml)
        fs.writeFileSync(`db/sitemap.json`, siteData)
      })
    }

    fetchData()
    return paths
  }
}
