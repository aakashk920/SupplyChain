import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendEmail from '@salesforce/apex/EmailUtility.sendEmail';
import getInventoryItems from '@salesforce/apex/InventoryController.getInventoryItems';
export default class ThreshHoldAlerts extends LightningElement {
    @api isLoading;
    alerts = [];
    messageToDisplay=false;
    connectedCallback() {
        this.checkInventoryAndSendEmail();
    }
    async checkInventoryAndSendEmail() {
        try {
            this.isLoading = true;
            const result = await getInventoryItems();
            if (result) {
                for (const item of result) {
                    if (item.quantity < item.threshHoldLevel) {
                        await this.sendEmailToGmail('aakashk2540@gmail.com', item.id, item.name, 'Low inventory-reorder required');
                        this.alerts.push({ id: item.id, productName: item.name, message: "Low Inventory- reorder required " });
                    }
                }
                if (!this.alerts.length) {
                    console.log( 'This is the length',this.alerts.length);
                    
                    this.messageToDisplay = true;
                }   
            }
        }
        catch (error) {
            console.error('This is the error', error.message);
            this.showToast('Error', 'Failed to Fetch inventory Items error', 'error');
        }
        finally {
            this.isLoading = false;
        }
    }

    async sendEmailToGmail(receiptEmail, itemId, productName, message) {
        try {
            await sendEmail({ receiptEmail, itemId, productName, message });
            this.showToast('Success', `Email Sent to ${receiptEmail} regarding low inventory of the item`, 'success');
        }
        catch (error) {
            this.show
        }
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title:title,
            message:message,
            variant:variant
        })
        this.dispatchEvent(event);
    }
}   