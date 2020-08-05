import React, { useState, FormEvent } from 'react';


import './styles.css';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';




export default function TeacherList() {
    const [subject, setSubject] = useState('');
    const [week_day, setWeekday] = useState('');
    const [time, setTime] = useState('');

    const [teachers, setTeachers] = useState([]);


    async function seachTeachers(e: FormEvent) {
        e.preventDefault();

       const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setTeachers(response.data);

    }


    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={seachTeachers}>
                    <Select name="subject" label="Matéria" value={subject}
                    onChange={(e) => {setSubject(e.target.value) }}                     
                        options={[
                            {value: 'Portugues', label: 'Português'},
                            {value: 'Biologia', label: 'Biologia'},
                            {value: 'Matematica', label: 'Matemática'},
                            {value: 'Historia', label: 'Historia'},
                            {value: 'Redacao', label: 'Redação'},
                            ]} />
                    <Select name="week_day" label="Dia da semana" value={week_day}
                    onChange={(e) => {setWeekday(e.target.value) }}  
                    options={[
                        {value: '0', label: 'Domingo'},
                        {value: '1', label: 'Segunda-Feira'},
                        {value: '2', label: 'Terça-Feira'},
                        {value: '3', label: 'Quarta-feira'},
                        {value: '4', label: 'Quinta-Feira'},
                        {value: '5', label: 'Sexta-feira'},
                        {value: '6', label: 'Sabado'},
                        
                        ]} />
                    <Input type="time" name="time" label="Hora" value={time}
                    onChange={(e) => {
                        setTime(e.target.value)                        
                        }}   />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) =>{
                    return <TeacherItem key={teacher.id} teacher={teacher} />;
                })}    
            
            </main>
        </div>
    )
}
