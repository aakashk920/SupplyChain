import { LightningElement, wire} from 'lwc';
import getInventoryItems from '@salesforce/apex/InventoryController.getInventoryItems';
export default class InventoryTracker extends LightningElement {
    inventoryItems;
    error;
    isLoading=true;

    @wire (getInventoryItems)
        wiredInventory({data, error}){
            if ( data) {
                this.inventoryItems= data;
                this.error=undefined;
            }
            else if ( error){
                this.inventoryItems= undefined;
                this.error=error;
            }
            this.isLoading=false;
        }
}