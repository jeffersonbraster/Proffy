import React from 'react';

import './styles.css';
import whatsapp from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

export interface Teacher {
    avatar: string;
    bio: string;
    cost: number;
    name: string
    id: number;
    subject: string;
    whatsapp: string;
}
interface teacherItemProps {
    teacher: Teacher
}


const TeacherItem: React.FC<teacherItemProps> = ({teacher}) => {


    function handleConnection() {
        api.post('connections', {
            user_id: teacher.id,
        });
    }

    return (
        <article className="teacher-item">
        <header>
            <img src={teacher.avatar} alt={teacher.name}/>
            <div>
                <strong>{teacher.name}</strong>
                <span>{teacher.subject}</span>
            </div>
        </header>

        <p>{teacher.bio}</p>

        <footer>
            <p>
                Preço/hora
                <strong>R$ {teacher.cost}</strong>
            </p>
            <a onClick={handleConnection} target="_black" href={`https://wa.me/${teacher.whatsapp}`}>
                <img src={whatsapp} alt="whatsapp"/>
                Entrar em contato.
            </a>
        </footer>

    </article>
    )
}

export default TeacherItem;