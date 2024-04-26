import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendEmail from '@salesforce/apex/EmailUtility.sendEmail'; // Import the Apex method to send email
import getInventoryItems from '@salesforce/apex/InventoryController.getInventoryItems';


export default class ThreshAlerts extends LightningElement {
    @api isLoading;
    alerts = [];

    thresholdQuantity = 10;
    connectedCallback() {
        this.checkInventoryAndSendEmail();
    }
    async checkInventoryAndSendEmail() {
        try {
            this.isLoading = true;
            const result = await getInventoryItems();
            if (result) {
                for (const item of result) {
                    if (item.quantity < this.thresholdQuantity) {
                        await this.sendEmailToGmail('aakashk2540@gmail.com', item.id, item.name, 'Low Inventory- reorder required');
                        this.alerts.push({ id: item.id, productName: item.name, message: "Low Inventory - reorder required" });
                    }
                }
            }
            else {
                this.showToast('Error', 'Failed to Fetch inventory Items', 'error');
            }
        }
        catch (error) {
            console.error('Error fetching inventory items or sending email:', error.message);
            this.showToast('Error', 'Failed to fetch inventory items or send email', 'error');
        }
        finally {
            this.isLoading = false;
        }
    }
    async sendEmailToGmail(recipientEmail, itemId, productName, message) {
        try{
            await sendEmail({recipientEmail, itemId, productName, message});
            this.showToast('Success', `Email sent to ${recipientEmail} regarding low inventory of ${productName}`,'success');
        }
        catch (error){
            console.error('Error sending Email', error);
            this.showToast('Error', 'failed to send email', 'error');
        }

    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}