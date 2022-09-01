class Utility {

    static ConvertDateTime(dateTime) {
        let shortDate = new Date(dateTime).toLocaleDateString('en-US')
        let dateLength = shortDate.length;
        let monthDay = shortDate.substring(0, dateLength - 5);
        return monthDay;
    }
}

export default Utility;