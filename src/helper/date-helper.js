const getCurrentDate = () => {
    const currentDate = new Date();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const month = monthNames[currentDate.getMonth()]
    const day = ('0' + currentDate.getDate()).slice(-2)
    const year = currentDate.getFullYear()
  
    return `${month} ${day}, ${year}`

  }

const dateToText = (dateString) => {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];
  const [year, month, day] = dateString.split('-');
  const monthName = months[month - 1];
  return `${monthName} ${day}, ${year}`;  
}

  module.exports = {
    getCurrentDate,
    dateToText
  }