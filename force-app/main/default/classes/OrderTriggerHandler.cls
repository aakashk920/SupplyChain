public with sharing class OrderTriggerHandler {
    public static void generateInvoiceAndSendEmail(List<Order__c> orders) {
        for (Order__c order : orders) {
            String pdfContent = generateInvoicePDF(order);
            sendEmailWithAttachment(pdfContent);
        }
    }
    
    public static String generateInvoicePDF(Order__c order) {
        // Generate PDF content using order information
        String invoiceContent = 'Order Name: ' + order.Name__c + '\n';
        invoiceContent += 'Customer Name: ' + order.Name__c + '\n';
        invoiceContent += 'Phone Number: ' + order.Phone_Number__c + '\n';
        invoiceContent += 'Address: ' + order.Address__c + '\n';
        
        // Placeholder logic for generating PDF content
        
        return invoiceContent;
    }
    
    public static void sendEmailWithAttachment(String pdfContent) {
        // Send email with PDF attachment
        // Similar logic as in EmailController.cls
    }
}
