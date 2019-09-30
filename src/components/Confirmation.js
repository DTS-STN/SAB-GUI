import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { theme } from '../styles'
import { Trans, withI18n } from '@lingui/react'
import { SelectedDayList } from './SelectedDayList'
import { SummaryRow } from './SummaryRow'

const TableContainer = styled.div`
  margin: ${theme.spacing.lg} 0;

  h2 {
    font-size: ${theme.font.md};
    margin-top: 0;
  }
`

const Review = ({
  paperFileNumber,
  email,
  location,
  selectedDays,
  // eslint-disable-next-line react/prop-types
  selectedTime,
  // eslint-disable-next-line react/prop-types
  accessibility,
  // eslint-disable-next-line react/prop-types
  privacy,
  hashFromData,

  i18n,
}) => (
  <TableContainer>
     <SummaryRow
      summaryId={'hashFromData'}
      summaryHeader={<Trans>Confirmation #: A {hashFromData}</Trans>}
      summaryLink={''}
      summaryLabel={
        i18n && `${i18n._('Change')} ${i18n._('Confirmation number')}`
      }
    />
    <SummaryRow
      summaryId={'bilNumber'}
      summaryHeader={<Trans>Application number</Trans>}
      summaryBody={paperFileNumber}
      summaryLink={'/register#paperFileNumber-label'}
      summaryLabel={
        i18n && `${i18n._('Change')} ${i18n._('Paper file number')}`
      }
    />
    <SummaryRow
      summaryId={'email address'}
      summaryHeader={<Trans>Email address</Trans>}
      summaryBody={email}
      summaryLink={'/register#email-label'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Email')}`}
    />
    <SummaryRow
      summaryId={'a11y'}
      summaryHeader={<Trans>I need an accessible or private workstation</Trans>}
      summaryBody={accessibility}
      summaryLink={'/register#accessibility-label'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Accessibility')}`}
    />
    <SummaryRow
      summaryId={'location'}
      summaryHeader={<Trans>Location</Trans>}
      summaryBody={location}
      summaryLink={'/selectProvince'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Location')}`}
    />
    <SummaryRow
      summaryId={'date'}
      summaryHeader={<Trans>Day and time</Trans>}
      summaryBody={
        <SelectedDayList
          selectedDays={selectedDays}
          selectedTime={selectedTime}
        />
      }
      summaryLink={'/calendar#selectedDaysBox'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Availability')}`}
    />
  </TableContainer>
)

Review.propTypes = {
  hashFromData:PropTypes.number,
  paperFileNumber: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  selectedDays: PropTypes.array,
  selectedTime: PropTypes.string,
  i18n: PropTypes.object,
}

const ReviewI18n = withI18n()(Review)

export { ReviewI18n as default, SelectedDayList }
