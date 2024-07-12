import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import ChartJS from '@salesforce/resourceUrl/ChartJS';

// Dummy data for testing
const dummyData = [
    { Date__c: '2024-06-01', Quantity__c: 100 },
    { Date__c: '2024-06-02', Quantity__c: 120 },
    { Date__c: '2024-06-03', Quantity__c: 90 },
    { Date__c: '2024-06-04', Quantity__c: 110 },
    { Date__c: '2024-06-05', Quantity__c: 130 },
    { Date__c: '2024-06-06', Quantity__c: 95 },
    { Date__c: '2024-06-07', Quantity__c: 115 },
    { Date__c: '2024-06-08', Quantity__c: 105 },
    { Date__c: '2024-06-09', Quantity__c: 125 },
    { Date__c: '2024-06-10', Quantity__c: 85 }
];

export default class InventoryVisualization extends LightningElement {
    @track startDate;
    @track endDate;
    @track inventoryData = [];
    chart;
    chartJsInitialized = false;
    showError = false;

    handleDateChange(event) {
        const field = event.target.label.toLowerCase().replace(' ', '');
        this[field] = event.target.value;
    }

    fetchData() {
        // Skip data fetching for dummy data scenario
        this.inventoryData = dummyData;
        this.processChartData();
        this.showError = false; // Reset error state
    }

    processChartData() {
        const groupedData = this.inventoryData.reduce((acc, record) => {
            const date = record.Date__c;
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += record.Quantity__c;
            return acc;
        }, {});

        this.chartData = {
            labels: Object.keys(groupedData),
            datasets: [{
                label: 'Inventory Quantity',
                data: Object.values(groupedData),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };

        this.initializeChart();
    }

    renderedCallback() {
        if (this.chartJsInitialized) {
            return;
        }
        this.chartJsInitialized = true;

        loadScript(this, ChartJS)
            .then(() => {
                console.log('ChartJS loaded successfully');
                this.initializeChart();
            })
            .catch(error => {
                console.error('Error loading Chart.js:', error);
            });
    }

    initializeChart() {
        if (this.chart) {
            this.chart.destroy();
        }

        const ctx = this.template.querySelector('canvas.chart').getContext('2d');
        if (!ctx) {
            console.error('Canvas context not found');
            return;
        }

        this.chart = new Chart(ctx, {
            type: 'line',
            data: this.chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'll'
                        },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Quantity'
                        }
                    }
                }
            }
        });
    }
}
