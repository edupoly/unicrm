# Do you want to continue in the **uniCRM** development?


## **Follow this automated setup step:** Just run ``npm install`` from the root.
### **Important Note:**You need to collect your ``PostgreSQL username, password, hostname``.


## **Follow these manual setup steps:**
### 1. Clone the repo ``git clone https://github.com/edupoly/unicrm.git``.
### 2. Install the node_modules from the root of the repo.
### 3. Get your PostgreSQL DB connection string and create a ``.env file in server/`` and keep the connection string as prop ``DATABASE_URL="postgresql://<username>:<password>@<hostname>:5432/uni_crm?schema=public"``.
### 4. Next the DB needs the schemas or tables to create. Run ``npx prisma db push`` from server/ folder.
### 5. Finally, the Global Data for this entire application needs to be seed in the DB. To seed the global data, run ``npx prisma db seed`` from server/ folder.