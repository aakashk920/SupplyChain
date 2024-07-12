import { LightningElement, api } from 'lwc';

export default class OrderReceiver extends LightningElement {
    @api receivedItems;

    connectedCallback() {
    }
}
