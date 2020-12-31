import React from 'react'
import './ScheduleListTable.css'

export default function ScheduleListTable(props) {
  // const now = new Date();
  // const y = now.getYear() + 1900;
  // const m = now.getMonth() + 1;
  // const d = now.getDate();

  function beautyTime(time) {
    let ampm = ''
    let temp = time.split('T')[1]
    temp.split(':')
    let hour = parseInt(temp.split(':')[0])
    let min = temp.split(':')[1]
    if (hour < 12) {
      ampm = ' a.m.'
    } else {
      ampm = ' p.m.'
    }
    return hour + ':' + min + ampm
  }

  console.log(props.newSchedule)

  return (
    <React.Fragment>
      {props.newSchedule && (
        <div id='scheduleRoot'>
          <table className='box-table'>
            <thead id='tableHead'>
              <tr>
                <th scope='col'>Flight</th>
                <th scope='col'>Airline</th>
                <th scope='col'>Departure</th>
                <th scope='col'>Arrival</th>
              </tr>
            </thead>
            <tbody>
              {!props.newSchedule.error &&
                props.newSchedule.data.map((schedule, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {schedule.flight.iata}
                      </td>
                      <td>
                        <img
                          id='airlinelogo'
                          alt='airlinelogo'
                          style={{ opacity: 1, maxHeight: 30, maxWidth: 50 }}
                          src={`http://pics.avs.io/500/250/${schedule.airline.iata}.png`}
                        ></img>
                      </td>
                      <td>{beautyTime(schedule.departure.scheduled)}</td>
                      <td>{beautyTime(schedule.arrival.scheduled)}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  )
}
