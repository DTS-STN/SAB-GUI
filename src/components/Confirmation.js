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
  // eslint-disable-next-line react/prop-types
  accessibility,
  location,
  selectedDays,
  selectedTime,
  i18n,
}) => (
  <TableContainer>
    <SummaryRow
      summaryHeader={<Trans>BIL file number</Trans>}
      summaryBody={paperFileNumber}
      summaryLink={''}
      summaryLabel={''}
    />
    <SummaryRow
      summaryHeader={<Trans>Email</Trans>}
      summaryBody={email}
      summaryLink={''}
      summaryLabel={''}
    />
    <SummaryRow
      summaryHeader={<Trans>Accessibility required</Trans>}
      summaryBody={accessibility}
      summaryLink={''}
      summaryLabel={''}
    />
    <SummaryRow
    summaryHeader={<Trans>Privacy booth required</Trans>}
    summaryBody={accessibility}
    summaryLink={''}
    summaryLabel={''}
    />
    <SummaryRow
      summaryHeader={<Trans>Location</Trans>}
      summaryBody={location}
      summaryLink={''}
      summaryLabel={''}
    />
    <SummaryRow
      summaryHeader={<Trans>Time Slot</Trans>}
      summaryBody={selectedTime}
      summaryLink={'/calendar#selectedDaysBox'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Location')}`}
    />    
    <SummaryRow
      summaryHeader={<Trans>Availability</Trans>}
      summaryBody={<SelectedDayList selectedDays={selectedDays} />}
      summaryLink={''}
      summaryLabel={''}
    />
  </TableContainer>
)

Review.propTypes = {
  paperFileNumber: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  selectedDays: PropTypes.array,
  selectedTime: PropTypes.string,
  i18n: PropTypes.object,
}

const ReviewI18n = withI18n()(Review)

export { ReviewI18n as default, SelectedDayList }
