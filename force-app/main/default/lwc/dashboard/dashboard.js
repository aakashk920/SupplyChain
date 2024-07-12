import { LightningElement, wire, track } from 'lwc';
import getInventorySummary from '@salesforce/apex/DashboardController.getInventorySummary';
import getOrderSummary from '@salesforce/apex/DashboardController.getOrderSummary';

export default class Dashboard extends LightningElement {
    @track inventoryData = [];
    @track orderData = [];
    @track recentActivities = [
        { id: 1, type: 'Info', message: 'New inventory item added.' },
        { id: 2, type: 'Warning', message: 'Order quantity exceeds available stock.' },
        // Add more recent activities as needed
    ];

    @wire(getInventorySummary)
    wiredInventoryData({ error, data }) {
        if (data) {
            this.inventoryData = data;
            this.renderInventoryChart();
        } else if (error) {
            console.error('Error fetching inventory data:', error);
        }
    }

    @wire(getOrderSummary)
    wiredOrderData({ error, data }) {
        if (data) {
            this.orderData = data;
            this.renderOrderChart();
        } else if (error) {
            console.error('Error fetching order data:', error);
        }
    }

    renderInventoryChart() {
        const ctx = this.template.querySelector('.inventory-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total Inventory'],  // Fixed label for total inventory
                datasets: [{
                    label: 'Total Quantity',
                    data: this.inventoryData.map(item => item.totalQuantity),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true }
                }
            }
        });
    }

    renderOrderChart() {
        const ctx = this.template.querySelector('.order-chart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: this.orderData.map(item => item.status),
                datasets: [{
                    label: 'Order Status',
                    data: this.orderData.map(item => item.orderCount),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
    }
}
