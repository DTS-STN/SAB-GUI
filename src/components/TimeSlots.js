/* eslint-disable no-console */
import React, { Component } from 'react'
import TimeForm from './TimeForm'
import { contextPropTypes } from '../context'
// import PropTypes from 'prop-types'
import { matchPropTypes } from '../components/Title'
import withContext from '../withContext'
import moment from 'moment'

class TimeSlots extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedId: 0,
      appointments: [],
      selectedDay: [],
    }
  }

  // eslint-disable-next-line react/no-deprecated
  async componentWillReceiveProps() {
    let {
      context: {
        store: {
          // eslint-disable-next-line no-unused-vars
          selectProvince: { locationId, locationBiokitNumber } = {},
        } = {},
      } = {},
    } = this.props

    console.log('this is the componentdidmount ')

    // var d = new moment(this.props.selectedDay[0])

    var newDate = moment(this.props.selectedDay[0]).format('DD-MM-YYYY')

    console.log(newDate)

    // const day = d.date()
    // const year = d.year().toString()
    // const month1 = d.month() + 1
    // const month = month1.toString()

    // const newDate = day + '-' + month + '-' + year
    // console.log(newDate)

    // console.log(locationBiokitNumber)
    // console.log(currentDate)
    // console.log(locationId)
    // console.log(this.props)

    // const url = `http://localhost:4011/appointmentsByLocId/${locationId}`
    const url = `${
      process.env.RAZZLE_CONNECTION_STRING
    }/appointments/${locationId}/${newDate}`

    // eslint-disable-next-line no-undef
    console.log(url)

    // eslint-disable-next-line no-undef
    const response = await fetch(url)
    const data = await response.json()
    this.setState({ appointments: data, loading: true })
    // eslint-disable-next-line no-console
    // this.removeTimeSlot()
  }

  removeTimeSlot(mockData) {
    const dbTimeSlots = this.state.appointments
    const TimeSlotArray = mockData
    // eslint-disable-next-line no-console
    // console.log(TimeSlotArray[1].Time)
    // eslint-disable-next-line no-console
    // console.log(dbTimeSlots)

    for (var i = 0; i < TimeSlotArray.length; i++) {
      for (var j = 0; j < dbTimeSlots.length; j++) {
        // eslint-disable-next-line security/detect-object-injection
        if (
          // eslint-disable-next-line security/detect-object-injection
          dbTimeSlots[j].time.toString() ===
          // eslint-disable-next-line security/detect-object-injection
          TimeSlotArray[i].Time.toString()
        ) {
          TimeSlotArray.splice(i, 1)
        }
        // eslint-disable-next-line no-console
        //  console.log('its false');
      }
    }
    // console.log(TimeSlotArray)
    return TimeSlotArray
  }

  changeHandler = id => {
    this.setState({
      selectedId: id,
    })
    // eslint-disable-next-line react/prop-types
    this.props.selectedTimeId(id)
    // eslint-disable-next-line no-undef
    // console.log(id)
    // console.log(this.props)
  }

  daySelected = selectedDay => {
    this.props.selectedDay(selectedDay)
    // eslint-disable-next-line no-console
    // console.log(this.props.selectedDay)
    this.setState({
      selectedDay: selectedDay,
    })
  }

  getTimeStops(start, end) {
    var startTime = moment(start, 'hh:mm')
    var endTime = moment(end, 'hh:mm')

    if (endTime.isBefore(startTime)) {
      endTime.add(1, 'day')
    }

    var timeStops = []

    var index = 0

    while (startTime <= endTime) {
      ++index
      timeStops.push({
        id: index,
        Time: new moment(startTime).format('hh:mm a'),
      })
      startTime.add(15, 'minutes')
    }

    return timeStops
  }

  splitTheString(CommaSepStr) {
    var ResultArray = null

    if (CommaSepStr != null) {
      var SplitChars = '-'
      if (CommaSepStr.indexOf(SplitChars) >= 0) {
        ResultArray = CommaSepStr.split(SplitChars)
      }
    }
    return ResultArray
  }

  render() {
    let {
      context: { store: { selectProvince: { locationHours } = {} } = {} } = {},
    } = this.props

    if (!locationHours) {
      locationHours = '0:00-00:00'
    }

    const openingHour = this.splitTheString(locationHours)
    console.log(openingHour)

    const start = openingHour[0]
    const end = openingHour[1]

    const mockData = this.getTimeStops(start, end)
    const timeSlot = this.removeTimeSlot(mockData)

    return (
      <div>
        <table>
          <tbody>
            {timeSlot.map(rowData => (
              <TimeForm
                key={rowData.id}
                selectedId={this.state.selectedId}
                rowData={rowData}
                onSelect={this.changeHandler}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

TimeSlots.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
}

export default withContext(TimeSlots)
