## Stock Simulator

## Project Report and Video Demo

- [Video Demo](https://youtu.be/YWBZWLkrCVI)
- [Project Report](https://github.com/Anish565/Stock-Simulator/blob/main/Cloud_Project_Report.pdf)

## About

### Problem Statement

Learning about stock trading can be intimidating and risky for beginners. Real-world trading involves financial risks, making it inaccessible for individuals who want to gain hands-on experience and understand trading strategies in a risk-free environment. Additionally, managing portfolios, tracking performance, and staying updated with market trends are complex tasks without proper tools.

### Solution

The Stock Simulator provides a comprehensive platform for individuals to practice stock trading in a simulated, risk-free environment. By enabling users to create trading sessions, buy and sell stocks with virtual funds, and analyze portfolio performance, the application empowers users to learn and experiment with trading strategies. It integrates real-time stock data and financial news to help users make informed decisions. The platform’s goal is to make trading education accessible, engaging, and effective.

### Key Features

- Real-Time Trading Simulation
  - Practice buying and selling stocks with virtual funds.
- Portfolio Management
  - Track virtual investments and analyze portfolio growth.
- Customizable Trading Sessions
  - Create sessions with specified goals, starting funds, and durations.
- Market Insights
  - Integrated financial news and real-time stock data.



## Tech Stack

#### Frontend:

- React.js with TypeScript
- Tailwind CSS
- WebSocket (for real-time stock data)

#### Backend:

- Node.js
- AWS Lambda (serverless architecture)
- API Gateway
- SQS (message queuing)
- DynamoDB (database)
- Cognito (authentication)

#### Cloud Platform:
- AWS

## Architecture Overview

- [System Design Diagram]()

#### The architecture includes:

- User Authentication: Managed through AWS Cognito, allowing secure login and registration.
- API Gateway: Centralized routing for all backend APIs.
- Lambda Functions: Serverless backend for user management, session creation, stock trading, portfolio updates, and news fetching.
- Message Queuing: SQS for handling buy and sell stock transactions.

#### Databases:

- DynamoDB Stocks DB: Stores stock data.
- DynamoDB Sessions DB: Manages session-specific data.
- DynamoDB News DB: Holds financial news.
