# Country Info API with Redis Caching (Memurai)

This is a Node.js project using **Express** that fetches country information from the Wikipedia API and caches the responses in **Redis (Memurai)** for faster subsequent requests.

---

## Features

- Fetch country data from Wikipedia API
- Cache country data in Redis (Memurai) for 1 hour
- Serve cached data for faster responses
- Test route to verify Redis caching

---

## Prerequisites

- Node.js (v14+ recommended)
- Memurai or Redis running on `127.0.0.1:6379`
- npm (Node package manager)

---

## Installation
1. Clone the repository:

```bash
git clone <your-repo-url>
cd <repo-folder>
```
## Test the Redis cache route:
GET http://localhost:5000/country/test-redis
GET http://localhost:5000/country/India
GET http://localhost:5000/country/Japan
First request → fetches from Wikipedia API
Subsequent request → served from Redis cache
## Dependencies
express
axios
redis