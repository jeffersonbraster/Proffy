import {Request, Response} from 'express';
import db from '../database/connection';
import convertyHourToMinutes from '../utils/convertHourToMinutes';


interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {

    async index (request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.subject || !filters.week_day || !filters.time) {
            return response.status(400).json({
                error: 'Missesing filters to search classes'
            });
        }

        const timeInMinutes = convertyHourToMinutes(time);

        const classes = await db('classes')
        .whereExists(function () {
            this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'user_id')
        .select(['classes.*', 'users.*']);


        return response.json(classes);
    }


     async create (request: Request, response: Response)  {
        //requisição do usuário
        const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;
    
        //salvar nas tabelas apenas se não houver nenhum erro em nenhuma tabela
        const trx = await db.transaction();
    
        
        try {
        //salvando no banco ta tabela de users
        const insertedUsersIds = await trx('users').insert({ name, avatar, whatsapp, bio });
    
        //pegar o id do usuario na primeira posição
        const user_id = insertedUsersIds[0];
    
        //salvando na tabela de classes
        const insertedClassesIds = await trx('classes').insert({subject, cost, user_id});
    
        //pega o id de classes na primeira posição
        const class_id = insertedClassesIds[0];
    
        //conversão de datas
        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertyHourToMinutes(scheduleItem.from),
                to: convertyHourToMinutes(scheduleItem.to),
            };
        });
    
        //salvando na tabela de class schedule
        await trx('class_schedule').insert(classSchedule);
    
    
        //nesse momento insere tudo no banco se ocorrer tudo bem
        await trx.commit();
    
        return response.status(201).send();
    
        } catch (err) {
            //desfazer as alterações feitas até o erro
            await trx.rollback();
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
        
    }
}