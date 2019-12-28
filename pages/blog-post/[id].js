import MetaTags from '../../components/MetaTags'
import Link from 'next/link'
import Layout from '../../components/MyLayout'
import Title from '../../components/Title'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const Sighting = props => (
  <>
    <MetaTags
      title={`${props.result.name}`}
      desc="A new story about Pope's nude bar"
      image={
        props.result.data.photo
          ? props.result.data.photo.url
          : 'https://stupid-simple-blog.com/popes_nude_bar_02.jpg'
      }
      url={props.result.id}
    />
    <Layout>
      <Title />
      <div className='center'>
        {props.result.data.photo ? (
          <img src={props.result.data.photo.url} alt='Popes' />
        ) : (
          <div className='center-inner'>
            <img alt='Popes' src='/popes_nude_bar_02.jpg' />
            <p className='courtesty'>
              <a href='https://www.reddit.com/r/alisonbecker/'>
                Courtesy of Alison Becker
              </a>
            </p>
          </div>
        )}
        <h1>{props.result.name}</h1>
      </div>
      <div>
        <p
          dangerouslySetInnerHTML={{
            __html: props.result.data.location.replace(/\n/g, '<br />')
          }}
        />
        <p>
          <a
            href='https://twitter.com/share?ref_src=twsrc%5Etfw'
            class='twitter-share-button'
            data-url={`https://stupid-simple-blog.com/story/${props.result.id}`}
            data-via='popesnudebar'
            data-hashtags='stripper'
            data-show-count='false'
          >
            Tweet
          </a>
          <script
            async
            src='https://platform.twitter.com/widgets.js'
            charset='utf-8'
          ></script>
        </p>
        <p className='btn'>
          <span className='arrowBtns'>
            {props.result.prevPage && (
              <Link href='/story/[id]' as={`/story/${props.result.prevPage}`}>
                <a className='arrowBtn'>
                  <ArrowBackIcon
                    fontSize='small'
                    height='16px'
                    width='16px'
                    titleAccess='Previous page'
                  />
                </a>
              </Link>
            )}
            <Link href='/' as='/'>
              <a className='arrowBtn arrowHome'>All stories</a>
            </Link>
            {props.result.nextPage && (
              <Link href='/story/[id]' as={`/story/${props.result.nextPage}`}>
                <a className='arrowBtn'>
                  <ArrowForwardIcon
                    fontSize='small'
                    height='16px'
                    width='16px'
                    titleAccess='Next page'
                  />
                </a>
              </Link>
            )}
          </span>
        </p>
      </div>
      <style jsx>
        {`
          h1 {
            line-height: 1;
            margin: 40px 0;
          }
          .center {
            text-align: center;
          }
          .center-inner {
            text-align: left;
            margin: 0 auto;
            max-width: 400px;
          }
          .btn {
            margin-top: 20px;
          }
          img {
            height: auto;
            max-width: 100%;
          }
          .arrowBtns {
            padding: 4px 0;
            display: flex;
            align-items: center;
          }
          a + a {
            margin-left: 8px;
          }
          .arrowBtn {
            display: flex;
            color: #333333;
            border: 1px solid #333;
            border-radius: 4px;
            padding: 2px;
            min-height: 20px;
          }
          .arrowBtn:hover {
            background-color: #eee;
          }
          .arrowHome {
            font-size: 0.875em;
            text-decoration: none;
            padding: 1px 4px;
          }
        `}
      </style>
    </Layout>
  </>
)

Sighting.getInitialProps = async ({ query }) => {
  const NetlifyAPI = require('netlify')
  const client = new NetlifyAPI(process.env.NETLIFY_TOKEN)
  const result = await client.listFormSubmission({
    submission_id: query.id
  })
  const subs = await client.listFormSubmissions({
    form_id: '5e02ab73b0c19a0007bd0957'
  })

  // console.log(subs)
  const getAllKeyID = subs.map((entry, index) => {
    const ids = ([index] = entry.id)
    return ids
  })

  // function to get the correct index number based it's value
  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value)
  }
  const indexNumber = getKeyByValue(getAllKeyID, query.id)
  const addNumber = parseInt(indexNumber) - 1
  const subtractNumber = parseInt(indexNumber) + 1

  const prevPage =
    addNumber < subs.length && addNumber > -1 ? subs[addNumber].id : null
  const nextPage = subtractNumber < subs.length ? subs[subtractNumber].id : null

  result['prevPage'] = prevPage
  result['nextPage'] = nextPage
  return {
    result
  }
}

export default Sighting
