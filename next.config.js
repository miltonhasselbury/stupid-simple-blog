const fs = require('fs')
require('dotenv').config()
const NetlifyAPI = require('netlify')
const client = new NetlifyAPI(process.env.NETLIFY_TOKEN)

module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
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
        title: 'Stupid Simple Blog Homepage',
        description: 'A site dedicated to the history of Popes nude bar.'
      },
      '/add-blog-post': {
        page: '/add-blog-post',
        publishedSitemap: '2011-03-04T03:36:27.377Z',
        publishedRSS: 'Fri, 03 Mar 2006 03:36:28 GMT',
        title: 'Stupid Simple Blog | Add a story',
        description:
          'Add a story about a night at Popes here. Fill out this form and upload a photo'
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

        xml[`/story/${id}`] = {
          page: `/story/${id}`,
          publishedSitemap: timeSitemap,
          publishedRSS: timeRSS,
          title: `${name} just posted a story about Popes.`,
          description: `${data.location}`
        }

        paths[`/story/${id}`] = {
          page: '/story/[id]',
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
