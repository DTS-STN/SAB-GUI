import React from 'react'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { css } from 'emotion'
import { Trans } from '@lingui/react'
import { theme, BottomContainer } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import Summary from '../components/Summary'
//import Reminder from '../components/Reminder'
import SubmissionForm from '../components/SubmissionForm'
import { sortSelectedDays } from '../utils/calendarDates'
import { dateToISODateString } from '../components/Time'
import FocusedH1 from '../components/FocusedH1'
import { ReportButton } from '../components/forms/ReportButton'
import DateModified from '../components/DateModified'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`
const spacingButton = css`
  position: relative;
  top: 2px;
`
class ReviewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sending: false }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteTempAppointment = this.deleteTempAppointment.bind(this)
  }
  handleSubmit() {
    this.setState({ sending: true })
  }
  translateReason(reason) {
    if (reason && reason === 'yes') {
      return <Trans>Yes</Trans>
    } else {
      return <Trans>No</Trans>
    }
 }

  deleteTempAppointment() {
    let tempAppointment = this.props.context.store.calendar.tempAppointment
    return axios.delete(`/appointments/temp/delete/${tempAppointment._id}`)

  render() {
    let {
      context: {
        store: {
          register: {
            paperFileNumber,
            email,
            accessibility,
            // hashFromData,
          } = {},
          calendar: {
            selectedDays = [],
            selectedTime,
            tempAppointment: { _id } = {},
          } = {},
          selectProvince: { locationCity, locationAddress } = {},
        } = {},
      } = {},
    } = this.props
    const { sending } = this.state
    let days = []
    if (selectedDays) {
      days = sortSelectedDays(
        selectedDays.map(day => {
          return new Date(dateToISODateString(day))
        }),
      )
    }
    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <FocusedH1 id="review-header">
          <Trans>Review your request:</Trans>
        </FocusedH1>
        <section>
          <Summary
            paperFileNumber={paperFileNumber}
            email={email}
            accessibility={this.translateReason(
              accessibility !== undefined ? accessibility[0] : 'No',
            )}
            location={locationCity + ', ' + locationAddress}
            selectedDays={days}
            selectedTime={selectedTime}
            timeDateChangeHandler={this.deleteTempAppointment}
          />
          <SubmissionForm
            hashFromData={_id}
            email={email}
            paperFileNumber={paperFileNumber}
            accessibility={
              accessibility !== undefined ? accessibility[0] : 'No'
            }
            location={locationCity + ', ' + locationAddress}
            selectedDays={selectedDays}
            selectedTime={selectedTime}
            sending={sending}
            onSubmit={this.handleSubmit}
          />
        </section>
        <div className={spacingButton}>
          <BottomContainer>
            <ReportButton />
          </BottomContainer>
        </div>
        <div />
        <DateModified />
      </Layout>
    )
  }
}
ReviewPage.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
}
export default withContext(ReviewPage)
