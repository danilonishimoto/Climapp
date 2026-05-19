export const formatWeekday = (weekday) => {
  weekday.toUpperCase()
  switch(weekday) {
    case 'SEG': 
      return 'Segunda'
    case 'TER':
      return 'Terça'
    case 'QUA':
      return 'Quarta'
    case 'QUI': 
      return 'Quinta'
    case 'SEX':
      return 'Sexta'
    case 'SAB': 
      return 'Sábado'
    case 'DOM': 
      return 'Domingo'
    default:
        return weekday 
  }
}