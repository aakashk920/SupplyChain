public with sharing class EmailController {
    @AuraEnabled(cacheable=true)
    public static void sendEmailWithAttachment(String invoiceGenerated) {
        // Placeholder logic to send email with PDF attachment
        
        // Create email message
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {'aakashk2540@gmail.com'}; // Replace with actual recipient email
        email.setToAddresses(toAddresses);
        email.setSubject('Invoice for Order #12345');
        email.setPlainTextBody('Please find attached the invoice for your recent order.');
        
        // Attach PDF
        Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
        attachment.setFileName('Invoice.pdf');
        attachment.setBody(Blob.valueOf(invoiceGenerated)); // Convert invoiceGenerated to Blob
        email.setFileAttachments(new Messaging.EmailFileAttachment[] { attachment });
        
        // Send email
        Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
        
        // Check results
        if (results[0].isSuccess()) {
            System.debug('Email sent successfully!');
        } else {
            System.debug('Failed to send email: ' + results[0].getErrors()[0].getMessage());
        }
    }
}
