
import constants from '../constants';
import { sendEmail } from '../mailer';

export const sendGeneralEmail = async (to: string, subject: string, html: any) => {
    try {
        await sendEmail(
            constants.confirmEmails.from,
            to,
            subject,
            html,
            constants.attachmentsEmails,
        );
    } catch(error) {
        console.log(error);
    }
};
