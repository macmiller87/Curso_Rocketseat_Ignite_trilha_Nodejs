import { IDateProvider } from "../IDateProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Esse import é do (pluggin do utc), para conseguir manipular a date no formato utc.

// Aqui está sendo setado a lib(dayjs) e a subib(utc).
dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
 
    // Faz a comparação em horas.
    compareInHours(start_date: Date, end_date: Date): number {
        
        const end_date_utc = this.convertToUtc(end_date);
        const start_date_utc = this.convertToUtc(start_date); 

        return dayjs(end_date_utc).diff(start_date_utc, "hours"); // Esse return pega as duas datas acima, e faz a comparação enter ela em (horas), que é o parametro que está sendo pedido no momento. (mas existem mais opçoes).
    }

    convertToUtc(date: Date): string {
       return dayjs(date).utc().local().format(); // Essa return pega a data que está sendo passada na aplicação, e formata para o padrão (utc).
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    // Faz a comparação em dias.
    compareInDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUtc(end_date);
        const start_date_utc = this.convertToUtc(start_date); 

        return dayjs(end_date_utc).diff(start_date_utc, "days");
    }

    // Adiciona dias e converte para (Date).
    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    // Adiciona horas e converte para (Date).
    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate();
    }
}

export { DayjsDateProvider };