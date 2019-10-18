import React, { Component } from 'react'
import { contextPropTypes } from '../context'
import { matchPropTypes } from '../components/Title'
import withContext from '../withContext'
import SelectDropDown from '../components/forms/Select'
import { css } from 'emotion'

const selectDropDown = css`
  max-width: 500px;
`

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

  componentDidUpdate() {
 this.render()
  }

  changeHandler(event) {
    // event.preventDefault()
    this.setState({ selectedId: event.target.value })
    this.props.selectedTimeId(event.target.value)
  }

  render() {
    return (
      <div id="select-time" className={selectDropDown}>
        {this.props.context.store.language === 'en' ? (
          <SelectDropDown
            selName="TimeSlot"
            selId="TimeSlot"
            optName1="Select a time"
            selOnChange={this.changeHandler}
            optData={this.props.timeSlots}
          />
        ) : (
          <SelectDropDown
            selName="TimeSlot"
            selId="TimeSlot"
            optName1="Sélectionnez une heure"
            selOnChange={this.changeHandler}
            optData={this.props.timeSlots}
          />
        )}
      </div>
    )
  }
}

TimeSlots.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
}

export default withContext(TimeSlots)
