public with sharing class EmailUtility {
    @AuraEnabled (cacheable=true)
    public static void sendEmail (String recipientEmail, String itemId, String productName, String message){

            Messaging.SingleEmailMessage mail= new Messaging.SingleEmailMessage();


            mail.setToAddresses( new String[]{recipientEmail});
            mail.setSubject ('Low Inventory Alert:' + productName);
            mail.setPlainTextBody('Item ID: ' + itemId + '\nProduct Name: ' + productName + '\nMessage: ' + message+ '\n Kindly make the arrange for the above said item for avoid the black inventory ');

            Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});
    }
}