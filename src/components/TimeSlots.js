/* eslint-disable no-console */
import React, { Component } from 'react'
import { contextPropTypes } from '../context'
// import PropTypes from 'prop-types'
import { matchPropTypes } from '../components/Title'
import withContext from '../withContext'
import moment from 'moment'
import SelectDropDown from '../components/forms/Select'
import { css } from 'emotion'

class TimeSlots extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedId: 0,
      appointments: [],
      selectedDay: [],
    }
    this.changeHandler = this.changeHandler.bind(this)
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

    var newDate = moment(this.props.selectedDay[0]).format('DD-MM-YYYY')

    console.log(newDate)

    // const url = `http://localhost:4011/appointmentsByLocId/${locationId}`
    const url = `${
      process.env.RAZZLE_CONNECTION_STRING
    }/appointments/${locationId}/${newDate}`

    console.log(url)

    // eslint-disable-next-line no-undef
    const response = await fetch(url)
    const data = await response.json()
    this.setState({ appointments: data, loading: true })
  }

  removeTimeSlot(mockData) {
    const dbTimeSlots = this.state.appointments
    const TimeSlotArray = mockData

    for (var i = 0; i < TimeSlotArray.length; i++) {
      for (var j = 0; j < dbTimeSlots.length; j++) {
        if (
          // eslint-disable-next-line security/detect-object-injection
          dbTimeSlots[j].time.toString() ===
          // eslint-disable-next-line security/detect-object-injection
          TimeSlotArray[i].Time.toString()
        ) {
          TimeSlotArray.splice(i, 1)
        }
      }
    }

    return TimeSlotArray
  }

  changeHandler(event) {
    // event.preventDefault()
    this.setState({ selectedId: event.target.value })
    this.props.selectedTimeId(event.target.value)
    console.log(event)
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
        value: new moment(startTime).format('hh:mm a'),
        name: new moment(startTime).format('hh:mm a'),
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
    console.log(timeSlot)
    return (
      <div>
        <SelectDropDown
          selName="TimeSlot"
          selId="TimeSlot"
          optName1="Select a time"
          selOnChange={this.changeHandler}
          optData={timeSlot}
        />
      </div>
    )
  }
}

TimeSlots.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
}

export default withContext(TimeSlots)
