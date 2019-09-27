import { sendNotification } from './sendmail';
import { logerror } from '../utils/logger';

// This is the Confirmation Template for Demo 
const CONFIRMATION_EMAIL = '16b5c121-1234-4e29-83af-d4e9ce43f594'
  


export const handleSubmitEmail = async (req, res) => {
  let input = Object.assign({}, req.body) // make a new object
  if (input.templateId === CONFIRMATION_EMAIL){
    try {
      const response = await sendNotification({
        email: input.email,
        templateId: input.templateId,
        options: {
          personalisation : {
            paperFileNumber: input.paperFileNumber,
            location: input.location,
            selectedDay: input.selectedDay,
            selectedTime: input.selectedTime,
            accessibility: input.accessibility || "No",
          },
        },
      }).catch(err => {
        logerror(err)
        return res.redirect('/confirmation/client-request-issue')
      })

      //Caught an error earlier in the process 
      if (response === false) {
        return res.redirect('/confirmation/client-request-issue')
      }
    }  
    catch (err) {
      return res.redirect('/error')
    }
    return res.redirect('/confirmation')
  }
  logerror(`Unknown Email Template ID ${input.templateId || 'empty'}`)
  return res.redirect('/error')
}