
class formatter
{
    private padWithZero(value: string): string 
    {
        return value?.length === 1 ? `0${value}` : value;
    }
      
    convertDateFormat(dateString: string): string 
    {
        const [month, day, year] = dateString?.split('/');
      
        // Ensure the components are two digits by using the helper function
        const formattedMonth = this.padWithZero(month);
        const formattedDay = this.padWithZero(day);
      
        // Create the new date string in "YYYY-MM-DD" format
        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
      
        return formattedDate;
      }
}

export default new formatter();