import React from 'react'
import me from './Me.jpg'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import MailIcon from '@material-ui/icons/Mail'
import s from './footer.module.css'

export default function Footer(){
    return(
        <div className={s.container_main}>
            <div className={s.me}>
                <div className={s.me_image_container}>
                    <img src={me} alt="my img" className={s.me_image}/>
                </div>
                <p>Ignacio Gimenez</p>
                <p>Full Stack Developer</p>
            </div>
            <div className={s.container_contact}>
                <a href="https://www.linkedin.com/in/ignacio-gimenez-305799184/" className={s.link}>
                    <div className={s.contact}>
                        <LinkedInIcon/>
                        <p>Ignacio Gimenez</p>
                    </div>
                </a>
                <a href="https://github.com/Nacho077" className={s.link}>
                    <div className={s.contact}>
                        <GitHubIcon/>
                        <p>Nacho077</p>
                    </div>
                </a>
                <div className={s.gmail}>
                    <div className={s.contact}>
                        <MailIcon/>
                        <p>Ignaciogimenez70@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}