
# Supply Chain Management System

## Project Overview

The **Supply Chain Management System** is a Salesforce application designed to streamline and optimize the management of inventory, orders, and customer relationships for an e-commerce platform. Built using Salesforce’s Commerce Cloud, Apex, and Lightning Web Components (LWC), this system offers advanced features for real-time data visualization, automated processes, and enhanced user experiences.

## Features

- **Dynamic Inventory Visualization**:
  - Created a Lightning Web Component integrating Chart.js for real-time inventory data visualization.

- **Automated Processes**:
  - Implemented daily scheduled Apex jobs for automatic data tracking, inventory management, and reporting.

- **Enhanced Data Accuracy**:
  - Utilized Apex classes and triggers for maintaining data consistency, integrity, and automatic updates.

- **Comprehensive Customer Management**:
  - Developed custom `Customer__c` object with fields for detailed customer information and management.

- **Product Management**:
  - Managed product details including category, price, stock quantity, and supplier information through the `Product__c` object.

- **Order Management**:
  - Facilitated order processing with features for tracking order status, shipment, and customer feedback through the `Order__c` object.

- **Advanced Reporting and Analytics**:
  - Implemented enhanced reporting features for inventory levels, order history, and customer insights.

## Technologies Used

- **Salesforce Commerce Cloud**: For e-commerce store management.
- **Lightning Web Components (LWC)**: For front-end development.
- **Apex**: For backend logic and automation.
- **Chart.js**: For dynamic data visualization.
- **Salesforce Standard Objects**: For managing Products, Orders, and Customers.

## Installation

### Prerequisites

- A Salesforce Developer Edition or Sandbox environment.
- Access to Salesforce Commerce Cloud.

### Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/aakashk920/supply-chain-management-system.git
    cd supply-chain-management-system
    ```

2. **Deploy Metadata**:
   - Use Salesforce CLI to deploy metadata to your Salesforce org.
   - Ensure you have the [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli) installed and authenticated.

    ```bash
    sfdx force:source:deploy -p force-app
    ```

3. **Install Dependencies**:
   - Install any required npm packages if applicable for local development.

    ```bash
    npm install
    ```

4. **Set Up Chart.js Library**:
   - Add Chart.js as a static resource in your Salesforce org if not already included.

## Usage

### Accessing the Application

1. **Log in to Salesforce**:
   - Go to [Salesforce Login](https://login.salesforce.com/) and log in to your Developer Edition or Sandbox.

2. **Navigate to the App**:
   - From the App Launcher, search for and select **Supply Chain Management** to access the application.

3. **Explore Features**:
   - Use the **Inventory Management** tab to view real-time data visualizations.
   - Manage **Products**, **Orders**, and **Customers** through their respective tabs.

### LWC Components

- **`accountChart`**: Displays a bar chart of account industries.
- **`productList`**: Lists available products.
- **`productDetail`**: Displays details for a selected product.
- **`orderProcessing`**: Manages order creation and status updates.

## Screenshots

### Inventory Management Component

**Inventory Management Screen and Product Detail Component**  
A view of the inventory management component showcasing real-time data visualizations.
![Inventory Management](<Supply chain management.png>) 

### Real Time Chatbot

**ChatBot Screen**  

![alt text](<supply chain-2.JPG>)

## Examples

### Creating a New Product

```apex
Product__c newProduct = new Product__c(
    Name__c = 'Sample Product',
    Price__c = 29.99,
    StockQuantity__c = 100,
    Category__c = 'Electronics',
    ImageURL__c = 'https://example.com/image.jpg',
    Description__c = 'A sample product for testing.'
);
insert newProduct;
```
# Inventory Management Component

This repository contains the source code for an Inventory Management component developed for understanding the basic concept of the Lightning web component. This component helps manage inventory-related tasks such as tracking stock levels, updating inventory, and generating alerts.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Screenshot](#Screenshot)

## Features

- **Inventory Tracking**: Keep track of stock levels for various items in the inventory.
- **Inventory Update**: Update inventory levels based on incoming orders, shipments, or manual adjustments.
- **Threshold Alerts**: Receive alerts when inventory levels fall below a certain threshold, indicating low stock.
- **Integration**: Seamlessly integrate with other components or systems within the application.

## Installation

To use this component in your project, follow these steps:

1. Clone the repository: `git clone [https://github.com/yourusername/inventory-management-component](https://github.com/aakashk920/InventoryMngtLWC).git`
2. Navigate to the project directory: `cd inventory-management-component`
3. Install dependencies: `npm install`

## Usage

To integrate the Inventory Management component into your application, follow these steps:

1. Import the component into your project.
2. Configure the component according to your inventory management requirements.
3. Utilize the provided APIs or methods to interact with the inventory data.
4. Customize the component as needed to fit your application's design and functionality.

Example usage:

```javascript
import InventoryManagement from 'inventory-management-component';

// Initialize the Inventory Management component
const inventory = new InventoryManagement();

// Update inventory levels
inventory.updateInventory('item1', 10); // Update item1 with a quantity of 10
```

## Contributing

Contributions are welcome! To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.

Please ensure that your contributions adhere to the existing coding style and conventions.
