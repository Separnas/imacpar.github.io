
export function EncouragingMessage({ total, completed }: { total: number; completed: number }) {
  let text = 'Låt oss börja dagen!'
  const ratio = total > 0 ? completed / total : 0
  if (total === 0) text = 'Lägg till en uppgift för att komma igång.'
  else if (ratio === 0) text = 'Du fixar det! Ta första steget.'
  else if (ratio < 0.5) text = 'Snygg start – fortsätt så!'
  else if (ratio < 1) text = 'Grymt! Du är snart i mål.'
  else text = 'Allt klart – starkt jobbat! 💪'
  return (
    <div className="rounded-2xl bg-accent/30 p-4 text-center">
      <p className="text-sm font-medium">{text}</p>
    </div>
  )
}
