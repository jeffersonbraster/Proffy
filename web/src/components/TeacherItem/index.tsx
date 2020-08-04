import React from 'react';

import './styles.css';
import whatsapp from '../../assets/images/icons/whatsapp.svg'


export default function TeacherItem() {
    return (
        <article className="teacher-item">
        <header>
            <img src="https://avatars0.githubusercontent.com/u/36991175?s=460&u=00ea01fdb917ef7b17d6b1091d0d0670c4574049&v=4" alt="jeje"/>
            <div>
                <strong>Jefferson Brandão</strong>
                <span>Geografia</span>
            </div>
        </header>

        <p>
            Entusiasta das melhores tecnologias de quimica avançada.
            <br/><br/>
            Apaixonado por explodir coisas em laboratiroo e por exemplo explodir mais de 200 escolas que nem um doente e ser expulso depois.
        </p>

        <footer>
            <p>
                Preço/hora
                <strong>R$ 60,00</strong>
            </p>
            <button type="button">
                <img src={whatsapp} alt="whatsapp"/>
                Entrar em contato.
            </button>
        </footer>

    </article>
    )
}