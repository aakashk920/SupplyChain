public with sharing class InventoryController {
    @AuraEnabled (cacheable=true)
    public static List<InventoryItem> getInventoryItems(){
        List<InventoryItem> inventoryItems=new List<InventoryItem>();

        inventoryItems.add(new InventoryItem('Product Z', 50));
        inventoryItems.add(new InventoryItem('Product X', 50));
        inventoryItems.add(new InventoryItem('Product Y', 7));
        inventoryItems.add(new InventoryItem('Product D', 120));
        inventoryItems.add(new InventoryItem('Product E', 80));
        inventoryItems.add(new InventoryItem('Product F', 75));
        inventoryItems.add(new InventoryItem('Product F', 60));
        return inventoryItems;
    }

    public class InventoryItem {
        @AuraEnabled 
        public String name;
        @AuraEnabled
        public Integer quantity;
        public InventoryItem(String name, Integer quantity){
            this.name=name;
            this.quantity=quantity;
        }
    }
}