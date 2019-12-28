import Layout from '../components/MyLayout'
import MetaTags from '../components/MetaTags'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, Button, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%'
  },
  upload: { margin: '8px 0 32px' }
}))

export default function Form() {
  const classes = useStyles()
  return (
    <>
      <MetaTags
        title='Stupid Simple Blog | Add Stupid Simple Blog spotting'
        desc='Add a story of a night spent at Popes here. Fill out this form and upload a photo if you got one.'
        image='https://stupid-simple-blog.com/blog_01.jpg'
        url='add-story'
      />
      <Layout>
        <h1>I went to Stupid Simple Blog!!!</h1>
        <h2>
          Ok. Calm down. Tell us your Pope's story and upload a photo if you got
          one.
        </h2>
        <form
          name='story'
          method='post'
          data-netlify='true'
          data-netlify-honeypot='bot-field'
          action='/'
          encType='multipart/form-data'
          autoComplete='off'
        >
          <input type='hidden' name='form-name' value='story' />
          <div>
            <FormControl>
              <TextField
                id='form-name'
                name='name'
                label='Story title'
                required
                variant='outlined'
              />
            </FormControl>
          </div>
          <div>
            <TextField
              name='location'
              id='outlined-multiline-static'
              label='Add your Popes story here'
              multiline
              rows='4'
              defaultValue=''
              required
              className={classes.textField}
              margin='normal'
              variant='outlined'
            />
          </div>
          <div>
            <label className='fileLabel' htmlFor='photo'>
              Upload a Popes photo
            </label>
            <input
              className='fileBtn'
              name='photo'
              accept='image/*'
              id='photo'
              multiple
              type='file'
            />
          </div>
          <div>
            <Button
              type='submit'
              variant='contained'
              size='large'
              color='primary'
            >
              Submit story
            </Button>
          </div>
        </form>
        <style jsx>{`
          .fileLabel {
            margin-top: 12px;
            font-size: 14px;
            display: block;
          }
          .fileBtn {
            font-size: 14px;
            margin: 10px 0 40px;
          }
        `}</style>
      </Layout>
    </>
  )
}
