import { LightningElement, wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import ChartJS from '@salesforce/resourceUrl/ChartJS';
import getAccountIndustryData from '@salesforce/apex/AccountController.getAccountIndustryData';

export default class AccountChart extends LightningElement {
    chart;
    chartjsInitialized = false;
    chartData;

    @wire(getAccountIndustryData)
    wiredAccountData({ error, data }) {
        if (data) {
            this.chartData = data;
            this.initializeChart();
        } else if (error) {
            console.error('Error fetching account data', error);
        }
    }

    renderedCallback() {
        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;

        loadScript(this, ChartJS)
            .then(() => {
                // After Chart.js is loaded
                this.initializeChart();
            })
            .catch(error => {
                console.error('Error loading Chart.js', error);
            });
    }

    initializeChart() {
        if (this.chartData && window.Chart) {
            const ctx = this.template.querySelector('canvas.chart').getContext('2d');
            const industries = this.chartData.map(account => account.Industry);
            const counts = this.chartData.map(account => account.Count);

            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: industries,
                    datasets: [{
                        label: 'Number of Accounts',
                        data: counts,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            console.log('Chart.js library or chart data is not yet available.');
        }
    }
}
