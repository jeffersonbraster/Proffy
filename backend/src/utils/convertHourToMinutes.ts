export default function convertyHourToMinutes(time: string) {
    //dividir a hora em dois e transformar em number
    const [hour, minutes] = time.split(':').map(Number);

    //transforma toda a hora em minutos apenas
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;

}