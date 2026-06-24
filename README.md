# Do you want to join in the **uniCRM** development?

## **Prerequisites:** You need to collect your ``PostgreSQL DBMS username, password, hostname`` and also create a database called ``uni_crm``.

## **There are 2 ways to setup the project:**
### **1. Follow this automated setup step: Clone this repo and ** Just run ``npm install`` from the root folder. Everything goes in the flow.
---
### **2. Follow these manual setup steps:**
#### i. Clone the repo ``git clone https://github.com/edupoly/unicrm.git``.
#### ii. Install the node_modules from the root of the repo.
#### iii. Get your PostgreSQL DB connection string and create a ``.env file in server/`` and keep the connection string as prop ``DATABASE_URL="postgresql://<username>:<password>@<hostname>:5432/uni_crm?schema=public"``.
#### iv. Create a database called ``uni_crm`` and the DB needs the schemas or tables to create. Run ``npx prisma db push`` from server/ folder.
#### v. Finally, the Global Data for this entire application needs to be seed in the DB. To seed the global data, run ``npx prisma db seed`` from server/ folder.