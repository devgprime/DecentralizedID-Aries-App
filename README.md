## MTCT API Solution

The MTCT API solution is a comprehensive backend service for managing financial products, transactions, and relevant stakeholders such as customers and agents.
![Uploading image.png…]()

# Features
Product Management: Add, retrieve, and list financial products.
Customer Management: Record and manage customer details.
Agent Management: Record and manage agent details.
Transaction Management: Record and list buy/sell transactions of financial products.

# Prerequisites
Ensure you have the following installed on your machine:

Node.js (>= 14.x)
MongoDB (>= 4.x)
TypeScript (>= 4.x)

# Installation
Clone the Repository

git clone https://github.com/devgprime/WeidyMTCT.git
cd MTCT-API

Install Dependencies
npm install

MONGODB_URI=mongodb://localhost:27017/mtct
JWT_SECRET=your_jwt_secret
PORT=3000

npm run dev

# API Endpoints

Import this [postman file](./mtct_collection.postman_collection.json) to use the apis


-----------------------------------------------------------------------------------------------------------------------------






# WeIDY - Basic Web3 Identity Solution

WeIDY is a basic Web3 Identity solution that demonstrates the workflow of Verifiable Credentials and its inherent workflows. It allows you to connect to a local Indy node or any DLT ledger, connect different actors (issuer, holder, verifier), simulate credential issuance and verification, list credentials, and manage user registration, login, and logout.

## Prerequisites

Before you can run WeIDY, you'll need the following prerequisites:

- Docker: Make sure you have Docker installed on your system. You can download and install Docker from [Docker's official website](https://www.docker.com/).

## Getting Started

Follow these steps to build and run WeIDY:

This project is based on `Aries` framework, so firstly please follow the [instruction](https://aries.js.org/guides/getting-started/installation) before going deeply


# Building the images
sudo docker build -f Dockerfile_issuer -t weidy-issuer:v1.0.0 .
sudo docker build -f Dockerfile_holder -t weidy-holder:v1.0.0 .
sudo docker build -f Dockerfile_verifier -t weidy-verifier:v1.0.0 .


```bash
# Running the containers
sudo docker run -p 8880:8880 -p 9000:9000 <issuer-image-id> # run as issuer
sudo docker run -p 8881:8881 -p 9001:9001 <holder-image-id> # run as issuer
sudo docker run -p 8882:8882 -p 9002:9002 <verifier-image-id> # run as issuer
```


## Accessing WeIDY
Once the containers are up and running, you can access WeIDY components as follows:

Issuer: http://localhost:8880
Holder: http://localhost:8881
Verifier: http://localhost:8882


## APIs

Import this [postman file](./weidycollection.json) to use the apis

## Workflow

## Usage
WeIDY provides a basic Web3 Identity solution with the following key capabilities:

Connecting to a local Indy node or DLT ledger.
Connecting issuer, holder, and verifier actors.
Simulating credential issuance and verification.
Listing existing credentials.
User registration, login, and logout.

## For Credential Issuance:

1. Both the Issuer, Holder, and Verifier log in to their respective applications.

    1.1. In case a credential schema and definition do not exist, it is the responsibility of the Issuer to create a new schema and credential definition.

2. The Issuer initiates an invitation for the Holder to establish a connection (Out-of-band).

3. The Holder acknowledges and accepts the connection invitation.

4. The Issuer generates a credential offer and securely transmits it to the Holder via the established connection.

5. The Holder accepts the credential offer and securely stores the credential.

## For Identity Verification:

1. The Verifier initiates an invitation for the Holder to establish a connection (Out-of-band).

2. The Holder accepts the connection invitation.

3. The Verifier generates a proof request and sends it to the Holder through the established connection.

4. The Holder constructs a proof using their stored credentials and sends the proof back to the Verifier via the connection.

5. The Verifier reviews and validates the proof for identity verification.
