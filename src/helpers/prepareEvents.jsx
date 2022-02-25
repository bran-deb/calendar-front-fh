import moment from "moment";

export const prepareEvents = (events = []) => {


    return events.map((e) => ({
        ...e,
        end: moment(e.end).toDate(),        //cambia end(string) a end(date)
        start: moment(e.start).toDate(),    //cambia start(string) a start(date)
    }))
}