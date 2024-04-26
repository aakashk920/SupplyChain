import { LightningElement, wire } from 'lwc';
import getInventoryItem from '@salesforce/apex/InventoryController.getInventoryItems';
export default class InventoryTracker extends LightningElement {

    inventoryItems;
    error;
    isLoading = true;


    @wire(getInventoryItem)
    wiredInventory({ error, data }) {
        if (data) {
            this.inventoryItems = data;
            this.error = undefined;
        }
        else if (error) {
            this.inventoryItems = undefined;
            this.error = error;
        }
        this.isLoading=false;
    }
}