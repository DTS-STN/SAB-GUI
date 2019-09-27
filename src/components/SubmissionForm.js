import React from 'react'
import PropTypes from 'prop-types'
import Button from '../components/forms/Button'
import CancelButton from './CancelButton'
import rightArrow from '../assets/rightArrow.svg'
import { BottomContainer, arrow } from '../styles'
import { Trans } from '@lingui/react'

const emailTemplateID = "16b5c121-1234-4e29-83af-d4e9ce43f594"

const SubmissionForm = props => {
  const { sending, onSubmit } = props
  return (
    <BottomContainer>
      <form id="review-form" action="/submit" method="post" onSubmit={onSubmit}>
        <input type="hidden" name="paperFileNumber" value={props.paperFileNumber} />
        <input type="hidden" name="accessibilty" value={props.accessibilty} />
        <input type="hidden" name="email" value={props.email} />
        <input type="hidden" name="location" value={props.location} />
        <input type="hidden" name="selectedDay" value={props.selectedDays} />
        <input type="hidden" name="selectedTime" value={props.selectedTime} />
        <input type="hidden" name="templateId" value={emailTemplateID} />

        <Button type="submit" disabled={sending}>
          <Trans>Send request</Trans>{' '}
          <img src={rightArrow} className={arrow} alt="" />
        </Button>
      </form>
      <CancelButton />
    </BottomContainer>
  )
}

SubmissionForm.propTypes = {
  paperFileNumber: PropTypes.string,
  accessibilty: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  selectedDays: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  selectedTime: PropTypes.string,
  sending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SubmissionForm
