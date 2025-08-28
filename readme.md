# K6Project

This project contains performance and smoke tests for your application using [k6](https://k6.io/), a modern load testing tool.

## Project Structure

```
K6Project/
│
├── data/
│   └── urls/urls.js         # Endpoint URLs used in tests
├── helpers/
│   ├── config.js            # Common headers and config
│   └── helper-functions.js  # Utility functions (e.g., randomId)
├── tests/
│   ├── load-test.js         # Load test script
│   └── smoke-test.js        # Smoke test script
├── summary.html             # HTML report generated after test run
├── package.json             # Project metadata
└── README.md                # This file
```

## Test Scripts

### 1. Smoke Test

- **File:** [`tests/smoke-test.js`](tests/smoke-test.js)
- **Purpose:** Quick check to verify that main endpoints are up and responding as expected.
- **How it works:**  
  - Runs with 1 virtual user for 5 seconds.
  - Checks user and cart endpoints for expected responses and content.
  - Generates a summary report in the terminal and as `summary.html`.

### 2. Load Test

- **File:** [`tests/load-test.js`](tests/load-test.js)
- **Purpose:** Simulates increasing load to test system performance and stability.
- **How it works:**  
  - Ramps up to 20 users, holds, then ramps down.
  - Checks response times and status codes.
  - Enforces a threshold: 95% of requests must complete in under 1 second.
  - Generates a summary report in the terminal and as `summary.html`.

## Reports

- After running a test, a detailed HTML report is generated as [`summary.html`](summary.html).
- The report includes total requests, failed requests, breached thresholds, and failed checks.
- https://rohit-singh-athiya.github.io/k6/
- ![Uploading image.png…]()


## Running the Tests

1. **Install [k6](https://k6.io/docs/getting-started/installation/)** if you haven't already.

2. **Run the Smoke Test:**
   ```sh
   k6 run tests/smoke-test.js
   ```

3. **Run the Load Test:**
   ```sh
   k6 run tests/load-test.js
   ```

4. **View the Report:**
   - Open `summary.html` in your browser for a visual summary.
   - <img width="2859" height="1401" alt="image" src="https://github.com/user-attachments/assets/98b3f3cd-8752-4600-a780-fa7214bd3d9b" />


## Customization

- Update endpoints in [`data/urls/urls.js`](data/urls/urls.js).
- Adjust headers in [`helpers/config.js`](helpers/config.js).
- Modify test logic in the scripts under [`tests/`](tests/).

## License

This project is licensed under the ISC License. See [`package.json`](package.json) for details.

---
