import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
//import './styles';

export default function TeacherForm() {
    const[name, setName] = useState('');
    const[avatar, setAvatar] = useState('');
    const[whatsapp, setWhatsapp] = useState('');
    const[bio, setBio] = useState('');

    const[subject, setSubject] = useState('');
    const[cost, setCost] = useState('');

    const history = useHistory();


    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleArea() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItem = scheduleItems.map((scheduleItems, index) => {
            if(index === position) {
                return {...scheduleItems, [field]: value };
            }

            return scheduleItems;
        });

        setScheduleItems(updateScheduleItem);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso.');
            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro');
        });
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrivel que você quer dar aulas!"
                        description="O primeiro passo é preencher este formulário de inscrição."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus dados:</legend>

                    <Input name="name" label="Nome Completo" value={name} onChange={(e) => {setName(e.target.value)}} />

                    <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => {setAvatar(e.target.value)}} />

                    <Input name="whatsapp" label="Whats-App" value={whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}} />
                                        
                    <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => {setBio(e.target.value)}} />

                </fieldset>

                <fieldset>
                    <legend>Sobre a aula:</legend>

                    <Select name="subject" label="Matéria" value={subject} onChange={(e) => {setSubject(e.target.value)}}
                    options={[
                        {value: 'Portugues', label: 'Português'},
                        {value: 'Biologia', label: 'Biologia'},
                        {value: 'Matematica', label: 'Matemática'},
                        {value: 'Historia', label: 'Historia'},
                        {value: 'Redacao', label: 'Redação'},
                        ]} />
                    <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={(e) => {setCost(e.target.value)}}/>                    

                </fieldset>

                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type="button" onClick={addNewScheduleArea}>
                            + Novo horário
                        </button>
                    </legend>
                    {scheduleItems.map((scheduleItem, index) => {
                        return(
                            <div key={scheduleItem.week_day} className="schedule-item">
                            <Select name="week_day" label="Dia da semana" value={scheduleItem.week_day}
                            onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                            options={[
                                {value: '0', label: 'Domingo'},
                                {value: '1', label: 'Segunda-Feira'},
                                {value: '2', label: 'Terça-Feira'},
                                {value: '3', label: 'Quarta-feira'},
                                {value: '4', label: 'Quinta-Feira'},
                                {value: '5', label: 'Sexta-feira'},
                                {value: '6', label: 'Sabado'},
                                
                                ]} />
    
                            <Input name="from" label="Das" type="time" value={scheduleItem.from}
                            onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />

                            <Input name="to" label="Até" type="time" value={scheduleItem.to}
                            onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
                        </div>
                        )
                    })}
                   
                    
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante <br />
                        Preencha todos os dados
                    </p>
                    <button type="submit">Salvar cadastro</button>
                </footer>
            </form>
            </main>
        </div>
    ) 
}
