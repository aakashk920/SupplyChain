public with sharing class EmailUtility {
    @AuraEnabled
    public static void sendEmail(String receiptEmail, String ItemId,String productName, String message){
        Messaging.SingleEmailMessage mail=new Messaging.SingleEmailMessage();
        
        mail.setToAddresses ( new String [] {receiptEmail});
        mail.setSubject ('Low Inventory Alert:'+ productName);
        mail.setPlainTextBody('itemId:' + itemId + '\nProduct Name:'+ productName + '\nMessage:'+ message + '\n kindle arrane the inventory according to your needs');
        
        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});
    }
}