trigger InventoryUpdateTrigger on inventory_Item__c (after insert, after update) {
    if (Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate)) {
        // Check if trigger has already run in this transaction
        if (!InventoryUpdateTriggerHandler.hasRun) {
            InventoryUpdateTriggerHandler.hasRun = true;
            
            // List to store inventory items that need to be updated
            List<inventory_Item__c> itemsToUpdate = new List<inventory_Item__c>();
            
            // Query for threshold level
            Map<Id, inventory_Item__c> thresholdMap = new Map<Id, inventory_Item__c>();
            List<inventory_Item__c> thresholdItems = [SELECT Id, Name, Quantity_Available__c, ThreshHold_Level__c FROM inventory_Item__c WHERE Id IN :Trigger.newMap.keySet()];
            for (inventory_Item__c item : thresholdItems) {
                thresholdMap.put(item.Id, item);
            }

            // Iterate over trigger new to check threshold level
            for (inventory_Item__c item : Trigger.new) {
                inventory_Item__c thresholdItem = thresholdMap.get(item.Id);
                if (thresholdItem != null && item.Quantity_Available__c < thresholdItem.ThreshHold_Level__c) {
                    // Add the inventory item to the list for update
                    itemsToUpdate.add(new inventory_Item__c(
                        Id = item.Id,
                        Status__c = 'Below threshold' // You can perform any action here, such as updating a status field
                    ));
                }
            }
            for (inventory_Item__c item : Trigger.new) {
                inventory_Item__c thresholdItem = thresholdMap.get(item.Id);
                if (thresholdItem != null && item.Quantity_Available__c > thresholdItem.ThreshHold_Level__c) {
                    // Add the inventory item to the list for update
                    itemsToUpdate.add(new inventory_Item__c(
                        Id = item.Id,
                        Status__c = 'Above threshold' // You can perform any action here, such as updating a status field
                    ));
                }
            }

            // Update the inventory items
            if (!itemsToUpdate.isEmpty()) {
                update itemsToUpdate;
            }
        }
    }
}
