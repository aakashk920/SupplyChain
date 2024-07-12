public with sharing class LeadController {
    @AuraEnabled(cacheable=true)
    public static List<lead__c> searchLeads(String searchKey) {
        String searchQuery = '%' + searchKey + '%';
        return [SELECT Id, Name, Contact_information__c, Status__c FROM lead__c WHERE Name LIKE :searchQuery];
    }

    @AuraEnabled
    public static void uploadPDF(Id leadId, String fileContent) {
        lead__c leadRecord = [SELECT Id FROM lead__c WHERE Id = :leadId LIMIT 1];
        if (leadRecord != null) {
            leadRecord.Document__c = fileContent;
            update leadRecord;
        } else {
            throw new AuraHandledException('Lead record not found');
        }
    }
}
