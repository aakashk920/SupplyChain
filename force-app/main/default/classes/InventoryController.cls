public with sharing class InventoryController {
    @AuraEnabled(cacheable=true)
    public static List<InventoryItems> getInventoryItems(){
       List<InventoryItems> inventoryItems = new List<InventoryItems>();
       List<inventory_Item__c> items = [SELECT Name, Quantity_Available__c, ThreshHold_Level__c FROM inventory_Item__c];
        for (inventory_Item__c item : items) {
            inventoryItems.add(new InventoryItems(item.Name, item.Quantity_Available__c, item.ThreshHold_Level__c));
        }
        return inventoryItems;
    }

    public class InventoryItems {
        @AuraEnabled
        public String name;
        @AuraEnabled
        public Decimal quantity;
        @AuraEnabled
        public Decimal threshHoldLevel;

        public InventoryItems(String name, Decimal quantity, Decimal threshHoldLevel) {
            this.name = name;
            this.quantity = quantity;
            this.threshHoldLevel = threshHoldLevel;
        }
    }
}
