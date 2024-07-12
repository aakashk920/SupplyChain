trigger DeliveryStatusTrigger on lead__c ( after update){
    for ( lead__c newLead: Trigger.new){
        lead__c oldLead=Trigger.oldMap.get(newlead.Id);
        if (newLead.Status__c != oldLead.Status__c){
            Messaging.SingleEmailMessage mail=new Messaging.SingleEmailMessage();
            mail.setToAddresses(new String[] {'aakashk2540@gmail.com'});
            mail.setSubject('Lead Status Update');
            mail.setPlainTextBody('The Status of the lead'+newLead.Name+'has been updated'+newLead.Status__c+'.');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});
        }
    }
}