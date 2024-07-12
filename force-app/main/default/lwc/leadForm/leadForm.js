import { LightningElement, track } from "lwc";
import { NavigationMixin } from 'lightning/navigation';
import searchLeads from "@salesforce/apex/LeadController.searchLeads";
import uploadPDF from "@salesforce/apex/LeadController.uploadPDF";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    { label: 'Lead Name', fieldName: 'Name', type: 'text' },
    { label: 'Contact Information', fieldName: 'Contact_Information__c', type: 'text' },
    { label: 'Status', fieldName: 'Status__c', type: 'text' },
    { label: 'Edit', type: 'button', typeAttributes: { label: 'Edit Status', variant: 'brand' } },
];

const MAX_FILE_SIZE = 4500000; // 4.5 MB

export default class LeadForm extends NavigationMixin(LightningElement) {
    @track searchResult;
    columns = columns;

    handleSearch(event) {
        const searchValue = event.target.value;
        searchLeads({ searchKey: searchValue })
            .then(result => {
                this.searchResult = result;
            })
            .catch(error => {
                this.showToast('Error', error.message.body, 'error');
            })
    }

    handleRowAction(event) {
        const row = event.detail.row;
        this.navigateToEditPage(row.Id);
    }

    navigateToEditPage(recordId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'lead__c',
                actionName: 'edit'
            }
        });
    }

    handleSuccess() {
        this.showToast('Success', 'Record created successfully', 'success');
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        if (file.size > MAX_FILE_SIZE) {
            this.showToast('Error', 'File size exceeds the limit of 4.5 MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const fileContent = reader.result.split(',')[1]; // Extract Base64 content
            this.uploadFileContent(fileContent);
        };
        reader.readAsDataURL(file);
    }

    uploadFileContent(fileContent) {
        const leadId = this.recordId; // Assuming recordId is available
        uploadPDF({ leadId: leadId, fileContent: fileContent })
            .then(result => {
                this.showToast('Success', 'PDF file uploaded successfully', 'success');
                // Optionally, perform any additional actions after successful upload
            })
            .catch(error => {
                this.showToast('Error', 'Failed to upload PDF file: ' + error.body.message, 'error');
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}
