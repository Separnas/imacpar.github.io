
import { addDays, startOfWeek, format } from 'date-fns';
import { sv } from 'date-fns/locale';
export function fmt(date: Date, fmtStr: string) { return format(date, fmtStr, { locale: sv }); }
export function ymd(date: Date) { return format(date, 'yyyy-MM-dd'); }
export function weekDays(centerDate: Date) { const start = startOfWeek(centerDate, { weekStartsOn: 1 }); return new Array(7).fill(0).map((_, i) => addDays(start, i)); }
