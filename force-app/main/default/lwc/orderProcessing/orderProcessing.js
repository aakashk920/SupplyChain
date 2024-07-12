import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getInventoryItems from '@salesforce/apex/InventoryController.getInventoryItems';
import sendOrderEmail from '@salesforce/apex/OrderEmail.sendOrderEmail';
import insertOrderData from '@salesforce/apex/OrderEmail.insertOrderData';
import updateInventoryQuantities from '@salesforce/apex/OrderEmail.updateInventoryQuantities';

export default class OrderProcessing extends LightningElement {
        @track inventoryItems = [];
        @track basketItems = [];

        connectedCallback() {
                this.loadInventoryItems();
        }
        loadInventoryItems() {
                getInventoryItems()
                        .then(result => {
                                this.inventoryItems = result.map(item => {
                                        return { ...item, quantityToAdd: 0 };
                                });
                                console.log('loadInventoryItems', this.inventoryItems);
                        })
                        .catch(error => {
                                this.showToast('Error', 'Failed to fetch the inventory Items', 'error');
                                console.error('This is the error at loadInventoryItems', error);
                        });
        }




        handleQuantityChange(event) {
                const itemId = event.target.dataset.itemId;
                const quantityToAdd = parseInt(event.target.value, 10);
                console.log('This is the quantity to Add @ handleQuantityChange', quantityToAdd);
                console.log('This is the ItemId @ handleQuantityChange', itemId);

                for (let item of this.inventoryItems) {
                        if (item.Id === itemId) {
                                item.quantityToAdd = quantityToAdd;
                        }
                }
        }


        handleAddToBasket(event) {
                const itemId = event.target.dataset.itemId;
                const selectedItem = this.inventoryItems.find(item => item.id === itemId);
                console.log('item ', itemId);
                console.log('item ', selectedItem);

                if (selectedItem.quantityToAdd <= 0) {
                        this.showToast('Error', ' Please Enter a valid Quantity', 'error');
                }
                if (selectedItem.quantityToAdd > selectedItem.quantity) {
                        this.showToast('Error', 'Quantity exceeds available inventory', 'error');
                }

                this.basketItems.push({
                        name: selectedItem.name,
                        quantity: selectedItem.quantityToAdd
                })

        }
        handleInputChange(event) {
                const { name, value } = event.target;
                this[name] = value;
        }
        handlePlaceOrder() {
                if (this.basketItems === 0) {
                        this.showToast('Error', 'Basket Is empty', 'error');
                }
                if (!this.name || !this.address || !this.phone) {
                        this.showToast('Error', 'Enter All the required field', 'error');
                }

                sendOrderEmail({ orderItems: this.basketItems, name: this.name, phoneNumber: this.phoneNumber, address: this.address })
                .then(() => {
                    this.showToast('Success', 'Email Sent Successfully', 'success');
                    this.flag = true;
                })
                .catch(error => {
                    this.showToast('Error', 'Failed to place order', 'error');
                });
    
    
            insertOrderData({ orderItems: this.basketItems, name: this.name, phoneNumber: this.phoneNumber, address: this.address })
                .then(() => {
                    this.showToast('Success', 'Order placed successfully in the insertOrder Data @ OrderProcessing.JS', 'success');
                    this.flag = true;
                })
                .catch(error => {
                    this.showToast('Error', 'Failed to place order in the insertOrder Data @ OrderProcessing.JS', 'error');
                });
    
            updateInventoryQuantities({ orderItems: this.basketItems })
                .then(() => {
                    this.showToast('Success', 'Order placed successfully', 'success');
                    this.flag = true;
                })
                .catch(error => {
                    this.showToast('Error', 'Failed to place order @ insertOrderDataAndUpdateInventory', 'error');
                });
        }




        showToast(title, message, variant) {
                const event = new ShowToastEvent({
                        title: title,
                        message: message,
                        variant: variant
                })
                this.dispatchEvent(event);
        }

}