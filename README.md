# tech-test-node-app

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/Cahyanakun/tech-test-node-app.git
cd tech-test-node-app
```

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables (if needed)
```

for example database on dev mode
please create db name with [_dev] in last name example : (db_test_dev)

run migration

```bash
yarn migrate
```

run seeder

```bash
yarn seed
```

run mode development

```bash
yarn dev
```
