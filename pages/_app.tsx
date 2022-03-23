import type { AppProps } from 'next/app'
import { useState } from 'react'
import '../styles/globals.css'
import { GeistProvider, CssBaseline, Link, Divider, Page, Text, Toggle, Spacer, Breadcrumbs, Button } from '@geist-ui/core'
import { Sun, Moon, Code, Mail, Pin } from '@geist-ui/icons'
import { useMediaQuery } from 'react-responsive'

const App = ({ Component, pageProps, router }: AppProps) => {
  const [theme, setTheme] = useState('light')
  const isBig = useMediaQuery({
    query: '(min-width: 720px)'
  })


  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  let crumbStack = ''

  return (
    <GeistProvider themeType={theme}>
      <CssBaseline />
      <Page id="page" dotBackdrop={true} dotSize="2px">
        <Page.Header className='header-container'>
          <div className='header-container' id="big-logo-container">
            <Link href='/'>
              <Text h2 type="success">smrth.dev</Text>
            </Link>
            {isBig &&
              <Breadcrumbs>
                {
                  router.pathname === '/'
                    ? null
                    : router.pathname.split('/').map((crumb, i) => {
                      crumbStack += crumb + '/'
                      if (crumb[0] == '[')
                        return
                      return (
                        <Breadcrumbs.Item href={crumbStack} key={i}>{crumb}</Breadcrumbs.Item>
                      )
                    })
                }
              </Breadcrumbs>
            }
          </div>
          <div className='header-container'>
            <Link href="mailto:chitgopekarsamarth@gmail.com"><Mail /></Link>
            <Spacer inline w={1} />
            <Link href="/projects"><Code /></Link>
            <Spacer inline w={1} />
            <Link href="/blog"><Pin /></Link>
            {isBig &&
              <div id='theme-toggle' onClick={toggleTheme}>
                {theme === 'dark' ? <Sun color='yellow' /> : <Moon color='blue' />}
              </div>
            }
          </div>
        </Page.Header>
        <Divider />
        <Component {...pageProps} toggleTheme={toggleTheme} />
        <Page.Footer>
          <Divider />
          <Text style={{ textAlign: 'center' }}>created with 💙&nbsp; & ☕&nbsp; by smrth</Text>
        </Page.Footer>
      </Page>
    </GeistProvider>
  )
}

export default App