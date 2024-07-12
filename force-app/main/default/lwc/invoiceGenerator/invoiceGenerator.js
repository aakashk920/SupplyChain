import { LightningElement, track } from 'lwc';
import generateInvoicePDF from '@salesforce/apex/InvoiceController.generateInvoicePDF';
import sendEmailWithAttachment from '@salesforce/apex/EmailController.sendEmailWithAttachment';

export default class InvoiceGenerator extends LightningElement {
    @track isLoading = false;
    @track invoiceGenerated = false;
    @track error;

    generateInvoice() {
        this.isLoading = true;
        generateInvoicePDF()
            .then(result => {
                // Invoice generated successfully
                console.log('This is the Sprite',result);
                this.isLoading = false;
                this.invoiceGenerated = true;
                this.invoiceGenerated = result;
                this.error = undefined;
            })
            .catch(error => {
                // Error occurred
                this.isLoading = false;
                this.error = error.body.message;
                this.invoiceGenerated = false;
            });
    }

    sendEmail() {
        this.isLoading = true;
        sendEmailWithAttachment(this.invoiceGenerated) // Pass invoiceGenerated value to the method
            .then(result => {
                // Email sent successfully
                this.isLoading = false;
                this.error = undefined;
            })
            .catch(error => {
                // Error occurred
                this.isLoading = false;
                this.error = error.body.message;
            });
    }
}
