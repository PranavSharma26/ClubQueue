export const dateTimeFormat = (s) => {
    let date= (s.split('T')[0]).split('-')
    return date[2]+'-'+date[1]+'-'+date[0]
}