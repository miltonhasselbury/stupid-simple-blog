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
        publishedSitemap: '2011-03-04T03:36:27.377Z',
        publishedRSS: 'Fri, 03 Mar 2006 03:36:28 GMT',
        title: 'Add a blog post',
        description: 'Stupid Simple Blog | Add a blog post'
      }
    }
    const result = await client.listFormSubmissions({
      form_id: '5e02ab73b0c19a0007bd0957'
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

        let siteData = JSON.stringify(xml)
        fs.writeFileSync(`db/sitemap.json`, siteData)
      })
    }

    fetchData()
    return paths
  }
}
