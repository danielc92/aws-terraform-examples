# A SANDBOX TO EXPERIMENT WITH DYNAMODB

### Prerequisites

- installation of localstack
- installation of docker
- installation of nvm (lower node versions may be compatible)
  - `v16.0.0 (Currently using 64-bit executable)`

### First time setup

- Switch to the correct node version `nvm use`
- Start localstack via docker `docker-compose up`
- Install dependencies `npm i`
- Create resources via terraform `terraform plan && terraform apply`

### How to build

- `yarn tsc`

### How to run insert or update record script

- `node dist\\insert-records.js`
- `node dist\\update-record.js`