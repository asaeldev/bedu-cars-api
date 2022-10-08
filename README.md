# Bedu Backend Fundamentals - Used Cars API

## Pre-requisites

- [Node.js](https://nodejs.org/en/])
- [Docker](https://www.docker.com/)

## Getting Started

- Clone this repository
<pre><code>git clone https://github.com/asaeldev/bedu-cars-api.git</code></pre>

- Configure environment variables

1. Create a copy of .env.example and rename it to .env
2. Set the correct values for each of the following variables depending on your local configuration

| Name         | Description | Default Value                                  |
| ------------ | ----------- | ---------------------------------------------- |
| NODE_ENV     |             | dev                                            |
| PORT         |             | 300                                            |
| DATABASE_URL |             | "postgres://user:pass@example.com:5432/dbname" |
| JWT_SECRET   |             | ""                                             |

- Install dependencies
<pre><code>cd bedu-cars-api
npm install</code></pre>

- Install postgresql and pgadmin locally with Docker
<pre><code>docker-compose up</code></pre>

- Build and run the project
<pre><code>npm run dev</code></pre>
