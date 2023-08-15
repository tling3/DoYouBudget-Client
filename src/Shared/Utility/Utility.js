class Utility {
    static GetDay = dateTime => {
        let shortDate = new Date(dateTime).toLocaleDateString('en-US')
        let firstForwardIndex = shortDate.indexOf('/')
        let dateLength = shortDate.length;
        let day = shortDate.substring(firstForwardIndex + 1, dateLength - 5);
        return day
    }

    static Date = dateTime => {
        let shortDate = new Date(dateTime).toLocaleDateString('en-US')
        return shortDate
    }

    static CalendarDate = date => {
        let d = new Date(date)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        let year = d.getFullYear()

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
}

export default Utility
