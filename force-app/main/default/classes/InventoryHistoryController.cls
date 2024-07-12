public with sharing class InventoryHistoryController {
 @AuraEnabled(cacheable=true)

 public static List<Inventory_History__c> getInventoryHistory( Date startDate, Date endDate){
return [SELECT Date__c, inventory_Item__c, Quantity__c 
        FROM Inventory_History__c 
        WHERE Date__c >=:startDate AND Date__c <=: endDate];
 }
}