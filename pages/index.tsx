import Head from 'next/head';
import Image from 'next/image';
import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import EmailSharpIcon from '@material-ui/icons/EmailSharp';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CodeIcon from '@material-ui/icons/Code';
import ShopSharpIcon from '@material-ui/icons/ShopSharp';
import styles from '../styles/Home.module.css';
import TwitchImage from '../public/twitch.jpg';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Toast {
  severity: 'success' | 'error',
  message: string,
}

export default function Home() {
  const classes = useStyles();
  const [formBusy, setFormBusy] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('Hello Aldo!, ');
  const [toast, setToast] = React.useState<Toast | null>(null);
  const [recaptchaToken, setRecaptchaToken] = React.useState<string | null>(null);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setToast(null);
  };

  const handleEmail = async () => {
    setFormBusy(true);
    const res = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        message,
        recaptchaToken,
      }),
    });

    if (res.ok) {
      setToast({
        severity: 'success',
        message: 'Email successfully sent!',
      });
    } else {
      setToast({
        severity: 'error',
        message: 'Something went wrong.',
      });
    }

    setEmail('');
    setName('');
    setMessage('Hello Aldo!, ');
    setFormBusy(false);
  };

  return (
    <div>
      <Head>
        <title>Aldo Izquierdo</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
      </Head>
      <section id="main" className={styles.introduction}>
        <div className={classes.root} style={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title={<h1 style={{ fontSize: 15 }}>Visit my GitHub!</h1>} arrow>
            <a href="https://github.com/IzqCode" target="_blank" rel="noreferrer">
              <IconButton style={{ color: '#F06543' }} aria-label="GitHub">
                <GitHubIcon />
              </IconButton>
            </a>
          </Tooltip>
          <Tooltip title={<h1 style={{ fontSize: 15 }}>Check my CV!</h1>} arrow>
            <a href="Aldo_Izquierdo_Resume.pdf" target="_new">
              <IconButton style={{ color: '#F06543' }} aria-label="check cv">
                <PictureAsPdfSharpIcon />
              </IconButton>
            </a>
          </Tooltip>
          <Tooltip title={<h1 style={{ fontSize: 15 }}>Send me an Email!</h1>} arrow>
            <a href="#mail">
              <IconButton style={{ color: '#F06543' }} aria-label="send email">
                <EmailSharpIcon />
              </IconButton>
            </a>
          </Tooltip>
        </div>

        <h1 className={styles.intro}>
          <span className={styles.hi}>Hello! i&apos;m<br /></span>
          <span className={styles.name}>Aldo Izquierdo<br /></span>
          <span className={styles.skills}>I&apos;m a Web Developer with the following skills:<br /></span>
          <span className={styles.skills}>React, Typescript, JavaScript, Next.js, NodeJS, Material UI, HTML, CSS</span>
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title={<h1 style={{ fontSize: 15 }}>Check my projects!</h1>} placement="top" aria-label="projects" arrow>
            <a href="#projects">
              <Fab style={{ backgroundColor: '#F06543' }}>
                <KeyboardArrowDownIcon />
              </Fab>
            </a>
          </Tooltip>
        </div>
      </section>

      <section id="projects" className={styles.section}>
        <div className={styles.flexcontainer}>
          <h1 className={styles.projectcolor}>This are my Projects!</h1>
          <div className={styles.grid2x2}>

            <div className={styles.box}>
              <div className={styles.titleproject}>Utility Discord Bot</div>
              <div className={styles.description}>A general purpose utility bot for Discord servers</div>
              <div className={styles.video}>
                <video className={styles.videobox} autoPlay muted loop>
                  <source src="video1.mp4" type="video/mp4" />
                </video>

              </div>
              <div className={styles.description}>
                Written in Node.js with TypeScript and uses PostgreSQL databases to persist data.
                &nbsp;
                Uses Sequelize for ORM. Uses Docker for local development.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Tooltip title={<h1 style={{ fontSize: 15 }}>See the code!</h1>} arrow>
                  <a href="https://github.com/IzqCode/Utility-Discord-Bot" target="_blank" rel="noreferrer">
                    <IconButton style={{ color: '#F06543' }} aria-label="Code">
                      <CodeIcon />
                    </IconButton>
                  </a>
                </Tooltip>
                <Tooltip title={<h1 style={{ fontSize: 15 }}>Install my project!</h1>} arrow>
                  <a href="https://github.com/IzqCode/Utility-Discord-Bot" target="_blank" rel="noreferrer">
                    <IconButton style={{ color: '#F06543' }} aria-label="Install">
                      <ShopSharpIcon />
                    </IconButton>
                  </a>
                </Tooltip>
              </div>
            </div>

            <div className={styles.box}>
              <div className={styles.titleproject}>Twitch Lurker</div>
              <div className={styles.description}>Browser extension which monitors Twitch streams. (Google Chrome and Firefox)</div>
              <div className={styles.image}>
                <Image
                  src={TwitchImage}
                  alt="twich lurker image"
                />

                <div className={styles.description}>Written in React and Typescript.</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Tooltip title={<h1 style={{ fontSize: 15 }}>See the code!</h1>} arrow>
                  <a href="https://github.com/IzqCode/Twitch-Lurker" target="_blank" rel="noreferrer">
                    <IconButton style={{ color: '#F06543' }} aria-label="Code">
                      <CodeIcon />
                    </IconButton>
                  </a>
                </Tooltip>
                <Tooltip title={<h1 style={{ fontSize: 15 }}>Install my project!</h1>} arrow>
                  <a
                    href="https://chrome.google.com/webstore/detail/fkjghajhfjamfjcmdkbangbeogbagnjf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton style={{ color: '#F06543' }} aria-label="Install">
                      <ShopSharpIcon />
                    </IconButton>
                  </a>
                </Tooltip>
              </div>
            </div>

          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip title={<h1 style={{ fontSize: 15 }}>Send me an Email!</h1>} placement="top" aria-label="mail" arrow>
              <a href="#mail">
                <Fab style={{ backgroundColor: '#F06543' }}>
                  <KeyboardArrowDownIcon />
                </Fab>
              </a>
            </Tooltip>
          </div>

        </div>

      </section>

      <section id="mail" className={styles.sectionmail}>

        <h1 className={styles.emailcolor}>Contact me!</h1>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50vh' }} noValidate autoComplete="off">

            <TextField id="filled-basic" label="Name" value={name} onChange={e => { setName(e.target.value); }} variant="filled" />
            <TextField id="filled-basic" label="Email" value={email} onChange={e => { setEmail(e.target.value); }} variant="filled" />
            <TextField
              id="filled-multiline-flexible"
              label="Message"
              multiline
              maxRows={4}
              value={message}
              onChange={e => {
                setMessage(e.target.value);
              }}
              variant="filled"

            />
            <div className="g-recaptcha">
              <ReCAPTCHA
                size="normal"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={token => {
                  setRecaptchaToken(token);
                }}
              />
            </div>
          </form>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2vh' }}>
          <Button variant="contained" color="primary" onClick={handleEmail} disabled={formBusy}>
            Send
          </Button>
          <Snackbar open={Boolean(toast)} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={toast?.severity}>
              {toast?.message}
            </Alert>
          </Snackbar>
        </div>

      </section>

    </div>

  );
}
