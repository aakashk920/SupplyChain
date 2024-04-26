// MyEmailService.cls
global class MyEmailService implements Messaging.InboundEmailHandler {
    global Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email, Messaging.InboundEnvelope envelope) {
        Messaging.InboundEmailResult result = new Messaging.InboundEmailResult();

        // Process the incoming email and extract parameters
        String itemId = email.subject;
        String productName = email.plainTextBody.split(':')[0];
        String message = email.plainTextBody.split(':')[1];

        // Send an email to the specified Gmail address with the item details
        Messaging.SingleEmailMessage msg = new Messaging.SingleEmailMessage();
        msg.setToAddresses(new String[] {'aakashk2540@gmail.com'}); // Update the recipient's email address here
        msg.setSubject('Low Inventory Alert: ' + productName);
        msg.setPlainTextBody('Item ID: ' + itemId + '\nProduct Name: ' + productName + '\nMessage: ' + message);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {msg});

        return result;
    }
}
